import html2canvas from 'html2canvas'
import moment from 'moment'
import { Toast } from 'mint-ui'

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

export const userAgent = function () {
    const u = navigator.userAgent.toLowerCase()
    if (u.match(/MicroMessenger/i) == 'micromessenger') {
        wx.miniProgram.getEnv(function(res) {
            if (res.miniprogram) {
                return 'miniprogram'
            } else {
                return 'weixin'
            }
        })
    } else {
        return 'normal'
    }
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

/**
 * 保存html到图片
 * @param {*} json 
 */
export const saveHtml2Img = function(tag) {
    html2canvas(tag, {
        useCORS: true
    }).then((canvas) => {
        // 生成base64图片数据
        const imgData = canvas.toDataURL('image/png')
        // 获取生成的图片的url
        const imgUri = imgData.replace('image/png', 'image/octet-stream')
        // // 下载图片
        // const filename = 'mhelper-' + moment().format('YYYYMMDDhhmmss') + '.png'

        // const a = document.createElement('a')
        // a.href = imgUri
        // a.download = filename

        // const event = document.createEvent('MouseEvents')
        // event.initMouseEvent('click', true, true)
        // a.dispatchEvent(event)
        // Toast('保存成功！')
        return imgUri
    })
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


/**
   * 分享操作
   * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
   * @param {Boolean} bh 是否分享链接
   */
  function shareAction(sb,bh) {
	console.log('heiheihei')
	var msg={content:"你好啊",extra:{},"pictures":["_www/logo.png"]};
	// 发送分享
	if(sb.s.authenticated){
		console.log('---已授权---');
		shareMessage(msg, sb.s);
	}else{
		console.log('---未授权---');
		sb.s.authorize(function(){
//			shareMessage(msg,sb.s);
		}, function(e){
			console.log('认证授权失败：'+e.code+' - '+e.message);
		});
	}
}
/**
   * 发送分享消息
   * @param {JSON} msg
   * @param {plus.share.ShareService} s
   */
function shareMessage(msg, s){
	console.log(JSON.stringify(msg));
	s.send(msg, function(){
		console.log('分享到"'+s.description+'"成功！');
	}, function(e){console.log('分享到"'+s.description+'"失败: '+JSON.stringify(e));
	});
}
// 使用Logo图片分享
function shareLogoPicture(){
	console.log('使用Logo分享图片：');
	var url='_www/logo.png';
	plus.io.resolveLocalFileSystemURL(url, function(entry){
		pic.src=entry.toLocalURL();
		pic.realUrl=url;
	}, function(e){
		console.log('读取Logo文件错误：'+e.message);
	});
}
// 打开分享
function shareShow(){
    var shares = null;
    // H5 plus事件处理
    function plusReady() {
      updateSerivces();
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener('plusready', plusReady, false);
    }
    /**
     * 更新分享服务
     */
    function updateSerivces() {
      plus.share.getServices(function (s) {
        shares = {};
        for (var i in s) {
          var t = s[i];
          shares[t.id] = t;
        }
      }, function (e) {
        console.log('获取分享服务列表失败：' + e.message);
      });
	}
	console.log("asdgjkhg");
	var shareBts=[];
	// 更新分享列表
	var ss=shares['weixin'];
	if(navigator.userAgent.indexOf('qihoo')<0){  //在360流应用中微信不支持分享图片
		ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
		shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
	}
	ss=shares['qq'];
	ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
//	shareAction(shareBts[e.index-1],false);
	plus.nativeUI.actionSheet({title:'分享',cancel:'取消',buttons:shareBts}, function(e){
		
		(e.index>0)&&shareAction(shareBts[e.index-1],false);
    });
}

// bus总线-观察者模式

export const Bus = {
    callbacks: [],
    on: function(type, handler) {
        this.callbacks.push({ type, handler })
    },
    emit: function(type, data) {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (type == this.callbacks[i].type) this.callbacks[i].handler(data)
        }
    }
}