"use strict";const e=require("../../../common/vendor.js"),o=require("../../../utils/token.js"),r=require("../../../stores/user.js");if(!Array){(e.resolveComponent("uv-image")+e.resolveComponent("uv-qrcode")+e.resolveComponent("my-popup"))()}Math||((()=>"../../../uni_modules/uv-image/components/uv-image/uv-image.js")+(()=>"../../../uni_modules/uv-qrcode/components/uv-qrcode/uv-qrcode.js")+(()=>"../../../components/my-popup/my-popup.js"))();const n={__name:"qrcodeModal",setup(n,{expose:s}){const t=r.useUserStore(),{userInfo:u}=e.storeToRefs(t),p=e.ref(),c=e.ref();const i=e.ref(!1);function a({show:e}){e&&!i.value&&c.value.make({success(){i.value=!0}})}return s({open:function(){p.value.open()}}),(r,n)=>e.e({a:e.p({src:"/static/images/mine/avatar.png",width:"120rpx",height:"120rpx",duration:0,"custom-style":{marginRight:"24rpx"}}),b:e.unref(o.getToken)()},e.unref(o.getToken)()?{c:e.t(e.unref(u).Nickname||"暂无昵称"),d:e.t(e.unref(u).Mobile||"")}:{},{e:e.sr(c,"43f93446-2,43f93446-0",{k:"qrcode"}),f:e.p({start:!1,size:"430rpx",value:"https://h5.uvui.cn"}),g:e.sr(p,"43f93446-0",{k:"popup"}),h:e.o(a),i:e.p({mode:"center","custom-style":{minHeight:"300rpx"},bgColor:"none",duration:0})})}},s=e._export_sfc(n,[["__scopeId","data-v-43f93446"]]);wx.createComponent(s);
