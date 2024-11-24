"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_dict = require("../../utils/dict.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  (_easycom_uv_search2 + _easycom_uv_navbar2 + _easycom_uv_tabs2 + _easycom_uv_load_more2 + _easycom_my_empty2)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
if (!Math) {
  (_easycom_uv_search + _easycom_uv_navbar + _easycom_uv_tabs + Order + _easycom_uv_load_more + _easycom_my_empty)();
}
const Order = () => "./components/order.js";
const _sfc_main = {
  __name: "orderList",
  setup(__props) {
    const show = common_vendor.ref(false);
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const navbarPad = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      console.log("menuButtonInfo", menuButtonInfo);
      navbarPad.value = menuButtonInfo.width + 20;
    });
    const status = common_vendor.ref(3);
    function changeTabs({
      name,
      index
    }) {
      var _a, _b;
      console.log(index, name);
      status.value = ((_b = (_a = utils_dict.OrderStatusOptions) == null ? void 0 : _a.find((m) => m.name === name)) == null ? void 0 : _b.value) ?? "";
      getList();
    }
    common_vendor.ref();
    function toDetail(record) {
      common_vendor.index.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderId=${record.SSOrderId}`
      });
    }
    common_vendor.onLoad(() => {
      getList();
    });
    const list = common_vendor.ref([]);
    async function getList() {
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetOrderListByTab({
          status: status.value
        });
        list.value = res;
      } catch {
        list.value = [];
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.o(($event) => _ctx.keyword = $event),
        c: common_vendor.p({
          placeholder: "搜索订单号",
          showAction: false,
          modelValue: _ctx.keyword
        }),
        d: `${navbarPad.value}px`,
        e: common_vendor.o(leftClick),
        f: common_vendor.p({
          placeholder: true
        }),
        g: common_vendor.o(changeTabs),
        h: common_vendor.p({
          activeStyle: {
            fontWeight: "bold",
            color: "var(--title-color)"
          },
          inactiveStyle: {
            color: "var(--sub-color)"
          },
          lineWidth: "32rpx",
          lineHeight: "8rpx",
          list: common_vendor.unref(utils_dict.OrderStatusOptions),
          scrollable: false,
          lineColor: "var(--main-color)",
          customStyle: {
            background: "#ffffff"
          }
        }),
        i: list.value.length > 0
      }, list.value.length > 0 ? {
        j: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.SSOrderId,
            b: common_vendor.o(toDetail, item.SSOrderId),
            c: "0e078562-3-" + i0,
            d: common_vendor.p({
              record: item
            })
          };
        }),
        k: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/orderList/orderList.vue"]]);
wx.createPage(MiniProgramPage);
