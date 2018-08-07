"use strict";

let {WeToast} = require('components/toast/toast.js');
import cos from 'utils/cos.js';

App({
  WeToast,
  onLaunch() {},
  onShow() {},
  onHide() {},
  globalData: {
      userInfo: null,
      openId: null,
      sessionId: null,
      toJump:{
          url:false
      },
      devices:null,
      hex:null,
      services:null,
      conble:null,
      open_bluetooth:'',
      close_blueT:'close'
  },
  utils: {
    cos: cos
	}
});
