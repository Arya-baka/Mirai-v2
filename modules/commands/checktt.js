module.exports.config = {
    name: "checktt",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Check tương tác các thành viên trong 1 nhóm",
    commandCategory: "Nhóm",
    usages: "[tag/reply/all]",
    cooldowns: 5
};
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const pathA = require('path');
    const path = pathA.join(__dirname, 'cache', 'checktt.json');
    if (!existsSync(path)) {
        const obj = []
        writeFileSync(path, JSON.stringify(obj, null, 4));
    }
}
module.exports.handleEvent = async({ event, Users }) => {
    console.log(event.type)
    const { threadID, senderID, body } = event;
    const fs = require("fs");
    const pathA = require('path');
    const thread = require('./cache/checktt.json');
    const path = pathA.join(__dirname, 'cache', 'checktt.json');
    if(event.isGroup == false) return;
    if (thread.some(i => i.threadID == threadID) == false) {
        const data = [];
        for (let user of event.participantIDs) {
            var name = (await Users.getData(user)).name;
            var id = user;
            var exp = 0;
            if(name !== undefined && name != 'Người dùng Facebook') {
                data.push({ name, id , exp })
            }
        }
        thread.push({ threadID, data: data });
        fs.writeFileSync(path, JSON.stringify(thread, null, 2));
    }
    else {
        var threadData = thread.find(i => i.threadID == threadID && i.threadID !== undefined)
        if (threadData.data.some(i => i.id == senderID) == false) {
            var name = (await Users.getData(senderID)).name;
            var id = senderID;
            var exp = 0;
            threadData.data.push({ name, id, exp });
            fs.writeFileSync(path, JSON.stringify(thread, null, 2));
        }
        else {
            var userData = threadData.data.find(i => i.id == senderID);
            userData.exp = userData.exp + 1;
            fs.writeFileSync(path, JSON.stringify(thread, null, 2));
        }
    }
}
module.exports.run = async function ({ args, api, event }) {
    const { threadID, senderID, messageID, type, mentions } = event;
    var mention = Object.keys(mentions);
    const thread = require('./cache/checktt.json');
    const data = thread.find(i => i.threadID == threadID)
    if (args[0] == "all") {
        var msg = "", exp = [], i = 1, count = 0
        for(const user of data.data) {
            exp.push({ name: user.name, exp: user.exp, id: user.id });
        }
        exp.sort(function (a, b) { return b.exp - a.exp });
        for (const user of exp) { 
            count += user.exp
            msg += `[${i++}]: ${user.name} với ${user.exp} tin nhắn.\n`
        }
        return api.sendMessage(`[====KIỂM TRA TƯƠNG TÁC===]\n\n` + msg + `\nTổng số tin nhắn của nhóm là ${count}`, threadID, messageID);
    }
    else 
        if(type == "message_reply") { mention[0] = event.messageReply.senderID }
        if (mention[0]) {
            var exp = [], count = 0
            for(const user of data.data) {
                count += user.exp
                exp.push({ name: user.name, exp: user.exp, id: user.id });
            }
            exp.sort(function (a, b) { return b.exp - a.exp });
            const rank = exp.findIndex(i => i.id == mention[0])
            return api.sendMessage(`👤Tên: ${exp[rank].name}\n🏆Rank: ${rank + 1}\n💬Tin nhắn: ${exp[rank].exp}\n💹Tỉ lệ tương tác: ${(exp[rank].exp/count*100).toFixed(0)}%`, threadID, messageID);
        }
    else {
        var exp = [], count = 0
        for(const user of data.data) {
            count += user.exp
            exp.push({ name: user.name, exp: user.exp, id: user.id });
        }
        exp.sort(function (a, b) { return b.exp - a.exp });
        const rank = exp.findIndex(i => i.id == senderID);
        return api.sendMessage(`👤Tên: ${exp[rank].name}\n🏆Rank: ${rank + 1}\n💬Tin nhắn: ${exp[rank].exp}\n💹Tỉ lệ tương tác: ${(exp[rank].exp/count*100).toFixed(0)}%`, threadID, messageID);
    }
}
