"use strict";const e=require("../../common/vendor.js"),o=require("../../api/index.js");if(!Array){(e.resolveComponent("uv-search")+e.resolveComponent("my-filter-drawer")+e.resolveComponent("uv-navbar")+e.resolveComponent("uv-tabs")+e.resolveComponent("uv-load-more")+e.resolveComponent("my-empty"))()}Math||((()=>"../../uni_modules/uv-search/components/uv-search/uv-search.js")+(()=>"../../components/my-filter-drawer/my-filter-drawer.js")+(()=>"../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js")+(()=>"../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js")+n+(()=>"../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js")+(()=>"../../components/my-empty/my-empty.js"))();const n=()=>"./components/item.js",a={__name:"manifestList",setup(n){const a=e.ref(!1);function t(){e.index.navigateBack()}const l=e.ref(0);e.onMounted((()=>{let o=e.index.getMenuButtonBoundingClientRect();console.log("menuButtonInfo",o),l.value=o.width+20}));const r=e.ref(""),s=e.ref([{name:"全部",value:""},{name:"进行中",value:1},{name:"已暂停",value:3},{name:"已完结",value:5}]);function u({name:e,index:o}){var n,a;console.log(o,e),r.value=(null==(a=null==(n=s.value)?void 0:n.find((o=>o.name===e)))?void 0:a.value)??"",d()}const i=e.ref();function v(e){a.value=e.show}function c(o){e.index.navigateTo({url:`/pages/manifestDetail/manifestDetail?assignId=${o.Id}`})}const m=e.ref([]);async function d(){try{const e=await o.GetAssignCarList({status:r.value});m.value=e}catch{}}return e.onLoad((()=>{d()})),(o,n)=>e.e({a:"overflow:"+(a.value?"hidden":"visible"),b:e.o((e=>o.keyword=e)),c:e.p({placeholder:"搜索货单",showAction:!1,modelValue:o.keyword}),d:e.sr(i,"767cdad5-2,767cdad5-0",{k:"filter"}),e:e.o(v),f:`${l.value}px`,g:e.o(t),h:e.p({placeholder:!0}),i:e.o(u),j:e.p({activeStyle:{fontWeight:"bold",color:"var(--title-color)"},inactiveStyle:{color:"var(--sub-color)"},lineWidth:"32rpx",lineHeight:"8rpx",list:s.value,scrollable:!1,lineColor:"var(--main-color)",customStyle:{background:"#ffffff"}}),k:m.value.length>0},m.value.length>0?{l:e.f(m.value,((o,n,a)=>({a:o.Id,b:e.o(c,o.Id),c:"767cdad5-4-"+a,d:e.p({record:o})}))),m:e.p({status:"nomore",color:"#B0BECC"})}:{})}};wx.createPage(a);