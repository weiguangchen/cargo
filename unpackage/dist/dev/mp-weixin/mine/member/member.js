"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_app = require("../../stores/app.js");
if (!Array) {
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_tabs2 + _easycom_uv_load_more2 + _easycom_uv_button2)();
}
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_tabs + Item + _easycom_uv_load_more + _easycom_uv_button)();
}
const Item = () => "./components/item.js";
const _sfc_main = {
  __name: "member",
  setup(__props) {
    stores_app.useAppStore();
    const current = common_vendor.ref(0);
    const tabs = common_vendor.ref([{
      name: "我关联的成员"
    }, {
      name: "关联我的成员"
    }]);
    function changeTabs({
      name,
      index
    }) {
      current.value = index;
      console.log(index, name);
    }
    function relate() {
      common_vendor.index.navigateTo({
        url: "/mine/relateMember/relateMember"
      });
    }
    function openQrcode() {
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(changeTabs),
        b: common_vendor.p({
          activeStyle: {
            fontWeight: "bold",
            color: "var(--title-color)"
          },
          inactiveStyle: {
            color: "var(--sub-color)"
          },
          lineWidth: "32rpx",
          lineHeight: "8rpx",
          list: tabs.value,
          scrollable: false,
          lineColor: "var(--main-color)",
          customStyle: {
            background: "#ffffff"
          },
          current: current.value
        }),
        c: current.value === 0
      }, current.value === 0 ? {
        d: common_vendor.f(20, (item, index, i0) => {
          return {
            a: "4e00c172-1-" + i0
          };
        })
      } : {}, {
        e: current.value === 1
      }, current.value === 1 ? {
        f: common_vendor.f(20, (item, index, i0) => {
          return {
            a: "4e00c172-2-" + i0
          };
        })
      } : {}, {
        g: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        }),
        h: current.value === 0
      }, current.value === 0 ? {
        i: common_vendor.o(relate),
        j: common_vendor.p({
          text: "扫码关联",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        })
      } : {}, {
        k: current.value === 1
      }, current.value === 1 ? {
        l: common_vendor.o(openQrcode),
        m: common_vendor.p({
          text: "出示二维码",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/mine/member/member.vue"]]);
wx.createPage(MiniProgramPage);
