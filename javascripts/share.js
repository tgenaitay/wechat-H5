/* 微信分享 WeChat sharing */

var wechatUrl;
if(window.location.href.indexOf('#') < 0){
    wechatUrl = window.location.href;
}else{
    wechatUrl = window.location.href.substr(0,window.location.href.indexOf('#'));
}


// jssdk
var jssdkPushData = {
    "url": wechatUrl
};

ajaxfun("GET", "/weixin/jssdk", jssdkPushData, "json", jssdkCallback);

function jssdkCallback(data){
    if(data){
        wechatShare(data.appid, data.time, data.noncestr, data.sign);
    }else{
        //console.log(data.msg);
    }
}


function wechatShare(appid_val, timestamp_val, nonceStr_val, signature_val){
  wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appid_val, // 必填，公众号的唯一标识
      timestamp: timestamp_val, // 必填，生成签名的时间戳
      nonceStr: nonceStr_val, // 必填，生成签名的随机串
      signature: signature_val,// 必填，签名，见附录1
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });

  wx.ready(function(){

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareTimeline({
        title: shareData.title, // 分享标题
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数

            //alert('分享成功');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            // alert("分享失败")
        }
    });


    wx.onMenuShareAppMessage({
        title: shareData.title, // 分享标题
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        desc: shareData.desc,
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert('分享成功');
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
           // alert("分享失败")
        }
    });

  });

  wx.error(function(res){
    //alert("无法使用微信JS")
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

  });

}
