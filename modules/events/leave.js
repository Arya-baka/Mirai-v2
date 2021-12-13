﻿module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "SpermLord",
	description: "Listen events"
};

module.exports.run = async function({ api, event, Users, Threads, client }) {
	let msg, formPush
	const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	let settings = client.threadSetting.get(event.threadID) || {};
	let name = (await Users.getData(event.logMessageData.leftParticipantFbId)).name || (await api.getUserInfo(event.logMessageData.leftParticipantFbId))[event.logMessageData.leftParticipantFbId].name
	let type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝙩𝙪̛̣ 𝙘𝙪́𝙩" : "𝙗𝙞̣ 𝙦𝙪𝙖̉𝙣 𝙩𝙧𝙞̣ 𝙫𝙞𝙚̂𝙣 đ𝙪𝙤̂̉𝙞";
	(typeof settings.customLeave == "undefined") ? msg = "Con vợ {name} chán đời nên đã rời khỏi group {type} vĩnh biệt em yêu ❤" : msg = settings.customLeave;
	msg = msg
	.replace(/\{name}/g, name)
	.replace(/\{type}/g, type);
	let dirGif = __dirname + `/cache/leaveGif/`;
	if (existsSync(dirGif)) mkdirSync(dirGif, { recursive: true })
	if (existsSync(dirGif + `bye.gif`)) formPush = { body: msg, attachment: createReadStream(dirGif + `bye.gif`) }
	else formPush = { body: msg }
	return api.sendMessage(formPush, event.threadID);
}