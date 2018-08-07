//蓝牙错误码(errCode)列表
import modal from './modal.js';
import promisify from './promisify.js';
var hyBle = {};
hyBle.bleErrorPopStr = function (num) {
  let str = '';
  if (num == 10000) {
    str = '未初始化蓝牙适配器';
  }
  if (num == 10001) {
    str = '当前蓝牙适配器不可用';
  }
  if (num == 10002) {
    str = '没有找到指定设备';
  }
  if (num == 10003) {
    str = '连接失败';
  }
  if (num == 10004) {
    str = '没有找到指定服务';
  }
  if (num == 10005) {
    str = '没有找到指定特征值';
  }
  if (num == 10006) {
    str = '当前连接已断开';
  }
  if (num == 10007) {
    str = '当前特征值不支持此操作';
  }
  if (num == 10008) {
    str = '其余所有系统上报的异常';
  }
  if (num == 10009) {
    str = 'ndroid 系统特有，系统版本低于 4.3 不支持BLE';
  }
  if (num == 10010) {
    str = '没有找到指定描述符';
  }
  return str;
}
hyBle.bleErrorPop = function (str, sourceFunName) {
  let that = this;
  let popStr = '';
  if (typeof str === 'string') {
    popStr = str;
  } else {
    popStr = ble.bleErrorPopStr(num);
  }
  modal.toast(str);
}

/**
 * ArrayBuffer 转换为  Hex
 */
