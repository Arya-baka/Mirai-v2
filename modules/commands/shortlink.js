module.exports.config = {
    name: "shortlink",
    version: "1.0.0",
    hasPermision: 0,
    credit: "Api LawerBot",
    description: "rut gon url",
    commandCategory: "info",
    usages: "[url]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args, utils, Users,Threads }) {
        try {
           let axios = require('axios');
           let { threadID, senderID, messageID } = event;
           if (!args[0]) {api.sendMessage("Vui lòng nhập url cần rút gọn",threadID,messageID)}
           else {
           const res = await axios.get(encodeURI(`http://lawerpr0ject.herokuapp.com/other/tinyurl?url=${args[0]}`));
           console.log(res.data);
           let data = res.data;
           return api.sendMessage(`Shorturl: ${res.data.result.link}`, event.threadID, event.messageID);
           } 
       }
        catch {
           return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
           }
}