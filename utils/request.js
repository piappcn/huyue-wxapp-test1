'use strict';
import modal from './modal.js';
import storage from './storage.js';
import config from '../config.js';

var host = config.host;

module.exports = {
    get(url, data) {
        var data = data || {};
        if (!data['wxa_code']) {
            data['wxa_session_id'] = wx.getStorageSync('wxa_session_id') || '';
        }

        // console.log('get接口上行url',url,'接口上行数据',data)
        // host = 'http://127.0.0.1:9002/'
        return new Promise(function (resolve, reject) {
            wx.request({
                url: host + url.path,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
                success: function (res) {
                    // console.log('get接口下行url',url,'接口下行数据',res)
                    if (res.data.ret == 0) {
                        resolve(res)
                    } else {
                        resolve(res)
                    }
                },
                fail: function (res) {
                    // console.log('get接口失败',url,'接口下行数据',res)
                    reject(res)
                }
            })
        })
    },
    post(url, data) {
        //
        // if (!wx.getStorageSync('wxa_session_id')) {
        //     wx.setStorageSync('mobile', false);
        //     wx.navigateTo({
        //         url: `/pages/login/login`
        //     })
        // }
        var data = data || {};
        var wholeUrl = host + url.path + '?wxa_session_id=' + wx.getStorageSync('wxa_session_id');
        // console.log('post接口上行url',wholeUrl,'接口上行数据',data)
        return new Promise(function (resolve, reject) {
            wx.request({
                url: wholeUrl,
                data: data,
                method: 'POST',
                success: function (res) {
                    // console.log('post接口下行url',url,'接口下行数据',res)
                    if (res.data.ret == 0) {
                        resolve(res)
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: res.data.msg
                        })
                        resolve(res)

                    }
                },
                fail: function (res) {
                    modal.hide();
                    // console.log('post接口失败',url,'接口下行数据',res)
                    reject(res)
                }
            });
        })

    }
}
