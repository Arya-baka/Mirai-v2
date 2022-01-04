module.exports.config = {
    name: "hentai",
    version: "1.0.0",
    hasPermision: 0,
    credit: "Quang Minh",
    description: "Random ảnh hentai",
    commandCategory: "Random-img",
    usages: "",
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
        const res = await axios.get(encodeURI(`https://api.waifu.pics/nsfw/waifu`));
        console.log(res.data);
        let data = res.data;
        let callback = function() {
            return api.sendMessage({
                body: `Ảnh hentai`,
                attachment: fs.createReadStream(__dirname + `/cache/hentai.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/hentai.png`), event.messageID);
        };
        return request(encodeURI(data.url))
            .pipe(fs.createWriteStream(__dirname + `/cache/hentai.png`))
            .on("close", callback);

    } catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}
