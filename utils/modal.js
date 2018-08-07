/**
 * @fileoverview 类型判断
 * @author erikqin | erikqin@tencent.com
 * @version 1.0 | 2016-11-16 | erikqin    // 初始版本。
 * @example    // 典型的调用示例。
    var is = require('../../utils/modal.js');
    modal.loading();
 */

var modal = {};

modal.loading = function(title = "加载中",duration=10000){
    wx.showToast({title:title,icon:'loading',duration:duration});
}

modal.hide = function(){
    wx.hideToast();
}

modal.toast = function(title="温馨提示",icon="success",duration=1500,callback=function(){}){
    wx.showToast({
        title:title,
        icon:icon,
        duration:typeof duration!='function'?duration:1500,
        success:typeof duration=='function'?duration:callback
    });
}

modal.confirm = function(title="系统提示",content="提示内容",callback=function(){}){
    wx.showModal({
        title: title,
        content: content,
        confirmColor:'#2E65FB',
        success: function(res) {
            callback.call(this,res.confirm);
        }
    });
}

module.exports = modal