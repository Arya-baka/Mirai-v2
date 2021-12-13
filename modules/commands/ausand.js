module.exports.config = {
  name: "ausand", // tên lệnh
  version: "1.0.0", // phiên bản
  hasPermssion: 0, // quyền hạn
  credits: "", // tác giả
  description: "Random ảnh ausand", // mô tả lệnh
  commandCategory: "Random-img", // phân loại lệnh
  usages: "", // cách sử dụng
  cooldowns: 5 // thời gian chờ sau khi dùng lệnh
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://beginning-frames.000webhostapp.com/apiv1/ausand.php').then(res => { //nhét api ảnh vào đây
  let callback = function () {
          api.sendMessage({
            body: ``, //tin nhắn đi kèm với ảnh
            attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.png`), event.messageID);
        };
        request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/${event.senderID}.png`)).on("close", callback);
      })
}