"use strict";const e=require("../../../common/vendor.js"),o=require("../../../utils/token.js");if(!Array){(e.resolveComponent("uv-image")+e.resolveComponent("uv-qrcode")+e.resolveComponent("my-popup"))()}Math||((()=>"../../../uni_modules/uv-image/components/uv-image/uv-image.js")+(()=>"../../../uni_modules/uv-qrcode/components/uv-qrcode/uv-qrcode.js")+(()=>"../../../components/my-popup/my-popup.js"))();const n={__name:"qrcodeModal",setup(n,{expose:t}){const r=e.ref(),s=e.ref();const u=e.ref(!1);function p({show:e}){e&&!u.value&&s.value.make({success(){u.value=!0}})}return t({open:function(){r.value.open()}}),(n,t)=>({a:e.p({src:"/static/images/mine/avatar.png",width:"120rpx",height:"120rpx",duration:0,"custom-style":{marginRight:"24rpx"}}),b:e.t(e.unref(o.getToken)()?e.unref(o.getToken)().userInfo.Nickname:"暂无昵称"),c:e.t(e.unref(o.getToken)()?e.unref(o.getToken)().userInfo.Mobile:""),d:e.sr(s,"976e1c79-2,976e1c79-0",{k:"qrcode"}),e:e.p({start:!1,size:"430rpx",value:"https://h5.uvui.cn"}),f:e.sr(r,"976e1c79-0",{k:"popup"}),g:e.o(p),h:e.p({mode:"center","custom-style":{minHeight:"300rpx"},bgColor:"none",duration:0})})}},t=e._export_sfc(n,[["__scopeId","data-v-976e1c79"]]);wx.createComponent(t);