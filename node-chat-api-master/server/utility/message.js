var moment=require('moment');
var generateMessage=(from,text)=>{ return {from,text,createAt:moment().valueOf()}};
var generateLocationMessage=(from,lat,long)=>{return {from,url:`https://www.google.com/maps?q=${lat},${long}`,createAt:moment().valueOf()}};
module.exports={generateMessage,generateLocationMessage};