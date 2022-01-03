module.exports.config = {
    name: "taoanhdep",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nguyen Minh - Thieu Trung Kien",
    description: "",
    commandCategory: "Banner",
    usages: "[id]|[chunen]|[chuky]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async function({
    api,
    event,
    args
}) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const qs = require("querystring");
    if (args[0] == "list") {
        const a = await axios.get("https://api-ttk.herokuapp.com/taoanhdep/list");
        var b = a.data.length;
        var x = a.data;
        var page = 1;
        page = parseInt(args[1]) || 1;
        page < -1 ? page = 1 : "";
        var limit = 15;
        var numPage = Math.ceil(b / limit);
        var msg = ``;
        for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
            if (i >= b) break;
            msg += `[${x[i].name}] - ID : ${x[i].ID}\n`;
        }
        msg += `Đang có tổng ${b} nhân vật\nSố trang (${page}/${numPage})\nDùng ${global.config.PREFIX}taoanhdep list <số trang>`;
        return api.sendMessage(msg, event.threadID, event.messageID);
    } else {
        try {
            const content = args.join(" ").split("|").map(item => item = item.trim());
            const id = content[0],
                chu_nen = content[1];
            chu_ky = content[2];
            let params = {
                id,
                chu_nen,
                chu_ky
            };
            params = qs.stringify(params);
            const pathsave = __dirname + `/cache/banner.png`;
            let imageBuffer;
            axios.get("https://api-ttk.herokuapp.com/canvas/taoanhdep?" + params, {
                    responseType: "arraybuffer"
                })
                .then(data => {
                    const imageBuffer = data.data;
                    fs.writeFileSync(pathsave, Buffer.from(imageBuffer));
                    api.sendMessage({
                        body: `Ảnh của bạn đây!`,
                        attachment: fs.createReadStream(pathsave)
                    }, event.threadID, () => fs.unlinkSync(pathsave), event.messageID);
                })
                .catch(error => {
                    let err;
                    if (error.response) err = JSON.parse(error.response.data.toString());
                    else err = error;
                    return api.sendMessage(`Đã xảy ra lỗi ${err.error} ${err.message}`, event.threadID, event.messageID);
                })
        } catch (err) {
            console.log(err);
            return api.sendMessage("Đã xảy ra lỗi", event.threadID);
        }
    }
}
