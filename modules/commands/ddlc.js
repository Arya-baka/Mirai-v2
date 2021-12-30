module.exports.config = {
    name: "ddlc",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "QMinh",
    description: "Tạo ảnh bìa",
    commandCategory: "Banner",
    usages: "[Character]|[Background]|[Text]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function ({ api, event, args}) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const qs = require("querystring");
    if (args[0] == "help") {
        api.sendMessage("Character: monika, yuri, natsuki, sayori or m, y, n , s\nBackground: bedroom, class, closet, club, corridor, house, kitchen, residential, sayori_bedroom\nCú pháp: [character]|[background]|[text]", event.threadID, event.messageID)
    }
    const content = args.join(" ").split("|").map(item => item = item.trim());
    const character = content[0],
        background = content[1];
        text = content[2];
    let params = {character, background,text};
    params = qs.stringify(params);
    const pathsave = __dirname + `/cache/banner.png`;
    let imageBuffer;
    axios.get("https://api-ttk.herokuapp.com/other/ddlc?" + params, {
            responseType: "arraybuffer"
        })
        .then(data => {
            const imageBuffer = data.data;
            fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
            api.sendMessage({body: `Ảnh của bạn đây!`, attachment: fs.createReadStream(pathsave)}, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);})
        .catch(error => {
            let err;
            if (error.response) err = JSON.parse(error.response.data.toString());
            else err = error;
            return api.sendMessage(`Đã xảy ra lỗi ${err.error} ${err.message}`, event.threadID, event.messageID);
        })
};
