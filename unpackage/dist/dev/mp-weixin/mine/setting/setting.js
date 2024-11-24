"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_token = require("../../utils/token.js");
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_icon2 + _easycom_uv_button2)();
}
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    function logout() {
      utils_token.removeToken();
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "arrow-right",
          color: "#000000",
          size: "24rpx"
        }),
        b: common_vendor.p({
          name: "arrow-right",
          color: "#000000",
          size: "24rpx"
        }),
        c: common_vendor.p({
          name: "arrow-right",
          color: "#000000",
          size: "24rpx"
        }),
        d: common_vendor.o(logout),
        e: common_vendor.p({
          text: "退出登录",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          },
          customTextStyle: {
            color: "var(--red-color)"
          }
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/mine/setting/setting.vue"]]);
wx.createPage(MiniProgramPage);
