module.exports.config = {
  name: "floppa",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Quang Minh",
  description: "Random ảnh Big Floppa",
  commandCategory: "Random-img",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  axios.get('https://api-server.mikubaka2608.repl.co/index.php').then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let amount = res.data.amount;
  let callback = function () {
          api.sendMessage({
            body: `Ảnh Big Floppa nè <3\n⚡️Số ảnh hiện có: ${amount} ảnh`,
            attachment: fs.createReadStream(__dirname + `/cache/images.${ext}`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/images.${ext}`), event.messageID);
        };
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/images.${ext}`)).on("close", callback);
      })
}