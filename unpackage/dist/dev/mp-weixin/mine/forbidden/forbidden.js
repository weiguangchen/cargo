"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_image2 + _easycom_uv_load_more2 + _easycom_uv_button2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_load_more + _easycom_uv_button)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.f(4, (item, index, i0) => {
      return {
        a: "9f2b5634-0-" + i0,
        b: index < 3 ? 1 : ""
      };
    }),
    b: common_vendor.p({
      src: "/static/images/remove.png",
      width: "32rpx",
      height: "32rpx",
      duration: 0,
      ["custom-style"]: {
        marginRight: "8rpx"
      }
    }),
    c: common_vendor.p({
      status: "nomore",
      color: "#B0BECC"
    }),
    d: common_vendor.p({
      text: "添加黑名单",
      color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
      ["custom-style"]: {
        height: "96rpx",
        borderRadius: "16rpx"
      }
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/wei/cargo/mine/forbidden/forbidden.vue"]]);
wx.createPage(MiniProgramPage);
