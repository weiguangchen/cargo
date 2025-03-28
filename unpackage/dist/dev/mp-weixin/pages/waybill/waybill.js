"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  (_easycom_uv_search2 + _easycom_uv_navbar2 + _easycom_uv_tabs2 + _easycom_uv_image2 + _easycom_uv_load_more2 + _easycom_my_empty2)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_tabs = () => "../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
if (!Math) {
  (_easycom_uv_search + FilterDrawer + _easycom_uv_navbar + _easycom_uv_tabs + _easycom_uv_image + Item + _easycom_uv_load_more + _easycom_my_empty)();
}
const Item = () => "./components/item.js";
const FilterDrawer = () => "./components/FilterDrawer.js";
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
    const status = common_vendor.ref();
    const tabs = common_vendor.ref([{
      name: "全部",
      value: ""
    }, {
      name: "已接单",
      value: "10"
    }, {
      name: "已完成",
      value: "8"
    }, {
      name: "已取消",
      value: "9"
    }]);
    function changeTabs({
      value
    }) {
      status.value = value;
      getList();
    }
    const filter = common_vendor.ref();
    const isFilter = common_vendor.ref(false);
    const isFiltering = common_vendor.ref(false);
    function changeFilter(data) {
      console.log("changeFilter", data);
      isFiltering.value = true;
      isFilter.value = data.isFilter;
      params.value = data.params;
      getList();
    }
    const keyWord = common_vendor.ref("");
    const isKeyWord = common_vendor.ref(false);
    function handleSearch() {
      isFiltering.value = true;
      isKeyWord.value = !!keyWord.value;
      getList();
    }
    common_vendor.onLoad(() => {
      getList();
    });
    const list = common_vendor.ref([]);
    const params = common_vendor.ref({});
    const total = common_vendor.ref(0);
    async function getList() {
      const { dateMode, date, ...rest } = params.value;
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetOnwayOwnerWithCount({
          status: status.value,
          keyWord: keyWord.value,
          ...rest
        });
        list.value = res.list;
        total.value = res.cnt;
        common_vendor.index.hideLoading();
      } catch (err) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: err.data,
          icon: "none"
        });
      } finally {
        isFiltering.value = false;
      }
    }
    function reset() {
      keyWord.value = "";
      isKeyWord.value = false;
      filter.value.reset();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.o(handleSearch),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(($event) => keyWord.value = $event),
        e: common_vendor.p({
          placeholder: "搜索运单号、车牌号",
          showAction: false,
          modelValue: keyWord.value
        }),
        f: common_vendor.sr(filter, "36b49063-2,36b49063-0", {
          "k": "filter"
        }),
        g: common_vendor.o(changeFilter),
        h: `${navbarPad.value}px`,
        i: common_vendor.o(leftClick),
        j: common_vendor.p({
          placeholder: true
        }),
        k: common_vendor.o(changeTabs),
        l: common_vendor.p({
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
        m: isFilter.value && !isFiltering.value || isKeyWord.value && !isFiltering.value
      }, isFilter.value && !isFiltering.value || isKeyWord.value && !isFiltering.value ? {
        n: common_vendor.t(total.value),
        o: common_vendor.p({
          duration: 0,
          src: "/static/images/filter/redo.png",
          width: "28rpx",
          height: "28rpx",
          ["custom-style"]: {
            marginRight: "4rpx"
          }
        }),
        p: common_vendor.o(reset)
      } : {}, {
        q: list.value.length > 0
      }, list.value.length > 0 ? {
        r: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.OnwayId,
            b: common_vendor.o(getList, item.OnwayId),
            c: "36b49063-5-" + i0,
            d: common_vendor.p({
              record: item
            })
          };
        }),
        s: common_vendor.p({
          status: _ctx.noMore ? "nomore" : _ctx.loading ? "loading" : "loadmore",
          color: "#B0BECC"
        })
      } : {}, {
        t: _ctx.triggered,
        v: common_vendor.o((...args) => _ctx.onRefresh && _ctx.onRefresh(...args)),
        w: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/waybill/waybill.vue"]]);
wx.createPage(MiniProgramPage);
