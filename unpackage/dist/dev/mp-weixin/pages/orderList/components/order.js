"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_dict = require("../../../utils/dict.js");
const _sfc_main = {
  __name: "order",
  props: {
    record: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["toDetail"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    function toDetail() {
      emits("toDetail", props.record);
    }
    const statusText = common_vendor.computed(() => {
      var _a;
      if (props.record.Status === "2") {
        return "24天后生效";
      }
      return ((_a = utils_dict.OrderStatusOptions.find((m) => {
        var _a2;
        return m.value == ((_a2 = props.record) == null ? void 0 : _a2.Status);
      })) == null ? void 0 : _a.name) ?? "";
    });
    const statusClass = common_vendor.computed(() => {
      var _a;
      const map = {
        1: "review",
        2: "pending",
        3: "success",
        4: "expired"
      };
      return map[(_a = props.record) == null ? void 0 : _a.Status];
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(statusText.value),
        b: common_vendor.n(statusClass.value),
        c: common_vendor.t(__props.record.Supplier && __props.record.Supplier.Fullname ? __props.record.Supplier.Fullname : ""),
        d: common_vendor.t(__props.record.MaterialsList.length),
        e: __props.record.MaterialsList
      }, __props.record.MaterialsList ? {
        f: common_vendor.f(__props.record.MaterialsList, (mat, j, i0) => {
          return {
            a: common_vendor.t(mat.SSMaterialName),
            b: common_vendor.t(mat.LeftWeight ? `剩余 ${mat.LeftWeight} 吨` : "不限装运量"),
            c: j < __props.record.MaterialsList.length - 1 ? 1 : "",
            d: mat.SSMaterialId
          };
        })
      } : {}, {
        g: common_vendor.o(toDetail)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fcef127e"], ["__file", "/Users/wei/cargo/pages/orderList/components/order.vue"]]);
wx.createComponent(Component);
