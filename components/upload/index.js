/**
 * Copyright (c) 2017-2019 tencent, All rights reseved.
 * @fileoverview 上传
 * @author carllsun | carllsun@tencent.com
 * @version 1.0  | 2017-11-21 | carllsun    // 初始版本。
 * @param properties {Object} 
 *     imgUrl {String}  //(非必选) 上传按钮的样式，如果有图片url那就按照图片显示，默认没有图片，
 *                             你可以根据自己业务需要添加slot来确定自己想要的样式。
 *                             
 *     count {Number}          //(非必选) 上传图片的数量，默认是1张，由于小程序api限制最大9张，
 *                                 如果你传的参数大于9将会被改写成9，小于零被改写成0                          
 *     uploadUrl {String}      //(非必选) 上传服务的接口，默认内置。也可以根据业务自行调整
 *     isShow {Boolean}    //(非必选) 默认展示上传按钮，可以根据业务自行隐藏。
 *     hasEvent {Boolean}    //(非必选) 默认有事件，如果业务不能上传的时候请设置成false,
 *                               并且将你的上传按钮的样式改成不能上传的样式即可。
 * @slot //该插槽用于在评星组件后边增加文案。本组件不提供样式，请自行根据自己的需求来写。默认无。
 * 
 * @event _emitEvents   //对组件外暴露的事件， 统一的命名方式为 wii + 组件名  + event 如: wiiUploadEvent,
 *   that.triggerEvent('wiiUploadEvent', res) 攒不支持冒泡到父级组件。
 *   页面引用需要手动绑定该事件。自行处理。回调事件命名写法同意为： 组件名 + Callback,如： bind:wiiUploadEvent="rateCallback" 
 *   会将上传后的数据逐条已事件触发的形式传给父级。
 *
 * @warn
 *   1、默认是没有上传按钮的样式的，需要根据业务自行设置，方式自行选择。
 *   2、本组件只提供上传功能提供基础上传数据，至于你想怎样展示有各自业务自行设计样式，
 * @example    // 典型的调用示例。
    
    1.
     默认上传为1张

    <wii-upload img-url="http://p.qpic.cn/automall_pic/0/20170629182359_85552/0"  bind:wiiUploadEvent="uploadCallback">
    </wii-upload>
    
    2.
     上传多张。有上传按钮图片的。
    <wii-upload count="{{uploadCount}}" img-url="http://p.qpic.cn/automall_pic/0/20170629182359_85552/0"  bind:wiiUploadEvent="uploadCallback">
    </wii-upload>
    
    3.
     上传多张。有上传按钮图片的。上传按钮可以根据自己业务随意以slot的方式来设置

    <wii-upload  count="{{uploadCount}}" bind:wiiUploadEvent="uploadCallback">
      <image src="http://p.qpic.cn/automall_pic/0/20170629182359_85552/0"></image>
    </wii-upload>

    <wii-upload  count="{{uploadCount}}" bind:wiiUploadEvent="uploadCallback">
      <view>
        <text>我就是上传</text>
      </view>
    </wii-upload>

    4. 无事件情况
    hasEvent为false时没有事件这时的上传按钮就是不能上传的样式。能上传的时候hasEvent为true，上传按钮就是能上传的样式;
    <wii-upload  count="{{uploadCount}}" has-event="{{hasEvent}}"  bind:wiiUploadEvent="uploadCallback">
      <view>
        <text>我就是上传</text>
      </view>
    </wii-upload>

 */

const app = getApp();

Component({
    properties: {
        upload_progress: {
            type: Number,
            value: 0
        },
        imgUrl: {
            type: String,
            value: ''
        },
        count: {
            type: Number,
            value: 1,
            observer: function (newVal, oldVal) {
                if (newVal > 9) {
                    return newVal = 9;
                } else if (newVal < 1) {
                    return newVal = 1;
                }
            }
        },
        uploadUrl: {
            type: String,
            value: 'https://api2.wii.qq.com/utils/fileupload/image'
        },
        isShow: {
            type: Boolean,
            value: true
        },
        hasEvent: {
            type: Boolean,
            value: true
        },
        serverType: {
            type: String,
            value: ''
        },
        sourceTypeUpload: {
            type: String,
            value: ''
        },
        sourceTypeUploadBefore: {
            type: String,
            value: ''
        },
        size: {
            type: Number,
            value: 2
        }
    },
    data: {

    },
    attached() {},
    ready() {

    },
    methods: {
        uploadHook(e) { 
            var that = this;
            let sourceTypeUpload = ['album', 'camera']
            //由于模拟器可以支持多张上传，但是在真机环境是不支持的。上传平台的接口一直报服务异常。所以这边更改成上传1张
            if (this.data.sourceTypeUpload == 1) {
                sourceTypeUpload = ['camera'] 
            } else if (this.data.sourceTypeUpload == 2) {
                sourceTypeUpload = ['album'] 
            }
            wx.chooseImage({
                count: that.data.count,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: sourceTypeUpload, // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths;


                    for (let i = 0; i < tempFilePaths.length; i++) {
                        var tempFilePath = tempFilePaths[i];
                        var fileName;
                        try {
                            fileName = tempFilePath.match(/(http:\/\/tmp\/)(.+)/)[2];
                        } catch (e) {
                            fileName = tempFilePath.match(/(wxfile:\/\/)(.+)/)[2];
                        }

                        if (that.data.serverType == 'qcloud') {
                            wx.showLoading();
                            app.utils.cos(tempFilePath, fileName, (res) => {
                                console.log('res')


                                console.log('tempFilePaths----------------------')
                                console.log(res)
                                console.log('tempFilePaths----------------------')
                                var result = {
                                    ret: res.code,
                                    msg: res.message,
                                    data: {
                                        image_url: res.data.source_url
                                    }
                                }
                                wx.hideLoading();
                                that._emitEvents(result);
                            }, (res) => {
                                that.setData({
                                    upload_progress: res.progress
                                })
                                if (res.progress === 100) {
                                    that.setData({
                                        upload_progress: 0
                                    })
                                }
                            });
                        } else {
                            wx.uploadFile({
                                url: that.data.uploadUrl,
                                filePath: tempFilePath,
                                name: 'file',
                                header: {
                                    WXAPP: 'qq.com'
                                },
                                success: function (res) {
                                    var res = JSON.parse(res.data);
                                    var size = res.data.size[that.data.size];
                                    res.data.image_url = res.data.image_url.replace(/\/[0-9]+(?=[^0-9]*$)/, '/' + size);
                                    that.setData({
                                        imgUrl: res.data.image_url
                                    });
                                    that._emitEvents(res);
                                },
                                fail: function (res) {
                                    wx.showToast({
                                        title: res.msg,
                                        image: '/images/warning.svg',
                                        duration: 2000
                                    })
                                }
                            })
                        }
                    }
                }
            })

        },
        _emitEvents: function (res) {
            var that = this;  
            that.triggerEvent('wiiUploadEvent', res,{ bubbles: true });
        },
        
    }
})