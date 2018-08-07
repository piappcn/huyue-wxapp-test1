/**
 * @fileoverview 类型判断
 * @author erikqin | erikqin@tencent.com
 * @version 1.0 | 2016-11-16 | erikqin    // 初始版本。
 * @example    // 典型的调用示例。
    var is = require('../../utils/is.js');
    console.log(is.isArray([]));
 */
var toString = Object.prototype.toString;

function isBoolean(value) {
    return value === true || value === false || toString.call(value) === '[object Boolean]';
}

function isArguments(value) {
    return toString.call(value) === '[object Arguments]' || (value != null && typeof value === 'object' && 'callee' in value);
}

function isArray(value) {
    return toString.call(value) === '[object Array]';
}

function isObject(value) {
    return Object(value) === value;
}

function isUndefined(value) {
    return value === void 0;
}

function isFunction(value) {
    return toString.call(value) === '[object Function]' || typeof value === 'function';
}

function isEmpty(value) {
    if (isObject(value)) {
        var length = Object.getOwnPropertyNames(value).length;
        if (length === 0 || (length === 1 && isArray(value)) ||
            (length === 2 && isArguments(value))) {
            return true;
        }
        return false;
    }
    return value === '';
}

module.exports = {
    isBoolean: isBoolean,
    isArguments: isArguments,
    isArray: isArray,
    isObject: isObject,
    isUndefined: isUndefined,
    isFunction: isFunction,
    isEmpty: isEmpty
}
