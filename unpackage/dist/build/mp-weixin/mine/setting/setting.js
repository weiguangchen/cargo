"use strict";const o=require("../../common/vendor.js"),e=require("../../utils/token.js");if(!Array){(o.resolveComponent("uv-icon")+o.resolveComponent("uv-button"))()}Math||((()=>"../../uni_modules/uv-icon/components/uv-icon/uv-icon.js")+(()=>"../../uni_modules/uv-button/components/uv-button/uv-button.js"))();const r={__name:"setting",setup(r){function n(){e.removeToken(),o.index.reLaunch({url:"/pages/index/index"})}return(e,r)=>({a:o.p({name:"arrow-right",color:"#000000",size:"24rpx"}),b:o.p({name:"arrow-right",color:"#000000",size:"24rpx"}),c:o.p({name:"arrow-right",color:"#000000",size:"24rpx"}),d:o.o(n),e:o.p({text:"退出登录",color:"var(--page-bg)","custom-style":{height:"96rpx",borderRadius:"16rpx"},customTextStyle:{color:"var(--red-color)"}})})}};wx.createPage(r);
