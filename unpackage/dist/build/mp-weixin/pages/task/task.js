"use strict";const e=require("../../common/vendor.js"),o=require("../../utils/token.js"),n=require("../../stores/app.js"),t=require("../../api/index.js");if(!Array){(e.resolveComponent("uv-search")+e.resolveComponent("uv-navbar")+e.resolveComponent("uv-tabs")+e.resolveComponent("uv-image")+e.resolveComponent("my-empty")+e.resolveComponent("uv-load-more")+e.resolveComponent("my-login-drawer")+e.resolveComponent("my-tabbar"))()}Math||((()=>"../../uni_modules/uv-search/components/uv-search/uv-search.js")+(()=>"../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js")+(()=>"../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js")+(()=>"../../uni_modules/uv-image/components/uv-image/uv-image.js")+(()=>"../../components/my-empty/my-empty.js")+a+(()=>"../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js")+l+(()=>"../../components/my-login-drawer/my-login-drawer.js")+(()=>"../../components/my-tabbar/my-tabbar.js"))();const a=()=>"../manifestList/components/item.js",l=()=>"../waybill/components/item.js",u={__name:"task",setup(a){const l=n.useAppStore();e.onLoad((()=>{l.switchTab(2)}));const u=e.ref();function r(){u.value.open()}function s(){e.index.reLaunch({url:"/pages/task/task"})}const i=e.ref(!1),v=e.ref(0);e.onMounted((()=>{let o=e.index.getMenuButtonBoundingClientRect();console.log("menuButtonInfo",o),v.value=o.width+20}));const c=e.ref(0),d=e.ref([{name:"进行中的货单"},{name:"进行中的运单"}]);function m({name:e,index:o}){B.value=!1,c.value=o,console.log(o,e),0===o&&C(),1===o&&L()}const f=e.ref(!1),p=e.ref(""),h=e.ref(!1);function g(){f.value=!0,h.value=!!p.value,0===c.value&&C(),1===c.value&&L()}function y(){p.value="",h.value=!1,0===c.value&&C(),1===c.value&&L()}const b=e.ref(0),w=e.ref([]),x=e.ref(!1);async function C(){try{e.index.showLoading();const o=await t.GetAssignCarListWithCount({status:10,keyWord:p.value});w.value=o.list,b.value=o.cnt,e.index.hideLoading()}catch(o){console.log("err",o),e.index.hideLoading(),e.index.showToast({title:o.data,icon:"none"})}finally{f.value=!1}}const j=e.ref([]),k=e.ref(!1);async function L(){try{e.index.showLoading();const o=await t.GetOnwayOwnerWithCount({status:10,keyWord:p.value});j.value=o.list,b.value=o.cnt,e.index.hideLoading()}catch(o){console.log("err",o),e.index.hideLoading(),e.index.showToast({title:o.data,icon:"none"})}finally{f.value=!1}}e.onShow((()=>{if(o.getToken()){if(0===c.value){if(x.value)return;x.value=!0,C()}if(1===c.value){if(k.value)return;k.value=!0,L()}}}));const B=e.ref(!1);return(n,t)=>e.e({a:"overflow:"+(i.value?"hidden":"visible"),b:e.o(g),c:e.o(g),d:e.o((e=>p.value=e)),e:e.p({placeholder:"搜索单号、车牌号",showAction:!1,modelValue:p.value}),f:`${v.value}px`,g:e.p({placeholder:!0,"left-icon":""}),h:e.o(m),i:e.p({activeStyle:{fontWeight:"bold",color:"var(--title-color)"},inactiveStyle:{color:"var(--sub-color)"},lineWidth:"32rpx",lineHeight:"8rpx",list:d.value,scrollable:!1,lineColor:"var(--main-color)",customStyle:{background:"#ffffff"},current:c.value}),j:h.value&&!f.value},h.value&&!f.value?{k:e.t(b.value),l:e.p({duration:0,src:"/static/images/filter/redo.png",width:"28rpx",height:"28rpx","custom-style":{marginRight:"4rpx"}}),m:e.o(y)}:{},{n:!e.unref(o.getToken)()},e.unref(o.getToken)()?e.e({q:0===c.value},0===c.value?e.e({r:0===w.value.length},0===w.value.length?{s:e.p({height:"100%",text:"暂无进行中的货单"})}:{t:e.f(w.value,((o,n,t)=>({a:o.Id,b:e.o(C,o.Id),c:"5cd3f056-6-"+t,d:e.p({record:o})}))),v:e.p({status:"nomore",color:"#B0BECC"})}):{},{w:1===c.value},1===c.value?e.e({x:0===j.value.length},0===j.value.length?{y:e.p({height:"100%",text:"暂无进行中的运单"})}:{z:e.f(j.value,((o,n,t)=>({a:o.OnwayId,b:e.o(L,o.OnwayId),c:"5cd3f056-9-"+t,d:e.p({record:o})}))),A:e.p({status:"nomore",color:"#B0BECC"})}):{}):{o:e.o(r),p:e.p({height:"100%",showButton:!0,text:0===c.value?"暂无进行中的货单":"暂无进行中的运单"})},{B:B.value,C:e.o(((...e)=>n.onRefresh&&n.onRefresh(...e))),D:e.o(((...e)=>n.onPulling&&n.onPulling(...e))),E:e.sr(u,"5cd3f056-11",{k:"loginDrawer"}),F:e.o(s)})}};wx.createPage(u);
