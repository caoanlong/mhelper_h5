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