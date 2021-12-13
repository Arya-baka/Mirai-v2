module.exports.config = {
    name: "uselesswebsite",
    version: "1.0.0",
    hasPermision: 0,
    credit: "",
    description: "Random useless websites",
    commandCategory: "info",
    usages: "",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args, Currencies, utils,Users,Threads }) {
	let axios = require('axios')
	let { threadID, senderID, messageID } = event;
	const res = await axios.get("https://le31.glitch.me/theuselessweb");
	console.log(res.data);
	var abc = res.data;
	var data = abc.data
	return api.sendMessage(`Useless web: ${abc.data}`, threadID, messageID)
}