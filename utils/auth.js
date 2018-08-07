/*
 * @method          //工具方法
 *   @param args {Function}            // 参数：可选, 授权后业务自己逻辑函数
 *
 * @description    // 附加说明。
 *   1) 本方法主要用于授权和上报数据，实际功能就是封装统一的小程序授权方法，当授权失败会自动再次授权，
 *    授权次数由login_num控制，errorCode为失败主动在此请求的次数，默认3次
 *    依赖两个文件
 *     config: 当前项目的配置文件主域和访问接口地址
 *     promisify：将原生小程序的api promise化
 *   2) 本地storage 会存储 session值:wxa_session_id @params String， 当前登陆用户的信息： user_info @params {}
 *
 * @example    // 典型的调用示例。
 *  var st = function(){
 *   console.log('执行业务的逻辑', 23333333333333333333333333);
 *   }
 *  auth(st);
 */

import config from '../config.js';
import promisify from './promisify.js';

// 需要使用的微信 API，转成返回 Promise 的接口
let checkSession = promisify(wx.checkSession);
let login = promisify(wx.login);
let getUserInfo = promisify(wx.getUserInfo);
let request = promisify(wx.request);
let login_num = 3;
const errorCode = 12300;

function upUserInfo(wxa_session_id, callback) {
    var mobile = wx.getStorageSync('mobile');
    // console.log('mobile',mobile);

    getUserInfo().then(function (res) {

        var user_info = res.userInfo;
        var infoData = Object.assign(user_info, {wxa_session_id: wxa_session_id});
        // console.log(infoData);
        wx.setStorageSync('user_info', infoData);
        var pUrl = config.host + config.updateInfoCgi + '?wxa_session_id=' + wxa_session_id + '&mobile=' + mobile;
        // console.log('getUserInfo接口url',pUrl);
        // console.log('getUserInfo数据',infoData);

        request({
            url: pUrl,
            data: infoData
        }).then(function (res) {
            // console.log('getUserInfo下行数据',res);
            if (res.data.ret == 0) {
                wx.setStorageSync('user_info', Object.assign(infoData, res.data.data));
                // console.log('用户数据更新成功！')
                //数据是否上报都执行
                wxa_session_id && callback && callback();
            } else {
                // login_oper(callback);
                // console.log(res.data.msg);
            }
        }, function () {
            // console.log('上报用户数据失败！');
        });
    }, function () {
        // console.log('获取用户数据失败！');
        wx.showModal({
            title: '警告',
            content: '若不授权微信登陆，则无法使用该小程序的服务；请点击确定重新获取授权',
            confirmText: '授权',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    if (wx.openSetting) {
                        var setBugTimer = setTimeout(function () {
                            clearTimeout(setBugTimer);
                            wx.openSetting({
                                success: function (res) {
                                    if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {

                                    }
                                }
                            })
                        }, 10)

                    } else {
                        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
                        wx.showModal({
                            title: '提示',
                            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
                            showCancel: false,
                            confirmText: '确定'
                        })
                    }
                }
            }
        })
    });
}


function login_oper(callback) {

    if (callback && typeof callback != 'function') {
        return new Error('callback 必须为函数')
    }

    login().then(function (res) {
        if (res.code) {
            var thatCode = res.code;
            // console.log('得到code接口的返回',res)

            //发起网络请求
            request({
                url: config.host + config.loginCgi,
                method: 'GET',
                data: {wxa_code: res.code},
                header: {'Content-Type': 'application/json'}
            }).then(function (res) {
                // console.log('得到session接口的返回',res)

                if (res && res.data && res.data.ret == 0) {
                    var wxa_session_id = res.data.data.wxa_session_id;
                    var wxa_time_stamp = res.data.data.wxa_time_stamp;

                    wx.setStorageSync('wxa_session_id', wxa_session_id);
                    wx.setStorageSync('wxa_time_stamp', wxa_time_stamp);

                    if (res.data.data.need_update) {
                        upUserInfo(wxa_session_id, callback);
                    }

                } else {
                    if (res.data.errorcode == errorCode) {
                        login_num--;
                        if (login_num < 0) {
                            wx.showToast({
                                title: res.data.msg,
                                duration: 2000
                            })
                            return;
                        }
                        login_oper(callback);
                    }
                    // console.log(res.data.msg);
                }
            }, function (res) {
                if (res.data.errorcode == errorCode) {
                    login_num--;
                    if (login_num < 0) {
                        wx.showToast({
                            title: res.data.msg,
                            duration: 2000
                        })
                        // return;
                    }else{
                        wx.showToast({
                            title: 'code'+thatCode+' 换session 3次失败',
                            duration: 2000
                        })
                        return false;
                    }
                    login_oper(callback);
                }
            })
        } else {
            // console.log('获取用户登录态失败！' + res.errMsg)
            wx.showToast({
                icon: 'none',
                title: '获取code获取失败'
            })
            wx.switchTab({
                url: '/pages/login/login'
            })
        }
    });
}

function auth(callback) {
    var wxa_time_stamp = wx.getStorageSync('wxa_time_stamp');
    if(!wxa_time_stamp){
        login_oper(callback);
    }else{
        checkSession().then(function (res) {
            var wxa_time_stamp = wx.getStorageSync('wxa_time_stamp');
            var wxa_session_id = wx.getStorageSync('wxa_session_id');

            // console.log('',wxa_time_stamp)
            // console.log('wxa_session_id',wxa_session_id)

            var nowTimeStamp = new Date().getTime();
            if (wxa_time_stamp && (wxa_time_stamp < nowTimeStamp)) {
                login_oper(callback);
            } else {
                upUserInfo(wxa_session_id, callback);
            }
        }, function (res) {
            login_oper(callback);
        })
    }
}

module.exports = auth;