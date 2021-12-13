module.exports.config = {
	name: "rankup",
	version: "0.0.2",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "Thông báo rankup cho từng nhóm, người dùng",
	commandCategory: "system",
	dependencies: {
		"fs-extra": ""
	},
	cooldowns: 20,
	envConfig: {
		autoUnsend: true,
		unsendMessageAfter: 5
	}
};

module.exports.handleEvent = async function({ api, event, Currencies, Users }) {
	const {threadID, senderID } = event;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];

	const thread = global.data.threadData.get(parseInt(threadID)) || {};

	var exp = parseInt((await Currencies.getData(senderID)).exp);
	exp = exp += 1;

	if (isNaN(exp)) return;

	if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
		await Currencies.setData(senderID, { exp });
		return;
	};

	const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
	const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

	if (level > curLevel && level != 1) {
		const name = (await api.getUserInfo(event.senderID))[event.senderID].name
		var messsage = (typeof thread.customRankup == "undefined") ? msg = "Chúc mừng {name} đã đạt tới level {level} 🤩🥳" : msg = thread.customRankup,
			arrayContent;

		messsage = messsage
			.replace(/\{name}/g, name)
			.replace(/\{level}/g, level);
			
		if (existsSync(__dirname + "/cache/rankup/")) mkdirSync(__dirname + "/cache/rankup/", { recursive: true });
		if (existsSync(__dirname + `/cache/rankup/rankup.gif`)) arrayContent = { body: messsage, attachment: createReadStream(__dirname + `/cache/rankup/rankup.gif`), mentions: [{ tag: name, id: senderID }] };
		else arrayContent = { body: messsage, mentions: [{ tag: name, id: senderID }] };
		const moduleName = this.config.name;
		api.sendMessage(arrayContent, threadID, async function (error, info){
			if (global.configModule[moduleName].autoUnsend) {
				console.log(global.configModule[moduleName].autoUnsend);
				await new Promise(resolve => setTimeout(resolve, global.configModule[moduleName].unsendMessageAfter * 60000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	await Currencies.setData(senderID, { exp });
	return;
}
module.exports.run = async function({ api, event, Threads }) {
	const { threadID, messageID } = event;

	var data = (await Threads.getData(threadID)).data;
	
	if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
	else data["rankup"] = false;
	
	await Threads.setData(parseInt(threadID), { data });
	global.data.threadData.set(parseInt(threadID), data);
	
	return api.sendMessage(`Đã ${(data["rankup"] == true) ? "bật" : "tắt"} thành công thông báo rankup!`, threadID, messageID);
}