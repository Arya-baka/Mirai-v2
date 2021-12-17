module.exports.config = {
    name: "pokedex",
    version: "2.0.0",
    hasPermision: 0,
    credit: "Quang Minh",
    description: "pokemon information",
    commandCategory: "info",
    usages: "[name]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args, utils, Users,Threads }) {
 try {
           let axios = require('axios');
           let { threadID, senderID, messageID } = event;
           if (!args[0]) {api.sendMessage("Vui lòng nhập tên pokemon",threadID,messageID)}
           else {
           const res = await axios.get(encodeURI(`https://some-random-api.ml/pokedex?pokemon=${args[0]}`));
           console.log(res.data);
           let data = res.data;
           return api.sendMessage(`Name: ${data.name}\nType: ${data.type}\nSpecies: ${data.species}\nAbilities: ${data.abilities}\nHeight: ${data.height}\nWeight: ${data.weight}\nGender: ${data.gender}\nEgg groups: ${data.egg_groups}\nStats: [hp: ${res.data.stats.hp}, attack: ${res.data.stats.attack}, defense: ${res.data.stats.defense}, sp-atk: ${res.data.stats.sp_atk}, sp-def: ${res.data.stats.sp_def}, speed: ${res.data.stats.speed}, total: ${res.data.stats.total}]\nFamily: [evolutionstage: ${res.data.family.evolutionStage}, evolutionline: ${res.data.family.evolutionLine}]\nDescription: ${data.description}`, event.threadID, event.messageID);
           } 
       }
        catch {
           return api.sendMessage(`Đã xảy ra lỗi`, event.threadID)
           }
}
