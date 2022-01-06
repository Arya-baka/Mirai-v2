module.exports.config = {
    name: "christmas",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Nguyễn Quang Minh",
    description: "Chúc mừng giáng sinh",
    commandCategory: "Edit-img",
    usages: "[tag]",
    cooldowns: 5
};

module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/canvas/`;
    if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "cmgs.png")) request("https://i.ibb.co/rb1dt5W/image.png").pipe(fs.createWriteStream(dirMaterial + "cmgs.png"));
}

async function makeImage({ one, two }) {    
    const axios = require("axios");
    const fs = require("fs-extra");
    const path = require("path");
    const jimp = require("jimp");
    const __root = path.resolve(__dirname, "cache", "canvas");

    let point_image = await jimp.read(__root + "/cmgs.png");
    let pathImg = __root + `/cmgs_${one}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=EAAOdaGArpzQBAELcjcePnGu6eZBY9dZC22ctL8eCpdFAbvh0HxyioGQZBoVPHZALdwRLJ4zmwgyMfVbhQsWfHjIcBfa9LCieayY9LKrBggtbWDq2XZCJ9ZCeByNbkg2jKSNFhvgAlD2A3EyWm4vYcEfrZCNX8rvxf3YXFqv3fm0lZBR8ZB5ZC5VXykin8tAYsN4MJY4cm4y2olob7ZBndvVGCWrZBGdIvwCbToIZD`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    point_image.composite(circleOne.resize(105, 105), 260, 290)
    
    let raw = await point_image.getBufferAsync("image/png");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    
    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}


module.exports.run = async function ({ event, api, args, client }) {
    const fs = require("fs-extra");
    let { threadID, messageID, senderID } = event;
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else {
        var one  = mention;
        return makeImage({ one }).then(path => api.sendMessage({ body: event.mentions[mention].replace("@", "") + " Giáng Sinh vui vẻ", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
}
