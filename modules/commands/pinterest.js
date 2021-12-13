module.exports.config = {
    name: "pinterest",
    version: "1.0.0",
    hasPermision: 0,
    credit: "Lawer Team",
    description: "search ảnh trên pinterest",
    commandCategory: "info",
    usages: "[từ khóa]",
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
        var type = args.join("");
        if (!type) {
            api.sendMessage("Vui lòng nhập từ khóa tìm kiếm", threadID, messageID)
        }
        const res = await axios.get(encodeURI(`http://lawerpr0ject.herokuapp.com/social/pinterest?text=${type}`));
        console.log(res.data);
        let data = res.data;
        let callback = function() {
            return api.sendMessage({
                body: `Từ khóa tìm kiếm: ${args[0]}`,
                attachment: fs.createReadStream(__dirname + `/cache/search.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/search.png`), event.messageID);
        };
        return request(encodeURI(data.url))
            .pipe(fs.createWriteStream(__dirname + `/cache/search.png`))
            .on("close", callback);

    } catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}