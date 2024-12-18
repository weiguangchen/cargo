"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_icon2 + _easycom_uv_image2 + _easycom_my_drawer2)();
}
const _easycom_uv_icon = () => "../../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_image + _easycom_my_drawer)();
}
const _sfc_main = {
  __name: "my-select",
  props: {
    modelValue: {
      defalut: ""
    },
    title: {
      type: String,
      default: ""
    },
    options: {
      default: () => [],
      type: Array
    },
    placeholder: {
      default: "全部",
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "change", "disabled-click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const drawer = common_vendor.ref();
    const innerOptions = common_vendor.computed(() => {
      return [{
        value: "",
        label: props.placeholder
      }, ...props.options];
    });
    const record = common_vendor.ref(null);
    common_vendor.watchEffect(() => {
      const find = innerOptions.value.find((m) => m.value === props.modelValue);
      record.value = find ?? null;
    });
    function openDrawer() {
      if (props.disabled) {
        emits("disabled-click");
        return;
      }
      drawer.value.popup.open();
    }
    function selectType(item) {
      emits("update:modelValue", item.value);
      emits("change", item.value, item);
      drawer.value.popup.close();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(record.value ? record.value.label : __props.placeholder),
        b: common_vendor.p({
          name: "arrow-down",
          size: "8",
          color: "#B0BECC"
        }),
        c: common_vendor.o(openDrawer),
        d: common_vendor.f(innerOptions.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.label),
            b: item.value === __props.modelValue
          }, item.value === __props.modelValue ? {
            c: "7b3f6673-2-" + i0 + ",7b3f6673-1",
            d: common_vendor.p({
              src: "/static/images/check.png",
              duration: 0,
              width: "32rpx",
              height: "32rpx"
            })
          } : {}, {
            e: item.value === __props.modelValue ? 1 : "",
            f: common_vendor.o(($event) => selectType(item), item.value),
            g: item.value
          });
        }),
        e: common_vendor.sr(drawer, "7b3f6673-1", {
          "k": "drawer"
        }),
        f: common_vendor.p({
          title: __props.title
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/mine/statistics/components/my-select.vue"]]);
wx.createComponent(Component);
