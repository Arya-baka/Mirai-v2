module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[search/url youtube]",
    cooldowns: 10,
    envConfig: {
        "YOUTUBE_API": "AIzaSyD_a6NcvKyKGhJaCXGWy0HDmA_GdjH-vZg"
    }
};

module.exports.handleReply = async function ({
    api,
    event,
    handleReply
}) {
    const axios = require('axios')
    const fs = require("fs-extra");
    const request = require("request");
    const {
        createReadStream,
        createWriteStream,
        unlinkSync,
        statSync
    } = global.nodemodule["fs-extra"];
    try {
        const result = await axios.get(`https://www.phamvandienofficial.xyz/sing?link=https://www.youtube.com/watch?v=${handleReply.link[event.body - 1]}`);
        path1 = __dirname + `/cache/${event.senderID}.m4a`
        const getms = (await axios.get(`${result.data.link}`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
        api.unsendMessage(handleReply.messageID)
        if (fs.statSync(__dirname + `/cache/${event.senderID}.m4a`).size > 26000000) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID);
        else return api.sendMessage({
            body: `${result.data.title}`,
            attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.m4a`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID)
    } catch {
        return api.sendMessage('Không thể xử lý yêu cầu của bạn!', event.threadID, event.messageID);
    }
    return api.unsendMessage(handleReply.messageID);
}
module.exports.run = async function ({
    api,
    event,
    args
}) {
    const axios = require('axios')
    const fs = require("fs-extra");
    const request = require("request");
    const ytdl = global.nodemodule["ytdl-core"];
    const YouTubeAPI = global.nodemodule["simple-youtube-api"];
    const {
        createReadStream,
        createWriteStream,
        unlinkSync,
        statSync
    } = global.nodemodule["fs-extra"];
    const youtube = new YouTubeAPI(global.configModule[this.config.name].YOUTUBE_API);
    const keyapi = global.configModule[this.config.name].YOUTUBE_API
    if (args.length == 0 || !args) return api.sendMessage('» Phần tìm kiếm không được để trống!', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    if (args.join(" ").indexOf("https://") == 0) {
        var url = args.join(" ")
        var urlsplit = url.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
        const linkUrlSing = urlsplit[3]
        const result = await axios.get(`https://www.phamvandienofficial.xyz/sing?link=https://www.youtube.com/watch?v=${linkUrlSing}`);
        path1 = __dirname + `/cache/${event.senderID}.m4a`
        const getms = (await axios.get(`${result.data.link}`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
        if (fs.statSync(__dirname + `/cache/${event.senderID}.m4a`).size > 26000000) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID);
        else return api.sendMessage({
            body: `» ${result.data.title}`,
            attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.m4a`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID)
    } else {
        try {
            var link = [],
                msg = "",
                num = 0,
                numb = 0;
            var imgthumnail = [];
            var results = await youtube.searchVideos(keywordSearch, 6);
            for (let value of results) {
                if (typeof value.id == 'undefined') return;
                link.push(value.id);
                var idd = value.id;
                let datab = (await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${value.id}&key=${keyapi}`)).data;
                let gettime = datab.items[0].contentDetails.duration;
                let timeee = (gettime.slice(2));
                let timee = timeee.replace('S', '')
                let time = timee.replace('M', ':')
                num = num+=1
                if (num == 1) var num1 = "⓵"
                if (num == 2) var num1 = "⓶"
                if (num == 3) var num1 = "⓷"
                if (num == 4) var num1 = "⓸"
                if (num == 5) var num1 = "⓹"
                if (num == 6) var num1 = "⓺"
                msg += (`${num1} 《${time}》 ${value.title}\n\n`);
            }
            var body = `»🔎 Có ${link.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n\n${msg}» Hãy reply(phản hồi) chọn một trong những tìm kiếm trên`

            return api.sendMessage({
                    body: body
                }, event.threadID, (error, info) => global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    link
                }),
                event.messageID);
        } catch {
            return api.sendMessage('Đã xảy ra lỗi!!', event.threadID, event.messageID)
        }
    }
}
