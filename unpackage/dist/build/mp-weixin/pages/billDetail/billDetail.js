"use strict";const e=require("../../common/vendor.js"),a=require("../../api/index.js"),t=require("../../utils/token.js");if(!Array){(e.resolveComponent("uv-navbar")+e.resolveComponent("uv-icon")+e.resolveComponent("uv-image")+e.resolveComponent("uv-line")+e.resolveComponent("my-price")+e.resolveComponent("my-plate")+e.resolveComponent("uv-button")+e.resolveComponent("my-confirm"))()}Math||((()=>"../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js")+(()=>"../../uni_modules/uv-icon/components/uv-icon/uv-icon.js")+(()=>"../../uni_modules/uv-image/components/uv-image/uv-image.js")+(()=>"../../uni_modules/uv-line/components/uv-line/uv-line.js")+(()=>"../../components/my-price/my-price.js")+(()=>"../../components/my-plate/my-plate.js")+(()=>"../../uni_modules/uv-button/components/uv-button/uv-button.js")+u+n+l+(()=>"../../components/my-confirm/my-confirm.js"))();const u=()=>"./components/MapDrawer.js",l=()=>"./components/RemarkDrawer.js",n=()=>"./components/StepDrawer.js",i={__name:"billDetail",setup(u){const l=e.ref(""),n=e.ref("");e.onLoad((e=>{n.value=e.supplyId,l.value=e.onwayId,o(),v()}));const i=e.ref({});async function o(){try{const t=await a.GetSupplyOnwayDetail({onwayId:e.unref(l),supplyId:e.unref(n)});i.value=t}catch{}}const s=e.ref([]);async function v(){try{const t=await a.GetOnwayTimeTree({onwayId:e.unref(l),supplyId:e.unref(n)});s.value=t}catch{}}const r=e.ref();e.onLoad((()=>{r.value=e.index.getSystemInfoSync().statusBarHeight}));const d=e.computed((()=>`${r.value+56}px`));function m(){e.index.navigateBack()}const c=e.ref();function g(e){var a,t,u,l,n,o,s,v,r,d,m,g,p,h,E,W,f,y,T,b,S,x,M,w,C,j,U,k,D,N,L,A,I,B,H,P;const $={type:e,name:1===e?(null==(t=null==(a=i.value)?void 0:a.SupEnt)?void 0:t.Name)??"":(null==(l=null==(u=i.value)?void 0:u.UnloadEnt)?void 0:l.PlaceName)??"",address:1===e?`${(null==(o=null==(n=i.value)?void 0:n.SupEnt)?void 0:o.Province)??""}${(null==(v=null==(s=i.value)?void 0:s.SupEnt)?void 0:v.City)??""}${(null==(d=null==(r=i.value)?void 0:r.SupEnt)?void 0:d.District)??""}${(null==(g=null==(m=i.value)?void 0:m.SupEnt)?void 0:g.Address)??""}`:`${(null==(h=null==(p=i.value)?void 0:p.UnloadEnt)?void 0:h.Province)??""}${(null==(W=null==(E=i.value)?void 0:E.UnloadEnt)?void 0:W.City)??""}${(null==(y=null==(f=i.value)?void 0:f.UnloadEnt)?void 0:y.District)??""}${(null==(b=null==(T=i.value)?void 0:T.UnloadEnt)?void 0:b.Address)??""}`,user:1===e?(null==(x=null==(S=i.value)?void 0:S.SupEnt)?void 0:x.Linker)??"":(null==(w=null==(M=i.value)?void 0:M.UnloadEnt)?void 0:w.NickName)??"",phone:1===e?(null==(j=null==(C=i.value)?void 0:C.SupEnt)?void 0:j.LinkerMobile)??"":(null==(k=null==(U=i.value)?void 0:U.UnloadEnt)?void 0:k.Mobile)??"",longitude:1===e?null==(N=null==(D=i.value)?void 0:D.Supplier)?void 0:N.Logitude:null==(A=null==(L=i.value)?void 0:L.UnloadEnt)?void 0:A.Logitude,latitude:1===e?null==(B=null==(I=i.value)?void 0:I.Supplier)?void 0:B.Latitude:null==(P=null==(H=i.value)?void 0:H.UnloadEnt)?void 0:P.Latitude};c.value.open($)}const p=e.ref();function h(){p.value.open()}const E=e.ref();function W(){E.value.open({title:"运单备注",memo:i.value.AssignMemo})}function f(){E.value.open({title:"卸货说明",memo:i.value.UnloadMemo})}const y=e.ref();function T(){y.value.confirm({title:"确定取消该笔运单？",content:"取消前，建议您联系司机说明原因",cancelText:"再想想",confirmText:"取消运单",asyncClose:!0,async confirm(){try{await a.DisableOnwayEnt({onwayId:i.value.Id,supplyId:n.value,userId:t.getToken().userInfo.Id,userType:"owner"}),y.value.close(),e.index.showToast({title:"操作成功",icon:"none"})}catch(u){y.value.closeLoading(),e.index.showToast({title:u.data,icon:"none"})}finally{o(),v()}}})}function b(){var a,t,u,l;(null==(t=null==(a=i.value)?void 0:a.DriverEnt)?void 0:t.Mobile)&&e.index.makePhoneCall({phoneNumber:null==(l=null==(u=i.value)?void 0:u.DriverEnt)?void 0:l.Mobile})}function S(){y.value.confirm({title:"确认完成卸货？",content:"确认前，建议您联系司机了解情况",cancelText:"再想想",confirmText:"确认卸货",confirmBgColor:"var(--main-color)",asyncClose:!0,async confirm(){try{await a.UnloadConfirm({onwayId:i.value.Id,supplyId:n.value,userId:t.getToken().userInfo.Id,uType:"owner"}),y.value.close(),e.index.showToast({title:"操作成功",icon:"none"})}catch(u){console.log("err",u),y.value.closeLoading(),e.index.showToast({title:u.data,icon:"none"})}finally{o(),v()}}})}return(a,t)=>e.e({a:e.o(m),b:e.p({bgColor:"rgba(255,255,255,0)"}),c:d.value,d:"0"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{e:"1"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{f:"2"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{g:"3"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{h:"4"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{i:"5"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{j:"6"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{k:"7"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{l:"8"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{m:"9"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{n:e.p({name:"arrow-right",size:"32rpx",color:"var(--title-color)","custom-style":{marginLeft:"8rpx"},bold:!0}),o:"0"===i.value.Weightedstatus},"0"===i.value.Weightedstatus?e.e({p:i.value.EndTime&&e.unref(e.dayjs)().isAfter(i.value.EndTime)},i.value.EndTime&&e.unref(e.dayjs)().isAfter(i.value.EndTime)||!i.value.StartTime&&!i.value.EndTime||i.value.StartTime&&e.unref(e.dayjs)().isAfter(i.value.StartTime)&&!i.value.EndTime?{}:!i.value.EndTime&&i.value.StartTime&&e.unref(e.dayjs)().isBefore(i.value.StartTime)?{s:e.t(e.unref(e.dayjs)(i.value.StartTime).format("MM-DD HH:mm"))}:i.value.EndTime&&i.value.StartTime&&e.unref(e.dayjs)().isBefore(i.value.StartTime)?{v:e.t(e.unref(e.dayjs)(i.value.StartTime).format("MM-DD HH:mm")),w:e.t(e.unref(e.dayjs)(i.value.EndTime).format("MM-DD HH:mm"))}:i.value.StartTime&&e.unref(e.dayjs)().isAfter(i.value.StartTime)&&i.value.EndTime&&e.unref(e.dayjs)().isBefore(i.value.EndTime)||!i.value.StartTime&&i.value.EndTime&&e.unref(e.dayjs)().isBefore(i.value.EndTime)?{y:e.t(e.unref(e.dayjs)(i.value.EndTime).format("MM-DD HH:mm"))}:{},{q:!i.value.StartTime&&!i.value.EndTime||i.value.StartTime&&e.unref(e.dayjs)().isAfter(i.value.StartTime)&&!i.value.EndTime,r:!i.value.EndTime&&i.value.StartTime&&e.unref(e.dayjs)().isBefore(i.value.StartTime),t:i.value.EndTime&&i.value.StartTime&&e.unref(e.dayjs)().isBefore(i.value.StartTime),x:i.value.StartTime&&e.unref(e.dayjs)().isAfter(i.value.StartTime)&&i.value.EndTime&&e.unref(e.dayjs)().isBefore(i.value.EndTime)||!i.value.StartTime&&i.value.EndTime&&e.unref(e.dayjs)().isBefore(i.value.EndTime)}):{},{z:"1"===i.value.Weightedstatus},"1"===i.value.Weightedstatus?{A:e.t(i.value.StatusCount&&i.value.StatusCount>1?`当前共 ${i.value.StatusCount} 辆车等待入厂`:"即将入厂")}:{},{B:"2"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{C:"3"===i.value.Weightedstatus},"3"===i.value.Weightedstatus?{D:e.t(i.value.StatusCount&&i.value.StatusCount>1?`当前共 ${i.value.StatusCount} 辆车等待装车`:"即将装车")}:{},{E:"4"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{F:"5"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{G:"6"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{H:"7"===i.value.Weightedstatus},(i.value.Weightedstatus,{}),{I:"8"===i.value.Weightedstatus},"8"===i.value.Weightedstatus?{J:e.t(i.value.UserType?"driver"===i.value.UserType?"司机":"货主":"")}:{},{K:"9"===i.value.Weightedstatus},"9"===i.value.Weightedstatus?{L:e.t(i.value.UserType?"driver"===i.value.UserType?"司机":"货主":"")}:{},{M:e.o(h),N:i.value.SupEnt},i.value.SupEnt?e.e({O:e.t(i.value.SupEnt.Name||""),P:!i.value.SupEnt.Linker&!i.value.Supplier.LinkerMobile},!i.value.SupEnt.Linker&!i.value.Supplier.LinkerMobile?{}:e.e({Q:i.value.Supplier.Linker},i.value.Supplier.Linker?{R:e.t(i.value.Supplier.Linker||"")}:{},{S:i.value.Supplier.LinkerMobile},i.value.Supplier.LinkerMobile?{T:e.t(i.value.Supplier.LinkerMobile||"")}:{}),{U:e.o(((...e)=>a.selectAddress&&a.selectAddress(...e))),V:e.p({src:"/static/images/arrow.png",duration:0,width:"24rpx",height:"24rpx"}),W:i.value.UnloadPlace?1:"",X:e.o((e=>g(1)))}):{},{Y:i.value.UnloadEnt},i.value.UnloadEnt?e.e({Z:i.value.UnloadEnt&&i.value.UnloadEnt.PlaceName},i.value.UnloadEnt&&i.value.UnloadEnt.PlaceName?{aa:e.t(i.value.UnloadEnt.PlaceName)}:{},{ab:!i.value.UnloadEnt.NickName&!i.value.UnloadEnt.Mobile},!i.value.UnloadEnt.NickName&!i.value.UnloadEnt.Mobile?{}:e.e({ac:i.value.UnloadEnt.NickName},i.value.UnloadEnt.NickName?{ad:e.t(i.value.UnloadEnt.NickName||"")}:{},{ae:i.value.UnloadEnt.Mobile},i.value.UnloadEnt.Mobile?{af:e.t(i.value.UnloadEnt.Mobile||"")}:{}),{ag:e.o(((...e)=>a.selectAddress&&a.selectAddress(...e))),ah:e.p({src:"/static/images/arrow.png",duration:0,width:"24rpx",height:"24rpx"}),ai:e.o((e=>g(2)))}):{},{aj:e.t(i.value.Materialname||""),ak:["0","1","2","3","4","5","9"].includes(i.value.Weightedstatus)},["0","1","2","3","4","5","9"].includes(i.value.Weightedstatus)?{al:e.t(i.value.EstimiteWeight)}:{am:e.t(i.value.WeightEnt?i.value.WeightEnt.Suttle:"")},{an:["0","1","2","3","4","5","9"].includes(i.value.Weightedstatus)},["0","1","2","3","4","5","9"].includes(i.value.Weightedstatus)?{ao:e.t(i.value.EstimateAmount)}:{},{ap:["6"].includes(i.value.Weightedstatus)},["6"].includes(i.value.Weightedstatus)?{aq:e.t(i.value.RealAmount)}:{},{ar:["7","8"].includes(i.value.Weightedstatus)},["7","8"].includes(i.value.Weightedstatus)?{as:e.p({direction:"col",color:"var(--divider)",margin:"0 24rpx",length:"64rpx"}),at:e.p({price:i.value.RealAmount,color:"var(--red-color)"})}:{},{av:i.value.WeightEnt&&i.value.WeightEnt.BillNo},i.value.WeightEnt&&i.value.WeightEnt.BillNo?{aw:e.t(i.value.WeightEnt?i.value.WeightEnt.BillNo:"")}:{},{ax:i.value.Carno},i.value.Carno?e.e({ay:e.p({plate:i.value.Carno,color:i.value.CarColor}),az:i.value.CarType},i.value.CarType?{aA:e.t(i.value.CarType)}:{},{aB:i.value.DriverEnt&&i.value.DriverEnt.NickName},i.value.DriverEnt&&i.value.DriverEnt.NickName?{aC:e.t(i.value.DriverEnt.NickName)}:{},{aD:i.value.DriverEnt&&i.value.DriverEnt.Mobile},i.value.DriverEnt&&i.value.DriverEnt.Mobile?{aE:e.t(i.value.DriverEnt.Mobile)}:{},{aF:i.value.FirstWeight?1:""}):{},{aG:["4","5","6","7","8"].includes(i.value.Weightedstatus)},["4","5","6","7","8"].includes(i.value.Weightedstatus)?e.e({aH:i.value.WeightEnt},i.value.WeightEnt?{aI:e.t(i.value.WeightEnt.FirstWeight||"")}:{},{aJ:i.value.WeightEnt},i.value.WeightEnt?{aK:e.t(i.value.WeightEnt.FirstTime?e.unref(e.dayjs)(i.value.WeightEnt.FirstTime).format("MM/DD HH:mm"):"")}:{},{aL:i.value.SecondWeight?1:""}):{},{aM:["6","7","8"].includes(i.value.Weightedstatus)},["6","7","8"].includes(i.value.Weightedstatus)?e.e({aN:i.value.WeightEnt},i.value.WeightEnt?{aO:e.t(i.value.WeightEnt.SecondWeight||"")}:{},{aP:i.value.WeightEnt},i.value.WeightEnt?{aQ:e.t(i.value.WeightEnt.SecondTime?e.unref(e.dayjs)(i.value.WeightEnt.SecondTime).format("MM/DD HH:mm"):"")}:{}):{},{aR:i.value.OwerName},i.value.OwerName?{aS:e.t(i.value.OwerName)}:{},{aT:e.t(i.value.OnwayNo),aU:e.t(i.value.Creatortime),aV:["8","9"].includes(i.value.Weightedstatus)},["8","9"].includes(i.value.Weightedstatus)?{aW:e.t("8"==i.value.Weightedstatus?"完成时间":"取消时间"),aX:e.t(i.value.LastModifyTime)}:{},{aY:e.p({src:"/static/images/arrow.png",width:"18rpx",height:"18rpx",duration:0,customStyle:{marginLeft:"2rpx"}}),aZ:e.o(W),ba:i.value.UnloadMemo&&"8"==i.value.Weightedstatus},i.value.UnloadMemo&&"8"==i.value.Weightedstatus?{bb:e.p({src:"/static/images/arrow.png",width:"18rpx",height:"18rpx",duration:0,customStyle:{marginLeft:"2rpx"}}),bc:e.o(f)}:{},{bd:i.value.AssignCode},i.value.AssignCode?{be:e.t(i.value.AssignCode)}:{},{bf:["0","1","2","3","4","5","6","7"].includes(i.value.Weightedstatus)},["0","1","2","3","4","5","6","7"].includes(i.value.Weightedstatus)?e.e({bg:["0","1"].includes(i.value.Weightedstatus)},["0","1"].includes(i.value.Weightedstatus)?{bh:e.o(T),bi:e.p({text:"取消运单",color:"var(--page-bg)","custom-style":{height:"96rpx",borderRadius:"16rpx",color:"var(--sub-color)"}}),bj:e.o(b),bk:e.p({text:"呼叫司机",color:" linear-gradient( 270deg, #31CE57 0%, #07B130 100%)","custom-style":{height:"96rpx",borderRadius:"16rpx"}})}:{},{bl:["2","3","4","5","6"].includes(i.value.Weightedstatus)},["2","3","4","5","6"].includes(i.value.Weightedstatus)?{bm:e.o(b),bn:e.p({text:"呼叫司机",color:" linear-gradient( 270deg, #31CE57 0%, #07B130 100%)","custom-style":{height:"96rpx",width:"100%",borderRadius:"16rpx"}})}:{},{bo:["7"].includes(i.value.Weightedstatus)},["7"].includes(i.value.Weightedstatus)?{bp:e.o(S),bq:e.p({text:"确认卸货",color:"var(--page-bg)","custom-style":{height:"96rpx",borderRadius:"16rpx",color:"var(--sub-color)"}}),br:e.o(b),bs:e.p({text:"呼叫司机",color:" linear-gradient( 270deg, #31CE57 0%, #07B130 100%)","custom-style":{height:"96rpx",borderRadius:"16rpx"}})}:{}):{},{bt:e.sr(c,"77326575-14",{k:"mapModal"}),bv:e.sr(p,"77326575-15",{k:"stepModal"}),bw:e.sr(E,"77326575-16",{k:"remarkModal"}),bx:e.sr(y,"77326575-17",{k:"confirm"})})}};wx.createPage(i);
