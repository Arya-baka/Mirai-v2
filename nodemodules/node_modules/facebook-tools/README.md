# Facebook Tools

## Example:

### Find UID:
```javascript
const facebookTools = require("facebook-tools");

let uid;

try {
    uid = await facebookTools.findUid("https://facebook.com/kaysil.666");
} catch (e) {
    // Handle error...
}

console.log(uid); // 1000...
```
### Video Downloader:
```javascript
const facebookTools = require("facebook-tools");

let videoObj;

try {
    videoObj = await facebookTools.getVideoUrl("https://www.facebook.com/amauryguichon.chef/videos/603837910317877/?t=3");
} catch (e) {
    // Handle error...
}

console.log(videoObj); /**
{
    sdLink: 'https://video-iad3-1.xx.fbcdn.net/v/t42.9040-2/10000000_1408628309337356_683828880340347975_n.mp4?_nc_cat=1&_nc_sid=985c63&efg=eyJybHIiOjczMiwicmxhIjoxMzc3LCJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=ZwloUK2tND4AX_obVuD&rl=732&vabr=407&_nc_ht=video-iad3-1.xx&oh=c5885d987cb05aad1e48dd5898195ae5&oe=5F7C93BE',
    
    hdLink: 'https://scontent-iad3-1.xx.fbcdn.net/v/t66.36240-6/10000000_2879573528967762_2627081167581240082_n.mp4?_nc_cat=105&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=fjmeZsPucQsAX_QhWox&_nc_ht=scontent-iad3-1.xx&oh=053b6501b33f3d6b73b69c2fd882d409&oe=5FA22465'
}
*/
```