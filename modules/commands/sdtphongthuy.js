module.exports.config = {
    name: "sdtphongthuy",
    version: "1.0.0",
    hasPermision: 0,
    credit: "le31.glitch.me",
    description: "",
    commandCategory: "info",
    usages: "[phone number]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args, utils, Users,Threads }) {
        try {
           let axios = require('axios');
           let { threadID, senderID, messageID } = event;
           if (!args[0]) {api.sendMessage("Vui lòng nhập số điện thoại cần tra cứu",threadID,messageID)}
           else {
           const res = await axios.get(encodeURI(`https://le31.glitch.me/other/sdtphongthuy?number=${args[0]}`));
           console.log(res.data);
           let data = res.data;
           return api.sendMessage(`Bốn số cuối: ${data.bonsoduoi}\nSố lý: ${data.soly}\nÝ nghĩa: ${data.ynghia}\nKết luận: ${data.ketluan}`, event.threadID, event.messageID);
           } 
       }
        catch {
           return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
           }
}
