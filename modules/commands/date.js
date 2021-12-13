module.exports.config = {
	name: "date", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0/1/2, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "BerVer", // Công nhận module sở hữu là ai
	description: "Kiểm ra lịch", // Thông tin chi tiết về lệnh
	commandCategory: "other", // Thuộc vào nhóm nào
	usages: "", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
	dependencies: {
		"amlich":"",
		"node-fetch":""
		}
};

module.exports.run = async({ api, event, args }) =>{
	//Làm cái gì ở đây tuỳ thuộc vào bạn ¯\_(ツ)_/¯
    const fetch = global.nodemodule["node-fetch"];
    var fetchcd = await fetch("https://raw.githubusercontent.com/HerokeyVN/API_Ca_Dao/main/CaDao.js")
    var jsoncd =  await fetchcd.json()
var d = new Date();
var dd = d.getDate()-1
var yyyy = d.getFullYear()
var mm = d.getMonth()+1
var zone = 0 
var h = d.getHours()
var m = d.getMinutes()
var s = d.getSeconds()
var ms = d.getMilliseconds()
var name = (await api.getUserInfo(event.senderID))[event.senderID].name;
 
// thứ ngày
var day = d.getDay()
if (day == 0) {day = "Chủ nhật"}
if (day == 1) {day = "Thứ hai"}
if (day == 2) {day = "Thứ ba"}
if (day == 3) {day = "Thứ tư"}
if (day == 4) {day = "Thứ Năm"}
if (day == 5) {day = "Thứ sáu"}
if (day == 6) {day = "Thứ bảy"}
const amlich = global.nodemodule['amlich'];//module
var rd = amlich.convertSolar2Lunar(dd,mm,yyyy,zone)
return api.sendMessage(`Chào ${name},\nDương lịch: ${dd+1}/${mm}/${yyyy} (${day})\n`
                      +`Âm lịch: ${rd[0]}/${rd[1]}/${rd[2]}\n`
                      +`Thời gian: ${h}:${m}:${s}`
                      +`\n`
                      +`Canh ngôn:\n`
                      +`"${jsoncd.data[String(Math.floor(Math.random() * 268) + 1)]}"` , event.threadID, event.messageID)
}
