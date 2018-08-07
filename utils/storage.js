import is from './is.js';
var storage = {};

storage.set = function(key, data, syncOrCallback = true) {
    if (is.isBoolean(syncOrCallback)) {
        wx.setStorageSync(key, data);
    } else {
        wx.setStorage({
            key: key,
            data: data,
            success: function() {
                is.isFunction(syncOrCallback)&&syncOrCallback.call();
            }
        });
    }
}

storage.get = function(key, syncOrCallback = true) {
    if (is.isBoolean(syncOrCallback)) {
        return wx.getStorageSync(key);
    } else {
        wx.setStorage({
            key: key,
            success: function(res) {
                is.isFunction(syncOrCallback)&&syncOrCallback.call(this,res);
            }
        });
    }
}

storage.remove = function(key, syncOrCallback = true) {
    if (is.isBoolean(syncOrCallback)) {
        wx.removeStorageSync(key);
    } else {
        wx.removeStorage({
            key: key,
            success: function(res) {
                is.isFunction(syncOrCallback)&&syncOrCallback.call();
            }
        })
    }
}

storage.clear = function(sync = true) {
    if (is.isBoolean(syncOrCallback)) {
        wx.clearStorageSync();
    } else {
        wx.clearStorage();
    }
}

module.exports = storage;