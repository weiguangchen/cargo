"use strict";const e=require("../../../common/vendor.js");if(!Array){e.resolveComponent("my-drawer")()}Math;const a={__name:"StepDrawer",setup(a,{expose:t}){const n=e.ref([{name:"司机接单",date:"2023-09-08 20:08"},{name:"司机到达装货厂家",date:"2023-09-08 20:08"},{name:"车辆入厂",date:"2023-09-08 20:08"},{name:"车辆入库",date:"2023-09-08 20:08"},{name:"开始装车",date:"2023-09-08 20:08"},{name:"装车完成",date:"2023-09-08 20:08"},{name:"车辆出厂",date:"2023-09-08 20:08"},{name:"司机/货主确认完成卸货",date:"2023-09-08 20:08"},{name:"司机/货主取消运单",date:"2023-09-08 20:08"}]),r=e.ref();return t({open:function(){r.value.popup.open()}}),(a,t)=>({a:e.f(n.value,((a,t,r)=>e.e({a:e.t(a.name),b:e.t(a.date),c:t<n.value.length-1},(n.value.length,{}),{d:t===n.value.length-1?1:""}))),b:e.sr(r,"1c95eb2e-0",{k:"drawer"}),c:e.p({title:"运单跟踪"})})}};wx.createComponent(a);
