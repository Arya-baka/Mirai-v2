module.exports.config = {
  name: "girl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Random ảnh gái",
  commandCategory: "Random-img",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://api.leanhtruong.net/v2/image.php?api_key=leanhtruong&image=vitamin').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `Ảnh gái nè <3\nSố ảnh hiện có: ${count} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/images.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/images.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/images.${ext}`)).on("close", callback);
      })
}