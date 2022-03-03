module.exports.config = {
	name: "nam",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Hỏrỉzỏn, Mirai, HTHB",
	description: "rs,off...",
	commandCategory: "System",
  usages: "[time/reset/off/on]",
	cooldowns: 0
};
module.exports.run = async ({event, api, args, Users, Threads }) => {
  //const permission = ["012398888968796"]
    //if (!permission.includes(event.senderID)) return api.sendMessage("hmm...! Bạn không phải chủ tôi 😠", event.threadID, event.messageID);
          const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
        const p = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const n1 = this.config.name
    let n2 = await Users.getNameUser(event.senderID)
  if (args.length == 0) return api.sendMessage(`Bạn có thể dùng:\n\n${p}${n1} time => sẽ bật BOT lại theo thời gian bạn nhập\n${p}${n1} reset => khởi động lại BOT\n${p}${n1} off => tắt BOT\n${p}${n1} on => bật BOT`, event.threadID, event.messageID);
 if (args[0] == "time") {
    if (!args[1]) return api.sendMessage("Vui Lòng Nhập Thời Gian Bật Bot Trở Lại !",event.threadID,event.messageID);
      if (isNaN(args[1])) return api.sendMessage("Thời Gian Phải Là 1 Con Số !",event.threadID)
      var ec = 2
      var xx =  ec + args[1];
      api.sendMessage("Sẽ Bật Bot Trở Lại Sau: " + args[1] + " Giây Nữa !" ,event.threadID,async () => process.exit(xx));
  }
  if (args[0] == "reset") {
     api.sendMessage(`${n2} đã yêu cầu khởi động lại BOT, quá trình này mất bao lâu tùy thuộc vào số lượng mdl của bạn`,event.threadID, () =>process.exit(1))
  }
  if (args[0] == "off") {
    api.sendMessage(`Bot ngủ đây^^ bye cậu chủ!!`,event.threadID, () =>process.exit(0))
  }
  if (args[0] == "on") {
    api.sendMessage(`Hí! Chào cậu ${n2}`,event.threadID, () =>process.enter(1))
  }
}
