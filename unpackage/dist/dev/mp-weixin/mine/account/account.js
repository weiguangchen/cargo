"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  (_easycom_uv_button2 + _easycom_my_empty2)();
}
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
if (!Math) {
  (_easycom_uv_button + _easycom_my_empty)();
}
const _sfc_main = {
  __name: "account",
  setup(__props) {
    common_vendor.onLoad(() => {
      getInfo();
    });
    const total = common_vendor.ref(0);
    const list = common_vendor.ref([]);
    async function getInfo() {
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetOwnerBalanceTotal();
        list.value = (res == null ? void 0 : res.supplyList) ?? [];
        total.value = (res == null ? void 0 : res.totalAmount) ?? 0;
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    function toDetail() {
      common_vendor.index.navigateTo({
        url: "/mine/amountDetail/amountDetail"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(utils_index.formatNumberToThousand)(total.value)),
        b: common_vendor.o(toDetail),
        c: common_vendor.p({
          shape: "circle",
          text: "账单明细",
          color: "#ffffff",
          ["custom-style"]: {
            border: "1px solid var(--main-color)",
            color: "var(--main-color)",
            height: "64rpx"
          },
          customTextStyle: {
            color: "26rpx",
            fontWeight: "bold"
          }
        }),
        d: list.value.length > 0
      }, list.value.length > 0 ? {
        e: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.supplyName),
            b: common_vendor.t(item.amountTotal ? common_vendor.unref(utils_index.formatNumberToThousand)(item.amountTotal) : ""),
            c: common_vendor.t(item.creditTotal ? common_vendor.unref(utils_index.formatNumberToThousand)(item.creditTotal) : ""),
            d: item.supplyId
          };
        })
      } : {
        f: common_vendor.p({
          img: "/static/images/empty/account.png"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f3aefceb"], ["__file", "/Users/wei/cargo/mine/account/account.vue"]]);
wx.createPage(MiniProgramPage);
