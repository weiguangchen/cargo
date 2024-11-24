"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_sticky2 = common_vendor.resolveComponent("uv-sticky");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  (_easycom_uv_navbar2 + _easycom_uv_image2 + _easycom_uv_button2 + _easycom_uv_sticky2 + _easycom_my_empty2 + _easycom_uv_load_more2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_sticky = () => "../../uni_modules/uv-sticky/components/uv-sticky/uv-sticky.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
if (!Math) {
  (FilterDrawer + _easycom_uv_navbar + _easycom_uv_image + _easycom_uv_button + _easycom_uv_sticky + _easycom_my_empty + Item + _easycom_uv_load_more)();
}
const FilterDrawer = () => "./components/my-filter-drawer.js";
const Item = () => "./components/item.js";
const _sfc_main = {
  __name: "statistics",
  setup(__props) {
    const {
      ctx
    } = common_vendor.getCurrentInstance();
    const navbarPad = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      navbarPad.value = menuButtonInfo.width + 20;
    });
    const navBarHeight = common_vendor.ref(0);
    async function getNavbarHeight() {
      let rectInfo = await ctx.$uv.getRect("#navbar");
      console.log("getNavbarHeight", rectInfo);
      navBarHeight.value = rectInfo.height;
    }
    common_vendor.onReady(() => {
      getNavbarHeight();
    });
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const show = common_vendor.ref(false);
    function visibleChange(e) {
      show.value = e.show;
    }
    const filter = common_vendor.ref();
    const isFilter = common_vendor.ref(false);
    const filterParams = common_vendor.ref({});
    function changeFilter(res) {
      isFilter.value = res.isFilter;
      filterParams.value = res.params;
      getList();
    }
    function resetFilter() {
      filter.value.reset();
    }
    common_vendor.onLoad(() => {
      getList();
    });
    const list = common_vendor.ref([]);
    const total = common_vendor.ref({});
    async function getList() {
      try {
        common_vendor.index.showLoading({
          mask: true
        });
        const res = await api_index.GetOwnerTotal(filterParams.value);
        list.value = (res == null ? void 0 : res.materialStaticList) ?? [];
        total.value = {
          TotalAmount: res.TotalAmount,
          Totalweight: res.Totalweight,
          Cartimes: res.Cartimes
        };
      } catch {
        list.value = [];
        total.value = {};
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.sr(filter, "a33bb75c-1,a33bb75c-0", {
          "k": "filter"
        }),
        c: common_vendor.o(visibleChange),
        d: common_vendor.o(changeFilter),
        e: `${navbarPad.value}px`,
        f: common_vendor.o(leftClick),
        g: common_vendor.p({
          placeholder: true
        }),
        h: isFilter.value
      }, isFilter.value ? {
        i: common_vendor.p({
          duration: 0,
          src: "/static/images/filter/redo.png",
          width: "28rpx",
          height: "28rpx",
          ["custom-style"]: {
            marginRight: "4rpx"
          },
          customTextStyle: {
            fontSize: "24rpx"
          }
        }),
        j: common_vendor.o(resetFilter),
        k: common_vendor.p({
          color: "#FC7E2C",
          shape: "circle",
          ["custom-style"]: {
            height: "48rpx",
            padding: "0 20rpx"
          }
        }),
        l: common_vendor.p({
          ["offset-top"]: navBarHeight.value,
          zIndex: 1
        })
      } : {}, {
        m: common_vendor.t(total.value.TotalAmount ? common_vendor.unref(utils_index.formatNumberToThousand)(total.value.TotalAmount) : "-"),
        n: common_vendor.t(total.value.Totalweight ? common_vendor.unref(utils_index.formatNumberToThousand)(total.value.Totalweight) : "-"),
        o: common_vendor.t(total.value.Cartimes ? common_vendor.unref(utils_index.formatNumberToThousand)(total.value.Cartimes) : "-"),
        p: list.value.length === 0
      }, list.value.length === 0 ? {
        q: common_vendor.p({
          img: "/static/images/empty/statistics.png",
          height: "250px"
        })
      } : {
        r: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: index,
            b: "a33bb75c-6-" + i0,
            c: common_vendor.p({
              record: item
            })
          };
        }),
        s: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/mine/statistics/statistics.vue"]]);
wx.createPage(MiniProgramPage);
