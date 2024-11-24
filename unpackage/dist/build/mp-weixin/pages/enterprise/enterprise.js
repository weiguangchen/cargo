"use strict";const e=require("../../common/vendor.js"),o=require("../../stores/app.js"),l=require("../../utils/authorize.js"),a=require("../../utils/token.js"),n=require("../../api/index.js");if(!Array){(e.resolveComponent("uv-search")+e.resolveComponent("uv-navbar")+e.resolveComponent("uv-drop-down-item")+e.resolveComponent("uv-drop-down")+e.resolveComponent("uv-drop-down-popup")+e.resolveComponent("my-empty")+e.resolveComponent("uv-load-more")+e.resolveComponent("my-login-drawer")+e.resolveComponent("my-tabbar"))()}Math||((()=>"../../uni_modules/uv-search/components/uv-search/uv-search.js")+(()=>"../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js")+(()=>"../../uni_modules/uv-drop-down/components/uv-drop-down-item/uv-drop-down-item.js")+(()=>"../../uni_modules/uv-drop-down/components/uv-drop-down/uv-drop-down.js")+(()=>"../../uni_modules/uv-drop-down/components/uv-drop-down-popup/uv-drop-down-popup.js")+(()=>"../../components/my-empty/my-empty.js")+r+(()=>"../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js")+(()=>"../../components/my-login-drawer/my-login-drawer.js")+(()=>"../../components/my-tabbar/my-tabbar.js"))();const r=()=>"./components/Item.js",u={__name:"enterprise",setup(r){const u=o.useAppStore();e.onLoad((()=>{u.switchTab(1)}));const t=e.ref();function v(){t.value.open()}function s(){e.index.reLaunch({url:"/pages/enterprise/enterprise"})}e.onLoad((async()=>{l.getLocationInfo(),a.getToken()&&async function(){const e=await n.GetSupplierList();C.value=e}()}));const p=e.ref(""),c=e.ref(0);e.onMounted((()=>{let o=e.index.getMenuButtonBoundingClientRect();c.value=o.width+20}));const i=e.ref(),d=e.ref([0,"all","0"]),m=e.ref([]),b=e.ref("order"),f=e.reactive({order:{label:"综合排序",value:"all",activeIndex:0,child:[{label:"综合排序",value:"all"},{label:"距离最近",value:"new"}]},type:{label:"全部签约状态",value:"all",activeIndex:0,child:[{label:"全部签约状态",value:"all"},{label:"已签约",value:"pdf"},{label:"未签约",value:"word"}]}}),w=e.computed((e=>e=>{const o={},l=m.value.find((o=>o.name===e));return l?(o.label=l.label,o.value=l.value):(o.label=f[e].label,o.value=f[e].value),o})),x=e.computed((()=>f[b.value]));function y(e){console.log("弹窗打开状态：",e)}function h(e){console.log(e);const{name:o,active:l,type:a}=e;b.value=o;const n=m.value.find((e=>e.name==b.value));if(n){const e=f[b.value].child.findIndex((e=>e.label==n.label&&e.value==n.value));f[b.value].activeIndex=e}else f[b.value].activeIndex=0}function g(o){let{label:l,value:a}=o;const n=m.value.findIndex((e=>e.name==b.value));d.value.indexOf(a)>-1&&f[b.value].label&&(l=f[b.value].label),n>-1?m.value[n]={name:b.value,label:l,value:a}:m.value.push({name:b.value,label:l,value:a}),m.value=m.value.filter((e=>-1==d.value.indexOf(e.value))),e.index.showModal({content:`筛选的值：${JSON.stringify(m.value)}`}),i.value.close()}const j=e.ref("nomore"),C=e.ref([]);return(o,l)=>e.e({a:e.o((e=>p.value=e)),b:e.p({placeholder:"搜索生产企业",showAction:!1,modelValue:p.value}),c:`${c.value}px`,d:e.p({placeholder:!0,"left-icon":""}),e:e.p({name:"order",type:"2",label:w.value("order").label,value:w.value("order").value}),f:e.p({name:"type",type:"2",label:w.value("type").label,value:w.value("type").value}),g:e.sr("dropDown","14959c56-2"),h:e.o(h),i:e.p({sign:"dropDown_1","text-size":"26rpx","text-color":"var(--title-color)","text-active-size":"26rpx","text-active-color":"var(--main-color)","extra-icon":{name:"arrow-down-fill",color:"var(--title-color)",size:"16rpx"},"extra-active-icon":{name:"arrow-up-fill",color:"var(--main-color)",size:"14rpx"},defaultValue:d.value}),j:e.f(x.value.child,((o,l,a)=>({a:e.t(o.label),b:x.value.activeIndex===l?1:"",c:o.value,d:e.o((e=>g(o)),o.value)}))),k:e.sr(i,"14959c56-5",{k:"dropDownPopup"}),l:e.o(g),m:e.o(y),n:e.p({sign:"dropDown_1","click-overlay-on-close":!0,currentDropItem:x.value}),o:!e.unref(a.getToken)()},e.unref(a.getToken)()?{r:e.f(C.value,((o,l,a)=>({a:o.Id,b:"14959c56-7-"+a,c:e.p({record:o})}))),s:e.p({status:j.value,color:"#B0BECC"})}:{p:e.o(v),q:e.p({height:"100%",showButton:!0,text:"登录后查看生产企业"})},{t:e.sr(t,"14959c56-9",{k:"loginDrawer"}),v:e.o(s)})}};wx.createPage(u);
