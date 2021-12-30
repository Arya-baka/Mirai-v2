module.exports.config = {
    name: "thuphap",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "QMinh",
    description: "Tạo banner thư pháp",
    commandCategory: "Banner",
    usages: "[ID]|[Số dòng]|[Dòng 1]|[Dòng 2]|[Dòng 3]",
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
        api.sendMessage("ID: 1,2,3 (Tối đa 3 id)\nCú pháp: [ID]|[Số dòng]|[Text dòng 1]|[Text dòng 2, 3 nếu có]", event.threadID, event.messageID)
    }
    const content = args.join(" ").split("|").map(item => item = item.trim());
    const id = content[0],
        sodong = content[1];
        dong_1 = content[2];
        dong_2 = content[3];
        dong_3 = content[4];
    let params = {id, sodong, dong_1, dong_2, dong_3};
    params = qs.stringify(params);
    const pathsave = __dirname + `/cache/thuphap.png`;
    let imageBuffer;
    axios.get("https://api-ttk.herokuapp.com/canvas/thuphap?" + params, {
            responseType: "arraybuffer"
        })
        .then(data => {
            const imageBuffer = data.data;
            fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
            api.sendMessage({body: `Banner thư pháp của bạn đây!`, attachment: fs.createReadStream(pathsave)}, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);})
        .catch(error => {
            let err;
            if (error.response) err = JSON.parse(error.response.data.toString());
            else err = error;
            return api.sendMessage(`Đã xảy ra lỗi ${err.error} ${err.message}`, event.threadID, event.messageID);
        })
};
