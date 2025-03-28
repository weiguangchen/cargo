"use strict";const e=require("../../../common/vendor.js"),t=require("../../../utils/index.js");if(!Array){(e.resolveComponent("uv-image")+e.resolveComponent("uv-form-item")+e.resolveComponent("my-number-box")+e.resolveComponent("uv-form")+e.resolveComponent("my-drawer"))()}Math||((()=>"../../../uni_modules/uv-image/components/uv-image/uv-image.js")+i+(()=>"../../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js")+(()=>"../../../components/my-number-box/my-number-box.js")+(()=>"../../../uni_modules/uv-form/components/uv-form/uv-form.js")+(()=>"../../../components/my-drawer/my-drawer.js"))();const i=()=>"./MyRadio.js",m={__name:"Material",props:{modelValue:{type:Object,default:()=>{}},borderBottom:{type:Boolean,default:!1},order:{type:Object,default:()=>{}}},emits:["update:modelValue"],setup(i,{emit:m}){const l=i,o=m,a=e.ref({Limittype:"0",EstimiteWeight:1,EstimiteTimes:1}),u=e.ref();e.watchEffect((()=>{var e,t;a.value={...a.value,...l.modelValue,EstimiteWeight:(null==(e=l.modelValue)?void 0:e.EstimiteWeight)??1,EstimiteTimes:(null==(t=l.modelValue)?void 0:t.EstimiteTimes)??1}}));const s=e.computed((()=>{if(!l.modelValue.LeftWeight||!l.order.SingleWeight)return;const t=e.Big(l.modelValue.LeftWeight).div(l.order.SingleWeight).toFixed(0);return console.log("maxCarNumber",t),+t})),r=e.ref();function n(){var e,t;a.value={...a.value,...l.modelValue,EstimiteWeight:(null==(e=l.modelValue)?void 0:e.EstimiteWeight)??1,EstimiteTimes:(null==(t=l.modelValue)?void 0:t.EstimiteTimes)??1},r.value.popup.open()}async function p(){await e.nextTick$1(),r.value.resize()}async function d(){await e.index.hideKeyboard(),await t.sleep(200),console.log("confirm"),console.log("model",a.value),o("update:modelValue",a.value)}return(t,m)=>e.e({a:e.t(a.value.SSMaterialName),b:"0"===i.modelValue.Limittype},(i.modelValue.Limittype,{}),{c:"1"===i.modelValue.Limittype},"1"===i.modelValue.Limittype?{d:e.t(i.modelValue.EstimiteWeight)}:{},{e:"2"===i.modelValue.Limittype},"2"===i.modelValue.Limittype?{f:e.t(i.modelValue.EstimiteTimes)}:{},{g:e.p({src:"/static/images/arrow.png",duration:0,width:"24rpx",height:"24rpx","custom-style":{marginLeft:"4rpx"}}),h:i.borderBottom?1:"",i:e.o(n),j:e.t(a.value.SSMaterialName),k:a.value.LeftWeight},a.value.LeftWeight?{l:e.t(a.value.LeftWeight)}:{},{m:e.o(p),n:e.o((e=>a.value.Limittype=e)),o:e.p({record:a.value,modelValue:a.value.Limittype}),p:e.p({label:"装运设置",prop:"Limittype",customStyle:{padding:"44rpx 0!important"}}),q:"1"===a.value.Limittype},"1"===a.value.Limittype?{r:e.o((e=>a.value.EstimiteWeight=e)),s:e.p({"decimal-length":"2",max:null!==a.value.LeftWeight?a.value.LeftWeight:void 0,"max-limit-msg":e=>`重量最多为${e}吨`,min:a.value.minWgtLeft,"min-limit-msg":e=>`重量最少为${e}吨`,step:10,modelValue:a.value.EstimiteWeight}),t:e.p({labelPosition:"top",label:"最大装运重量",prop:"EstimiteWeight"})}:{},{v:"2"===a.value.Limittype},"2"===a.value.Limittype?{w:e.o((e=>a.value.EstimiteTimes=e)),x:e.p({"decimal-length":"0",max:s.value,"max-limit-msg":e=>`车次最多为${e}`,min:1,"min-limit-msg":e=>`车次最少为${e}`,unit:"车次",modelValue:a.value.EstimiteTimes}),y:e.p({labelPosition:"top",label:"最大装运车次",prop:"EstimiteTimes"})}:{},{z:e.sr("form","6a1fe5cc-2,6a1fe5cc-1"),A:e.p({labelPosition:"left",model:a.value,rules:u.value,"label-width":"auto"}),B:e.sr(r,"6a1fe5cc-1",{k:"drawer"}),C:e.o(d),D:e.p({bgColor:"#FFFFFF",title:"物料一",closeable:!0,showConfirmButton:!0})})}};wx.createComponent(m);
