"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_token = require("../../utils/token.js");
const stores_app = require("../../stores/app.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_login_drawer2 = common_vendor.resolveComponent("my-login-drawer");
  const _easycom_my_tabbar2 = common_vendor.resolveComponent("my-tabbar");
  (_easycom_uv_search2 + _easycom_uv_navbar2 + _easycom_uv_tabs2 + _easycom_my_empty2 + _easycom_uv_load_more2 + _easycom_my_login_drawer2 + _easycom_my_tabbar2)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_login_drawer = () => "../../components/my-login-drawer/my-login-drawer.js";
const _easycom_my_tabbar = () => "../../components/my-tabbar/my-tabbar.js";
if (!Math) {
  (_easycom_uv_search + _easycom_uv_navbar + _easycom_uv_tabs + _easycom_my_empty + ManifestItem + _easycom_uv_load_more + WaybillItem + _easycom_my_login_drawer + _easycom_my_tabbar)();
}
const ManifestItem = () => "../manifestList/components/item.js";
const WaybillItem = () => "../waybill/components/item.js";
const _sfc_main = {
  __name: "task",
  setup(__props) {
    const appStore = stores_app.useAppStore();
    common_vendor.onLoad(() => {
      appStore.switchTab(2);
    });
    const loginDrawer = common_vendor.ref();
    function openLoginDrawer() {
      loginDrawer.value.open();
    }
    function loginSuccess() {
      common_vendor.index.reLaunch({
        url: "/pages/task/task"
      });
    }
    const show = common_vendor.ref(false);
    const navbarPad = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      console.log("menuButtonInfo", menuButtonInfo);
      navbarPad.value = menuButtonInfo.width + 20;
    });
    const current = common_vendor.ref(0);
    const tabs = common_vendor.ref([{
      name: "进行中的货单"
    }, {
      name: "进行中的运单"
    }]);
    function changeTabs({
      name,
      index
    }) {
      triggered.value = false;
      current.value = index;
      console.log(index, name);
    }
    function toDetail(record) {
      if (current.value === 0) {
        common_vendor.index.navigateTo({
          url: `/pages/manifestDetail/manifestDetail?assignId=${record.Id}`
        });
      }
      if (current.value === 1) {
        common_vendor.index.navigateTo({
          url: "/pages/billDetail/billDetail"
        });
      }
    }
    const list1 = common_vendor.ref([]);
    async function getList1() {
      const res = await api_index.GetAssignCarList();
      list1.value = res;
    }
    const list2 = common_vendor.ref([]);
    async function getList2() {
      const res = await api_index.GetOwnerOnwayList();
      list2.value = res;
    }
    common_vendor.onLoad(() => {
      if (!utils_token.getToken()) {
        return;
      }
      getList1();
      getList2();
    });
    const triggered = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.o(($event) => _ctx.keyword = $event),
        c: common_vendor.p({
          placeholder: "搜索单号",
          showAction: false,
          modelValue: _ctx.keyword
        }),
        d: `${navbarPad.value}px`,
        e: common_vendor.p({
          placeholder: true,
          ["left-icon"]: ""
        }),
        f: common_vendor.o(changeTabs),
        g: common_vendor.p({
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
        h: !common_vendor.unref(utils_token.getToken)()
      }, !common_vendor.unref(utils_token.getToken)() ? {
        i: common_vendor.o(openLoginDrawer),
        j: common_vendor.p({
          height: "100%",
          showButton: true,
          text: current.value === 0 ? "暂无进行中的货单" : "暂无进行中的运单"
        })
      } : common_vendor.e({
        k: current.value === 0
      }, current.value === 0 ? common_vendor.e({
        l: list1.value.length === 0
      }, list1.value.length === 0 ? {
        m: common_vendor.p({
          height: "100%",
          text: "暂无进行中的货单"
        })
      } : {
        n: common_vendor.f(list1.value, (item, k0, i0) => {
          return {
            a: item.Id,
            b: common_vendor.o(toDetail, item.Id),
            c: "5cd3f056-5-" + i0,
            d: common_vendor.p({
              record: item
            })
          };
        }),
        o: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        })
      }) : {}, {
        p: current.value === 1
      }, current.value === 1 ? common_vendor.e({
        q: list2.value.length === 0
      }, list2.value.length === 0 ? {
        r: common_vendor.p({
          height: "100%",
          text: "暂无进行中的运单"
        })
      } : {
        s: common_vendor.f(list2.value, (item, k0, i0) => {
          return {
            a: item.OnwayId,
            b: "5cd3f056-8-" + i0,
            c: common_vendor.p({
              record: item
            })
          };
        }),
        t: common_vendor.p({
          status: _ctx.noMore2 ? "nomore" : _ctx.loading2 ? "loading" : "loadmore",
          color: "#B0BECC"
        })
      }) : {}), {
        v: common_vendor.unref(utils_token.getToken)(),
        w: triggered.value,
        x: common_vendor.o((...args) => _ctx.onRefresh && _ctx.onRefresh(...args)),
        y: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args)),
        z: common_vendor.sr(loginDrawer, "5cd3f056-10", {
          "k": "loginDrawer"
        }),
        A: common_vendor.o(loginSuccess)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/task/task.vue"]]);
wx.createPage(MiniProgramPage);