hyBle.buf2hex = function (buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

/**
 * a1 初始化蓝牙适配器
 */
hyBle.openBluetoothAdapter = function (success, fail, complete) {
  wx.openBluetoothAdapter({
    success: function (res) {
      success && success(res);
    },
    fail: function (res) {
      fail && fail();
      console.log(res)
    },
    complete: function () {
      complete && complete();
    }
  })
}
/**
 * a2 关闭蓝牙模块。调用该方法将断开所有已建立的链接并释放系统资源
 * @param success
 * @param fail
 * @param complete
 */
hyBle.closeBluetoothAdapter = function (success, fail, complete) {
  wx.closeBluetoothAdapter({
    success: function (res) {
      success && success(res);
    },
    fail: function (res) {
      fail && fail(res);
    },
    complete: function (res) {
      complete && complete();
    }
  })
}
/**
 * 获取本机蓝牙适配器状态
 * @param success
 * @param fail
 * @param complete
 */
hyBle.getBluetoothAdapterState = function (success, fail, complete) {

  wx.getBluetoothAdapterState({
    success: function (res) {
      success && success(res);
    }, fail: function (res) {
      fail && fail(res);
    },
    complete: function (res) {
      complete && complete(res);
    }
  })

}

/**
 * //监听蓝牙适配器状态变化事件
 * @param success
 */
hyBle.onBluetoothAdapterStateChange = function (success) {
  wx.onBluetoothAdapterStateChange(function (res) {
    success && success(res);
  })
}

/**
 开始搜寻附近的蓝牙外围设备
 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
 services参数说明：某些蓝牙设备会广播自己的主 service 的 uuid。如果这里传入该数组，那么根据该 uuid 列表，只搜索有这个主服务的设备。
 * @param success
 * @param fail
 * @param complete
 */
hyBle.startBluetoothDevicesDiscovery = function (success, fail, complete) {
  wx.startBluetoothDevicesDiscovery({
    // services: ['FEE7'],
    success: function (res) {
      success && success(res);
    }, fail: function (res) {
      fail && fail(res);
    },
    complete: function (res) {
      complete && complete(res);
    }
  })
}

/**
 * 停止搜寻附近的蓝牙外围设备。请在确保找到需要连接的设备后调用该方法停止搜索。
 * @param success
 * @param fail
 * @param complete
 */
hyBle.stopBluetoothDevicesDiscovery = function (success, fail, complete) {
  wx.stopBluetoothDevicesDiscovery({
    success: function (res) {
      success && success(res);
    }, fail: function (res) {
      fail && fail(res);
    },
    complete: function (res) {
      complete && complete(res);
    }
  })
}

/**
 * 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备
 */
hyBle.getBluetoothDevices = function (success, fail, complete) {
  wx.getBluetoothDevices({
    success: function (res) {
      success && success(res);
    }, fail: function (res) {
      fail && fail(res);
    },
    complete: function (res) {
      complete && complete(res);
    }
  })
}

/**
 * 获取已配对的蓝牙设备
 * 需要注意的是，参数 services（Array）是必填的，但是官方示例中以及各种坑爹 demo 里从没见过有谁填写。不填写这个属性此方法，将无法获取到任何已配对设备。
 * 如果要调用此方法，则代表需要连接特定设备，并且知道该设备的一个主服务 serviceId。
 * 如暂时不知道这个 ID，可以先手动连接一次想要连接的设备，然后获取 service 列表，记录属性 primary 为 true 的值至少一个。
 */
hyBle.getConnectedBluetoothDevices = function (serviceId,success, fail, complete) {
  var that = this;
  wx.getConnectedBluetoothDevices({
    services: serviceId,
    success: function (res) {
      success && success(res);
    },fail: function (res) {
      fail && fail(res);
    },complete: function (res) {
      complete && complete(res);
    }
  });
}

/**
 * 监听寻找到新设备的事件
 * @param success
 */
hyBle.onBluetoothDeviceFound = function(success){
  wx.onBluetoothDeviceFound(function(devices) {
    success && success(devices);
  })
}


/**
 * 连接低功耗蓝牙接口
 */
hyBle.createBLEConnection = function(deviceId,success, fail, complete) {
  wx.createBLEConnection({
    // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId: deviceId,
    success: function (res) {
      success && success(res);
    },fail: function (res) {
      fail && fail(res);
    },complete: function (res) {
      complete && complete(res);
    }
  })
}

/**
 * 断开与低功耗蓝牙设备的连接
 */
hyBle.closeBLEConnection = function(success, fail, complete) {
  wx.closeBLEConnection({
    success: function (res) {
      success && success(res);
    },fail: function (res) {
      fail && fail(res);
    },complete: function (res) {
      complete && complete(res);
    }
  })
}

/**
 * 获取蓝牙设备所有 service（服务）
 */
hyBle.getBLEDeviceServices = function(deviceId,success, fail, complete) {

  wx.getBLEDeviceServices({
    // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId: deviceId,
    success: function (res) {
      success && success(res);
    },fail: function (res) {
      fail && fail(res);
    },complete: function (res) {
      complete && complete(res);
    }
  })

}

/**
 * 获取蓝牙设备所有 characteristic（特征值）
 */
hyBle.getBLEDeviceCharacteristics = function(deviceId,serviceId,success, fail, complete) {
  wx.getBLEDeviceCharacteristics({
    // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId: deviceId,
    // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
    serviceId: serviceId,
    success: function (res) {
      success && success(res);
    },fail: function (res) {
      fail && fail(res);
    },complete: function (res) {
      complete && complete(res);
    }
  })
}

/**
 * 向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
 */
hyBle.writeBLECharacteristicValue =  function(deviceId,serviceId,characteristicId,success, fail, complete) {
// 这里的回调可以获取到 write 导致的特征值改变
  wx.onBLECharacteristicValueChange(function(characteristic) {
    console.log('characteristic value changed:', characteristic)
  })

// 向蓝牙设备发送一个0x00的16进制数据
  let buffer = new ArrayBuffer(1)
  let dataView = new DataView(buffer)
  dataView.setUint8(0, 0)

  wx.writeBLECharacteristicValue({
    // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId: deviceId,
    // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
    serviceId: serviceId,
    // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
    characteristicId: characteristicId,
    // 这里的value是ArrayBuffer类型
    value: buffer,
    success: function (res) {
      success && success(res);
    },fail: function (res) {
      fail && fail(res);
    },complete: function (res) {
      complete && complete(res);
    }
  })
}
/**
 * 启用低功耗蓝牙设备特征值变化时的 notify 功能。注意：必须设备的特征值支持notify才可以成功调用，具体参照 characteristic 的 properties 属性
 */
hyBle.notifyBLECharacteristicValueChanged = function(deviceId,serviceId,characteristicId,success, fail, complete) {

  wx.notifyBLECharacteristicValueChanged({
    state: true, // 启用 notify 功能
    // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId: deviceId,
    // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
    serviceId: serviceId,
    // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
    characteristicId: characteristicId,
    success: function (res) {
      success && success(res);
    },fail: function (res) {
      fail && fail(res);
    },complete: function (res) {
      complete && complete(res);
    }
  })

}

/**
 * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
 */
hyBle.onBLEConnectionStateChanged = function(success){
  wx.onBLEConnectionStateChanged(function(res) {
    // 该方法回调中可以用于处理连接意外断开等异常情况
    success && success(res);
    // console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
  })
}

/**
 * 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
 */
hyBle.onBLECharacteristicValueChange = function(success){
  wx.onBLECharacteristicValueChange(function(res) {
    success && success(res);
    // console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
  })
},



module.exports = hyBle
