let helps = [
    "加<span>VX：C473649383</span> 可以进入交流群，获取最新更新消息哦",
    "<span>京东</span>如果需要导出视频，需要先播放视频才可以哦",
    "如果在日常使用过程中，有希望可以兼容的网站，欢迎联系 <br><span>VX：C473649383</span>",
    "目前搞图宝已经支持了<span>京东、京东国际、淘宝、天猫、拼多多，coupang、1688、naver、gmarket、alibaba、兰亭集势、微盟</span>",
    "<span>搞图宝</span>是永久免费的，不要相信各种收费渠道哦 ～～",
    "如果你有定制化的功能，也可以与我联系哦 ～～<br><span>VX：C473649383</span>",
    "<span>搞图宝</span>正在茁壮成长中，过不了多久将会支持视频的导出哦 ～～",
    "你相信光吗？你的优化与建议都是<span>搞图宝</span>的光 ～～",
    "你想见见我的小姐妹吗？来交流群带你认识一下<span>萨菲亚、Kiro、lili、sagiri .....</span>"
]

let idle = [
    "我说：“你是猪。”你说：“我是猪才怪!”从此我就叫你猪才怪。终于有一天，你忍不住当着众人的面对我吼道：“我不是猪才怪!”",
    "护士看到一病人在病房喝酒，就走过去小声地对他说：“小心肝!” 病人微笑着说：“小宝贝。”",
    "给我一秒钟，我会想起你，给我一分钟，我会牵挂你，给我一整天，我会思念你，给我一辈子，我会守护你，给我一条优化建议，我会满足你!",
    "有一天，小明问他爸爸：“爸爸，我是不是傻孩子啊？” 爸爸说：“傻孩子，你怎么会是傻孩子呢？”",
    "我的梦想是存一百万，现在我已经完成一半了，我存到了一百。",
    "老公给的零用钱每月平均在8千以上，便可以自称本宫！7千就是贵妃。6千就是昭仪。5千就是贵人。4千就是才人！3千就是常在！2千就是答应！1千乃至500就是宫女。自己挣钱自己花的，你就是哀家！现在知道自己啥位置了？各位娘娘，请对号入座吧！分文没有的，还跟他过啥！出宫吧！经济独立就是武则天了，可以自称为朕试想自己在那位置，是不是心拔凉拔凉的。。",
    "我从一无所有，到资产过亿，从家徒四壁，到豪车别墅，这些不是靠别人，完全是靠我自己，一点一滴， …………… ………….., 想出来的。",
    "专家说螃蟹的听觉在腿上，为此特意抓来一只螃蟹，松绑后放原地对着螃蟹大叫一声螃蟹迅速的跑开了，专家抓回螃蟹去掉手脚后又放原地对着它大吼结果螃蟹不动。于是专家得出结论:螃蟹的听觉在腿上。",
    "地铁上有个孩子吵着要尿尿，哭声震耳欲聋。车上人多，孩子的妈妈，那个年轻的女人一副很难为情的样子，左顾右盼不知如何是好。这时我想到包里有个袜子，就递给她，她说：“这个不好吧，会漏水的。”“寻思啥呢！ ”我说：把嘴堵上！ ”",
    "一80后夫妻有了个可爱的宝宝，老婆每天都很用心的教导孩子叫“爸爸”老公大受感动，认为太太真好，先教孩子叫爸爸，而不是叫妈妈，觉得真幸福。在一个寒冬深夜，孩子哭闹不休一直叫爸爸。此时夫妻俩睡的正香，老婆推了推老公说：你儿子一直在叫你，快去，这时老公才明白。。。",
    "悟空：人生最痛苦的事莫过于一阵风吹来过后，猪在呢，马在呢，人不在了！最最痛苦的莫过于还有一个二货这时会用最大的嗓门喊：大师兄！师傅被妖怪抓走了！以证明他的存在，然后接着发呆。",
]

function initWidget() {
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips" style="position: absolute;bottom: 100%;"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
		</div>`);
    setTimeout(() => {
        document.getElementById("waifu").style.left = 0;
    }, 100);

    (function initModel() {
        loadModel("Kiana", "你好，我是你的<span>搞图宝助手 Kiana</span>，有不懂得可以随时点我哦 ～～");
        document.getElementById("waifu").onclick = function () {
            showMessage(helps)
        };
    })();
}

var modelListB = {
    "elizabeth_2": BasePath + "/models/elizabeth_2/model.json",
    "elizabeth_4": BasePath + "/models/elizabeth_4/model.json",
    "elizabeth_5": BasePath + "/models/elizabeth_5/model.json",
    "elizabeth_6": BasePath + "/models/elizabeth_6/model.json",
    "histoire": BasePath + "/models/histoire/model.json",
    "katou_01": BasePath + "/models/katou_01/model.json",
    "Kobayaxi": BasePath + "/models/Kobayaxi/model.json",
    "lili": BasePath + "/models/lili/model.json",
    "magelite": BasePath + "/models/magelite/model.json",
    "mashiro-1": BasePath + "/models/mashiro/ryoufuku.model.json",
    "mashiro-2": BasePath + "/models/mashiro/seifuku.model.json",
    "mashiro-3": BasePath + "/models/mashiro/shifuku.model.json",
    "rem": BasePath + "/models/rem/model.json",
    "safeiya": BasePath + "/models/safeiya/model.json",
    "sagiri": BasePath + "/models/sagiri/model.json",
    "tia": BasePath + "/models/tia/model.json",
    "BYC": BasePath + "/models/BYC/model.json",
    "Kiana": BasePath + "/models/Kiana/model.json",
    "Kiro": BasePath + "/models/Kiro/model.json",
}

var modelList = {
    "Kiana": BasePath + "/models/Kiana/model.json",
}
function loadModel(modelName, message) {
    if (modelName === "") {
        modelName = localStorage.getItem("modelName") === "" ? "Kiana" : localStorage.getItem("modelName");
    }
    localStorage.setItem("modelName", modelName);
    showMessage(message, 10);
    loadlive2d("live2d", modelList[modelName]);
}

var messageTimer;
var topMessageTime;
function showMessage(text, timeout) {
    topMessageTime = new Date();
    if (messageTimer) {
        clearTimeout(messageTimer);
        messageTimer = null;
    }
    // 如果传入的消息是数组，则随机选一条
    text = Array.isArray(text) ? text[Math.floor(Math.random() * text.length)] : text;
    // 如果如果没有传入消息显示最大时间，根据消息字数 * 200 毫秒
    timeout = (timeout === undefined ? text.length * 300 : timeout * 1000);
    let tips = document.getElementById("waifu-tips");
    tips.innerHTML = text;
    tips.classList.add("waifu-tips-active");
    messageTimer = setTimeout(() => {
        sessionStorage.removeItem("waifu-text");
        tips.classList.remove("waifu-tips-active");
    }, timeout);
}

setInterval(function () {
    if (new Date() - topMessageTime > 7000) {
        showMessage(idle, 8000);
    }
}, 10000);