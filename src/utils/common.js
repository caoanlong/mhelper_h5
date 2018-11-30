// 获取地址栏参数
export const getQueryString = function (name) {
    const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
    const r = window.location.search.substr(1).match(reg)
    if(r != null) return unescape(r[2])
    return null
}

// 判断是否为微信浏览器
export const isWeixin = function () {
    const u = navigator.userAgent.toLowerCase() 
    return u.match(/MicroMessenger/i) == "micromessenger"
}

//将base64转换为文件
export const dataURLtoFile = function(dataurl, filename) {
    const ts = new Date().getTime() + '.jpg'
    let arr = dataurl.split(',')
        , mime = arr[0].match(/:(.*?);/)[1]
        , bstr = atob(arr[1])
        , n = bstr.length
        , u8arr = new Uint8Array(n)
    while(n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename || ts, { type: mime })
}

/**
 *
 * @param img html的img标签
 * @param ext 图片格式
 * @returns {string}
 */
function getImageBase64(img, ext) {
    var canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
    var dataURL = canvas.toDataURL("image/" + ext);  //返回的是一串Base64编码的URL并指定格式
    canvas = null; //释放
    return dataURL;
}

/**
 *
 * @param url 图片路径
 * @param ext 图片格式
 * @param callback 结果回调
 */
export const getUrlBase64 = function(url, callback) {
    var canvas = document.createElement("canvas");   //创建canvas DOM元素
    var ctx = canvas.getContext("2d");
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.src = url;
    console.log(img)
    var ext = url.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    img.onload = function () {
        canvas.height = 60; //指定画板的高度,自定义
        canvas.width = 85; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
        var dataURL = canvas.toDataURL("image/" + ext);
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
    };
}

/**author:Caoanlong *day:2017-08-24
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
export const formDataReq = function(json) {
    var formData = new FormData()
    for (let attr in json) {
        formData.append(attr, json[attr])
    };
    return formData
}