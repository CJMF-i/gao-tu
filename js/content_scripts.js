console.log("搞图宝已经注入成功")
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
        if (_url.indexOf("yangkeduo.com") > -1) {
            platform_pinduoduo(_url, result);
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

    // 视频
    var d, s = document.querySelector(".mod-detail-version2018-gallery, .mod-detail-gallery");
    if (s && (d = JSON.parse(s.dataset.modConfig)).userId && d.mainVideoId) {
        result.videoUrl = "https://cloud.video.taobao.com/play/u/" + d.userId + "/p/1/e/6/t/1/" + d.mainVideoId + ".mp4";
    }
    if (result.videoUrl === undefined && document.querySelector(".lib-video video")) {
        result.videoUrl = document.querySelector(".lib-video video").src;
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

    // 视频
    if (document.querySelectorAll("#J-dbi-tbplayer video,.image-slider video source, .bc-video-player video, .bc-video-player video source")[0]) {
        result.videoUrl = document.querySelectorAll("#J-dbi-tbplayer video,.image-slider video source, .bc-video-player video, .bc-video-player video source")[0].src;
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
        var srcStr = zhuEles[i].src.replace(/\/n\d+\//, '/imgzone/').replace(/s\d+x\d+_(.*?)\//, '$1/').replace(/!cc_50x64.jpg$/, '').replace('.avif', '')
        result.zhu.push({"src": srcStr, "name": "主图_" + (i + 1)});
    }

    // 视频
    if (document.getElementById("video-player_html5_api")) {
        result.videoUrl = document.getElementById("video-player_html5_api").src;
    }

    // 详情图
    if (document.getElementById("J-detail-content").getElementsByClassName("ssd-module-wrap")[0]) {
        let divs = document.getElementById("J-detail-content").getElementsByClassName("ssd-module-wrap")[0].getElementsByTagName("div");
        for (let i = 0; i < divs.length; i++) {
            var div = divs[i];
            var style = div.currentStyle || window.getComputedStyle(div, false)
            var imgUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
            if (imgUrl.endsWith(".avif") || imgUrl.endsWith(".AVIF")) {
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

    // 视频
    var meta = document.querySelector('meta[name="microscope-data"]'), scripts = document.querySelectorAll("script"), imgVedioID;
    if (meta && (userId = meta.content.match(/userid=(\d+);/), userId)) {
        userId = userId[1];
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].innerText && !imgVedioID && (imgVedioID = scripts[i].innerText.match(/"videoId":"(\d+)"/), imgVedioID)) {
                imgVedioID = imgVedioID[1];
                result.videoUrl = "https://cloud.video.taobao.com/play/u/" + userId + "/p/1/e/6/t/1/" + imgVedioID + ".mp4";
            }
        }
    }
    if (result.videoUrl === undefined) {
        document.querySelectorAll("video").forEach(e => {
            result.videoUrl = e.currentSrc;
        });
    }

    if (result.videoUrl.startsWith("blob")) {
        for (var l = document.querySelectorAll("script"), p = 0; p < l.length; p++) if (l[p].innerText) {
            if (imgVedioID = l[p].innerText.match(/"imgVedioID":"(\d+)"/), imgVedioID && (imgVedioID = imgVedioID[1], userId = l[p].innerText.match(/"userId":"(\d+)"/), userId = userId ? userId[1] : "", imgVedioID && userId)) {
                result.videoUrl = "https://cloud.video.taobao.com/play/u/" + userId + "/p/1/e/6/t/1/" + imgVedioID + ".mp4";
            }
            var g = l[p].innerText.match(/"valFlashUrl".*?"(.*?)"/);
            if (g) {
                var I = g[1].replace(/(\/\/cloud\.video\.taobao\.com\/play\/u\/\d+\/p\/\d+\/e\/)\d+(\/t\/)\d+(.+)swf/, "$16$21$3mp4");
                if ((I = I.replace(/^\/\//, "https://")).indexOf(".mp4") > 0) {
                    result.videoUrl = I;
                }
            }
        }
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

let platform_pinduoduo = function (_url, result) {
    // 商品名称
    result.name = document.querySelector("#main > div > div._2atM6O_- > div:nth-child(3) > div > span > span._1fdrZL9O.enable-select > span").innerText;

    // 主图
    var zhuEle = document.querySelectorAll("#main > div > div._3-UgVhPL > div._2wJiTrdH > div._1fBWnMAg ._1bq9lpD4")
    zhuEle = Array.from(zhuEle).splice(1, zhuEle.length - 2)
    for (let i = 0; i < zhuEle.length; i++) {
        var imgSrc = zhuEle[i].getElementsByTagName("img")[0].src;
        if (imgSrc === undefined || imgSrc === '') {
            imgSrc = zhuEle[i].getElementsByTagName("img")[0].getAttribute("data-src");
        }
        result.zhu.push({"src": imgSrc.substring(0, imgSrc.indexOf("?")), "name": "主图_" + zhuEle[i].getAttribute("data-uniqid")});
    }

    // 详情图
    var eles = document.querySelectorAll("#main > div > div._2atM6O_- > div._2x7eezOm > div > div img");
    for (let i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var imgSrc = ele.src;
        if (imgSrc === undefined || imgSrc === '') {
            imgSrc = ele.getAttribute("data-src");
        }
        result.xiang.push({"src": imgSrc.substring(0, imgSrc.indexOf("?")), "name": "详情图_" + (i + 1)});
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