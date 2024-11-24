"use strict";
const common_vendor = require("../../../common/vendor.js");
const __default__ = {
  options: {
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "MyRadio",
  props: {
    modelValue: {
      default: ""
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const options = common_vendor.ref([
      {
        value: "0",
        label: "不装运"
      },
      {
        value: "1",
        label: "按重量"
      },
      {
        value: "2",
        label: "按车次"
      }
    ]);
    function select(item) {
      emits("update:modelValue", item.value);
      emits("change", item.value);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(options.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: item.value === __props.modelValue ? 1 : "",
            c: common_vendor.o(($event) => select(item))
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/dispatchTask/components/MyRadio.vue"]]);
wx.createComponent(Component);
