/**
*
* Kazzy Rantsimele kazzytheman345@gmail.com medium.com/@gentkazzy
*
**/

import crypto from "crypto-js"
import util from "./scripts/utils.json"

var utils = {
getUU: function(){
function _p8(s){
var p = (Math.random().toString(16)+"000000000").substr(2,8);
return s? "-" + p.substr(0,4) + "-" + p.substr(4,4):p;
}
return _p8()+_p8(true) + _p8(true) + _p8();
},
strr: function(n){
return Array(n+1).join((Math.random().toString(36)+'000000000000000000').slice(2,18)).slice(0,n);
},
encode: function(password,salt){
const pass = crypto.AES.encrypt(password,salt)
return pass;
},
getToken: function(credentials){
	
},
convObj: function(obj){
var result = Object.keys(obj).map((key) => obj[key])
	return result;
},
convArr: function(obj){
	//convert object to value array
	var result = Object.values(obj)
	return result;
},
getObj: function(arr){
var obj = arr.reduce((acc,cur,i)=>{
	acc[i] = cur
	return acc;
},{});
return obj;
},
getArray :function(arr){
var arrays = [], size = 4
while(arr.length >0){
arrays.push(arr.splice(0,size))
}
return arrays;
},
getUnix: function(dateTime){
	var date = (Math.floor(dateTime / 1000));
	return date;
},
getVidUrl: function(str){
	var newStr = "https://www.googleapis.com/drive/v3/files/"+str+"?key="+util.token+"&alt=media";
	return newStr;
}
//
}
export default utils