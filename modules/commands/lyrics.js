module.exports.config = {
	name: "lyrics",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Quang Minh",
	description: "Lời bài hát ",
	commandCategory: "Phương tiện",
	usages: "[tên bài hát]",
	cooldowns: 5
};

module.exports.run = async function({
    api,
    event,
    args,
    utils,
    Users,
    Threads
}) {
    try {
        let axios = require("axios");
        let fs = require("fs-extra");
        let request = require("request")
        let {
            threadID,
            senderID,
            messageID
        } = event;
        if (!args[0]) {
            api.sendMessage("Vui lòng nhập tên anime", threadID, messageID)
        }
        const res = await axios.get(encodeURI(`https://api-ttk.herokuapp.com/other/lyrics?text=${args[0]}`));
        console.log(res.data);
        let data = res.data;
        let callback = function() {
            return api.sendMessage({
                body: `Tên bài hát: ${data.title}\n\nLời bài hát: ${data.lyrics}`,
                attachment: fs.createReadStream(__dirname + `/cache/anime.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anime.png`), event.messageID);
        };
        return request(encodeURI(data.image))
            .pipe(fs.createWriteStream(__dirname + `/cache/anime.png`))
            .on("close", callback);

    } catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}
