"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_token = require("../../utils/token.js");
const stores_app = require("../../stores/app.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_login_drawer2 = common_vendor.resolveComponent("my-login-drawer");
  const _easycom_my_tabbar2 = common_vendor.resolveComponent("my-tabbar");
  (_easycom_uv_search2 + _easycom_uv_navbar2 + _easycom_uv_tabs2 + _easycom_uv_image2 + _easycom_my_empty2 + _easycom_uv_load_more2 + _easycom_my_login_drawer2 + _easycom_my_tabbar2)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_login_drawer = () => "../../components/my-login-drawer/my-login-drawer.js";
const _easycom_my_tabbar = () => "../../components/my-tabbar/my-tabbar.js";
if (!Math) {
  (_easycom_uv_search + _easycom_uv_navbar + _easycom_uv_tabs + _easycom_uv_image + _easycom_my_empty + ManifestItem + _easycom_uv_load_more + WaybillItem + _easycom_my_login_drawer + _easycom_my_tabbar)();
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
      if (index === 0) {
        getList1();
      }
      if (index === 1) {
        getList2();
      }
    }
    const isFiltering = common_vendor.ref(false);
    const keyWord = common_vendor.ref("");
    const isKeyWord = common_vendor.ref(false);
    function handleSearch() {
      isFiltering.value = true;
      isKeyWord.value = !!keyWord.value;
      if (current.value === 0) {
        getList1();
      }
      if (current.value === 1) {
        getList2();
      }
    }
    function reset() {
      keyWord.value = "";
      isKeyWord.value = false;
      if (current.value === 0) {
        getList1();
      }
      if (current.value === 1) {
        getList2();
      }
    }
    const total = common_vendor.ref(0);
    const list1 = common_vendor.ref([]);
    const inInit1 = common_vendor.ref(false);
    async function getList1() {
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetAssignCarListWithCount({
          status: 10,
          keyWord: keyWord.value
        });
        list1.value = res.list;
        total.value = res.cnt;
        common_vendor.index.hideLoading();
      } catch (err) {
        console.log("err", err);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: err.data,
          icon: "none"
        });
      } finally {
        isFiltering.value = false;
      }
    }
    const list2 = common_vendor.ref([]);
    const inInit2 = common_vendor.ref(false);
    async function getList2() {
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetOnwayOwnerWithCount({
          status: 10,
          keyWord: keyWord.value
        });
        list2.value = res.list;
        total.value = res.cnt;
        common_vendor.index.hideLoading();
      } catch (err) {
        console.log("err", err);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: err.data,
          icon: "none"
        });
      } finally {
        isFiltering.value = false;
      }
    }
    common_vendor.onShow(() => {
      if (!utils_token.getToken()) {
        return;
      }
      if (current.value === 0) {
        if (inInit1.value)
          return;
        inInit1.value = true;
        getList1();
      }
      if (current.value === 1) {
        if (inInit2.value)
          return;
        inInit2.value = true;
        getList2();
      }
    });
    const triggered = common_vendor.ref(false);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(($event) => keyWord.value = $event),
        e: common_vendor.p({
          placeholder: "搜索单号、车牌号",
          showAction: false,
          modelValue: keyWord.value
        }),
        f: `${navbarPad.value}px`,
        g: common_vendor.p({
          placeholder: true,
          ["left-icon"]: ""
        }),
        h: common_vendor.o(changeTabs),
        i: common_vendor.p({
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
        j: isKeyWord.value && !isFiltering.value
      }, isKeyWord.value && !isFiltering.value ? {
        k: common_vendor.t(total.value),
        l: common_vendor.p({
          duration: 0,
          src: "/static/images/filter/redo.png",
          width: "28rpx",
          height: "28rpx",
          ["custom-style"]: {
            marginRight: "4rpx"
          }
        }),
        m: common_vendor.o(reset)
      } : {}, {
        n: !common_vendor.unref(utils_token.getToken)()
      }, !common_vendor.unref(utils_token.getToken)() ? {
        o: common_vendor.o(openLoginDrawer),
        p: common_vendor.p({
          height: "100%",
          showButton: true,
          text: current.value === 0 ? "暂无进行中的货单" : "暂无进行中的运单"
        })
      } : common_vendor.e({
        q: current.value === 0
      }, current.value === 0 ? common_vendor.e({
        r: list1.value.length === 0
      }, list1.value.length === 0 ? {
        s: common_vendor.p({
          height: "100%",
          text: "暂无进行中的货单"
        })
      } : {
        t: common_vendor.f(list1.value, (item, k0, i0) => {
          return {
            a: item.Id,
            b: common_vendor.o(getList1, item.Id),
            c: "5cd3f056-6-" + i0,
            d: common_vendor.p({
              record: item
            })
          };
        }),
        v: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        })
      }) : {}, {
        w: current.value === 1
      }, current.value === 1 ? common_vendor.e({
        x: list2.value.length === 0
      }, list2.value.length === 0 ? {
        y: common_vendor.p({
          height: "100%",
          text: "暂无进行中的运单"
        })
      } : {
        z: common_vendor.f(list2.value, (item, k0, i0) => {
          return {
            a: item.OnwayId,
            b: common_vendor.o(getList2, item.OnwayId),
            c: "5cd3f056-9-" + i0,
            d: common_vendor.p({
              record: item
            })
          };
        }),
        A: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        })
      }) : {}), {
        B: triggered.value,
        C: common_vendor.o((...args) => _ctx.onRefresh && _ctx.onRefresh(...args)),
        D: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args)),
        E: common_vendor.sr(loginDrawer, "5cd3f056-11", {
          "k": "loginDrawer"
        }),
        F: common_vendor.o(loginSuccess)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/task/task.vue"]]);
wx.createPage(MiniProgramPage);
