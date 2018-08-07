module.exports = {
    host: 'http://bcrm.wecarla.qq.com', // 测试环境
    // host: 'https://crm.wecarla.qq.com', // 正式环境
    loginCgi: '/auto_checkout/api/login',
    updateInfoCgi: '/auto_checkout/api/save_user',
    sendMsg: '/auto_checkout/admin/send_msg',
    getList: '/auto_checkout/user/get_list',
    userLogin: '/auto_checkout/admin/login',
    checkoutList: '/auto_checkout/trade/checkout_list',
    createOrder: '/auto_checkout/trade/create_order',
    ocrSave: '/auto_checkout/member/save_old_member',
    insuranceCompanyList: '/auto_checkout/insuranceapi/company_type',  //保险公司列表
    change_user: '/auto_checkout/user/change_user', //切换管理员；
    analysis:'/auto_checkout/worksheet/analysis',    //下单；?   发票解析
    worksheet:'/auto_checkout/worksheet/save',// 下单，真
    memberManage :'/auto_checkout/member/list',// 用户信息
    setDefaultUser:'/auto_checkout/user/set_default_user', //通知默认用户
    saveInsurance: '/auto_checkout/insuranceapi/save',     //保存保险单
    workDetail:'/auto_checkout/worksheet/detail',//工单详情
    orderDetail:'/auto_checkout/worksheet_order/detail',//订单详情
    workFrozen:'/auto_checkout/worksheet/frozen',//工单冻结
    workList:'/auto_checkout/worksheet/list',//工单列表
    orderList:'/auto_checkout/worksheet_order/list',//订单列表
    insuranceList:'/auto_checkout/insuranceapi/list',//保险单列表
    insuranceDetail:'/auto_checkout/insuranceapi/detail',//保险单详情
    home:'/auto_checkout/worksheet/home',//首页统计
    saveInvoice:'/auto_checkout/worksheet_order/save_invoice',//保存发票
    orderPay:'/auto_checkout/worksheet_order/pay',//确认收款
    paymentStatus:'/auto_checkout/worksheet_order/pay_status', //支付状态
    payForResults:'/auto_checkout/worksheet_order/pay_info', //支付结果
    preferentialInfo:'/auto_checkout/member/preferential_info', //拉取当前用户最大优惠值的接口
    save_license_number:'/auto_checkout/member/save_license_number', //用户增加车牌号信息的接口
    quit_logi:'/auto_checkout/user/quit_login',
    createOrderInit:'/auto_checkout/worksheet/init',
    code_cancellation:'/auto_checkout/verify/check',  // 扫码核销（微信/小白盒）
    cancellation_info:'/auto_checkout/verify/info', //核销详细信息
    cancellation_success:'/auto_checkout/verify/verify_code', //核销接口
    cancellation_list:'/auto_checkout/verify/list',    //核销列表
    getMemberInfo:'/auto_checkout/member/info',//查询会员信息
}
