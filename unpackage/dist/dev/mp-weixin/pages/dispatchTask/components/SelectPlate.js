"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_image2 + _easycom_uv_button2 + _easycom_my_drawer2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_button + _easycom_my_drawer)();
}
const __default__ = {
  options: {
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "SelectPlate",
  props: {
    modelValue: {
      default: () => []
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const {
      ctx
    } = common_vendor.getCurrentInstance();
    const props = __props;
    const emits = __emit;
    const options = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      getOptions();
    });
    async function getOptions() {
      const res = await api_index.GetOwnerCarMgr();
      const list = res.map((m) => ({
        label: m.Carno,
        value: m.Id
      }));
      options.value = [...list];
    }
    const innerValue = common_vendor.ref([]);
    const text = common_vendor.ref();
    common_vendor.watchEffect(() => {
      innerValue.value = props.modelValue ? [...props.modelValue] : [];
      const find = options.value.filter((m) => props.modelValue.includes(m.value));
      if (find.length > 0) {
        if (find.length > 1) {
          const [first, ...rest] = find;
          text.value = `${first.label} 等 ${find.length} 车牌`;
        } else {
          text.value = find[0].label;
        }
      } else {
        text.value = "";
      }
    });
    const drawer = common_vendor.ref();
    function showDrawer() {
      drawer.value.popup.open();
    }
    function select(item) {
      const index = innerValue.value.findIndex((m) => m === item.value);
      if (index === -1) {
        innerValue.value.push(item.value);
      } else {
        innerValue.value.splice(index, 1);
      }
    }
    function reset() {
      innerValue.value = [];
      confirm();
    }
    function confirm() {
      emits("update:modelValue", innerValue.value);
      ctx.$uv.formValidate(ctx, "change");
      drawer.value.popup.close();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(text.value || "不限制"),
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
        f: common_vendor.f(options.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.label),
            b: innerValue.value.includes(item.value)
          }, innerValue.value.includes(item.value) ? {
            c: "f6762138-2-" + i0 + ",f6762138-1",
            d: common_vendor.p({
              src: "/static/images/check.png",
              duration: 0,
              width: "32rpx",
              height: "32rpx"
            })
          } : {}, {
            e: innerValue.value.includes(item.value) ? 1 : "",
            f: common_vendor.o(($event) => select(item), item.value),
            g: item.value
          });
        }),
        g: common_vendor.p({
          text: "设为不限",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          }
        }),
        h: common_vendor.o(reset),
        i: common_vendor.p({
          text: "确认所选",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          }
        }),
        j: common_vendor.o(confirm),
        k: common_vendor.sr(drawer, "f6762138-1", {
          "k": "drawer"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f6762138"], ["__file", "/Users/wei/cargo/pages/dispatchTask/components/SelectPlate.vue"]]);
wx.createComponent(Component);