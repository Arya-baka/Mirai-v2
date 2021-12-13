module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát video thông qua link soundcloudsoundcloud hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "[searchVideos]",
    cooldowns: 10
};

module.exports.handleReply = async function ({
    api,
    event,
    handleReply
}) {
    const axios = global.nodemodule['axios'];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];

    const {
        createReadStream,
        createWriteStream,
        unlinkSync,
        statSync
    } = global.nodemodule["fs-extra"];
    try {
        const result = await axios.get(`https://api.leanhtruong.net/v2/soundcloud.php?download=true&link=${handleReply.link[event.body - 1]}`);
        path1 = __dirname + `/cache/${event.senderID}.m4a`
        const getms = (await axios.get(`${result.data.url}`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
        api.unsendMessage(handleReply.messageID)
        if (fs.statSync(__dirname + `/cache/${event.senderID}.m4a`).size > 26000000) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID);
        else return api.sendMessage({
            body: `${handleReply.title[event.body - 1]}`,
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
    const axios = global.nodemodule['axios'];
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const {
        createReadStream,
        createWriteStream,
        unlinkSync,
        statSync
    } = global.nodemodule["fs-extra"];
    if (args.length == 0 || !args) return api.sendMessage('» Phần tìm kiếm không được để trống!', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    if (args.join(" ").indexOf("https://") == 0) {
        const res = await axios.get(`https://api.leanhtruong.net/v2/soundcloud.php?download=true&link=${args.join(" ")}`)
        const data = res.data.url
        path1 = __dirname + `/cache/${event.senderID}.m4a`
        const getms = (await axios.get(`${data}`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(path1, Buffer.from(getms, "utf-8"));
        if (fs.statSync(__dirname + `/cache/${event.senderID}.m4a`).size > 26000000) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB.', event.threadID, () => unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID);
        else return api.sendMessage({
            body: ``,
            attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.m4a`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.m4a`), event.messageID)
    } else {

            const ress = (await axios.get(`https://api.leanhtruong.net/v2/soundcloud.php?keyword=true&search=${encodeURIComponent(keywordSearch)}`))
            var dataMusic = ress.data, msg = '', num = 0, link = [], title = [];
            for (var i = 0; i < 6; i++) {
                const dataaa = dataMusic.search_result[i]
                msg += `${num += 1}. ${dataaa.info_music.title}\n\n`;              
                title.push(dataaa.info_music.title);
                link.push(dataaa.download.url);
            }
            var body = `»🔎 Có ${link.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n\n${msg}» Hãy reply(phản hồi) chọn một trong những tìm kiếm trên`
            return api.sendMessage({
                    body: body
                }, event.threadID, (error, info) => global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    link,
                    title
                }),
                event.messageID);
    }
}