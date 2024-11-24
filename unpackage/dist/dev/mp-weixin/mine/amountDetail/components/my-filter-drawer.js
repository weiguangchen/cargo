"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_col2 = common_vendor.resolveComponent("uv-col");
  const _easycom_uv_row2 = common_vendor.resolveComponent("uv-row");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  const _easycom_uv_datetime_picker2 = common_vendor.resolveComponent("uv-datetime-picker");
  (_easycom_uv_image2 + _easycom_uv_col2 + _easycom_uv_row2 + _easycom_uv_button2 + _easycom_my_drawer2 + _easycom_uv_datetime_picker2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_col = () => "../../../uni_modules/uv-row/components/uv-col/uv-col.js";
const _easycom_uv_row = () => "../../../uni_modules/uv-row/components/uv-row/uv-row.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
const _easycom_uv_datetime_picker = () => "../../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_col + _easycom_uv_row + MyDatetime + MySelect + _easycom_uv_button + _easycom_my_drawer + _easycom_uv_datetime_picker)();
}
const MySelect = () => "./my-select.js";
const MyDatetime = () => "./my-datetime.js";
const _sfc_main = {
  __name: "my-filter-drawer",
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    function change(show) {
      emits("change", show);
    }
    const filter = common_vendor.ref();
    function open() {
      filter.value.popup.open();
    }
    function openFilter() {
      filter.value.popup.open();
    }
    common_vendor.ref([{
      label: "接单时间",
      value: "1"
    }, {
      label: "完成状态",
      value: "2"
    }]);
    common_vendor.ref(1);
    common_vendor.ref([{
      label: "全部状态",
      value: "all"
    }, {
      label: "已接单",
      value: "1"
    }, {
      label: "已完成",
      value: "2"
    }, {
      label: "已取消",
      value: "3"
    }]);
    common_vendor.ref("all");
    common_vendor.ref([{
      label: "全部车辆",
      value: "all"
    }, {
      label: "车辆1",
      value: "1"
    }, {
      label: "车辆2",
      value: "2"
    }, {
      label: "车辆3",
      value: "3"
    }]);
    common_vendor.ref("all");
    const mfrsOptions = common_vendor.ref([{
      label: "全部装货厂家",
      value: "all"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "1"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "2"
    }]);
    const mfrs = common_vendor.ref("all");
    common_vendor.ref([{
      label: "全部物料",
      value: "all"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "1"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "2"
    }]);
    common_vendor.ref("all");
    common_vendor.ref([{
      label: "全部卸货地",
      value: "all"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "1"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "2"
    }]);
    common_vendor.ref("all");
    common_vendor.ref([{
      label: "全部货主",
      value: "all"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "1"
    }, {
      label: "河南洛阳腾圃代理有限公司",
      value: "2"
    }]);
    common_vendor.ref("all");
    const dateMode = common_vendor.ref("全部时间");
    function setDateMode(mode) {
      dateMode.value = mode;
      if (dateMode.value === "全部时间") {
        date.value = [];
      }
      if (dateMode.value === "今天") {
        date.value = [common_vendor.dayjs().format("YYYY-MM-DD"), common_vendor.dayjs().format("YYYY-MM-DD")];
      }
      if (dateMode.value === "昨天") {
        date.value = [common_vendor.dayjs().subtract(1, "day").format("YYYY-MM-DD"), common_vendor.dayjs().subtract(1, "day").format("YYYY-MM-DD")];
      }
      if (dateMode.value === "本月") {
        date.value = [common_vendor.dayjs().startOf("month").format("YYYY-MM-DD"), common_vendor.dayjs().endOf("month").format("YYYY-MM-DD")];
      }
      if (dateMode.value === "近7天") {
        date.value = [common_vendor.dayjs().subtract(7, "day").format("YYYY-MM-DD"), common_vendor.dayjs().format("YYYY-MM-DD")];
      }
      if (dateMode.value === "近30天") {
        date.value = [common_vendor.dayjs().subtract(30, "day").format("YYYY-MM-DD"), common_vendor.dayjs().format("YYYY-MM-DD")];
      }
    }
    const date = common_vendor.ref([]);
    function changeDate(date2) {
      console.log(date2);
    }
    common_vendor.computed(() => {
    });
    function reset() {
      filter.value.popup.close();
    }
    function submit() {
      console.log("date", date);
      filter.value.popup.close();
    }
    __expose({
      open
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/images/filter/filter.png",
          width: "32rpx",
          height: "32rpx"
        }),
        b: common_vendor.o(openFilter),
        c: dateMode.value === "全部时间" ? 1 : "",
        d: common_vendor.o(($event) => setDateMode("全部时间")),
        e: common_vendor.p({
          span: "4"
        }),
        f: dateMode.value === "今天" ? 1 : "",
        g: common_vendor.o(($event) => setDateMode("今天")),
        h: common_vendor.p({
          span: "4"
        }),
        i: dateMode.value === "昨天" ? 1 : "",
        j: common_vendor.o(($event) => setDateMode("昨天")),
        k: common_vendor.p({
          span: "4"
        }),
        l: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        m: common_vendor.o(($event) => setDateMode("本月")),
        n: common_vendor.p({
          span: "4"
        }),
        o: common_vendor.o(($event) => setDateMode("近7天")),
        p: common_vendor.p({
          span: "4"
        }),
        q: common_vendor.o(($event) => setDateMode("近30天")),
        r: common_vendor.p({
          span: "4"
        }),
        s: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        t: common_vendor.o(changeDate),
        v: common_vendor.o(($event) => date.value = $event),
        w: common_vendor.p({
          modelValue: date.value
        }),
        x: common_vendor.o(($event) => mfrs.value = $event),
        y: common_vendor.p({
          options: mfrsOptions.value,
          title: "选择装货厂家",
          modelValue: mfrs.value
        }),
        z: common_vendor.p({
          span: "12"
        }),
        A: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        B: common_vendor.o(reset),
        C: common_vendor.p({
          text: "重置",
          ["custom-style"]: {
            height: "96rpx",
            color: "var(--sub-color)",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            fontWeight: "bold"
          }
        }),
        D: common_vendor.o(submit),
        E: common_vendor.p({
          text: "筛选",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            fontWeight: "bold"
          }
        }),
        F: common_vendor.sr(filter, "ab71c9b6-1", {
          "k": "filter"
        }),
        G: common_vendor.o(change),
        H: common_vendor.p({
          title: "账单筛选",
          height: "550"
        }),
        I: common_vendor.sr("datetimePicker", "ab71c9b6-16"),
        J: common_vendor.o(_ctx.confirmDateTime),
        K: common_vendor.p({
          mode: "date",
          confirmColor: "var(--main-color)",
          ["min-date"]: _ctx.minDate,
          ["max-date"]: _ctx.maxDate
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/mine/amountDetail/components/my-filter-drawer.vue"]]);
wx.createComponent(Component);
