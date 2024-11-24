"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_textarea2 = common_vendor.resolveComponent("uv-textarea");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_image2 + _easycom_uv_input2 + _easycom_uv_textarea2 + _easycom_my_drawer2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_textarea = () => "../../../uni_modules/uv-textarea/components/uv-textarea/uv-textarea.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_input + _easycom_uv_textarea + _easycom_my_drawer)();
}
const _sfc_main = {
  __name: "Remark",
  props: {
    modelValue: {
      default: ""
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const {
      ctx
    } = common_vendor.getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const text = common_vendor.ref();
    common_vendor.watchEffect(() => {
      text.value = props.modelValue;
    });
    const drawer = common_vendor.ref();
    function showDrawer() {
      drawer.value.popup.open();
    }
    const remark = common_vendor.ref();
    function confirm(item) {
      emits("update:modelValue", common_vendor.unref(remark));
      emits("change", common_vendor.unref(remark));
      ctx.$uv.formValidate(ctx, "change");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "24rpx",
          height: "24rpx",
          duration: 0
        }),
        b: common_vendor.o(($event) => text.value = $event),
        c: common_vendor.p({
          ["input-align"]: "right",
          placeholder: "请输入",
          readonly: true,
          border: "none",
          ["placeholder-style"]: "color:var(--intr-color);",
          modelValue: text.value
        }),
        d: common_vendor.o(showDrawer),
        e: common_vendor.o(($event) => remark.value = $event),
        f: common_vendor.p({
          maxlength: "300",
          count: true,
          placeholder: "请填写备注",
          border: "none",
          height: "308rpx",
          modelValue: remark.value
        }),
        g: common_vendor.sr(drawer, "9a51dc9a-2", {
          "k": "drawer"
        }),
        h: common_vendor.o(confirm),
        i: common_vendor.p({
          title: "填写备注",
          closeable: true,
          showConfirmButton: true
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/dispatchTask/components/Remark.vue"]]);
wx.createComponent(Component);
