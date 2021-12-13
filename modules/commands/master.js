module.exports.config = {
	name: "master",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "HungCatMoi",
	description: "Lien he vs Admin bot",
	commandCategory: "Info", 
	usages: "master [key]", 
	cooldowns: 0,
	dependencies: [] 
};

module.exports.run = async ({ api, event, args, client, utils }) => {
	if (args.join() == "") {api.sendMessage("Bot hiện đang có  1 Admin Bot Sử dụng 2 acc khác nhau",event.threadID, event.messageID);
	}
	if (args[0] == "1") {
		return api.sendMessage("Admin: Minh Edgy Lord\nFb : Https://www.facebook.com/100071328127928", event.threadID, event.messageID);
	}
	else if (args[0] == "2") {
		return api.sendMessage("Admin: Nguyễn Quang Minh\nFb : Https://www.facebook.com/ZipSoSweet", event.threadID, event.messageID);
	}
}