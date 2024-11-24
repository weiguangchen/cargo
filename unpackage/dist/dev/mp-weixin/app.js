"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_uvUiTools_index = require("./uni_modules/uv-ui-tools/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/enterprise/enterprise.js";
  "./pages/task/task.js";
  "./pages/mine/mine.js";
  "./pages/enterpriseDetail/enterpriseDetail.js";
  "./pages/addressList/addressList.js";
  "./pages/addAddress/addAddress.js";
  "./pages/carList/carList.js";
  "./pages/dispatchTask/dispatchTask.js";
  "./pages/selectAddress/selectAddress.js";
  "./pages/orderList/orderList.js";
  "./pages/billDetail/billDetail.js";
  "./pages/manifestList/manifestList.js";
  "./pages/manifestDetail/manifestDetail.js";
  "./pages/orderDetail/orderDetail.js";
  "./pages/waybill/waybill.js";
  "./pages/feedback/feedback.js";
  "./pages/feedback/result.js";
  "./pages/guide/guide.js";
  "./pages/webview/webview.js";
  "./pages/agreement/agreement.js";
  "./mine/account/account.js";
  "./mine/amountDetail/amountDetail.js";
  "./mine/setting/setting.js";
  "./mine/statistics/statistics.js";
  "./mine/forbidden/forbidden.js";
  "./mine/member/member.js";
  "./mine/relateMember/relateMember.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  app.use(uni_modules_uvUiTools_index.uvUI);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
