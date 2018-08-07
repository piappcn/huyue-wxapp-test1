

// 乘法计算
function  multiply(arg1,arg2){
  arg1  = qz(arg1,'乘法计算');
  arg2  = qz(arg2,'乘法计算');

  var len1=0,len2=0,count;
    try {
        len1 = arg1.toString().split('.')['1'].length;
    }catch(e){
        if(isNaN(Number(arg1))){
            throw 'arg1不是数字';
        }
    }
    try {
        len2 = arg2.toString().split('.')['1'].length;
    }catch(e){
        if(isNaN(Number(arg2))){
            throw 'arg2不是数字';
        }
    }
    count = Math.pow(10,parseInt(len1 + len2));
    
    return (parseInt(arg1.toString().replace('.', ''))*parseInt(arg2.toString().replace('.', '')))/count;
}


//保留零位小数
function hyTofloat0(num){
    let len = 0;
  num  = qz(num,'保留零位小数')
  if(isNaN(Number(num))){
        return 0;
    }else{
        if(String(num).indexOf(".")===-1){
            return Number(num)
        }
        if(num.toString().split(".")[1].length>len){
            return parseFloat(num).toFixed(len)
        }else{
            return num-0
        }
    }
}


// 转整数
function hyToNum(num){
  num  = qz(num,'转整数');
    if(isNaN(Number(num))){
        return 0;
    }else{
        return Number(num)
    }
}
function qz(num,str){
    console.log(num, str)
    return num;
}
//保留两位小数
function hyTofloat2(num){
    let len = 2;
    num  = qz(num);
    if(isNaN(Number(num))){
        return 0;
    }else{
        if(String(num).indexOf(".")===-1){
            return Number(num)-0
        }
        if(num.toString().split(".")[1].length>2){
            return parseFloat(num).toFixed(len)
        }else if(String(num).indexOf(".")===-1){
            return num-0
        }else{
            return num
        }
    }
}

function hyadd(...numP){
    let cun = 0;
    for(let val of  numP){
        val = qz(val,'加法循环');

      if(isNaN(Number(val))){
          val =  0;
        }else{
          val -= 0;
        }

      console.log(cun,'cun--------')
      console.log(val,'val--------')

        cun = cun- 0 + Number(val);
      console.log(cun,'hyadd-check')
    }
    return cun;
}


function hyjian(num,num1){
    let cun = 0
  num  = qz(num,'减法');
  num1  = qz(num1,'减法');

  // for(let val of  numP){
    //     if(isNaN(val)){
    //         val =  0;
    //     }
    //     val = Number(val)
    //     debugger;
    //     if(val===0){
    //         cun =  val
    //     }else{
    //         cun =  Number(cun)-val
    //     }
    //
    // }
    if(isNaN(num)){
        num =  0;
    }
    if(isNaN(num1)){
        num1 =  0;
    }
    cun = num - num1;
    return cun;
}


// Math 除法 操作
function tran(arg1,arg2){
  arg1  = qz(arg1,'除法 操作');
  arg2  = qz(arg2,'除法 操作');
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    return auto();
    function auto(){
        r1=Number(arg1.toString().replace(".",""))
        r2=Number(arg2.toString().replace(".",""))
        return (r1/r2)*Math.pow(10,t2-t1);
    }


}



module.exports = {
    accDiv:tran,
    hyadd: hyadd,
    hyjian : hyjian ,
	multiply : multiply,
    hyToNum : hyToNum,
    hyTofloat2:hyTofloat2,
    hyTofloat0:hyTofloat0
}
