"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_dict = require("../../../utils/dict.js");
require("../../../utils/request.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_my_plate2 = common_vendor.resolveComponent("my-plate");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_confirm2 = common_vendor.resolveComponent("my-confirm");
  (_easycom_uv_image2 + _easycom_my_plate2 + _easycom_uv_line2 + _easycom_uv_button2 + _easycom_my_confirm2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_my_plate = () => "../../../components/my-plate/my-plate.js";
const _easycom_uv_line = () => "../../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_confirm = () => "../../../components/my-confirm/my-confirm.js";
if (!Math) {
  (_easycom_uv_image + _easycom_my_plate + _easycom_uv_line + _easycom_uv_button + _easycom_my_confirm)();
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
  emits: ["toDetail"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const billStatusName = common_vendor.computed(() => {
      var _a;
      return ((_a = utils_dict.BillStatus.find((m) => {
        var _a2;
        return m.value == ((_a2 = props.record) == null ? void 0 : _a2.Weightedstatus);
      })) == null ? void 0 : _a.label) ?? "";
    });
    function toDetail() {
      if (!props.record.OnwayId || !props.record.Supplier)
        return;
      common_vendor.index.navigateTo({
        url: `/pages/billDetail/billDetail?onwayId=${props.record.OnwayId}&supplyId=${props.record.Supplier.Id}`
      });
    }
    const confirm = common_vendor.ref();
    function cancel() {
      confirm.value.confirm({
        title: "确定取消该笔运单？",
        content: "取消前，建议您联系司机说明原因",
        cancelText: "再想想",
        confirmText: "取消运单",
        asyncClose: true,
        async confirm() {
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(billStatusName.value),
        b: common_vendor.t(__props.record.Materialname),
        c: ["1", "2", "3", "4", "5", "9"].includes(__props.record.Weightedstatus)
      }, ["1", "2", "3", "4", "5", "9"].includes(__props.record.Weightedstatus) ? {
        d: common_vendor.t(__props.record.Preload)
      } : {}, {
        e: ["6", "7", "8"].includes(__props.record.Weightedstatus)
      }, ["6", "7", "8"].includes(__props.record.Weightedstatus) ? {
        f: common_vendor.t(__props.record.Suttle)
      } : {}, {
        g: common_vendor.f(11, (dot, k0, i0) => {
          return {};
        }),
        h: common_vendor.p({
          src: "/static/images/dot1.png",
          width: "16rpx",
          height: "16rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "16rpx"
          }
        }),
        i: __props.record.Supplier && __props.record.Supplier.City
      }, __props.record.Supplier && __props.record.Supplier.City ? {
        j: common_vendor.t(__props.record.Supplier.City)
      } : {}, {
        k: __props.record.Supplier && __props.record.Supplier.Name
      }, __props.record.Supplier && __props.record.Supplier.Name ? {
        l: common_vendor.t(__props.record.Supplier.Name)
      } : {}, {
        m: common_vendor.p({
          plate: __props.record.Carno
        }),
        n: common_vendor.p({
          src: "/static/images/dot2.png",
          width: "16rpx",
          height: "16rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "16rpx"
          }
        }),
        o: __props.record.TaxPrice
      }, __props.record.TaxPrice ? {
        p: common_vendor.t(__props.record.TaxPrice)
      } : {}, {
        q: common_vendor.p({
          color: "var(--divider)",
          margin: "24rpx 0"
        }),
        r: common_vendor.o(cancel),
        s: common_vendor.p({
          shape: "circle",
          text: "取消运单",
          color: "var(--page-bg)",
          customTextStyle: {
            color: "var(--content-color)",
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        t: common_vendor.o(() => {
        }),
        v: common_vendor.p({
          shape: "circle",
          text: "呼叫司机",
          color: "var(--page-bg)",
          customTextStyle: {
            color: "var(--content-color)",
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        w: common_vendor.o(() => {
        }),
        x: common_vendor.o(toDetail),
        y: common_vendor.sr(confirm, "8d041879-6", {
          "k": "confirm"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8d041879"], ["__file", "/Users/wei/cargo/pages/waybill/components/item.vue"]]);
wx.createComponent(Component);
