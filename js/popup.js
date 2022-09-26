let btn = document.getElementById('gao');
let status = 0;
// 点击按钮
btn.onclick = function (e) {
    if (status === 0) {
        status = 1;
        updateStatus("loading", "搞他中,莫乱点!!!")
        doGao('开搞', (response) => {
            if (response && (response.zhu.length > 0 || response.xiang.length > 0)) {
                var zhu = response.zhu;
                var xiang = response.xiang;
                var zip = new JSZip();
                var imgUrls = [...zhu, ...xiang]
                try {
                    saveToZip(zip, imgUrls, 0)
                } catch (e) {
                    status = 0;
                    updateStatus("error", "完了,搞错了!!!");
                }
            } else {
                status = 0;
                updateStatus("biegao", "页面不对吧\n别瞎搞!!!");
            }
        });
    } else {
        updateStatus("loading", "在搞呢,莫急!!!");
    }
}

function saveToZip(zip, imgUrls, index) {
    getResources(index + 1, imgUrls[index].src, (data) => {
        let suffix = data.type.split('/')[1];
        if (suffix.toLocaleUpperCase() === 'JPEG') {
            suffix = 'jpg';
        }
        let fileName = imgUrls[index].name;
        zip.file(fileName + "." + suffix, data);
        index++;
        if (index >= imgUrls.length) {
            zip.generateAsync({type: "blob"}).then(function (content) {
                saveAs(content, "搞.zip");
                status = 0;
                updateStatus("end", "搞完了,还搞吗?");
            });
        } else {
            saveToZip(zip, imgUrls, index);
        }
    })
}

function getResources(index, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (this.status == 200 || this.status == 304) {
            callback(this.response);
        }
    };
    xhr.send();
}

function doGao(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}

function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function updateStatus(imgId, text) {
    var imgs = document.getElementsByClassName("gao-img");
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = "none";
    }
    document.getElementById(imgId).style.display = "block";
    document.getElementById("gao-text").innerText = text;
}