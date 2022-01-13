module.exports.config = {
    name: "tet",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Phan Duy",
    description: "random tiền đúng nghĩa đen",
    commandCategory: "economy",
    usages: "<[10k/20k/50k/100k/200k/500k hoặc[💸/💴/💷/💶/💵/💰]> <Số tiền cược (lưu ý phải trên 50$)>",
    cooldowns: 0
  };
  
  module.exports.run = async function({ api, event, args, Currencies, getText, permssion }) {
    try {
      const { threadID, messageID, senderID } = event;
      const { getData, increaseMoney, decreaseMoney } = Currencies;
      const request = require('request');
      const axios = require('axios');
      if (this.config.credits != 'Phan Duy') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » Đổi credits con cặc đjt mẹ mày luôn đấy con chó:))');
        return api.sendMessage('[ WARN ] Phát hiện người điều hành bot ' + global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"', threadID, messageID);
      }
      const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
      const slotItems = ["10k", "20k", "50k", "100k", "200k", "500k"];
      const money = (await getData(senderID)).money;
      if (isNaN(args[1]) == true) return api.sendMessage('» Bạn phải nhập 1 con số hợp lệ !', threadID, messageID);
      var moneyBet = parseInt(args[1]);
      if (isNaN(moneyBet) || moneyBet <= 50) return api.sendMessage('» Số tiền đặt cược không được dưới 50$', threadID, messageID);
      if (moneyBet > money) return api.sendMessage('» Méo đủ tiền thì cút chổ anh làm ăn', threadID, messageID);
      var number = [], list = [], listimg = [], win = false;
      var tet1 = slotItems[Math.floor(Math.random() * slotItems.length)];
     
      // ARGS
      let content = args[0];
      var content1;
      if (content == '10k' || content == '💸') {
        content1 = '10k';
      }
      else if (content == '20k' || content == '💴') {
        content1 = '20k';
      }
      else if (content == '50k' || content == '💷') {
        content1 == '50k';
      }
      else if (content == '100k' || content == '💶') {
        content1 == '100k';
      }
      else if (content == '200k' || content == '💵') {
        content1 == '200k';
        }
      else if (content == '500k' || content == '💰') {
        content1 == '500k';
      }
      else {
        return api.sendMessage(`» Sai định dạng\n${global.config.PREFIX}${this.config.name} <[10k/20k/50k/100k/200k/500k hoặc[💸/💴/💷/💶/💵/💰]> <Số tiền cược (lưu ý phải trên 50$)>`, threadID, messageID);
      }
      // request
      if (!existsSync(__dirname + '/cache/10k.jpg')) {
        request('https://i.imgur.com/QxJcfsb.jpg').pipe(createWriteStream(__dirname + '/cache/10k.jpg'));
      }
      if (!existsSync(__dirname + '/cache/20k.jpg')) {
        request('https://i.imgur.com/bBHSK95.png').pipe(createWriteStream(__dirname + '/cache/20k.jpg'));
      }
      if (!existsSync(__dirname + '/cache/50k.jpg')) {
        request('https://i.imgur.com/B230cYK.jpg').pipe(createWriteStream(__dirname + '/cache/50k.jpg'));
      }
      if (!existsSync(__dirname + '/cache/100k.jpg')) {
        request('https://i.imgur.com/6EV98ES.jpg').pipe(createWriteStream(__dirname + '/cache/100k.jpg'));
      }
      if (!existsSync(__dirname + '/cache/200k.jpg')) {
        request('https://i.imgur.com/u9tOokk.jpg').pipe(createWriteStream(__dirname + '/cache/200k.jpg'));
      }
      if (!existsSync(__dirname + '/cache/500k.jpg')) {
        request('https://i.imgur.com/6EV98ES.jpg').pipe(createWriteStream(__dirname + '/cache/500k.jpg'));
      }
      if (!existsSync(__dirname + '/cache/soxo.gif')) {
        request('https://i.imgur.com/pYlCipU.gif').pipe(createWriteStream(__dirname + '/cache/soxo.gif'));
	  }
	  
      // tet 1
      if (tet1 == '10k') {
        var tet1 = '10k';
        var tet_1 = __dirname + '/cache/10k.jpg';
      }
      else if (tet1 == '20k') {
        var tet1 = '20k';
        var tet_1 = __dirname + '/cache/20k.jpg';
      }
      else if (tet1 == '50k') {
        var tet1 = '50k';
        var tet_1 = __dirname + '/cache/50k.jpg';
      }
      else if (tet1 = '100k') {
         var tet1 = '100k';
         var tet_1 = __dirname +
'/cache/100k.jpg';
      }
      else if (tet1 = '200k') {
         var tet1 = '200k';
         var tet_1 = __dirname +
'/cache/200k.jpg';
      }
      else if (tet1 = '500k') {
         var tet1 = '500k';
         var tet_1 = __dirname +
'/cache/500k.jpg';
      }
      
   
      // array tet
      list.push(tet1);
      
      // array img
      listimg.push(createReadStream(__dirname + '/cache/' + tet1 + '.jpg'))
      // icon 1
      if (tet1 == '10k') {
        var icon1 = '💸10k';
      }
      else if (tet1 == '20k') {
        var icon1 = '💴20k'
      }
      else if (tet1 == '50k') {
        var icon1 = '💷50k';
      }
      else if (tet1 == '100k') {
        var icon1 = '💶100k';
      }
      else if (tet1 == '200k') {
        var icon1 = '💵200k';
      }
      else if (tet1 == '500k') {
        var icon1 = '💰500k';
      }
      
      // sendMessage
      api.sendMessage({
        body: '» chúc em may mắn ra tiền nhìu :)))',
        attachment: createReadStream(__dirname + '/cache/soxo.gif')
      }, threadID, (err, info) => {
        if (err) return api.sendMessage(err, threadID, messageID);
        setTimeout(() => {
          api.unsendMessage(info.messageID);
          var check = list.findIndex(i => i.toString() == content1);
          var check2 = list.includes(content1);
          //console.log(check);
          //console.log(icon1 + icon2 + icon3);
          if (check >= 0 || check2 == true) {
            return api.sendMessage({
              body: `» 𝙆𝙚̂́𝙩 𝙦𝙪𝙖̉: 〘 ${icon1} 〙\n» 𝘽𝙖̣𝙣 𝙫𝙪̛̀𝙖 𝙩𝙝𝙖̆́𝙣𝙜 𝙫𝙖̀ 𝙣𝙝𝙖̣̂𝙣 ${moneyBet * 2}$`,
              attachment: listimg
            }, threadID, () => Currencies.increaseMoney(senderID, moneyBet * 3), messageID);
          }
          else if (check < 0 || check2 == false) {
            return api.sendMessage({
              body: `» 𝙆𝙚̂́𝙩 𝙦𝙪𝙖̉ : 〘 ${icon1} 〙\n» 𝘽𝙖̣𝙣 𝙫𝙪̛̀𝙖 𝙩𝙝𝙪𝙖 𝙫𝙖̀ 𝙗𝙞̣ 𝙩𝙧𝙪̛̀ ${moneyBet}$`,
              attachment: listimg
            }, threadID, () => Currencies.decreaseMoney(senderID, moneyBet), messageID);
          }
          else {
            return api.sendMessage('» 𝘾𝙤́ 𝙡𝙤̂̃𝙞 𝙭𝙖̉𝙮 𝙧𝙖. 𝙑𝙪𝙞 𝙡𝙤̀𝙣𝙜 𝙩𝙝𝙪̛̉ 𝙡𝙖̣𝙞 𝙨𝙖𝙪 5𝙨', threadID, messageID);
          }
        }, 3000);
      }, messageID);
    }
    catch (err) {
      console.error(err);
      return api.sendMessage(err, event.threadID, event.messageID);
    }
  }
