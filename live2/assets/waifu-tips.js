
function initWidget() {
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips" style="position: absolute;bottom: 100%;"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
		</div>`);
    setTimeout(() => {
        document.getElementById("waifu").style.bottom = 0;
    }, 0);

    (function initModel() {
        loadModel("", "你好，我是你的<span>搞图宝小秘</span>，有啥需要问我的，可以随时点我！");
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
async function loadModel(modelName, message) {
    if (modelName === "") {
        modelName = localStorage.getItem("modelName") === "" ? "Kiana" : localStorage.getItem("modelName");
    }
    localStorage.setItem("modelName", modelName);
    showMessage(message, 4000, 10);
    loadlive2d("live2d", modelList[modelName]);
}

var messageTimer;
function showMessage(text, timeout) {
    if (messageTimer) {
        clearTimeout(messageTimer);
        messageTimer = null;
    }
    // 如果传入的消息是数组，则随机选一条
    text = Array.isArray(text) ? text[Math.floor(Math.random() * text.length)] : text;
    // 如果如果没有传入消息显示最大时间，根据消息字数 * 200 毫秒
    timeout = timeout === undefined ? text.length * 200 : timeout;
    let tips = document.getElementById("waifu-tips");
    tips.innerHTML = text;
    tips.classList.add("waifu-tips-active");
    messageTimer = setTimeout(() => {
        sessionStorage.removeItem("waifu-text");
        tips.classList.remove("waifu-tips-active");
    }, timeout);
}