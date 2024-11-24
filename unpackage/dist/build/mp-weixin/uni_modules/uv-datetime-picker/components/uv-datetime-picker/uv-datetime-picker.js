"use strict";const e=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),t=require("../../../uv-ui-tools/libs/mixin/mixin.js"),i=require("./props.js"),n=require("../../../uv-ui-tools/libs/util/dayjs.js"),s=require("../../../../common/vendor.js");const r={name:"uv-datetime-picker",emits:["close","cancel","confirm","input","change","update:modelValue"],mixins:[e.mpMixin,t.mixin,i.props],data:()=>({columns:[],innerDefaultIndex:[],innerFormatter:(e,t)=>t}),watch:{propsChange(){this.$uv.sleep(100).then((e=>{this.init()}))}},computed:{propsChange(){const e=this.value||this.modelValue;return[this.mode,this.maxDate,this.minDate,this.minHour,this.maxHour,this.minMinute,this.maxMinute,this.filter,e]}},mounted(){this.init()},methods:{init(){this.getValue(),this.updateColumnValue(this.innerValue)},getValue(){const e=this.value||this.modelValue;this.innerValue=this.correctValue(e)},setFormatter(e){this.innerFormatter=e},open(){this.$refs.picker.open(),setTimeout((()=>{this.getValue(),this.updateColumnValue(this.innerValue)}),10)},close(){this.$emit("close")},cancel(){this.$emit("cancel")},confirm(){this.$emit("confirm",{value:this.innerValue,mode:this.mode}),this.clearDate||(this.$emit("input",this.innerValue),this.$emit("update:modelValue",this.innerValue))},intercept(e,t){let i=e.match(/\d+/g);return i.length>1?(this.$uv.error("请勿在过滤或格式化函数时添加数字"),0):t&&4==i[0].length?i[0]:i[0].length>2?(this.$uv.error("请勿在过滤或格式化函数时添加数字"),0):i[0]},change(e){const{indexs:t,values:i}=e;let s="";if("time"===this.mode)s=`${this.intercept(i[0][t[0]])}:${this.intercept(i[1][t[1]])}`;else if("year"===this.mode){const e=parseInt(this.intercept(i[0][t[0]],"year"));s=Number(new Date(e,0))}else{const e=parseInt(this.intercept(i[0][t[0]],"year")),r=parseInt(this.intercept(i[1][t[1]]));let a=parseInt(i[2]?this.intercept(i[2][t[2]]):1),o=0,u=0;const h=n.dayjs(`${e}-${r}`).daysInMonth();"year-month"===this.mode&&(a=1),a=Math.min(h,a),"datetime"===this.mode&&(o=parseInt(this.intercept(i[3][t[3]])),u=parseInt(this.intercept(i[4][t[4]]))),s=Number(new Date(e,r-1,a,o,u))}s=this.correctValue(s),this.innerValue=s,this.updateColumnValue(s),this.$emit("change",{value:s,mode:this.mode})},updateColumnValue(e){this.innerValue=e,this.updateColumns(),this.updateIndexs(e)},updateIndexs(e){let t=[];const i=this.formatter||this.innerFormatter;if("time"===this.mode){const n=e.split(":");t=[i("hour",n[0]),i("minute",n[1])]}else t=[i("year",`${n.dayjs(e).year()}`),i("month",this.$uv.padZero(n.dayjs(e).month()+1))],"date"===this.mode&&t.push(i("day",this.$uv.padZero(n.dayjs(e).date()))),"datetime"===this.mode&&t.push(i("day",this.$uv.padZero(n.dayjs(e).date())),i("hour",this.$uv.padZero(n.dayjs(e).hour())),i("minute",this.$uv.padZero(n.dayjs(e).minute())));const s=this.columns.map(((e,i)=>Math.max(0,e.findIndex((e=>e===t[i])))));this.$nextTick((()=>{this.$uv.sleep(100).then((e=>{this.$refs.picker.setIndexs(s,!0)}))}))},updateColumns(){const e=this.formatter||this.innerFormatter,t=this.getOriginColumns().map((t=>t.values.map((i=>e(t.type,i)))));this.columns=t},getOriginColumns(){return this.getRanges().map((({type:e,range:t})=>{let i=function(e,t){let i=-1;const n=Array(e<0?0:e);for(;++i<e;)n[i]=t(i);return n}(t[1]-t[0]+1,(i=>{let n=t[0]+i;return n="year"===e?`${n}`:this.$uv.padZero(n),n}));return this.filter&&(i=this.filter(e,i)),{type:e,values:i}}))},generateArray:(e,t)=>Array.from(new Array(t+1).keys()).slice(e),correctValue(e){const t="time"!==this.mode;if(t&&!this.$uv.test.date(e)?e=this.minDate:t||e||(e=`${this.$uv.padZero(this.minHour)}:${this.$uv.padZero(this.minMinute)}`),t)return e=n.dayjs(e).isBefore(n.dayjs(this.minDate))?this.minDate:e,e=n.dayjs(e).isAfter(n.dayjs(this.maxDate))?this.maxDate:e;{if(-1===String(e).indexOf(":"))return this.$uv.error("时间错误，请传递如12:24的格式");let[t,i]=e.split(":");return t=this.$uv.padZero(this.$uv.range(this.minHour,this.maxHour,Number(t))),i=this.$uv.padZero(this.$uv.range(this.minMinute,this.maxMinute,Number(i))),`${t}:${i}`}},getRanges(){if("time"===this.mode)return[{type:"hour",range:[this.minHour,this.maxHour]},{type:"minute",range:[this.minMinute,this.maxMinute]}];const{maxYear:e,maxDate:t,maxMonth:i,maxHour:n,maxMinute:s}=this.getBoundary("max",this.innerValue),{minYear:r,minDate:a,minMonth:o,minHour:u,minMinute:h}=this.getBoundary("min",this.innerValue),m=[{type:"year",range:[r,e]},{type:"month",range:[o,i]},{type:"day",range:[a,t]},{type:"hour",range:[u,n]},{type:"minute",range:[h,s]}];return"date"===this.mode&&m.splice(3,2),"year-month"===this.mode&&m.splice(2,3),"year"===this.mode&&m.splice(1,4),m},getBoundary(e,t){const i=new Date(t),s=new Date(this[`${e}Date`]),r=n.dayjs(s).year();let a=1,o=1,u=0,h=0;return"max"===e&&(a=12,o=n.dayjs(i).daysInMonth(),u=23,h=59),n.dayjs(i).year()===r&&(a=n.dayjs(s).month()+1,n.dayjs(i).month()+1===a&&(o=n.dayjs(s).date(),n.dayjs(i).date()===o&&(u=n.dayjs(s).hour(),n.dayjs(i).hour()===u&&(h=n.dayjs(s).minute())))),{[`${e}Year`]:r,[`${e}Month`]:a,[`${e}Date`]:o,[`${e}Hour`]:u,[`${e}Minute`]:h}}}};if(!Array){s.resolveComponent("uv-picker")()}Math;const a=s._export_sfc(r,[["render",function(e,t,i,n,r,a){return{a:s.sr("picker","368908ab-0"),b:s.o(a.close),c:s.o(a.cancel),d:s.o(a.confirm),e:s.o(a.change),f:s.p({closeOnClickOverlay:e.closeOnClickOverlay,closeOnClickConfirm:e.closeOnClickConfirm,columns:r.columns,title:e.title,itemHeight:e.itemHeight,showToolbar:e.showToolbar,visibleItemCount:e.visibleItemCount,defaultIndex:r.innerDefaultIndex,cancelText:e.cancelText,confirmText:e.confirmText,cancelColor:e.cancelColor,confirmColor:e.confirmColor,round:e.round})}}]]);wx.createComponent(a);
