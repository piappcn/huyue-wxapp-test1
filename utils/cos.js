/**
 * 最终上传到cos的URL
 * 把以下字段配置成自己的cos相关信息，详情可看API文档 https://www.qcloud.com/document/product/436/6066
 * REGION: cos上传的地区
 * APPID: 账号的appid
 * BUCKET_NAME: cos bucket的名字
 * DIR_NAME: 上传的文件目录
 */

var REGION = 'gz';
var APPID = '1254950508';
var BUCKET_NAME = 'face';
var DIR_NAME = '/images';
var cosUrl = `https://${REGION}.file.myqcloud.com/files/v2/${APPID}/${BUCKET_NAME}${DIR_NAME}`;

//鉴权服务器地址
var cosSignatureUrl = `https://tgw.wiiqq.com/test/api/cos/ticket/get_face_upload_ticket?bucket=${BUCKET_NAME}`;

/**
 * 腾讯云上传服务
 * @param  {String}   filePath 要上传的文件的地址
 * @param  {String}   fileName 上传腾讯云需要上传名字
 * @param  {Function} callback 上传成功回调函数
 */
function upload(filePath, fileName, callback) {

    // 鉴权获取签名
    wx.request({
        url: cosSignatureUrl,
        success: function(cosRes) {
            console.log(cosRes)
            // 签名
            var signature = cosRes.data.data.ticket
                // 头部带上签名，上传文件至COS
            wx.uploadFile({
                url: cosUrl + '/' + fileName,
                filePath: filePath,
                header: {
                    'Authorization': signature
                },
                name: 'filecontent',
                formData: {
                    op: 'upload'
                },
                success: function(uploadRes) {
                    console.log(uploadRes);
                    var res = JSON.parse(uploadRes.data);
                    callback.call(this, res);
                },
                fail: function(e) {
                    console.log('e', e)
                }
            })
        }
    })
}

module.exports = upload