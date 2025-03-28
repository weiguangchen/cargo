"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_dict = require("../../../utils/dict.js");
const api_index = require("../../../api/index.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_my_price2 = common_vendor.resolveComponent("my-price");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_confirm2 = common_vendor.resolveComponent("my-confirm");
  (_easycom_uv_image2 + _easycom_my_price2 + _easycom_uv_line2 + _easycom_uv_button2 + _easycom_my_confirm2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_my_price = () => "../../../components/my-price/my-price.js";
const _easycom_uv_line = () => "../../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_confirm = () => "../../../components/my-confirm/my-confirm.js";
if (!Math) {
  (_easycom_uv_image + _easycom_my_price + _easycom_uv_line + _easycom_uv_button + _easycom_my_confirm)();
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
    const emits = __emit;
    const props = __props;
    const materialName = common_vendor.computed(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      const name = ((_c = (_b = (_a = props.record) == null ? void 0 : _a.MatList) == null ? void 0 : _b[0]) == null ? void 0 : _c.MaterialName) ?? "";
      if (((_e = (_d = props.record) == null ? void 0 : _d.MatList) == null ? void 0 : _e.length) <= 1)
        return name;
      return `${name} 等 ${(_g = (_f = props.record) == null ? void 0 : _f.MatList) == null ? void 0 : _g.length} 物料`;
    });
    const statusText = common_vendor.computed(() => {
      var _a, _b;
      return ((_b = (_a = utils_dict.ManifestStatusOptions) == null ? void 0 : _a.find((m) => m.value == props.record.Status)) == null ? void 0 : _b.name) ?? "";
    });
    function toDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/manifestDetail/manifestDetail?assignId=${props.record.Id}&supplyId=${props.record.Supply}`
      });
    }
    const confirm = common_vendor.ref();
    async function finishHandle() {
      confirm.value.confirm({
        title: "确定完结货单？",
        content: "完结后将不再派发新的运单任务，当前进行中的运单任务不受影响",
        cancelText: "再想想",
        confirmText: "完结货单",
        asyncClose: true,
        async confirm() {
          try {
            await api_index.SetAssignStatusChg({
              optType: "end",
              assignId: props.record.Id,
              supplyId: props.record.Supply
            });
            common_vendor.index.showToast({
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
            common_vendor.index.showToast({
              icon: "none",
              title: err.data
            });
            confirm.value.closeLoading();
          }
        }
      });
    }
    function pauseHandle() {
      confirm.value.confirm({
        title: "确定暂停货单？",
        content: "暂停后将不再派发新的运单任务，后续可随时继续派单，当前进行中的运单任务不受影响",
        cancelText: "再想想",
        confirmText: "暂停货单",
        confirmBgColor: "var(--main-color)",
        asyncClose: true,
        async confirm() {
          try {
            await api_index.SetAssignStatusChg({
              optType: "pause",
              assignId: props.record.Id,
              supplyId: props.record.Supply
            });
            common_vendor.index.showToast({
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
            common_vendor.index.showToast({
              icon: "none",
              title: err.data
            });
            confirm.value.closeLoading();
          }
        }
      });
    }
    function goOnHandle() {
      confirm.value.confirm({
        title: "确定继续派单？",
        content: "将继续派发运单任务",
        cancelText: "再想想",
        confirmText: "继续派单",
        confirmBgColor: "var(--main-color)",
        asyncClose: true,
        async confirm() {
          try {
            await api_index.ResetAssignStatusChg({
              assignId: props.record.Id,
              supplyId: props.record.Supply
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
            common_vendor.index.showToast({
              icon: "none",
              title: err.data
            });
            confirm.value.closeLoading();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(statusText.value),
        b: __props.record.Status === "1" ? 1 : "",
        c: ["2", "3"].includes(__props.record.Status) ? 1 : "",
        d: ["4", "5"].includes(__props.record.Status) ? 1 : "",
        e: common_vendor.t(materialName.value),
        f: !!__props.record.EstimateCarWeight && !!__props.record.EstimateCarTimes
      }, !!__props.record.EstimateCarWeight && !!__props.record.EstimateCarTimes ? {
        g: common_vendor.t(__props.record.RealCarWeight || 0),
        h: common_vendor.t(__props.record.EstimateCarWeight || 0),
        i: common_vendor.t(__props.record.RealCarTimes || 0),
        j: common_vendor.t(__props.record.EstimateCarTimes || 0)
      } : !!__props.record.EstimateCarTimes ? {
        l: common_vendor.t(__props.record.RealCarTimes || 0),
        m: common_vendor.t(__props.record.EstimateCarTimes || 0)
      } : !!__props.record.EstimateCarWeight ? {
        o: common_vendor.t(__props.record.RealCarWeight || 0),
        p: common_vendor.t(__props.record.EstimateCarWeight || 0)
      } : {}, {
        k: !!__props.record.EstimateCarTimes,
        n: !!__props.record.EstimateCarWeight,
        q: __props.record.SupEnt
      }, __props.record.SupEnt ? {
        r: common_vendor.f(3, (dot, k0, i0) => {
          return {};
        }),
        s: common_vendor.p({
          src: "/static/images/dot1.png",
          width: "16rpx",
          height: "16rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "16rpx"
          }
        }),
        t: common_vendor.t(__props.record.SupEnt ? __props.record.SupEnt.City : ""),
        v: common_vendor.t(__props.record.SupEnt ? __props.record.SupEnt.SupplierName : "")
      } : {}, {
        w: __props.record.UnloadEnt
      }, __props.record.UnloadEnt ? {
        x: common_vendor.p({
          src: "/static/images/dot2.png",
          width: "16rpx",
          height: "16rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "16rpx"
          }
        }),
        y: common_vendor.t(__props.record.UnloadEnt ? __props.record.UnloadEnt.City : ""),
        z: common_vendor.t(__props.record.UnloadEnt ? __props.record.UnloadEnt.PlaceName : "")
      } : {}, {
        A: !!__props.record.RealCarAmount
      }, !!__props.record.RealCarAmount ? {
        B: common_vendor.p({
          color: "var(--red-color)",
          price: __props.record.RealCarAmount
        }),
        C: common_vendor.p({
          direction: "col",
          color: "#C8D4DF",
          length: "26rpx",
          margin: "0 20rpx 0 20rpx"
        })
      } : {}, {
        D: common_vendor.t(__props.record.EstimateCarAmount || 0),
        E: ["1", "2", "3", "4"].includes(__props.record.Status)
      }, ["1", "2", "3", "4"].includes(__props.record.Status) ? common_vendor.e({
        F: common_vendor.p({
          color: "var(--divider)",
          margin: "24rpx 0"
        }),
        G: __props.record.Status === "1"
      }, __props.record.Status === "1" ? {
        H: common_vendor.o(finishHandle),
        I: common_vendor.p({
          shape: "circle",
          text: "完结货单",
          color: "var(--page-bg)",
          customTextStyle: {
            color: "var(--content-color)",
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        J: common_vendor.o(() => {
        }),
        K: common_vendor.o(pauseHandle),
        L: common_vendor.p({
          shape: "circle",
          text: "暂停货单",
          color: "var(--page-bg)",
          customTextStyle: {
            color: "var(--content-color)",
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        M: common_vendor.o(() => {
        })
      } : ["2", "3"].includes(__props.record.Status) ? {
        O: common_vendor.o(finishHandle),
        P: common_vendor.p({
          shape: "circle",
          text: "完结货单",
          color: "var(--page-bg)",
          customTextStyle: {
            color: "var(--content-color)",
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        Q: common_vendor.o(() => {
        }),
        R: common_vendor.o(goOnHandle),
        S: common_vendor.p({
          shape: "circle",
          text: "继续派单",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);",
          customTextStyle: {
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        T: common_vendor.o(() => {
        })
      } : ["4"].includes(__props.record.Status) ? {
        V: common_vendor.o(goOnHandle),
        W: common_vendor.p({
          shape: "circle",
          text: "继续派单",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);",
          customTextStyle: {
            fontSize: "26rpx"
          },
          customStyle: {
            height: "32px"
          }
        }),
        X: common_vendor.o(() => {
        })
      } : {}, {
        N: ["2", "3"].includes(__props.record.Status),
        U: ["4"].includes(__props.record.Status)
      }) : {}, {
        Y: common_vendor.o(toDetail),
        Z: common_vendor.sr(confirm, "6d1eb3e7-10", {
          "k": "confirm"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6d1eb3e7"], ["__file", "/Users/wei/cargo/pages/manifestList/components/item.vue"]]);
wx.createComponent(Component);
