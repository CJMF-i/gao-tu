var BasePath = "./live2";


let btn = document.getElementById('getImg');
let videoUrl;
let status = 0;
let zipName = "搞";
// 点击按钮
btn.onclick = function (e) {
    if (status === 0) {
        status = 1;
        doGao('开搞', (response) => {
            if (response && (response.zhu.length > 0 || response.xiang.length > 0)) {
                if (response.name !== "") {
                    zipName = response.name.replaceAll(" ", "").replaceAll("\n", "").replaceAll("/", "_")
                }
                videoUrl = response.videoUrl;
                var zhu = response.zhu;
                var xiang = response.xiang;
                let _html = "";
                _html += `<h1>主图</h1>`
                for (let i = 0; i < zhu.length; i++) {
                    _html += `
                    <div><img src="${zhu[i].src}"/><span>${zhu[i].name}</span></div>
                    `
                }
                _html += `<h1>详情图</h1>`
                for (let i = 0; i < xiang.length; i++) {
                    _html += `
                    <div><img src="${xiang[i].src}"/><span>${xiang[i].name}</span></div>
                    `
                }
                document.getElementById("main").innerHTML = _html;

                // 添加选中事件
                var items = document.getElementById('main').getElementsByTagName('div');
                for (let i = 0; i < items.length; i++) {
                    items[i].onclick = function () {
                        if (this.classList.contains('activation')) {
                            //表示含有'checked'这个类名
                            this.classList.remove('activation')
                            let currentSelect = document.getElementById('main').querySelectorAll(".activation")
                            showMessage(`取消了<span>${this.querySelector("span").innerText}</span>，当前选中<span>${currentSelect.length}</span>张`, 5);
                        } else {
                            this.classList.add('activation')
                            let currentSelect = document.getElementById('main').querySelectorAll(".activation")
                            showMessage(`选中了<span>${this.querySelector("span").innerText}</span>，当前选中<span>${currentSelect.length}</span>张`, 5);
                        }
                    }
                }
                status = 0;
                if (response.url.indexOf("jd.com") > -1) {
                    showMessage("页面数据读取完毕，检测到您访问的是京东，如果需要导出视频文件，暂时请先播放主图视频然后再点获取页面图片");
                } else {
                    showMessage("页面数据读取完毕，快来选择喜欢的图片吧 ～～", 5);
                }
            } else {
                status = 0;
                showMessage(`当前页面不对吧？目前只支持<span>京东、京东国际、淘宝、天猫、拼多多，coupang、1688、naver、gmarket、alibaba、兰亭集势、微盟</span>，
                                    而且必须要在商品详情页面才可以哦 ～～<br>如果确定是详情页的话，还请麻烦添加作者微信
                                    <span>C473649383</span>，将失败网页发送给作者，感谢您的支持 ～～`);
            }
        });
    } else {
        showMessage("网页图片正在读取中哦，不要着急嘛 ～～", 3);
    }
}

// 全选
document.getElementById('allSelect').onclick = function () {
    var items = Array.from(document.getElementById('main').getElementsByTagName('div'));
    var flag = items.filter(item => item.classList.contains('activation'));
    if (items.length === 0) {
        showMessage("还没有获取网页图片呢，快去获取一下吧 ～～", 5);
        return;
    }

    if (flag.length === 0) {
        showMessage("全部选中了，快开始下载吧 ～～", 3);
    } else if (flag.length < items.length) {
        showMessage("<span>全选/取消</span>按钮要全部选中后，再次点击才可以触发全部取消哦 ～～");
    } else {
        showMessage("已全部取消选中，快去挑选喜欢的图片吧 ～～", 4);
    }
    for (let i = 0; i < items.length; i++) {
        if (flag.length < items.length) {
            items[i].classList.add('activation');
        } else {
            items[i].classList.remove('activation');
        }
    }
};

document.getElementsByName("videoSelect")[0].addEventListener('change', function() {
    if (this.checked) {
        localStorage.setItem('videoSelect', 'true')
    } else {
        localStorage.setItem('videoSelect', 'false')
    }
});

let btn2 = document.getElementById('download');
btn2.onclick = function () {
    if (status === 0) {
        status = 1;
        var main = document.getElementById("main").getElementsByClassName("activation");
        var imgUrls = []
        for (let i = 0; i < main.length; i++) {
            imgUrls.push({src: main[i].getElementsByTagName('img')[0].src, name: main[i].getElementsByTagName('span')[0].innerText})
        }
        if (imgUrls.length === 0) {
            status = 0;
            showMessage("还没有选择网页图片呢，快去选择喜欢的图片吧 ～～", 5);
            return;
        }
        var zip = new JSZip();
        try {
            saveToZip(zip, imgUrls, 0)
        } catch (e) {
            status = 0;
            showMessage("哎呀，下载出错了，联系一下作者看一下吧，作者VX：<span>C473649383</span>", 5);
        }
    } else {
        showMessage("网页图片正在读取中哦，不要着急嘛 ～～", 3);
    }
};

function saveToZip(zip, imgUrls, index) {
    getResources(index + 1, imgUrls[index].src, (data, success) => {
        if (success) {
            let suffix = data.type.split('/')[1];
            if (suffix.toLocaleUpperCase() === 'JPEG' || suffix.toLocaleUpperCase() === 'AVIF') {
                suffix = 'jpg';
            }
            let fileName = imgUrls[index].name;
            zip.file(fileName + "." + suffix, data);
        }
        index++;
        if (index >= imgUrls.length) {
            // 是否需要下载视频
            if (videoUrl && document.getElementsByName("videoSelect")[0].checked) {
                getResources(index + 1, videoUrl, (data, success) => {
                    if (success) {
                        zip.file(zipName + ".mp4", data);
                    }
                    zip.generateAsync({type: "blob"}).then(function (content) {
                        saveAs(content, zipName + ".zip");
                        status = 0;
                        showMessage("下载好了，快打开看一看吧 ～～", 4);
                    });
                });
            } else {
                zip.generateAsync({type: "blob"}).then(function (content) {
                    saveAs(content, zipName + ".zip");
                    status = 0;
                    showMessage("下载好了，快打开看一看吧 ～～", 4);
                });
            }
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
            callback(this.response, true);
        }
    };
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.log('发生了错误：', xhr.status, xhr.statusText);
                showMessage("有图片发生了错误，已为您跳过了错误图片的下载", 4);
                callback("", false);
            }
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

(function() {
    if (localStorage.getItem("videoSelect") === "true") {
        document.getElementsByName("videoSelect")[0].checked = true;
    }
})();



/**
 *  睡眠函数
 *  @param numberMillis -- 要睡眠的秒数
 */
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + (numberMillis * 1000);
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}