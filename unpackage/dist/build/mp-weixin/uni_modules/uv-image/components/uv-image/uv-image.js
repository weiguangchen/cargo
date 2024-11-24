"use strict";const i=require("../../../../common/vendor.js"),e=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),t=require("../../../uv-ui-tools/libs/mixin/mixin.js"),o=require("./props.js"),s={name:"uv-image",emits:["click","load","error"],mixins:[e.mpMixin,t.mixin,o.props],data(){return{isError:!1,loading:!0,backgroundStyle:{},show:!1,observeShow:!this.observeLazyLoad,elIndex:"",imgWidth:this.width,imgHeight:this.height,thresholdValue:50}},watch:{src:{immediate:!0,handler(i){i?(this.isError=!1,this.loading=!0):this.isError=!0}},width(i){this.show=!1,this.$uv.sleep(2).then((i=>{this.show=!0})),this.imgWidth=i},height(i){this.show=!1,this.$uv.sleep(2).then((i=>{this.show=!0})),this.imgHeight=i}},computed:{wrapStyle(){let i={};return"heightFix"!==this.mode&&(i.width=this.$uv.addUnit(this.imgWidth)),"widthFix"!==this.mode&&(i.height=this.$uv.addUnit(this.imgHeight)),i.borderRadius="circle"==this.shape?"10000px":this.$uv.addUnit(this.radius),i.overflow=this.radius>0?"hidden":"visible",this.$uv.deepMerge(i,this.$uv.addStyle(this.customStyle))},imageStyle(){let i={};return i.borderRadius="circle"==this.shape?"10000px":this.$uv.addUnit(this.radius),i}},created(){this.elIndex=this.$uv.guid(),this.observer={},this.observerName="lazyLoadContentObserver"},mounted(){this.show=!0,this.$nextTick((()=>{this.observeLazyLoad&&this.observerFn()}))},methods:{onClick(){this.$emit("click")},onErrorHandler(i){this.loading=!1,this.isError=!0,this.$emit("error",i)},onLoadHandler(i){"widthFix"==this.mode&&(this.imgHeight="auto"),"heightFix"==this.mode&&(this.imgWidth="auto"),this.loading=!1,this.isError=!1,this.$emit("load",i),this.removeBgColor()},removeBgColor(){this.backgroundStyle={backgroundColor:"transparent"}},observerFn(){this.$nextTick((()=>{i.index.$once("onLazyLoadReachBottom",(()=>{this.observeShow||(this.observeShow=!0)}))})),setTimeout((()=>{this.disconnectObserver(this.observerName);const e=i.index.createIntersectionObserver(this);e.relativeToViewport({bottom:this.thresholdValue}).observe(`.uv-image--${this.elIndex}`,(i=>{i.intersectionRatio>0&&(this.observeShow=!0,this.disconnectObserver(this.observerName))})),this[this.observerName]=e}),50)},disconnectObserver(i){const e=this[i];e&&e.disconnect()}}};if(!Array){(i.resolveComponent("uv-icon")+i.resolveComponent("uv-transition"))()}Math||((()=>"../../../uv-icon/components/uv-icon/uv-icon.js")+(()=>"../../../uv-transition/components/uv-transition/uv-transition.js"))();const r=i._export_sfc(s,[["render",function(e,t,o,s,r,h){return i.e({a:r.show},r.show?i.e({b:!r.isError&&r.observeShow},!r.isError&&r.observeShow?{c:e.src,d:e.mode,e:i.o(((...i)=>h.onErrorHandler&&h.onErrorHandler(...i))),f:i.o(((...i)=>h.onLoadHandler&&h.onLoadHandler(...i))),g:e.showMenuByLongpress,h:e.lazyLoad,i:i.s(h.imageStyle),j:e.webp}:{},{k:e.showLoading&&r.loading},e.showLoading&&r.loading?{l:i.p({name:e.loadingIcon,width:e.width,height:e.height}),m:"circle"==e.shape?"50%":e.$uv.addUnit(e.radius),n:e.bgColor,o:e.$uv.addUnit(e.width),p:e.$uv.addUnit(e.height)}:{},{q:e.showError&&r.isError&&!r.loading},e.showError&&r.isError&&!r.loading?{r:i.p({name:e.errorIcon,width:e.width,height:e.height}),s:"circle"==e.shape?"50%":e.$uv.addUnit(e.radius),t:e.$uv.addUnit(e.width),v:e.$uv.addUnit(e.height)}:{},{w:i.n(`uv-image--${r.elIndex}`),x:i.o(((...i)=>h.onClick&&h.onClick(...i))),y:i.s(h.wrapStyle),z:i.s(r.backgroundStyle),A:i.p({show:r.show,mode:"fade",duration:e.fade?e.duration:0,"cell-child":e.cellChild,"custom-style":h.wrapStyle})}):{})}],["__scopeId","data-v-22515f73"]]);wx.createComponent(r);
