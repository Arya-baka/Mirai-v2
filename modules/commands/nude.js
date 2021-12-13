module.exports.config = {
  name: "nude",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Random ảnh nude",
  commandCategory: "Random-img",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://beginning-frames.000webhostapp.com/apiv1/nude.php').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let callback = function () {
          api.sendMessage({
            body: `Ảnh nude nè <3`,
            attachment: fs.createReadStream(__dirname + `/cache/images.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/images.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/images.${ext}`)).on("close", callback);
      })
}