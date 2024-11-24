"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_token = require("../../utils/token.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  _easycom_uv_navbar2();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
if (!Math) {
  (FilterDrawer + _easycom_uv_navbar)();
}
const FilterDrawer = () => "./components/my-filter-drawer.js";
const _sfc_main = {
  __name: "amountDetail",
  setup(__props) {
    common_vendor.onMounted(() => {
      getNavbarPad();
      getList();
    });
    const show = common_vendor.ref(false);
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const navbarPad = common_vendor.ref(0);
    function getNavbarPad() {
      let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      navbarPad.value = menuButtonInfo.width + 20;
    }
    const filter = common_vendor.ref();
    function changeFilter(e) {
      show.value = e.show;
    }
    const totalAmount = common_vendor.ref(0);
    const totalChongZhi = common_vendor.ref(0);
    const totalAdjuct = common_vendor.ref(0);
    const detailList = common_vendor.ref([]);
    async function getList() {
      var _a, _b;
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetOwnerAmountDetail({
          mobile: (_b = (_a = utils_token.getToken()) == null ? void 0 : _a.userInfo) == null ? void 0 : _b.Mobile
        });
        totalAmount.value = res.totalAmount;
        totalChongZhi.value = res.totalChongZhi;
        totalAdjuct.value = res.totalAdjuct;
        detailList.value = res.detailList;
      } catch {
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    return (_ctx, _cache) => {
      return {
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.sr(filter, "4dae311c-1,4dae311c-0", {
          "k": "filter"
        }),
        c: common_vendor.o(changeFilter),
        d: `${navbarPad.value}px`,
        e: common_vendor.o(leftClick),
        f: common_vendor.p({
          placeholder: true
        }),
        g: common_vendor.t(common_vendor.unref(utils_index.formatNumberToThousand)(totalAmount.value)),
        h: common_vendor.t(common_vendor.unref(utils_index.formatNumberToThousand)(totalChongZhi.value)),
        i: common_vendor.t(common_vendor.unref(utils_index.formatNumberToThousand)(totalAdjuct.value)),
        j: common_vendor.f(detailList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.Amount),
            b: common_vendor.t(item.Paytime ? common_vendor.unref(common_vendor.dayjs)(item.Paytime).format("YYYY-MM-DD HH:mm:ss") : ""),
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4dae311c"], ["__file", "/Users/wei/cargo/mine/amountDetail/amountDetail.vue"]]);
wx.createPage(MiniProgramPage);
