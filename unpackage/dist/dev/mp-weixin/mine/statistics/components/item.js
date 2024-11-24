"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_index = require("../../../utils/index.js");
if (!Array) {
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  _easycom_uv_line2();
}
const _easycom_uv_line = () => "../../../uni_modules/uv-line/components/uv-line/uv-line.js";
if (!Math) {
  _easycom_uv_line();
}
const _sfc_main = {
  __name: "item",
  props: {
    record: {
      default: () => {
      },
      type: Object
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.record.materialName || "-"),
        b: common_vendor.t(__props.record.OwnerName || "-"),
        c: common_vendor.t(__props.record.unloadName || "-"),
        d: common_vendor.t(__props.record.TotalAmount ? common_vendor.unref(utils_index.formatNumberToThousand)(__props.record.TotalAmount) : "-"),
        e: common_vendor.p({
          direction: "col",
          color: "var(--divider)",
          length: "56rpx"
        }),
        f: common_vendor.t(__props.record.Totalweight ? common_vendor.unref(utils_index.formatNumberToThousand)(__props.record.Totalweight) : "-"),
        g: common_vendor.p({
          direction: "col",
          color: "var(--divider)",
          length: "56rpx"
        }),
        h: common_vendor.t(__props.record.Cartimes ? common_vendor.unref(utils_index.formatNumberToThousand)(__props.record.Cartimes) : "-")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f85d6bc"], ["__file", "/Users/wei/cargo/mine/statistics/components/item.vue"]]);
wx.createComponent(Component);
