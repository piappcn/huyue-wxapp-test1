/**
 * @fileoverview 类型判断
 * @author erikqin | erikqin@tencent.com
 * @version 1.0 | 2016-11-16 | erikqin    // 初始版本。
 * @example    // 典型的调用示例。
 var is = require('../../utils/is.js');
 console.log(is.isArray([]));
 */
import storage from './storage.js';

var toString = Object.prototype.toString;
var sysInfo = '';
function isBoolean(value) {
  return value === true || value === false || toString.call(value) === '[object Boolean]';
}

function getSysInfo(){
  sysInfo = storage.get('sysInfo');
  if(sysInfo){
    return sysInfo;
  }else{
    sysInfo = wx.getSystemInfoSync();
    storage.set('sysInfo',sysInfo);
  }
}

function getPlatform(){
  return getSysInfo()["platform"];
}

// onLaunch: function() {
//   this.globalData.sysinfo = wx.getSystemInfoSync()
// },
// getModel: function () { //获取手机型号
//   return this.globalData.sysinfo["model"]
// },
// getVersion: function () { //获取微信版本号
//   return this.globalData.sysinfo["version"]
// },
// getSystem: function () { //获取操作系统版本
//   return this.globalData.sysinfo["system"]
// },
// getPlatform: function () { //获取客户端平台
//   return this.globalData.sysinfo["platform"]
// },
// getSDKVersion: function () { //获取客户端基础库版本
//   return this.globalData.sysinfo["SDKVersion"]
// }


module.exports = {
  isBoolean: isBoolean,
  getPlatform: getPlatform,
}
