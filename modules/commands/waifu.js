module.exports.config = {
    name: "waifu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Quang Minh",
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
        case "kanna":
            type = "kanna";
            break;
        case "umaru":
            type = "umaru";
            break;
        case "miku":
            type = "miku";
            break;
        default:
            return api.sendMessage(`❤️LIST WAIFU❤️\n»1/Kanna\n»2/Umaru\n»3Miku`, threadID, messageID);
            break;
    }
    axios.get(`https://quangminh.mikubaka2608.repl.co/${type}`).then(res => {
        let callback = function() {
            api.sendMessage({
                body: `Hi ${name}\nCô vợ ${type} xinh xắn của bạn đây nha! `,
                attachment: fs.createReadStream(__dirname + `/cache/${type}.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${type}.png`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/${type}.png`)).on("close", callback);
    })
}
