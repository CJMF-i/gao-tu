let helps = [
    "加<span>VX：C473649383</span> 可以进入交流群，获取最新更新消息哦",
    "如果在日常使用过程中，有希望可以兼容的网站，欢迎联系 <br><span>VX：C473649383</span>",
    "目前搞图宝已经支持了<span>京东、淘宝、天猫、coupang、1688、naver、gmarket、alibaba</span>",
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
    "我从一无所有，到资产过亿，从家徒四壁，到豪车别墅，这些不是靠别人，完全是靠我自己，一点一滴， …………… ………….., 想出来的。",
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