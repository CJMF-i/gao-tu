var BasePath = "./live2";
let kaishi = [];
let jieshu = [];

let btn = document.getElementById('getImg');
let status = 0;
// 点击按钮
btn.onclick = function (e) {
    if (status === 0) {
        status = 1;
        // updateStatus("loading", "搞他中,莫乱点!!!")
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

                // 天际选中事件
                var items = document.getElementById('main').getElementsByTagName('div');
                for (let i = 0; i < items.length; i++) {
                    items[i].onclick = function () {
                        console.log(123)
                        if (this.classList.contains('activation')) {
                            //表示含有'checked'这个类名
                            this.classList.remove('activation')
                        } else {
                            this.classList.add('activation')
                        }
                    }
                }
                status = 0;
            } else {
                status = 0;
                // updateStatus("biegao", "页面不对吧\n别瞎搞!!!");
            }
        });
    } else {
        showMessage("在下载中哦，不要着急～～", 1000, 9);
    }
}

// 全选
document.getElementById('allSelect').onclick = function () {
    var items = Array.from(document.getElementById('main').getElementsByTagName('div'));
    var flag = items.filter(item => item.classList.contains('activation'));
    for (let i = 0; i < items.length; i++) {
        if (!items[i].classList.contains('activation')) {
            flag = true;
            break;
        }
    }
    if (flag) {
        showMessage("<span>全选/取消</span>按钮要全部选中才会触发取消，如果目前没有全部选中，需要先全选，然后取消哦", 1000, 9);
    } else {
        showMessage("已全部取消选中，快去挑选喜欢的图片吧", 1000, 9);
    }
    for (let i = 0; i < items.length; i++) {
        if (flag) {
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
        var zip = new JSZip();
        try {
            saveToZip(zip, imgUrls, 0)
        } catch (e) {
            status = 0;
            showMessage("哎呀，下载出错了～～", 2000, 9);
        }
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
                showMessage("咯，给你，下载好了～～", 2000, 9);
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
