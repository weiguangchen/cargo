"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_radio2 = common_vendor.resolveComponent("uv-radio");
  const _easycom_uv_radio_group2 = common_vendor.resolveComponent("uv-radio-group");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_radio2 + _easycom_uv_radio_group2 + _easycom_uv_button2)();
}
const _easycom_uv_radio = () => "../../uni_modules/uv-radio/components/uv-radio/uv-radio.js";
const _easycom_uv_radio_group = () => "../../uni_modules/uv-radio/components/uv-radio-group/uv-radio-group.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_radio + _easycom_uv_radio_group + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "relateMember",
  setup(__props) {
    const radiovalue = common_vendor.ref();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(10, (item, index, i0) => {
          return {
            a: "9aa80c5c-1-" + i0 + ",9aa80c5c-0",
            b: common_vendor.p({
              name: item
            }),
            c: index < 9 ? 1 : ""
          };
        }),
        b: common_vendor.o(($event) => radiovalue.value = $event),
        c: common_vendor.p({
          size: "16",
          activeColor: "var(--main-color)",
          modelValue: radiovalue.value
        }),
        d: common_vendor.p({
          text: "确定关联",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          }
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/mine/relateMember/relateMember.vue"]]);
wx.createPage(MiniProgramPage);
