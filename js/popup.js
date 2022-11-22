var BasePath = "./live2";

let btn = document.getElementById('getImg');
let status = 0;
// 点击按钮
btn.onclick = function (e) {
    if (status === 0) {
        status = 1;
        doGao('开搞', (response) => {
            if (response && (response.zhu.length > 0 || response.xiang.length > 0)) {
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
                showMessage("页面数据读取完毕，快来选择喜欢的图片吧 ～～", 5);
            } else {
                status = 0;
                showMessage(`当前页面不对吧？目前只支持<span>京东、淘宝、天猫、coupang、1688、naver、gmarket、alibaba</span>，
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

let btn2 = document.getElementById('download');
btn2.onclick = function () {
    if (status === 0) {
        var main = document.getElementById("main").getElementsByClassName("activation");
        var imgUrls = []
        for (let i = 0; i < main.length; i++) {
            imgUrls.push({src: main[i].getElementsByTagName('img')[0].src, name: main[i].getElementsByTagName('span')[0].innerText})
        }
        if (imgUrls.length === 0) {
            showMessage("还没有获取网页图片呢，快去获取一下吧 ～～", 5);
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
                showMessage("下载好了，快打开看一看吧 ～～", 4);
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
