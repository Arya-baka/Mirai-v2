module.exports.config = {

    name: "baucua",

    version: "1.0.0",

    hasPermssion: 0,

    credits: "Thiệu Trung Kiên",

    description: "Bầu cua api",

    commandCategory: "Game",

    usages: "",

    cooldowns: 0

};

module.exports.run = async ({
    api,
    event,
    args,
    Users,
    Currencies
}) => {

    const axios = require("axios");

    const fs = require("fs-extra");

    const bet = encodeURIComponent(args[0]);

    if (!args[0]) {

        api.sendMessage("Bạn cần đặt cược [ bầu , cua , tôm , cá , nai , gà ", event.threadID);
    } else {

        if (!parseInt(args[1])) {

            api.sendMessage("Thiếu tiền đặt cược", event.threadID, event.messageID);

        } else {

            const checkmoney = (await Currencies.getData(event.senderID)).money;

            if (parseInt(args[1]) < 50) {

                api.sendMessage("Số tiền đặt cược phải lớn hơn hoặc bằng 50", event.threadID, event.messageID)

            } else {

                const res = await axios.get(`https://api-ttk.herokuapp.com/game/baucua?bet=${bet}`);

                const a = res.data.data;

                const b = res.data.result;

                const image = res.data.imageObject;

                var num = 0;

                var imgData = [];

                for (var i = 0; i < 3; i++) {

                    let path = __dirname + `/cache/${num+=1}.jpg`;

                    let getDown = (await axios.get(`${image[i]}`, {
                        responseType: 'arraybuffer'
                    })).data;

                    fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));

                    imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));

                }

                if (b == "You win") {

                    var congtien = parseInt(args[1]) * 2;

                    await Currencies.increaseMoney(event.senderID, congtien);

                    api.sendMessage({

                        attachment: imgData,

                        body: ` Kết quả : ${a} \nBạn đã thắng và số tiền nhận được là ${congtien} \nSố tiền hiện tại ${checkmoney}`

                    }, event.threadID, event.messageID)

                    for (let ii = 1; ii < parseInt(3); ii++) {

                        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)

                    }

                } else {

                    await Currencies.decreaseMoney(event.senderID, parseInt(args[1]))

                    api.sendMessage({

                        attachment: imgData,

                        body: ` Kết quả : ${a} \n Bạn đã thua và bị trừ ${parseInt(args[1])} \nSố tiền hiện tại ${checkmoney} `

                    }, event.threadID, event.messageID)

                    for (let ii = 1; ii < parseInt(3); ii++) {

                        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)

                    }

                }

            }

        }

    }

}
