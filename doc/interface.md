#工单解析图片接口（维修结算单、发票）
http://dev.crm.wecarla.qq.com/auto_checkout/worksheet/analysis

请求参数一 （维修结算单）
{
    "img_url" : "http://p.qpic.cn/automall_pic/0/20180423200324_11063/0",
    "img_type" : "3"
}

{
  "ret": 0,
  "msg": "OK",
  "errorcode": 0,
  "data": {
    "code": 0,
    "msg": "OK",
    "data": {
      "additional_cost": "0.00",
      "work_cost": "128.00",
      "parts_cost": "241.50",
      "total_amount": "369.50"
    }
  }
}
请求参数二 （发票）
{
    "img_url" : "http://p.qpic.cn/automall_pic/0/20180423212605_82255/0",
    "img_type" : "2"
}

{
  "ret": 0,
  "msg": "OK",
  "errorcode": 0,
  "data": {
    "code": 0,
    "msg": "OK",
    "data": {
      "no": " 00309722",
      "amount": "33.30"
    }
  }
}


//工单（保养）保存
http://dev.crm.wecarla.qq.com/auto_checkout/worksheet/save

请求参数一 （保养）
{
    "user_id":"onqj0juUjwdwluzXO039K8Uklx4k", // 用户的user_id
    "car_id":"5a3cd45be8fd7e300b3aed6d", // 车辆信息的主键
    "work_sheet_type":1, // 开单类型 1=保养；2=装饰；3=储值
    "total_amount":60, // 结算总额
    "amount":50, // 实付总金额
    "work_cost":10, // 工时费用
    "parts_cost":20, // 零件费用
    "additional_cost":30, // 附加费用
    "total_discount":10,// 优惠总额
    "syn_discount":3, // 综合优惠
    "work_discount":4, //工时优惠
    "other_discount":3, // 其他优惠
    "add_bonus":10 // 新增积分
}

{
  "ret": 0,
  "msg": "OK",
  "errorcode": 0,
  "data": {
    "result": true
  }
}



