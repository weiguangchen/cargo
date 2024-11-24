"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_image2 + _easycom_my_drawer2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_image + _easycom_my_drawer)();
}
const __default__ = {
  options: {
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "SelectCargo",
  props: {
    modelValue: {
      default: ""
    },
    disabled: {
      default: false,
      type: Boolean
    },
    options: {
      default: () => [],
      type: Array
    }
  },
  emits: ["update:modelValue", "change", "disabledClick"],
  setup(__props, { emit: __emit }) {
    const {
      ctx
    } = common_vendor.getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const innerValue = common_vendor.ref("");
    const text = common_vendor.ref();
    common_vendor.watchEffect(() => {
      innerValue.value = props.modelValue ?? "";
      const find = props.options.find((m) => props.modelValue === m.value);
      text.value = (find == null ? void 0 : find.label) ?? "";
    });
    const drawer = common_vendor.ref();
    function showDrawer() {
      if (props.disabled) {
        emits("disabledClick");
        return;
      }
      drawer.value.popup.open();
    }
    function select(item) {
      innerValue.value = item.value;
      emits("update:modelValue", innerValue.value);
      emits("change", innerValue.value);
      ctx.$uv.formValidate(ctx, "change");
      drawer.value.popup.close();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(text.value || "请选择"),
        b: !text.value ? 1 : "",
        c: text.value ? 1 : "",
        d: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "24rpx",
          height: "24rpx",
          ["custom-style"]: {
            marginLeft: "6rpx"
          },
          duration: 0
        }),
        e: common_vendor.o(showDrawer),
        f: common_vendor.f(__props.options, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.label),
            b: innerValue.value === item.value
          }, innerValue.value === item.value ? {
            c: "75eff1ad-2-" + i0 + ",75eff1ad-1",
            d: common_vendor.p({
              src: "/static/images/check.png",
              duration: 0,
              width: "32rpx",
              height: "32rpx"
            })
          } : {}, {
            e: innerValue.value === item.value ? 1 : "",
            f: common_vendor.o(($event) => select(item))
          });
        }),
        g: common_vendor.sr(drawer, "75eff1ad-1", {
          "k": "drawer"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75eff1ad"], ["__file", "/Users/wei/cargo/pages/dispatchTask/components/SelectCargo.vue"]]);
wx.createComponent(Component);
