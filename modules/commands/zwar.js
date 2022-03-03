module.exports.config = {
  name: "zwar",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "ARAXY",
  description: "ARA ARA",
  commandCategory: "Game",
  usages: "",
  cooldowns: 0,
  envConfig: {
    cooldownTime: 1200000
  }
};
module.exports.onLoad = async function () {
	  console.log("ARAXY");
    return;
}
module.exports.run = async function({ api, args, event, Users, permssion, Currencies }) {
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
  const { threadID, messageID, senderID } = event;
  const cooldown = global.configModule[this.config.name].cooldownTime;
  let data = (await Currencies.getData(senderID)).data || {};
  var lmao = (await Users.getData(senderID)).name
  if (typeof data !== "undefined" && cooldown - (Date.now() - data.zwarTime) > 0) {
    var time = cooldown - (Date.now() - data.zwarTime),
      minutes = Math.floor(time / 60000),
      seconds = ((time % 60000) / 1000).toFixed(0);

    return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
  }
  if(!args[0]){
    const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/chientruong?senderID=${senderID}`)
    if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
      await Currencies.increaseMoney(senderID, parseInt(res.data.money));
              var callback = () => api.sendMessage({ body: `${res.data.msg}`, attachment: fs.createReadStream(__dirname + "/cache/zoome.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/zoome.png"), event.messageID);
              return request(encodeURI(`${res.data.link}`)).pipe(fs.createWriteStream(__dirname + '/cache/zoome.png')).on('close', () => callback());
    }
  }
  else if(args[0] == "reg" || args[0] == "dangky"){
    const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/dangky?uid=${senderID}&name=${encodeURI(lmao)}`)
    if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    }
  }
  else if(args[0] == "buy" || args[0] == "mua" || args[0] == "shop"){
    const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/`)
    if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
 return api.sendMessage(`${res.data.msg}[ Reply ]`, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
          })
        })
    }
  }
}

module.exports.handleReply = async function({
  args, event, Users, api, handleReply, Currencies
}) {
  const { threadID, messageID, senderID } = event;
  const axios = require("axios")
  const fs = require('fs-extra');
  const request = require('request')
  const dataMoney = await Currencies.getData(senderID);
  const moneyUser = dataMoney.money;
  const lmao = (await Users.getData(senderID)).name
  var { author } = handleReply;
  if (event.senderID != author) return api.sendMessage("[ ARAXY ] - CÚT", event.threadID, event.messageID);
  switch (handleReply.type) {
    case "choosee": {
      switch (event.body) {
        case '1': {
        const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/listitem?type=item`)
             if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
 return api.sendMessage(`${res.data.msg}[ Reply ]`, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "vukhi",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
          })
        })
             }
          break;
        }
          case"2":{
             const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/listitem?type=xe`)
             if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
 return api.sendMessage(`${res.data.msg}[ Reply ]`, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "xe",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
          })
        })
             }
          break;
          }
          case"3":{
             const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/`)
             if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
 return api.sendMessage(`${res.data.araxy}[ Reply ]`, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "khuvuc",
            name: this.config.name,
            author: senderID,
            messageID: info.messageID
          })
        })
             }
          break;
          }
      }
    }
      case "vukhi":{
        switch (event.body) {
        case event.body: {
          if( event.body == "1" || event.body == "2"){
            var money = "100"
          } else if ( event.body == "3"){
            var money = "1000"
          } else if(event.body == "4"){
            var money = "1500"
          } else if ( event.body == "5"){
            var money = "2000"
          } else if ( event.body == "6"){
            var money = "3999"
          } else if ( event.body == "7"){
            var money = "3500"
          }
const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/buy?senderID=${senderID}&choose=${event.body}`)
      if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
          if (moneyUser < money) {
              return api.sendMessage(`[ ARAXY ] - Nghèo Thì Cúc`, threadID, messageID)} else {
     await Currencies.decreaseMoney(senderID, parseInt(money));   
     var callback = () => api.sendMessage({ body: `${res.data.msg}`, attachment: fs.createReadStream(__dirname + "/cache/zoome.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/zoome.png"), event.messageID);
              return request(encodeURI(`${res.data.link}`)).pipe(fs.createWriteStream(__dirname + '/cache/zoome.png')).on('close', () => callback());
    }    
      }    
        }
        }
        }

case "xe":{
   switch (event.body) {
        case event.body: {
          if( event.body == "1" || event.body == "2"){
            var money = "100"
          } else if ( event.body == "3"){
            var money = "1000"
          } else if(event.body == "4"){
            var money = "1500"
          } else if ( event.body == "5"){
            var money = "2000"
          } else if ( event.body == "6"){
            var money = "3999"
          }
const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/xe?senderID=${senderID}&choose=${event.body}`)
      if( `${res.data.data}` == "false"){
      return api.sendMessage(`${res.data.msg}`,threadID, messageID)
    } else {
        if (moneyUser < money) {
              return api.sendMessage(`[ ARAXY ] - Nghèo Thì Cúc`, threadID, messageID)} else
     await Currencies.decreaseMoney(senderID, parseInt(money));   
     var callback = () => api.sendMessage({ body: `${res.data.msg}`, attachment: fs.createReadStream(__dirname + "/cache/xe.png") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/xe.png"), event.messageID);
              return request(encodeURI(`${res.data.link}`)).pipe(fs.createWriteStream(__dirname + '/cache/xe.png')).on('close', () => callback());
    }  
      }
        }
    break;
}
      case "khuvuc":{
   switch (event.body) {
        case event.body: {
          const res = await axios.get(`https://zwar.araxy-ox-qwqbqiws.repl.co/doikhu?senderID=${senderID}&choose=${event.body}`)
          if( `${res.data.data}` == false){
            return api.sendMessage(`${res.data.msg}`, threadID, messageID)
          } else {
             return api.sendMessage(`${res.data.msg}`, threadID, messageID)
          }
        }
   }
      }
  }
}
