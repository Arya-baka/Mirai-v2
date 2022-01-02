module.exports.config = {
    name: "scp",
    version: "1.0.0",
    hasPermision: 0,
    credit: "le31.glitch.me",
    description: "tra cứu thông tin về scp",
    commandCategory: "info",
    usages: "[number]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args, utils, Users,Threads }) {
        try {
           let axios = require('axios');
           let { threadID, senderID, messageID } = event;
           if (!args[0]) {api.sendMessage("Vui lòng nhập số thứ tự của scp cần lấy thông tin",threadID,messageID)}
           else {
           const res = await axios.get(encodeURI(`https://le31.glitch.me/other/scp?q=${args[0]}`));
           console.log(res.data);
           let data = res.data;
           return api.sendMessage(`Info: ${data.data}`, event.threadID, event.messageID);
           } 
       }
        catch {
           return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
           }
}
