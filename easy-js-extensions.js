//去掉字符串兩邊空白
String.prototype.trim=function(){
   return this.replace(/(^\s*)|(\s*$)/g, "");
}
//去掉字符串開頭的空格
String.prototype.trimStart=function(){
   return this.replace(/(^\s*)/g,"");
}
//去掉字符串結尾的空格
String.prototype.trimEnd=function(){
   return this.replace(/(\s*$)/g,"");
}
//合併連續的空格成一個空格
String.prototype.resetBlank = function() {  
    return this.replace(/\s+/g, ' ');  
};
//格式化字符串 String.Format("hello {0} {1}","again","world")
String.format = function() {  
    if (arguments.length == 0) {  
        return '';  
    }  
    if (arguments.length == 1) {  
        return arguments[0];  
    }  
    var reg = /{(\d+)?}/g;  
    var args = arguments;  
    var result = arguments[0].replace(reg, function($0, $1) {  
        return args[parseInt($1) + 1];  
    });  
    return result;  
}; 
//字符串是否包含子字符串
String.prototype.contains = function(sub) {  
    return this.indexOf(sub) != -1;  
} 
//删除指定索引区间的字符串
String.prototype.deleteString = function (start, end) {  
    if (start == end) {  
        return this.deleteCharAt(start);  
    }  
    else {  
        if (start > end) {  
            var temp = start;  
            start = end;  
            end = temp;  
        }  
        if (start < 0) {  
            start = 0;  
        }  
        if (end > this.length - 1) {  
            end = this.length - 1;  
        }  
        return this.substring(0, start) + this.substring(end +1 , this.length);  
    }  
}  
//检查字符串是否以subStr结尾
String.prototype.endWith = function (subStr) {  
    if (subStr.length > this.length) {  
        return false;  
    }  
    else {  
        return (this.lastIndexOf(subStr) == (this.length - subStr.length)) ? true : false;  
    }  
} 
//计算字節长度，每个汉字占两个长度，英文字符每个占一个长度
String.prototype.charLength = function () {  
    var temp = 0;  
    for (var i = 0; i < this.length; i++) {  
        if (this.charCodeAt(i) > 255) {  
            temp += 2;  
        }  
        else {  
            temp += 1;  
        }  
    }  
    return temp;  
}
//删除指定索引位置的字符，索引无效将不删除任何字符
String.prototype.deleteCharAt = function (index) {  
    if (index < 0 || index >= this.length) {  
        return this.valueOf();  
    }  
    else if (index == 0) {  
        return this.substring(1, this.length);  
    }  
    else if (index == this.length - 1) {  
        return this.substring(0, this.length - 1);  
    }  
    else {  
        return this.substring(0, index) + this.substring(index + 1);  
    }  
} 



//檢測對象是否為null undefined；如果的對象是string，則檢測是否為空字符串（或只包含空格）  
Object.prototype.isNullOrEmpty = function() {  
    var obj = this;  
    var flag = false;  
    if (obj == null || obj == undefined || typeof (obj) == 'undefined' || obj == '') {  
        flag = true;  
    } else if (typeof (obj) == 'string') {  
        obj = obj.trim();  
        if (obj == '') {//为空  
            flag = true;  
        } else {//不为空  
            obj = obj.toUpperCase();  
            if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {  
                flag = true;  
            }  
        }  
    }  
    else {  
        flag = false;  
    }  
    return flag;
}



//數組是否包含某個值
Array.prototype.contains = function(el) {  
    var i;  
    for(i = 0; i < this.length; i++) {    
        if(this[i] == el)    
            return true;    
    }    
    return false;    
}




//日期格式化yyyy-MM-dd HH:mm:ss,默認：yyyy-MM-dd
Date.prototype.format = function(pat){  
    var year = this.getFullYear();  
    var month = this.getMonth() + 1;  
    var day = this.getDate();  
    var hour = this.getHours();  
    var minute = this.getMinutes();  
    var second = this.getSeconds();  
    // 两位补齐  
    month = month > 9 ? month : "0" + month;  
    day = day > 9 ? day : "0" + day;  
    hour = hour > 9 ? hour : "0" + hour;  
    minute = minute > 9 ? minute : "0" + minute;  
    second = second > 9 ? second : "0" + second;  
    if(!pat){  
        pat = "yyyy-MM-dd";  
    }  
    pat = pat.replace(/yyyy/g, year);  
    pat = pat.replace(/MM/g, month);  
    pat = pat.replace(/dd/g, day);  
    pat = pat.replace(/HH/gi, hour);  
    pat = pat.replace(/mm/g, minute);  
    pat = pat.replace(/ss/g, second);  
    return pat;  
}  
//日期相差天数  
Date.prototype.diff = function(date){  
    return Math.ceil((this - date) / (1000 * 60 * 60 * 24));  
}  

Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
};
//添加周
Date.prototype.addWeeks = function (w) {
    this.addDays(w * 7);
};
//添加月
Date.prototype.addMonths = function (m) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};
//添加年
Date.prototype.addYears = function (y) {
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    if (m < this.getMonth()) {
        this.setDate(0);
    }
};



//**獲取網址（location.href ）參數**
//--參數存在，返回值
//--參數不存在，返回null
window.location.getQueryString = function(name){
 	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return null;
}


window.easyJs={
	regex:{
		email:{expression:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/},							 //電子郵箱
		num:{expression:/^[0-9]*$/},        																			 //數字
		alphabet:{expression:/^[A-Za-z]+$/},                                                            				 //字母
		alphabet_num:{expression:/^\w+$/},                                                              				 //數字、字母、下劃線
		password:{expression:/^[a-zA-Z]\w{5,17}$/},  																	 //以字母开头，长度在6-18之间，只能包含字符、数字和下划线。 
		chinese:{expression:/^[\u4e00-\u9fa5]{0,}$/},																	 //純中文
		http_https:{expression: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/}    //以http://或https://開頭的網址
	},
	onTouchDevice:function (func){
		if('ontouchstart' in document.documentElement){
			func();
		}
	},
	init:function(){
		var _this=this;
		function addRegexTest(){
			$.each(_this.regex,function(i,item){
				item.test=function(str){
					return this.expression.test(str);
				}
			});
		}
		
		addRegexTest();//為所有regex驗證規則添加 test驗證function
	}
};


$(function(){
	easyJs.init();
	easyJs.onTouchDevice(function(){
		$("body").addClass("is-touch-device");
	});
});


