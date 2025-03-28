"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_index = require("../../../utils/index.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_my_number_box2 = common_vendor.resolveComponent("my-number-box");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_image2 + _easycom_uv_form_item2 + _easycom_my_number_box2 + _easycom_uv_form2 + _easycom_my_drawer2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_form_item = () => "../../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_my_number_box = () => "../../../components/my-number-box/my-number-box.js";
const _easycom_uv_form = () => "../../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_image + MyRadio + _easycom_uv_form_item + _easycom_my_number_box + _easycom_uv_form + _easycom_my_drawer)();
}
const MyRadio = () => "./MyRadio.js";
const _sfc_main = {
  __name: "Material",
  props: {
    modelValue: {
      type: Object,
      default: () => {
      }
    },
    borderBottom: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const model = common_vendor.ref({
      Limittype: "0",
      EstimiteWeight: 1,
      EstimiteTimes: 1
    });
    const rules = common_vendor.ref();
    common_vendor.watchEffect(() => {
      var _a, _b;
      model.value = {
        ...model.value,
        ...props.modelValue,
        EstimiteWeight: ((_a = props.modelValue) == null ? void 0 : _a.EstimiteWeight) ?? 1,
        EstimiteTimes: ((_b = props.modelValue) == null ? void 0 : _b.EstimiteTimes) ?? 1
      };
    });
    const maxCarNumber = common_vendor.computed(() => {
      if (!props.modelValue.LeftWeight || !props.order.SingleWeight)
        return void 0;
      const no = common_vendor.Big(props.modelValue.LeftWeight).div(props.order.SingleWeight).toFixed(0);
      console.log("maxCarNumber", no);
      return +no;
    });
    const drawer = common_vendor.ref();
    function openDrawer() {
      var _a, _b;
      model.value = {
        ...model.value,
        ...props.modelValue,
        EstimiteWeight: ((_a = props.modelValue) == null ? void 0 : _a.EstimiteWeight) ?? 1,
        EstimiteTimes: ((_b = props.modelValue) == null ? void 0 : _b.EstimiteTimes) ?? 1
      };
      drawer.value.popup.open();
    }
    async function typeChange() {
      await common_vendor.nextTick$1();
      drawer.value.resize();
    }
    async function confirm() {
      await common_vendor.index.hideKeyboard();
      await utils_index.sleep(200);
      console.log("confirm");
      console.log("model", model.value);
      emits("update:modelValue", model.value);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(model.value.SSMaterialName),
        b: __props.modelValue.Limittype === "0"
      }, __props.modelValue.Limittype === "0" ? {} : {}, {
        c: __props.modelValue.Limittype === "1"
      }, __props.modelValue.Limittype === "1" ? {
        d: common_vendor.t(__props.modelValue.EstimiteWeight)
      } : {}, {
        e: __props.modelValue.Limittype === "2"
      }, __props.modelValue.Limittype === "2" ? {
        f: common_vendor.t(__props.modelValue.EstimiteTimes)
      } : {}, {
        g: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx",
          ["custom-style"]: {
            marginLeft: "4rpx"
          }
        }),
        h: __props.borderBottom ? 1 : "",
        i: common_vendor.o(openDrawer),
        j: common_vendor.t(model.value.SSMaterialName),
        k: model.value.LeftWeight
      }, model.value.LeftWeight ? {
        l: common_vendor.t(model.value.LeftWeight)
      } : {}, {
        m: common_vendor.o(typeChange),
        n: common_vendor.o(($event) => model.value.Limittype = $event),
        o: common_vendor.p({
          record: model.value,
          modelValue: model.value.Limittype
        }),
        p: common_vendor.p({
          label: "装运设置",
          prop: "Limittype",
          customStyle: {
            padding: "44rpx 0!important"
          }
        }),
        q: model.value.Limittype === "1"
      }, model.value.Limittype === "1" ? {
        r: common_vendor.o(($event) => model.value.EstimiteWeight = $event),
        s: common_vendor.p({
          ["decimal-length"]: "2",
          max: model.value.LeftWeight !== null ? model.value.LeftWeight : void 0,
          ["max-limit-msg"]: (max) => `重量最多为${max}吨`,
          min: model.value.minWgtLeft,
          ["min-limit-msg"]: (min) => `重量最少为${min}吨`,
          step: 10,
          modelValue: model.value.EstimiteWeight
        }),
        t: common_vendor.p({
          labelPosition: "top",
          label: "最大装运重量",
          prop: "EstimiteWeight"
        })
      } : {}, {
        v: model.value.Limittype === "2"
      }, model.value.Limittype === "2" ? {
        w: common_vendor.o(($event) => model.value.EstimiteTimes = $event),
        x: common_vendor.p({
          ["decimal-length"]: "0",
          max: maxCarNumber.value,
          ["max-limit-msg"]: (max) => `车次最多为${max}`,
          min: 1,
          ["min-limit-msg"]: (min) => `车次最少为${min}`,
          unit: "车次",
          modelValue: model.value.EstimiteTimes
        }),
        y: common_vendor.p({
          labelPosition: "top",
          label: "最大装运车次",
          prop: "EstimiteTimes"
        })
      } : {}, {
        z: common_vendor.sr("form", "6a1fe5cc-2,6a1fe5cc-1"),
        A: common_vendor.p({
          labelPosition: "left",
          model: model.value,
          rules: rules.value,
          ["label-width"]: "auto"
        }),
        B: common_vendor.sr(drawer, "6a1fe5cc-1", {
          "k": "drawer"
        }),
        C: common_vendor.o(confirm),
        D: common_vendor.p({
          bgColor: "#FFFFFF",
          title: "物料一",
          closeable: true,
          showConfirmButton: true
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/dispatchTask/components/Material.vue"]]);
wx.createComponent(Component);
