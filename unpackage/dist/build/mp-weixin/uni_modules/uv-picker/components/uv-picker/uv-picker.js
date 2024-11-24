"use strict";const e=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),n=require("../../../uv-ui-tools/libs/mixin/mixin.js"),t=require("./props.js"),i=require("../../../../common/vendor.js"),o={name:"uv-picker",emits:["confirm","cancel","close","change"],mixins:[e.mpMixin,n.mixin,t.props],computed:{textStyle(){return(e,n)=>{const t={display:"block"};return this.color&&(t.color=this.color),this.activeColor&&n===this.innerIndex[e]&&(t.color=this.activeColor),t}}},data:()=>({lastIndex:[],innerIndex:[],innerColumns:[],columnIndex:0}),watch:{defaultIndex:{immediate:!0,handler(e){this.setIndexs(e,!0)}},columns:{deep:!0,immediate:!0,handler(e){this.setColumns(e)}}},methods:{open(){this.$refs.pickerPopup.open()},close(){this.$refs.pickerPopup.close()},popupChange(e){e.show||this.$emit("close")},getItemText(e){return this.$uv.test.object(e)?e[this.keyName]:e},cancel(){this.$emit("cancel"),this.close()},confirm(){this.$emit("confirm",this.$uv.deepClone({indexs:this.innerIndex,value:this.innerColumns.map(((e,n)=>e[this.innerIndex[n]])),values:this.innerColumns})),this.closeOnClickConfirm&&this.close()},changeHandler(e){const{value:n}=e.detail;let t=0,i=0;for(let s=0;s<n.length;s++){let e=n[s];if(e!==(this.lastIndex[s]||0)){i=s,t=e;break}}this.columnIndex=i;const o=this.innerColumns;this.setLastIndex(n),this.setIndexs(n),this.$emit("change",{value:this.innerColumns.map(((e,t)=>e[n[t]])),index:t,indexs:n,values:o,columnIndex:i})},setIndexs(e,n){this.innerIndex=this.$uv.deepClone(e),n&&this.setLastIndex(e)},setLastIndex(e){this.lastIndex=this.$uv.deepClone(e)},setColumnValues(e,n){this.innerColumns.splice(e,1,n);let t=this.$uv.deepClone(this.innerIndex);for(let i=0;i<this.innerColumns.length;i++)i>this.columnIndex&&(t[i]=0);this.setIndexs(t)},getColumnValues(e){return(async()=>{await this.$uv.sleep()})(),this.innerColumns[e]},setColumns(e){this.innerColumns=this.$uv.deepClone(e),0===this.innerIndex.length&&(this.innerIndex=new Array(e.length).fill(0))},getIndexs(){return this.innerIndex},getValues(){return(async()=>{await this.$uv.sleep()})(),this.innerColumns.map(((e,n)=>e[this.innerIndex[n]]))}}};if(!Array){(i.resolveComponent("uv-toolbar")+i.resolveComponent("uv-loading-icon")+i.resolveComponent("uv-popup"))()}Math||((()=>"../../../uv-toolbar/components/uv-toolbar/uv-toolbar.js")+(()=>"../../../uv-loading-icon/components/uv-loading-icon/uv-loading-icon.js")+(()=>"../../../uv-popup/components/uv-popup/uv-popup.js"))();const s=i._export_sfc(o,[["render",function(e,n,t,o,s,l){return i.e({a:e.showToolbar},e.showToolbar?{b:i.o(l.cancel),c:i.o(l.confirm),d:i.p({cancelColor:e.cancelColor,confirmColor:e.confirmColor,cancelText:e.cancelText,confirmText:e.confirmText,title:e.title})}:{},{e:i.f(s.innerColumns,((n,t,o)=>i.e({a:e.$uv.test.array(n)},e.$uv.test.array(n)?{b:i.f(n,((n,o,r)=>({a:i.t(l.getItemText(n)),b:o,c:i.s({height:e.$uv.addUnit(e.itemHeight),lineHeight:e.$uv.addUnit(e.itemHeight),fontWeight:o===s.innerIndex[t]?"bold":"normal"}),d:i.s(l.textStyle(t,o))})))}:{},{c:t}))),f:`height: ${e.$uv.addUnit(e.itemHeight)}`,g:s.innerIndex,h:e.immediateChange,i:`${e.$uv.addUnit(e.visibleItemCount*e.itemHeight)}`,j:i.o(((...e)=>l.changeHandler&&l.changeHandler(...e))),k:e.loading},e.loading?{l:i.p({mode:"circle"})}:{},{m:i.sr("pickerPopup","e71dff16-0"),n:i.o(l.popupChange),o:i.p({mode:"bottom",round:e.round,"close-on-click-overlay":e.closeOnClickOverlay})})}],["__scopeId","data-v-e71dff16"]]);wx.createComponent(s);