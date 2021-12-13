const fs = require("fs");
module.exports.config = {
name: "bot",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "",
	description: "bot",
	commandCategory: "Không cần dấu lệnh",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
	var { threadID, messageID } = event;
        var tl = ["chào bạn tôi là bot Miku","bạn gọi tôi có việc gì?","Gọi lắm, mệt !!","[ Góc Donate ] có thể donate cho tôi chứ?"];
        var rand = tl[Math.floor(Math.random() * tl.length)];
	if (event.body.indexOf("Bot")==0 || (event.body.indexOf("Minh")==0)) {
		var msg = {
				body: rand
			}
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}