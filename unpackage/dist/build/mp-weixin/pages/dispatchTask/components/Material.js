"use strict";const e=require("../../../common/vendor.js");if(!Array){(e.resolveComponent("uv-image")+e.resolveComponent("uv-form-item")+e.resolveComponent("my-number-box")+e.resolveComponent("uv-form")+e.resolveComponent("my-drawer"))()}Math||((()=>"../../../uni_modules/uv-image/components/uv-image/uv-image.js")+t+(()=>"../../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js")+(()=>"../../../components/my-number-box/my-number-box.js")+(()=>"../../../uni_modules/uv-form/components/uv-form/uv-form.js")+(()=>"../../../components/my-drawer/my-drawer.js"))();const t=()=>"./MyRadio.js",o={__name:"Material",props:{modelValue:{type:Object,default:()=>{}},borderBottom:{type:Boolean,default:!1},order:{type:Object,default:()=>{}}},emits:["update:modelValue"],setup(t,{emit:o}){const m=t,a=o,l=e.ref({Limittype:"0",EstimateWeight:1,EstimateTimes:1}),i=e.ref();e.watchEffect((()=>{l.value={...l.value,...m.modelValue}}));const u=e.computed((()=>{if(!m.modelValue.LeftWeight||!m.order.SingleWeight)return null;const t=e.Big(m.modelValue.LeftWeight).div(m.order.SingleWeight).toFixed(0);return console.log("maxCarNumber",t),t})),r=e.ref();function n(){r.value.popup.open()}async function s(){await e.nextTick$1(),r.value.resize()}function p(){console.log("model",l.value),a("update:modelValue",l.value)}return(o,m)=>e.e({a:e.t(l.value.SSMaterialName),b:"0"===t.modelValue.Limittype},(t.modelValue.Limittype,{}),{c:"1"===t.modelValue.Limittype},"1"===t.modelValue.Limittype?{d:e.t(t.modelValue.EstimateWeight)}:{},{e:"2"===t.modelValue.Limittype},"2"===t.modelValue.Limittype?{f:e.t(t.modelValue.EstimateTimes)}:{},{g:e.p({src:"/static/images/arrow.png",duration:0,width:"24rpx",height:"24rpx","custom-style":{marginLeft:"4rpx"}}),h:t.borderBottom?1:"",i:e.o(n),j:e.t(l.value.SSMaterialName),k:l.value.LeftWeight},l.value.LeftWeight?{l:e.t(l.value.LeftWeight)}:{},{m:e.o(s),n:e.o((e=>l.value.Limittype=e)),o:e.p({modelValue:l.value.Limittype}),p:e.p({label:"装运设置",prop:"Limittype",customStyle:{padding:"44rpx 0!important"}}),q:"1"===l.value.Limittype},"1"===l.value.Limittype?{r:e.o((e=>l.value.EstimateWeight=e)),s:e.p({max:l.value.LeftWeight,modelValue:l.value.EstimateWeight}),t:e.p({label:"最大装运重量",prop:"EstimateWeight"})}:{},{v:"2"===l.value.Limittype},"2"===l.value.Limittype?{w:e.o((e=>l.value.EstimateTimes=e)),x:e.p({max:u.value,unit:"车次",modelValue:l.value.EstimateTimes}),y:e.p({label:"最大装运车次",prop:"EstimateTimes"})}:{},{z:e.sr("form","6a1fe5cc-2,6a1fe5cc-1"),A:e.p({labelPosition:"left",model:l.value,rules:i.value,"label-width":"auto"}),B:e.sr(r,"6a1fe5cc-1",{k:"drawer"}),C:e.o(p),D:e.p({bgColor:"#FFFFFF",title:"物料一",closeable:!0,showConfirmButton:!0})})}};wx.createComponent(o);
