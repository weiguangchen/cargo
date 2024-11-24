"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_my_filter_drawer2 = common_vendor.resolveComponent("my-filter-drawer");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  (_easycom_uv_search2 + _easycom_my_filter_drawer2 + _easycom_uv_navbar2 + _easycom_uv_tabs2 + _easycom_uv_load_more2 + _easycom_my_empty2)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_my_filter_drawer = () => "../../components/my-filter-drawer/my-filter-drawer.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
if (!Math) {
  (_easycom_uv_search + _easycom_my_filter_drawer + _easycom_uv_navbar + _easycom_uv_tabs + Item + _easycom_uv_load_more + _easycom_my_empty)();
}
const Item = () => "./components/item.js";
const _sfc_main = {
  __name: "waybill",
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
    const tabs = common_vendor.ref([{
      name: "全部"
    }, {
      name: "已接单"
    }, {
      name: "已完成"
    }, {
      name: "已取消"
    }]);
    function changeTabs({
      name,
      index
    }) {
      console.log(index, name);
    }
    const filter = common_vendor.ref();
    function changeFilter(e) {
      show.value = e.show;
    }
    common_vendor.onLoad(() => {
      getList();
    });
    const list = common_vendor.ref([]);
    async function getList() {
      try {
        const res = await api_index.GetOnwayOwner({});
        list.value = res;
      } catch {
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.o(($event) => _ctx.keyword = $event),
        c: common_vendor.p({
          placeholder: "搜索运单号、车牌",
          showAction: false,
          modelValue: _ctx.keyword
        }),
        d: common_vendor.sr(filter, "36b49063-2,36b49063-0", {
          "k": "filter"
        }),
        e: common_vendor.o(changeFilter),
        f: `${navbarPad.value}px`,
        g: common_vendor.o(leftClick),
        h: common_vendor.p({
          placeholder: true
        }),
        i: common_vendor.o(changeTabs),
        j: common_vendor.p({
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
          }
        }),
        k: list.value.length > 0
      }, list.value.length > 0 ? {
        l: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.OnwayId,
            b: "36b49063-4-" + i0,
            c: common_vendor.p({
              record: item
            })
          };
        }),
        m: common_vendor.p({
          status: _ctx.noMore ? "nomore" : _ctx.loading ? "loading" : "loadmore",
          color: "#B0BECC"
        })
      } : {}, {
        n: _ctx.triggered,
        o: common_vendor.o((...args) => _ctx.onRefresh && _ctx.onRefresh(...args)),
        p: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/waybill/waybill.vue"]]);
wx.createPage(MiniProgramPage);
