module.exports.config = {
    name: "info",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "",
    description: "Xem thông tin của người dùng facebook",
    commandCategory: "Thông tin",
    usages: "uid",
    cooldowns: 3
};

module.exports.run = async function({ api, event, args, utils, Users, Threads }) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request")
        let { threadID, senderID, messageID } = event;
        if (!args[0]) {
            api.sendMessage("Vui lòng nhập uid fb", threadID, messageID)
        }
        const res = await axios.get(encodeURI(`https://manhict.tech/facebook/info?uid=4&apikey=KeyTest`));
        console.log(res.data);
        let data = res.data;
        let callback = function() {
            return api.sendMessage({
                body: `Display name: ${data.result.name}\nUsername: ${data.result.username}\nBiography: ${data.result.about}\nBirthday: ${data.result.birthday}\nFollow: ${data.result.follow}\nGender: ${data.result.gender}\nHometown: ${data.result.hometown}\nEmail: ${data.result.email}\nInterested in: ${data.result.interested_in}\nLocation: ${data.result.location}\nLanguage: ${data.result.locale}\nRelationship status: ${data.result.relationship_status}\nLove: ${data.result.love}\nWebsite: ${data.result.website}\nEducation: ${data.result.education]\nWork: ${data.result.work}\nTimezone: ${data.result.timezone} `,
                attachment: fs.createReadStream(__dirname + `/cache/avatar.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avatar.png`), event.messageID);
        };
        return request(encodeURI(data.result.avatar))
            .pipe(fs.createWriteStream(__dirname + `/cache/avatar.png`))
            .on("close", callback);

    } catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}
