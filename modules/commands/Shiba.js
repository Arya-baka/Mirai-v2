module.exports.config = {
  name: "Shiba",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Random ảnh Shiba",
  commandCategory: "Random-img",
  usages: "Shiba",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://www.trungkien.tk/apiv1/shiba.php').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `⚡Ảnh Shiba nè <3\n⚡️Số ảnh hiện có: ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/images.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/images.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/images.${ext}`)).on("close", callback);
      })
}