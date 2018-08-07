'use strict';

import config from '../config.js';
import modal from './modal.js'

function callPay(payObj) {
  var paySignCgi = config.paySignCgi;
  // data为获取paySign时需要传的参数
  var data = {};
  wx.request({
    url: paySignCgi,
    method: 'POST',
    data: {
      order_id: payObj.order_id
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      var resData = res.data.data;
      wx.requestPayment({
        'timeStamp': resData.timeStamp,
        'nonceStr': resData.nonceStr,
        'package': resData.package,
        'signType': 'MD5',
        'paySign': resData.paySign,
        'success': function(res) {
          payObj.success(res)
        },
        'fail': function(res) {
          payObj.fail(res)
        }
      });
    },
    fail: function(res) {
      modal.confirm('', res.errMsg, function() {})
    }
  })
}

module.exports = callPay;
