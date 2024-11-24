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
  __name: "manifestList",
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
    const status = common_vendor.ref("");
    const tabs = common_vendor.ref([{
      name: "全部",
      value: ""
    }, {
      name: "进行中",
      value: 1
    }, {
      name: "已暂停",
      value: 3
    }, {
      name: "已完结",
      value: 5
    }]);
    function changeTabs({
      name,
      index
    }) {
      var _a, _b;
      console.log(index, name);
      status.value = ((_b = (_a = tabs.value) == null ? void 0 : _a.find((m) => m.name === name)) == null ? void 0 : _b.value) ?? "";
      getList();
    }
    const filter = common_vendor.ref();
    function changeFilter(e) {
      show.value = e.show;
    }
    function toDetail(record) {
      common_vendor.index.navigateTo({
        url: `/pages/manifestDetail/manifestDetail?assignId=${record.Id}`
      });
    }
    const list = common_vendor.ref([]);
    async function getList() {
      try {
        const res = await api_index.GetAssignCarList({
          status: status.value
        });
        list.value = res;
      } catch {
      }
    }
    common_vendor.onLoad(() => {
      getList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.o(($event) => _ctx.keyword = $event),
        c: common_vendor.p({
          placeholder: "搜索货单",
          showAction: false,
          modelValue: _ctx.keyword
        }),
        d: common_vendor.sr(filter, "767cdad5-2,767cdad5-0", {
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
            a: item.Id,
            b: common_vendor.o(toDetail, item.Id),
            c: "767cdad5-4-" + i0,
            d: common_vendor.p({
              record: item
            })
          };
        }),
        m: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/manifestList/manifestList.vue"]]);
wx.createPage(MiniProgramPage);
