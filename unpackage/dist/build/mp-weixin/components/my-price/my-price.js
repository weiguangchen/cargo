"use strict";const t=require("../../common/vendor.js"),e={options:{virtualHost:!0}},o=Object.assign(e,{__name:"my-price",props:{color:{default:"",type:String},customStyle:{default:()=>{},type:Object},unit:{default:"",type:String},unitColor:{default:"var(--content-color)",type:String},unitFontSize:{default:"",type:String},unitStyle:{default:()=>{},type:Object},price:{default:0,type:Number}},setup:e=>(o,n)=>t.e({a:t.t(e.price||0),b:e.unit},e.unit?{c:t.t(e.unit),d:t.s({color:e.unitColor,fontSize:e.unitFontSize}),e:t.s(e.unitStyle)}:{},{f:t.s({color:e.color}),g:t.s(e.customStyle)})}),n=t._export_sfc(o,[["__scopeId","data-v-50c1fd9d"]]);wx.createComponent(n);