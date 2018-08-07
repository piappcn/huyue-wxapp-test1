var storage = require("storage.js");
var app = getApp();

let conBle = {};
let devices = app.globalData.devices;
conBle.init = function() {
  // 判断之前是否连接过蓝牙
  if (app.globalData.devices == undefined) {
    app.globalData.conble = false;
    return false;
  }else if(app.globalData.open_bluetooth == ""){
    return false;
  }

  wx.getConnectedBluetoothDevices({
    services: app.globalData.devices.advertisServiceUUIDs,
    success: function(res) {
      // 判断现在蓝牙是否处于连接状态
      if (res.devices == "") {
        lanya1();
      } else {
        // 连接状态
        app.globalData.conble = true;
        return false;
      }
      // that.setData({
      //   btnshow: false
      // })
    }
  });

  var lanya1 = function() {
    var id = app.globalData.devices.deviceId;
    wx.closeBLEConnection({
      deviceId:id,
      success: function (res) {
        wx.openBluetoothAdapter({
          success: function(res) {
            // 调用connectTO（）尝试连接上一次连接过的蓝牙
            connectTO(app.globalData.devices.deviceId);
          },
          fail: function() {
            // that.setData({
            //   btnshow: false
            // })
            return false;
          }
        });
      },fail:function(){
        wx.openBluetoothAdapter({
          success: function(res) {
            // 调用connectTO（）尝试连接上一次连接过的蓝牙
            connectTO(app.globalData.devices.deviceId);
          },
          fail: function() {
            // that.setData({
            //   btnshow: false
            // })
            return false;
          }
        });
      }
    })
  };

  var connectTO = function(id) {
    wx.createBLEConnection({
      deviceId: id,
      timeout: 20 * 1000,
      success: function(res) {
        console.log("连接成功");
        console.log(res);
        // that.setData({
        //   btnshow: true
        // })
        app.globalData.conble = 'loading';
        setTimeout(function() {
          lanya6();
        }, 2000);
      },
      fail: function(err) {
        console.log("连接失败");
        console.log("连接失败" + err);
        app.globalData.conble = false;
        return false;
      }
    });
  };

  var lanya6 = function() {
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: app.globalData.devices.deviceId,
      success: function(res) {
        app.globalData.services = res.services;

        setTimeout(function() {
          lanya7();
        }, 300);
      },
      fail: function() {
        console.log("获取连接设备的service服务fail");
      },
      complete: function() {
        console.log("获取连接设备的service服务complete");
      }
    });
  };

  //获取连接设备的所有特征值  for循环获取不到值
  var lanya7 = function() {
    // var serverNum = 0;
    // var serverNum2 = 1;
    // console.log(that.data.services[serverNum].uuid, 'serviceId: that.data.services[serverNum].uuid')
    // console.log(that.data.services, 'serviceId: that.data.services')
    wx.getBLEDeviceCharacteristics({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: app.globalData.devices.deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取

      serviceId: app.globalData.services[0].uuid,
      success: function(res) {
        for (var i = 0; i < res.characteristics.length; i++) {
          if (res.characteristics[i].properties.notify) {
            // console.log("11111111", that.data.services[i].uuid);
            // console.log("22222222222222222", res.characteristics[i].uuid);
            // this.setData({
            storage.set.notifyServicweId = app.globalData.services[i].uuid;
            storage.set.notifyCharacteristicsId = res.characteristics[i].uuid;
            // })
          }
          if (res.characteristics[i].properties.write) {
            // this.setData({
            storage.set.writeServicweId = app.globalData.services[i].uuid;
            storage.set.writeCharacteristicsId = res.characteristics[i].uuid;
            storage.set.readServicweId = "";
            storage.set.readCharacteristicsId = "";
            // })
          } else if (res.characteristics[i].properties.read) {
            // this.setData({
            storage.set.readServicweId = app.globalData.services[i].uuid;
            storage.set.readCharacteristicsId = res.characteristics[i].uuid;
            // })
          }
        }

        setTimeout(function() {
          lanya9();
        }, 300);

        // console.log('device getBLEDeviceCharacteristics:', res.characteristics);

        // that.setData({
        //   msg: JSON.stringify(res.characteristics),
        // })
      },
      fail: function() {
        console.log("获取连接设备的所有特征值fail");
      },
      complete: function() {
        // console.log("获取连接设备的所有特征值complete");
      }
    });
  };

  //启用低功耗蓝牙设备特征值变化时的 notify 功能
  var lanya9 = function() {
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: app.globalData.devices.deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: storage.set.notifyServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: storage.set.notifyCharacteristicsId,
      success: function(res) {
        console.log("notifyBLECharacteristicValueChange success", res.errMsg);
        // modal.toast('启用特征值--success');

        setTimeout(function() {
          lanya10();
        }, 300);
      },
      fail: function() {
        console.log("shibai");
      }
    });
  };

  //接收消息
  var lanya10 = function() {
    // modal.toast('开始监听接收消息');
    // app.globalData.lanya_close = false;
    // 必须在这里的回调才能获取
    app.globalData.conble = true
    wx.onBLECharacteristicValueChange(function(characteristic) {
      let hex = Array.prototype.map
        .call(new Uint8Array(characteristic.value), x =>
          ("00" + x.toString(16)).slice(-2)
        )
        .join("");
      console.log(hex);
      // modal.toast(hex);
      app.globalData.hex = hex;
    });
    wx.readBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
      deviceId: app.globalData.devices.deviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
      serviceId: storage.set.readServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
      characteristicId: storage.set.readCharacteristicsId,
      success: function(res) {
        console.log("readBLECharacteristicValue:", res.errMsg);
      }
    });
  }


};

module.exports = conBle;
