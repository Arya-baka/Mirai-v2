module.exports.config = {
    name: "waifu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thiệu Trung Kiên",
    description: "[type]",
    commandCategory: "Random-img",
    usages: "[]",
    cooldowns: 5
};

module.exports.run = async function({
    api,
    event,
    args,
    Users
}) {
    const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
    const {
        threadID,
        messageID
    } = event;
    var type;
    switch (args[0]) {
        case "rem":
            type = "rem";
            break;
        case "aqua":
            type = "aqua";
            break;
        case "umaru":
            type = "umaru";
            break;
        case "kanna":
            type = "kanna";
            break;
        case "kurumi":
            type = "kurumi";
            break;
        case "lucy":
            type = "lucy";
            break;
        case "sagiri":
            type = "sagiri";
            break;
        case "chitanda":
            type = "chitanda";
            break;
        default:
            return api.sendMessage(`❤️LIST WAIFU❤️\n»1/Rem\n»2/Aqua\n»3/Kanna\n»4/Umaru\n»5/Kurumi\n»6/Lucy\n»7/Sagiri\n»8/Chitanda`, threadID, messageID);
            break;
    }
    axios.get(`http://trungkien.tk/waifu/${type}.php`).then(res => {
        let callback = function() {
            api.sendMessage({
                body: `Hi ${name}\nẢnh của bạn đây! `,
                attachment: fs.createReadStream(__dirname + `/cache/${type}.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.png`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/${type}.png`)).on("close", callback);
    })
}