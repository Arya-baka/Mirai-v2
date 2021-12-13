module.exports.config = {
    name: "animeinfo",
    version: "1.0.0",
    hasPermision: 0,
    credit: "",
    description: "như tên module",
    commandCategory: "info",
    usages: "[name anime]",
    cooldowns: 0,
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
        let axios = require('axios');
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
        const res = await axios.get(encodeURI(`http://lawerpr0ject.herokuapp.com/other/anime?name=${args[0]}`));
        console.log(res.data);
        let data = res.data;
        let callback = function() {
            return api.sendMessage({
                body: `Tên phim: ${data.title}\nurl: ${data.url}\nNội dung phim: ${data.noidung}\nXếp hạng: 🏆${data.xephang}\nSố tập: ${data.episodes}\nAuthor: ${data.Author}`,
                attachment: fs.createReadStream(__dirname + `/cache/anime.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anime.png`), event.messageID);
        };
        return request(encodeURI(data.picture))
            .pipe(fs.createWriteStream(__dirname + `/cache/anime.png`))
            .on("close", callback);

    } catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}