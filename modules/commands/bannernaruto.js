module.exports.config = {
    name: "bannernaruto",
    version: "1.0.0",
    hasPermision: 0,
    credit: "",
    description: "tạo banner naruto",
    commandCategory: "info",
    usages: "[text]",
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
        if(!type) {
            api.sendMessage("Vui lòng nhập chữ in lên banner", threadID, messageID)
        }
        const res = await axios.get(encodeURI(`http://lawerpr0ject.herokuapp.com/banner/naruto?text=${type}&apikey=lawerteam`));
        console.log(res.data);
        let data = res.data;
        let callback = function() {
            return api.sendMessage({
                body: `Banner của bạn đây nha\nApi Author: ${data.author}`,
                attachment: fs.createReadStream(__dirname + `/cache/naruto.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/naruto.png`), event.messageID);
        };
        return request(encodeURI(data.url))
            .pipe(fs.createWriteStream(__dirname + `/cache/naruto.png`))
            .on("close", callback);

    } catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}