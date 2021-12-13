module.exports.config = {
	name: "du",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "Random ảnh dú có phí",
	commandCategory: "Random-img",
	usages: "",
	cooldowns: 3
};

module.exports.run = async ({ api, event, Currencies }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	var money = (await Currencies.getData(event.senderID)).money
	if (money >= 1000) {
		axios.get('https://api.leanhtruong.net/v2/image.php?api_key=leanhtruong&image=du').then(res => {
		var callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + '/cache/du.jpg')
					}, event.threadID, () => fs.unlinkSync(__dirname + '/cache/du.jpg'), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + '/cache/du.jpg')).on("close", callback).then(Currencies.setData(event.senderID, options = {money: money - 1000}));
			})
	} else return api.sendMessage("Bạn cần 1000 đô để xem ảnh ?",event.threadID,event.messageID);
}
