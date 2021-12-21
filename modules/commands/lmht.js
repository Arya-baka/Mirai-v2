module.exports.config = {
    name: "lmht",
    version: "1.0.0",
    hasPermision: 0,
    credit: "api-ttk",
    description: "LOL characters information",
    commandCategory: "info",
    usages: "[name]",
    cooldowns: 0,
};

module.exports.run = async function({
    api,
    event,
    args,
    utils,
    Users,
    Threads
}) {
    try {
        let axios = require('axios');
        let {
            threadID,
            senderID,
            messageID
        } = event;
        if (!args[0]) {
            api.sendMessage("Vui lòng nhập tên nhân vật cần lấy thông tin", threadID, messageID)
        } else if (args[0] == "list") {
            const res = await axios.get(encodeURI(`http://api-ttk.herokuapp.com/lmht/list`));
            var page = 1;
            page = parseInt(args[1]) || 1;
            page < -1 ? page = 1 : "";
            var limit = 15;
            var count = res.data.champ_names.length;
            var numPage = Math.ceil(count / limit);
            var msg = [];
            const character = res.data.champ_names;
            for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                if (i >= count) break;
                var nv = character[i];
                msg += `${i+1}. ${nv}\n`
            }
            msg += `Đang có tổng ${count} nhân vật\nSố trang (${page}/${numPage})\nDùng ${global.config.PREFIX}${this.config.name} list <số trang>`;
            return api.sendMessage(msg, event.threadID)
        } else {
            const res1 = await axios.get(encodeURI(`http://api-ttk.herokuapp.com/lmht?name=${args[0]}`));
            console.log(res1.data);
            let data = res1.data;
            return api.sendMessage(`Name: ${data.name}\nHp: ${data.hp}\nHp gain per 1v1: ${data.hp_gain_per_lvl}\nHp regen: ${data.hp_regen}\nHp regen gain per lvl: ${data.hp_regen_gain_per_lvl}\nMana: ${data.mana}\nMana gain per 1v1: ${data.mana_gain_per_lvl}\nMana regen: ${data.mana_regen}\nMana regen gain per lvl: ${data.mana_regen_gain_per_lvl}\nAttack damage: ${data.ttack_damage}\nAttack damage gain per 1v1: ${data.attack_damage_gain_per_lvl}\nAttack speed: ${data.attack_speed}\nAttack speed gain per 1v1: ${data.attack_speed_gain_per_lvl}\nArmor: ${data.armor}\nArmor gain per 1v1: ${data.armor_gain_per_lvl}\nMagic resist: ${data.magic_resist}\nMagic resist gain per 1v1: ${data.magic_resist_gain_per_lvl}\nMovement speed: ${data.movement_speed}\nRange: ${data.range}\nAbility power: ${data.ability_power}\nAbility haste: ${data.ability_haste}\nCrit: ${data.crit}`, event.threadID, event.messageID);
        }
    } catch (err) {
        console.log(err)
        return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
    }
}
