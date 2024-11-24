"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  options: {
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "my-price",
  props: {
    color: {
      default: "",
      type: String
    },
    customStyle: {
      default: () => {
      },
      type: Object
    },
    unit: {
      default: "",
      type: String
    },
    unitColor: {
      default: "var(--content-color)",
      type: String
    },
    unitFontSize: {
      default: "",
      type: String
    },
    unitStyle: {
      default: () => {
      },
      type: Object
    },
    price: {
      default: 0,
      type: Number
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.price || 0),
        b: __props.unit
      }, __props.unit ? {
        c: common_vendor.t(__props.unit),
        d: common_vendor.s({
          color: __props.unitColor,
          fontSize: __props.unitFontSize
        }),
        e: common_vendor.s(__props.unitStyle)
      } : {}, {
        f: common_vendor.s({
          color: __props.color
        }),
        g: common_vendor.s(__props.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f30cd5b4"], ["__file", "/Users/wei/cargo/components/my-price/my-price.vue"]]);
wx.createComponent(Component);
