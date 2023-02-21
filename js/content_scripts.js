console.log("搞图宝已经注入成功")

function zhu() {
    // 主图
    var _url = window.location.href;
    var imgUrl = [];
    if (_url.indexOf("1688.com") > -1) {
        var imgs = document.querySelectorAll("img.detail-gallery-img");
        for (let i = 0; i < imgs.length; i++) {
            imgUrl.push({"src": imgs[i].src, "name": "主图_" + (i + 1)});
        }
    }
    if (_url.indexOf("alibaba.com") > -1) {
        var imgs = document.querySelectorAll(".main-layout .main-list img");
        for (let i = 0; i < imgs.length; i++) {
            imgUrl.push({"src": imgs[i].src.replace("100x100xz.jpg", "720x720q50.jpg"), "name": "主图_" + (i + 1)});
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
    if (_url.indexOf("alibaba.com") > -1) {
        let ele = document.getElementById("module_product_specification").getElementsByTagName("img");
        for (let i = 0; i < ele.length; i++) {
            let url = ele[i].getAttribute("data-src")
            result.push({"src": url.startsWith("http") ? url : "https:" + url, "name": "详情图_" + (i + 1)});
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
    let result = builder();
    console.log(result);
    sendResponse(result);
});

function builder() {
    let _url = window.location.href;
    let result = {
        name: "", zhu: [], xiang: [], url: _url
    };
    try {
        if (_url.indexOf("1688.com") > -1) {
            return platform_1688(_url, result);
        }
        if (_url.indexOf("alibaba.com") > -1) {
            platform_alibaba(_url, result);
        }
        if (_url.indexOf("coupang.com") > -1) {
            platform_coupang(_url, result);
        }
        if (_url.indexOf("jd.com") > -1 || _url.indexOf("jd.hk") > -1) {
            platform_jd(_url, result);
        }
        if (_url.indexOf("taobao.com") > -1 || _url.indexOf("tmall.com") > -1 || _url.indexOf("tmall.hk") > -1) {
            platform_taobao(_url, result);
        }
        if (_url.indexOf("naver.com") > -1) {
            platform_naver(_url, result);
        }
        if (_url.indexOf("gmarket.co.kr") > -1) {
            platform_gmarket(_url, result);
        }
        if (_url.indexOf("lightinthebox.com") > -1) {
            platform_lightinthebox(_url, result);
        }
    } catch (e) {
        result.error = e
    }
    return result;
}

let platform_1688 = function (_url, result) {
    // 商品名称
    if (document.querySelector(".title-content .title-first-column .title-text")) {
        result.name = document.querySelector(".title-content .title-first-column .title-text").innerText;
    }
    if (document.querySelector(".title-info-name")) {
        result.name = document.querySelector(".title-info-name").innerText;
    }

    // 主图
    let zhuImgs = document.querySelectorAll("img.detail-gallery-img");
    for (let i = 0; i < zhuImgs.length; i++) {
        result.zhu.push({"src": zhuImgs[i].src, "name": "主图_" + (i + 1)});
    }

    // 详情图
    let xiangEle = document.getElementById("detailContentContainer").getElementsByClassName("content-detail")[0].getElementsByTagName("img");
    for (let i = 0; i < xiangEle.length; i++) {
        let imgUrl = xiangEle[i].getAttribute("data-lazyload-src") ? xiangEle[i].getAttribute("data-lazyload-src") : xiangEle[i].src;
        result.xiang.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
    }
    return result;
};

let platform_alibaba = function (_url, result) {
    // 商品名称
    result.name = document.querySelector(".product-title").innerText;

    // 主图
    var zhuImgs = document.querySelectorAll(".main-layout .main-list img");
    for (let i = 0; i < zhuImgs.length; i++) {
        result.zhu.push({"src": zhuImgs[i].src.replace("100x100xz.jpg", "720x720q50.jpg"), "name": "主图_" + (i + 1)});
    }

    // 详情图
    let xiangEle = document.getElementById("module_product_specification").getElementsByTagName("img");
    for (let i = 0; i < xiangEle.length; i++) {
        let url = xiangEle[i].getAttribute("data-src")
        result.xiang.push({"src": url.startsWith("http") ? url : "https:" + url, "name": "详情图_" + (i + 1)});
    }
    return result;
};

let platform_coupang = function (_url, result) {
    // 商品名称
    result.name = document.querySelector(".prod-buy-header__title").innerText;

    // 主图
    var zhuEles = document.getElementsByClassName("prod-image__item");
    for (let i = 0; i < eles.length; i++) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("mouseover", true, true);
        event.eventName = "mouseover";
        zhuEles[i].dispatchEvent(event);
        result.zhu.push({"src": document.getElementsByClassName("prod-image__detail")[0].src, "name": "主图_" + (i + 1)});
    }

    // 详情图
    let xiangEle = document.getElementById("productDetail").getElementsByClassName("vendor-item")[0].getElementsByTagName("img");
    for (let i = 0; i < xiangEle.length; i++) {
        result.xiang.push({"src": xiangEle[i].src, "name": "详情图_" + (i + 1)});
    }
    return result;
};

let platform_jd = function (_url, result) {
    // 商品名称
    result.name = document.querySelector(".sku-name").innerText;

    // 主图
    var zhuEles = document.getElementById("spec-list").getElementsByClassName("lh")[0].getElementsByTagName("img");
    for (var i = 0; i < zhuEles.length; i++) {
        var value = zhuEles[i].src.substring(zhuEles[i].src.indexOf("/n5") + 3);
        if (value.endsWith(".avif") || value.endsWith(".AVIF")) {
            value = value.substring(0, value.length - 5);
        }
        result.zhu.push({"src": `https://img11.360buyimg.com/n1${value}`, "name": "主图_" + (i + 1)});
    }

    // 详情图
    if (document.getElementById("J-detail-content").getElementsByClassName("ssd-module-wrap")[0]) {
        let divs = document.getElementById("J-detail-content").getElementsByClassName("ssd-module-wrap")[0].getElementsByTagName("div");
        for (let i = 0; i < divs.length; i++) {
            var div = divs[i];
            var style = div.currentStyle || window.getComputedStyle(div, false)
            var imgUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
            if (imgUrl.endsWith(".avif") || imgurl.endsWith(".AVIF")) {
                imgUrl = imgUrl.substring(0, imgUrl.length - 5);
            }
            result.xiang.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
        }
    } else {
        let imgs = document.getElementById("J-detail-content").getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            var imgUrl = img.getAttribute("data-lazyload") ? img.getAttribute("data-lazyload") : img.src;
            result.xiang.push({"src": imgUrl.lastIndexOf("http") > -1 ? imgUrl : "http:" + imgUrl, "name": "详情图_" + (i + 1)});
        }
    }
    return result;
};

let platform_taobao = async function (_url, result) {
    // 商品名称
    if (document.querySelector(".tb-main-title")) {
        result.name = document.querySelector(".tb-main-title").innerText;
    } else if (document.querySelector(".ItemHeader--mainTitle--3CIjqW5")) {
        result.name = document.querySelector(".ItemHeader--mainTitle--3CIjqW5").innerText;
    } else if (document.querySelector(".tb-detail-hd")) {
        result.name = document.querySelector(".tb-detail-hd").innerText;
    }

    // 主图
    var zhuEles = [];
    if (document.getElementById("J_UlThumb") && document.getElementById("J_UlThumb").getElementsByTagName("img")) {
        zhuEles = document.getElementById("J_UlThumb").getElementsByTagName("img");
    } else if (document.querySelector(".PicGallery--thumbnails--1cEhJzK") && document.querySelector(".PicGallery--thumbnails--1cEhJzK").getElementsByTagName("img")) {
        zhuEles = document.querySelector(".PicGallery--thumbnails--1cEhJzK").getElementsByTagName("img");
    }
    for (let i = 0; i < zhuEles.length; i++) {
        var imgSrc = zhuEles[i].src;
        imgSrc = imgSrc.replace(/_\.webp/, '').replace(/\.png\_\d+x\d+\.png$/, '.png').replace(/\.jpg\_\d+x\d+\.jpg$/, '.jpg').replace(/_\d+x\d+\.jpg$/, '_800x800.jpg').replace(/_\d+x\d+[qQ]\d+\.jpg$/, '').replace(/\.\d+x\d+\.jpg$/, '.jpg').replace(/\.jpg_\d+x\d+xzq\d+\.jpg$/, '.jpg').replace(/_640x0q80_\.webp/, '').replace(/_640x0q80$/, '').replace(/_\d+x\d+.*/, '')
        result.zhu.push({"src": imgSrc, "name": "主图_" + (i + 1)});
    }

    // 详情图
    var xiangEles = [];
    if (document.getElementById("description")) {
        xiangEles = document.getElementById("description").getElementsByClassName("content")[0].getElementsByTagName("img");
    } else if (document.querySelector(".desc-root")) {
        xiangEles = document.querySelector(".desc-root").querySelectorAll("img");
    }
    for (let i = 0; i < xiangEles.length; i++) {
        var ele = xiangEles[i];
        var imgUrl = "";
        if (ele.getAttribute("data-ks-lazyload")) {
            imgUrl = ele.getAttribute("data-ks-lazyload")
        } else if (ele.getAttribute("data-src")) {
            imgUrl = ele.getAttribute("data-src");
        } else {
            imgUrl = ele.src;
        }
        if (!imgUrl.startsWith("http")) {
            imgUrl = "https:" + imgUrl;
        }
        if (imgUrl.indexOf("_!!") > -1) {}result.xiang.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
    }
    return result;
};

let platform_naver = function (_url, result) {
    // 商品名称
    result.name = document.querySelector(".headingArea").innerText;

    // 主图
    var zhuEles = document.getElementById("content").getElementsByClassName("_2Yq5J2HeBn")[0].getElementsByTagName("img")
    for (let i = 0; i < zhuEles.length; i++) {
        var imgSrc = zhuEles[i].src.replace("?type=f40", "?type=m510");
        result.zhu.push({"src": imgSrc, "name": "主图_" + (i + 1)});
    }

    // 详情图
    if (document.getElementById("INTRODUCE")) {
        let eles = document.getElementById("INTRODUCE").getElementsByTagName("img");
        for (let i = 0; i < eles.length; i++) {
            var ele = eles[i];
            var imgUrl = ele.getAttribute("data-src") ? ele.getAttribute("data-src") : ele.src;
            result.xiang.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
        }
    }
    return result;
};

let platform_gmarket = function (_url, result) {
    // 商品名称
    result.name = document.querySelector(".box__item-title .itemtit").innerText;

    // 主图
    var zhuEle = document.querySelectorAll('.box__viewer-container .viewer li img')
    for (let i = 0; i < zhuEle.length; i++) {
        var imgSrc = zhuEle[i].src.replace("?type=f40", "?type=m510");
        result.zhu.push({"src": imgSrc, "name": "主图_" + (i + 1)});
    }

    // 详情图
    var iframe = document.getElementById('detail1').contentDocument;
    var eles = [];
    if (iframe.querySelectorAll('#basic_detail_html img').length > 0) {
        eles = iframe.querySelectorAll('#basic_detail_html img')
    }
    if (iframe.querySelectorAll('.ee-contents .ee-image img').length > 0) {
        eles = iframe.querySelectorAll('.ee-contents .ee-image img')
    }

    for (let i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var imgUrl = ele.getAttribute("data-src") ? ele.getAttribute("data-src") : ele.src;
        result.xiang.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
    }
    return result;
};

let platform_lightinthebox = function (_url, result) {
    // 商品名称
    result.name = document.querySelector(".widget.prod-info-title").innerText;

    // 主图
    var zhuEle = document.querySelectorAll(".left.carousel_img_wrapper .viewport li.item img")
    for (let i = 0; i < zhuEle.length; i++) {
        var imgSrc = zhuEle[i].getAttribute("data-normal");
        result.zhu.push({"src": imgSrc, "name": "主图_" + (i + 1)});
    }

    // 详情图
    var eles = document.querySelectorAll(".description-container .item picture");
    for (let i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var imgUrl = ele.getAttribute("data-origin");
        result.xiang.push({"src": imgUrl, "name": "详情图_" + (i + 1)});
    }
    return result;
};

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