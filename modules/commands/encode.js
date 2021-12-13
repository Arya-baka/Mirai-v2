module.exports.config = {
    name: "encode",
    version: "1.0.0",
    hasPermision: 0,
    credit: "Lawer Team",
    description: "như tên module",
    commandCategory: "info",
    usages: "[text]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args, utils, Users,Threads }) {
        try {
           let axios = require('axios');
           let { threadID, senderID, messageID } = event;
           if (!args[0]) {api.sendMessage("Vui lòng nhập đoạn văn bản cần mã hóa",threadID,messageID)}
           else {
           const res = await axios.get(encodeURI(`http://lawerpr0ject.herokuapp.com/other/encode?text=${args[0]}`));
           console.log(res.data);
           let data = res.data;
           return api.sendMessage(`Encode: ${data.message}`, event.threadID, event.messageID);
           } 
       }
        catch {
           return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
           }
}