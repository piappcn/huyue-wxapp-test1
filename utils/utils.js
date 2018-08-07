import is from './is.js';
import modal from './modal.js';

function formatTime(date, isShort) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + (isShort ? ([hour, minute, second].map(formatNumber).join(':')) : '')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*deepcopy*/
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return Object(val);
}



function assignKey(to, from, key) {
  var val = from[key];
  if (val === undefined || val === null) {
    return;
  }
  if (hasOwnProperty.call(to, key)) {
    if (to[key] === undefined || to[key] === null) {
      throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
    }
  }
  if (!hasOwnProperty.call(to, key) || !is.isObject(val)) {
    to[key] = val;
  } else {
    to[key] = assign(Object(to[key]), from[key]);
  }
}



function assign(to, from) {
  if (to === from) {
    return to;
  }
  from = Object(from);
  // 生命周期方法
  var lifekeys = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload']
  var lifes = {}
  lifekeys.forEach((key) => {
    lifes[key] = to[key];
  });
  for (var key in from) {
    if (lifekeys.indexOf(key) != -1) {
      (function(_key) {
        to[_key] = function(options) {
          if (lifes[_key]) {
            lifes[_key].call(this, options);
          }
          from[_key].call(this, options);
        }

      })(key)
    } else {
      if (hasOwnProperty.call(from, key)) {
        assignKey(to, from, key);
      }
    }

  }
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(from);
    for (var i = 0; i < symbols.length; i++) {
      if (propIsEnumerable.call(from, symbols[i])) {
        assignKey(to, from, symbols[i]);
      }
    }
  }
  return to;
}

function deepCopy(target) {
  target = toObject(target);
  for (var s = 1; s < arguments.length; s++) {
    assign(target, arguments[s]);
  }
  return target;
}

function share(obj) {
  return {
    onShareAppMessage: function(res) {
      return {
        title: obj.title || '自定义分享标题',
        imageUrl: obj.imageUrl || '',
        path: obj.path || '/page/index'
      }
    }
  }
}

function convertToStarsArray(stars) {
  if (stars == 'null') { stars = 0; }
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function uuid() {
  return (+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
};


// function uuid(len, radix) {
//     var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
//     var uuid = [], i;
//     radix = radix || chars.length;

//     if (len) {
//       // Compact form
//       for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
//     } else {
//       // rfc4122, version 4 form
//       var r;

//       // rfc4122 requires these characters
//       uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
//       uuid[14] = '4';

//       // Fill in random data.  At i==19 set the high bits of clock sequence as
//       // per rfc4122, sec. 4.1.5
//       for (i = 0; i < 36; i++) {
//         if (!uuid[i]) {
//           r = 0 | Math.random()*16;
//           uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
//         }
//       }
//     }

//     return uuid.join('');
// }

// 8 character ID (base=2)
// uuid(8, 2)  //  "01001010"
// // 8 character ID (base=10)
// uuid(8, 10) // "47473046"
// // 8 character ID (base=16)
// uuid(8, 16) // "098F4D35"

module.exports = {
  formatTime: formatTime,
  assign: deepCopy,
  share: share,
  convertToStarsArray: convertToStarsArray,
  uuid: uuid
}
