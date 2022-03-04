module.exports.config = {
    name: "bienso",
    version: "1.0.0",
    hasPermision: 0,
    credit: "",
    description: "bien so xe",
    commandCategory: "info",
    usages: "",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args, utils, Users,Threads }) {
        try {
           let axios = require('axios');
           let { threadID, senderID, messageID } = event;
           if (!args[0]) {api.sendMessage("Vui lòng nhập biển số xe",threadID,messageID)}
           else {
           const res = await axios.get(encodeURI(`https://le31.glitch.me/other/bienso?q=${args[0]}`));
           console.log(res.data);
           let data = res.data;
           return api.sendMessage(`${data.data}`, event.threadID, event.messageID);
           } 
       }
        catch {
           return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
           }
}
