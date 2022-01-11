module.exports.config = {
    name: "tiktok",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "MạnhG",
    description: "Phát nhạc thông qua link Tiktok hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[searchVideos]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "path": "",
        "fs-extra": ""
    }
};
var API_KEY = "mzkFree_A7369BCC0BA5C"; //Nhập API_Key của bạn ở đây
var timeVD = "7"; // Nhập thời lượng video (là 1 con sô)
var rdus = Math.floor(Math.random() * 99999999999999);
module.exports.run = async function({ event, api, args }) {
    const { threadID, messageID } = event;
    const { createReadStream, existsSync, writeFileSync, readdirSync, unlinkSync } = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    try {
        if (args.length == 0 || !args) return api.sendMessage('» Nhập ký tự cần tìm kiếm!', threadID, messageID);
        if (args.join(" ").indexOf("https://") == 0) {
            const linkurl = args.join(" ").trim();
            try {
                api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));
                let { data } = await axios.get(`http://mzkapi.me/tiktok?link=${linkurl}&apikey=${API_KEY}`);
                if (data.msg != 200) return api.sendMessage('Có lỗi xảy ra vui lòng thử lại sau!', threadID, messageID);
                let desc = data.data.title;
                let link = data.data.video_no_watermark;
                var path = __dirname + `/cache/${rdus}.mp4`;
                const getms = await axios.get(link, { responseType: "arraybuffer" });
                writeFileSync(path, Buffer.from(getms.data, "utf-8"))
                api.sendMessage({ body: desc, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
                return;
            } catch (e) {
                console.log(e);
                return api.sendMessage('Có lỗi xảy ra!', threadID, messageID);
            }
        } else {
            try {
                var results,
                    link = [],
                    title = [],
                    msg = "",
                    num = 0,
                    time;
                const keywordSearch = encodeURIComponent(args.join(" "));
                results = (await axios.get(`http://mzkapi.me/tiktok/search?query=${keywordSearch}&time=${timeVD}&apikey=${API_KEY}`)).data.results;
                for (let key of results) {
                    link.push(key.video);
                    title.push(key.desc);
                    var ms = `${key.time}`,
                        min = Math.floor((ms / 1000 / 60) < 0),
                        sec = Math.floor((ms / 1000) % 60);
                    time = min + ':' + sec;
                    num = num += 1
                    if (num == 1) var num1 = "⓵"
                    if (num == 2) var num1 = "⓶"
                    if (num == 3) var num1 = "⓷"
                    if (num == 4) var num1 = "⓸"
                    if (num == 5) var num1 = "⓹"
                    if (num == 6) var num1 = "⓺"
                    msg += (`${num1}.《${time}》${key.desc}\n\n`);
                }
                var body = `»🔎 There are ${link.length} results matching your search keyword:\n\n${msg}» Please reply (feedback) choose one of the above searches.`;
                return api.sendMessage({
                        body: body
                    }, threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            tikTitle: title,
                            tikLink: link
                        })
                    },
                    messageID);
            } catch (error) {
                return api.sendMessage("Có lỗi xảy ra: Sai Api key hoặc Api key hết lượt request", threadID, messageID);
            }
        }
    } catch (ex) {
        console.log(ex);
        return;
    }
}
module.exports.handleReply = async function({ event, api, handleReply }) {
    const axios = global.nodemodule["axios"];
    const { createReadStream, statSync, existsSync, writeFileSync, readdirSync, unlinkSync } = global.nodemodule["fs-extra"];
    const { threadID, body, messageID } = event;

    function number(x) {
        if (isNaN(x)) {
            return 'Not a Number!';
        }
        return (x < 1 || x > 6);
    }
    if (number(body)) return api.sendMessage('Chọn từ 1 -> 6, baby. love uwu ❤️', threadID, messageID);
    api.unsendMessage(handleReply.messageID);
    api.sendMessage(`Đang tải, vui lòng đợi...`, threadID, (err, info) => setTimeout(() => { api.unsendMessage(info.messageID) }, 20000));
    try {
        const title = handleReply.tikTitle[body - 1];
        const link = handleReply.tikLink[body - 1];
        var path = __dirname + `/cache/${rdus}.mp4`;
        const getms = await axios.get(link, { responseType: "arraybuffer" });
        writeFileSync(path, Buffer.from(getms.data, "utf-8"))
        const msg = await api.sendMessage({ body: title, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID);
        return msg;
    } catch (e) {
        console.log(e);
        return api.sendMessage('Có lỗi xảy ra!', threadID, messageID);
    }
}
