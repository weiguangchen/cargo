"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
const utils_token = require("../../../utils/token.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_my_plate2 = common_vendor.resolveComponent("my-plate");
  const _easycom_my_price2 = common_vendor.resolveComponent("my-price");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_confirm2 = common_vendor.resolveComponent("my-confirm");
  (_easycom_uv_image2 + _easycom_my_plate2 + _easycom_my_price2 + _easycom_uv_line2 + _easycom_uv_button2 + _easycom_my_confirm2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_my_plate = () => "../../../components/my-plate/my-plate.js";
const _easycom_my_price = () => "../../../components/my-price/my-price.js";
const _easycom_uv_line = () => "../../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_confirm = () => "../../../components/my-confirm/my-confirm.js";
if (!Math) {
  (_easycom_uv_image + _easycom_my_plate + _easycom_my_price + _easycom_uv_line + _easycom_uv_button + _easycom_my_confirm)();
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
  emits: ["toDetail", "success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const billStatusName = common_vendor.computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (["0", "1"].includes((_a = props.record) == null ? void 0 : _a.Weightedstatus)) {
        return "待入厂";
      } else if (["2", "3", "4"].includes((_b = props.record) == null ? void 0 : _b.Weightedstatus)) {
        return "已入厂";
      } else if (["2", "3", "4"].includes((_c = props.record) == null ? void 0 : _c.Weightedstatus)) {
        return "已入厂";
      } else if (["5"].includes((_d = props.record) == null ? void 0 : _d.Weightedstatus)) {
        return "装车中";
      } else if (["6"].includes((_e = props.record) == null ? void 0 : _e.Weightedstatus)) {
        return "已装车";
      } else if (["7"].includes((_f = props.record) == null ? void 0 : _f.Weightedstatus)) {
        return "已出厂";
      } else if (["8"].includes((_g = props.record) == null ? void 0 : _g.Weightedstatus)) {
        return "已完成";
      } else if (["9"].includes((_h = props.record) == null ? void 0 : _h.Weightedstatus)) {
        return "已取消";
      }
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
          try {
            await api_index.DisableOnwayEnt({
              onwayId: props.record.Id,
              supplyId: props.record.SupplyId,
              userId: utils_token.getToken().userInfo.Id,
              userType: "owner"
            });
            await common_vendor.index.showToast({
              title: "操作成功",
              icon: "none",
              complete() {
                setTimeout(() => {
                  emits("success");
                }, 1500);
              }
            });
            confirm.value.close();
          } catch (err) {
            confirm.value.closeLoading();
            common_vendor.index.showToast({
              title: err.data,
              icon: "none"
            });
          }
        }
      });
    }
    function takePhone() {
      var _a, _b, _c, _d;
      if (!((_b = (_a = props.record) == null ? void 0 : _a.DriverEnt) == null ? void 0 : _b.Mobile)) {
        return;
      }
      common_vendor.index.makePhoneCall({
        phoneNumber: (_d = (_c = props.record) == null ? void 0 : _c.DriverEnt) == null ? void 0 : _d.Mobile
      });
    }
    function confirmUnload() {
      confirm.value.confirm({
        title: "确认完成卸货？",
        content: "确认前，建议您联系司机了解情况",
        cancelText: "再想想",
        confirmText: "确认卸货",
        confirmBgColor: "var(--main-color)",
        asyncClose: true,
        async confirm() {
          try {
            await api_index.UnloadConfirm({
              onwayId: props.record.Id,
              supplyId: props.record.SupplyId,
              userId: utils_token.getToken().userInfo.Id,
              uType: "owner"
            });
            await common_vendor.index.showToast({
              title: "操作成功",
              icon: "none",
              complete() {
                setTimeout(() => {
                  emits("success");
                }, 1500);
              }
            });
            confirm.value.close();
          } catch (err) {
            console.log("err", err);
            confirm.value.closeLoading();
            common_vendor.index.showToast({
              title: err.data,
              icon: "none"
            });
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(billStatusName.value),
        b: ["0", "1", "2", "3", "4", "5", "6", "7"].includes(props.record.Weightedstatus) ? 1 : "",
        c: ["8", "9"].includes(props.record.Weightedstatus) ? 1 : "",
        d: common_vendor.t(__props.record.Materialname),
        e: ["0", "1", "2", "3", "4", "5", "9"].includes(__props.record.Weightedstatus)
      }, ["0", "1", "2", "3", "4", "5", "9"].includes(__props.record.Weightedstatus) ? {
        f: common_vendor.t(__props.record.EstimiteWeight)
      } : {}, {
        g: ["6", "7", "8"].includes(__props.record.Weightedstatus)
      }, ["6", "7", "8"].includes(__props.record.Weightedstatus) ? {
        h: common_vendor.t(__props.record.WeightEnt ? __props.record.WeightEnt.Suttle : "")
      } : {}, {
        i: common_vendor.f(11, (dot, k0, i0) => {
          return {};
        }),
        j: common_vendor.p({
          src: "/static/images/dot1.png",
          width: "16rpx",
          height: "16rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "16rpx"
          }
        }),
        k: __props.record.SupEnt && __props.record.SupEnt.City
      }, __props.record.SupEnt && __props.record.SupEnt.City ? {
        l: common_vendor.t(__props.record.SupEnt.City)
      } : {}, {
        m: __props.record.SupEnt && __props.record.SupEnt.Name
      }, __props.record.SupEnt && __props.record.SupEnt.Name ? {
        n: common_vendor.t(__props.record.SupEnt.Name)
      } : {}, {
        o: common_vendor.p({
          plate: __props.record.Carno,
          color: __props.record.CarColor
        }),
        p: common_vendor.p({
          src: "/static/images/dot2.png",
          width: "16rpx",
          height: "16rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "16rpx"
          }
        }),
        q: __props.record.UnloadEnt && __props.record.UnloadEnt.City
      }, __props.record.UnloadEnt && __props.record.UnloadEnt.City ? {
        r: common_vendor.t(__props.record.UnloadEnt.City)
      } : {}, {
        s: __props.record.UnloadEnt && __props.record.UnloadEnt.PlaceName
      }, __props.record.UnloadEnt && __props.record.UnloadEnt.PlaceName ? {
        t: common_vendor.t(__props.record.UnloadEnt.PlaceName)
      } : {}, {
        v: __props.record.TaxPrice
      }, __props.record.TaxPrice ? common_vendor.e({
        w: ["0", "1", "2", "3", "4", "5", "9"].includes(props.record.Weightedstatus)
      }, ["0", "1", "2", "3", "4", "5", "9"].includes(props.record.Weightedstatus) ? {
        x: common_vendor.t(__props.record.EstimateAmount)
      } : {}, {
        y: ["6"].includes(props.record.Weightedstatus)
      }, ["6"].includes(props.record.Weightedstatus) ? {
        z: common_vendor.t(__props.record.RealAmount)
      } : {}, {
        A: ["7", "8"].includes(props.record.Weightedstatus)
      }, ["7", "8"].includes(props.record.Weightedstatus) ? {
        B: common_vendor.p({
          color: "var(--red-color)",
          price: __props.record.RealAmount
        })
      } : {}) : {}, {
        C: ["0", "1", "2", "3", "4", "5", "6", "7"].includes(props.record.Weightedstatus)
      }, ["0", "1", "2", "3", "4", "5", "6", "7"].includes(props.record.Weightedstatus) ? common_vendor.e({
        D: common_vendor.p({
          color: "var(--divider)",
          margin: "24rpx 0"
        }),
        E: ["0", "1"].includes(props.record.Weightedstatus)
      }, ["0", "1"].includes(props.record.Weightedstatus) ? {
        F: common_vendor.o(cancel),
        G: common_vendor.p({
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
        H: common_vendor.o(() => {
        })
      } : {}, {
        I: ["0", "1", "2", "3", "4", "5", "6", "7"].includes(props.record.Weightedstatus)
      }, ["0", "1", "2", "3", "4", "5", "6", "7"].includes(props.record.Weightedstatus) ? {
        J: common_vendor.o(takePhone),
        K: common_vendor.p({
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
        L: common_vendor.o(() => {
        })
      } : {}, {
        M: ["7"].includes(props.record.Weightedstatus)
      }, ["7"].includes(props.record.Weightedstatus) ? {
        N: common_vendor.o(confirmUnload),
        O: common_vendor.p({
          shape: "circle",
          text: "确认卸货",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);",
          customTextStyle: {
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        P: common_vendor.o(() => {
        })
      } : {}) : {}, {
        Q: common_vendor.o(toDetail),
        R: common_vendor.sr(confirm, "8d041879-8", {
          "k": "confirm"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8d041879"], ["__file", "/Users/wei/cargo/pages/waybill/components/item.vue"]]);
wx.createComponent(Component);
