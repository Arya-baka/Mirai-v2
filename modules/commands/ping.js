module.exports.config = {
	name: "ping",
	version: "0.0.3",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "tag toàn bộ thành viên",
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Threads }) {
	try {
		var listUserID = (await Threads.getInfo(event.threadID)).participantIDs;
		const botID = api.getCurrentUserID();
		listUserID = listUserID.filter(ID => ID != botID && ID != event.senderID);
		var body = (args.length != 0) ? args.join(" ") : "@Everyone ", mentions = [], index = 0;
		
	for (idUser of listUserID) {
		if (index == body.length) body += "  ";
		mentions.push({
			tag: body[index],
			id: idUser,
			fromIndex: -1
		})
		index += 1;
			}

		return api.sendMessage({ body, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}
