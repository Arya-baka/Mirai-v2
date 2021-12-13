module.exports.config = {
	name: "language",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Đổi ngôn ngữ Bot",
	commandCategory: "system",
	usages: "[vi] [en] [fr]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;

    switch (args[0]) {
        case "vietnames":
        case "vi":
            {
                return api.sendMessage(`Ngôn ngữ đã được chuyển sang tiếng Việt`, threadID, () => global.config.language = "vi"); 
            }
            break;
        
        case "english":
        case "en":
            {
                return api.sendMessage(`Language has been converted to English`, threadID, () => global.config.language = "en"); 
            }
            break;
			
			case "French":
        case "fr":
            {
                return api.sendMessage(`La langue a été changée en Français`, threadID, () => global.config.language = "fr"); 
            }
            break;
    
        default:
            {
                return api.sendMessage("Syntax error, use : language [vi / en / fr]", threadID, messageID);
            }   
            break; 
            
    }	
}