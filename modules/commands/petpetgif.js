module.exports.config = {
	name: "petpetgif",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Thiệu Trung Kiên",
	description: "Make gif",
	commandCategory: "Fun",
	cooldowns: 5,
	dependencies: {
		"axios": "",
		"request": "",
		"fs-extra": ""
	}
};
module.exports.run = async ({ api, event, args }) => {
   try{
   	if(this.config.credits != "Thiệu Trung Kiên")
   		return api.sendMessage("Credits ?", event.threadID);
  const axios = require("axios");
  const fs = require("fs-extra");
  const request = require("request");
  const content = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g,  "|").split("|");
  const image = event.messageReply ? ((event.messageReply.attachments.length > 0) ? event.messageReply.attachments[0].url : content[0]) : content[0];
  if(!image){
  	return api.sendMessage("Vui lòng reply 1 hình ảnh hoặc 1 sticker!", event.threadID)
  }
  const params = { image };
        const pathsave = __dirname + `/cache/petpetgif.gif`;
        let imageBuffer;
        axios.get("https://api-ttk.herokuapp.com/other/petpetgif?", {
            params,
            responseType: "arraybuffer"
        })
        .then(data => {
            const imageBuffer = data.data;
            fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
            api.sendMessage({
                attachment: fs.createReadStream(pathsave)
            }, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);
        })
        }catch(err) {
            return api.sendMessage(`Vui lòng reply 1 hình ảnh hoặc 1 sticker!`, event.threadID);
        };
}
