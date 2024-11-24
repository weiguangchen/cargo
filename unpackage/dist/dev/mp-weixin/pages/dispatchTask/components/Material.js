"use strict";
const common_vendor = require("../../../common/vendor.js");
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
      EstimateWeight: 1,
      EstimateTimes: 1
    });
    const rules = common_vendor.ref();
    common_vendor.watchEffect(() => {
      model.value = {
        ...model.value,
        ...props.modelValue
      };
    });
    const maxCarNumber = common_vendor.computed(() => {
      if (!props.modelValue.LeftWeight || !props.order.SingleWeight)
        return null;
      const no = common_vendor.Big(props.modelValue.LeftWeight).div(props.order.SingleWeight).toFixed(0);
      console.log("maxCarNumber", no);
      return no;
    });
    const drawer = common_vendor.ref();
    function openDrawer() {
      drawer.value.popup.open();
    }
    async function typeChange() {
      await common_vendor.nextTick$1();
      drawer.value.resize();
    }
    function confirm() {
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
        d: common_vendor.t(__props.modelValue.EstimateWeight)
      } : {}, {
        e: __props.modelValue.Limittype === "2"
      }, __props.modelValue.Limittype === "2" ? {
        f: common_vendor.t(__props.modelValue.EstimateTimes)
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
        r: common_vendor.o(($event) => model.value.EstimateWeight = $event),
        s: common_vendor.p({
          max: model.value.LeftWeight,
          modelValue: model.value.EstimateWeight
        }),
        t: common_vendor.p({
          label: "最大装运重量",
          prop: "EstimateWeight"
        })
      } : {}, {
        v: model.value.Limittype === "2"
      }, model.value.Limittype === "2" ? {
        w: common_vendor.o(($event) => model.value.EstimateTimes = $event),
        x: common_vendor.p({
          max: maxCarNumber.value,
          unit: "车次",
          modelValue: model.value.EstimateTimes
        }),
        y: common_vendor.p({
          label: "最大装运车次",
          prop: "EstimateTimes"
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
