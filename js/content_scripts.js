console.log("搞图宝已经注入成功")

function zhu() {
    // 主图
    var _url = window.location.href;
    var imgUrl = [];
    if (_url.indexOf("1688.com") > -1) {
        var imgs = document.getElementsByClassName("detail-gallery-turn-outter-wrapper")[0].querySelectorAll("img.detail-gallery-img");
        for (let i = 0; i < imgs.length; i++) {
            imgUrl.push({"src": imgs[i].src, "name": "主图_" + (i + 1)});
        }
    }
    if (_url.indexOf("coupang.com") > -1) {
        var eles = document.getElementsByClassName("prod-image__item");
        for (let i = 0; i < eles.length; i++) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("mouseover", true, true);
            event.eventName = "mouseover";
            eles[i].dispatchEvent(event);
            imgUrl.push({"src": document.getElementsByClassName("prod-image__detail")[0].src, "name": "主图_" + (i + 1)});
        }
    }
    if (_url.indexOf("jd.com") > -1) {
        var eles = document.getElementById("spec-list").getElementsByClassName("lh")[0].getElementsByTagName("img");
        for (var i = 0; i < eles.length; i++) {
            var value = eles[i].src.substring(eles[i].src.indexOf("/n5") + 3);
            imgUrl.push({"src": `https://img11.360buyimg.com/n1${value}`, "name": "主图_" + (i + 1)});
        }
    }
    if (_url.indexOf("tmall.com") > -1 || _url.indexOf("taobao.com") > -1 || _url.indexOf("tmall.hk") > -1) {
        var ele = document.getElementById("J_UlThumb").getElementsByTagName("img");
        for (let i = 0; i < ele.length; i++) {
            var imgSrc = ele[i].src.replace("_60x60q90", "_430x430q90");
            imgUrl.push({"src": imgSrc, "name": "主图_" + (i + 1)});
        }
    }
    if (_url.indexOf("naver.com") > -1) {
        var ele = document.getElementById("content").getElementsByClassName("_2Yq5J2HeBn")[0].getElementsByTagName("img")
        for (let i = 0; i < ele.length; i++) {
            var imgSrc = ele[i].src.replace("?type=f40", "?type=m510");
            imgUrl.push({"src": imgSrc, "name": "主图_" + (i + 1)});
        }
    }
    if (_url.indexOf("gmarket.co.kr") > -1) {
        var ele = document.querySelectorAll('.box__viewer-container .viewer li img')
        for (let i = 0; i < ele.length; i++) {
            var imgSrc = ele[i].src.replace("?type=f40", "?type=m510");
            imgUrl.push({"src": imgSrc, "name": "主图_" + (i + 1)});
        }
    }
    return imgUrl;
}

function xiang() {
    // 详情图
    var _url = window.location.href;
    var result = [];
    if (_url.indexOf("1688.com") > -1) {
        let ele = document.getElementById("detailContentContainer").getElementsByClassName("content-detail")[0].getElementsByTagName("img");
        for (let i = 0; i < ele.length; i++) {
            var imgUrl = ele[i].getAttribute("data-lazyload-src") ? ele[i].getAttribute("data-lazyload-src") : ele[i].src;
            result.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
        }
    }
    if (_url.indexOf("coupang.com") > -1) {
        let ele = document.getElementById("productDetail").getElementsByClassName("vendor-item")[0].getElementsByTagName("img");
        for (let i = 0; i < ele.length; i++) {
            result.push({"src": ele[i].src, "name": "详情图_" + (i + 1)});
        }
    }
    if (_url.indexOf("jd.com") > -1) {
        if (document.getElementById("J-detail-content").getElementsByClassName("ssd-module-wrap")[0]) {
            let divs = document.getElementById("J-detail-content").getElementsByClassName("ssd-module-wrap")[0].getElementsByTagName("div");
            for (let i = 0; i < divs.length; i++) {
                var div = divs[i];
                var style = div.currentStyle || window.getComputedStyle(div, false)
                result.push({"src": style.backgroundImage.slice(4, -1).replace(/"/g, ""), "name": "详情图_" + (i + 1)});
            }
        } else {
            let imgs = document.getElementById("J-detail-content").getElementsByTagName("img");
            for (let i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                var imgUrl = img.getAttribute("data-lazyload") ? img.getAttribute("data-lazyload") : img.src;
                result.push({"src": imgUrl.lastIndexOf("http") > -1 ? imgUrl : "http:" + imgUrl, "name": "详情图_" + (i + 1)});
            }
        }
    }
    if (_url.indexOf("taobao.com") > -1 || _url.indexOf("tmall.com") > -1 || _url.indexOf("tmall.hk") > -1) {
        var eles = document.getElementById("description").getElementsByClassName("content")[0].getElementsByTagName("img");
        for (let i = 0; i < eles.length; i++) {
            var ele = eles[i];
            var imgUrl = ele.getAttribute("data-ks-lazyload") ? ele.getAttribute("data-ks-lazyload") : ele.src;
            if (imgUrl.indexOf("_!!") > -1) result.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
        }
    }
    if (_url.indexOf("naver.com") > -1) {
        if (document.getElementById("INTRODUCE")) {
            var eles = document.getElementById("INTRODUCE").getElementsByTagName("img");
            for (let i = 0; i < eles.length; i++) {
                var ele = eles[i];
                var imgUrl = ele.getAttribute("data-src") ? ele.getAttribute("data-src") : ele.src;
                result.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
            }
        }
    }
    if (_url.indexOf("gmarket.co.kr") > -1) {
        var iframe = document.getElementById('detail1').contentDocument;
        var eles = iframe.querySelectorAll('.ee-contents .ee-image img');
        for (let i = 0; i < eles.length; i++) {
            var ele = eles[i];
            var imgUrl = ele.getAttribute("data-src") ? ele.getAttribute("data-src") : ele.src;
            result.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
        }
    }
    return result;
}

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
    var result = {};
    result.zhu = zhu();
    result.xiang = xiang();
    console.log(result)
    sendResponse(result);
});

