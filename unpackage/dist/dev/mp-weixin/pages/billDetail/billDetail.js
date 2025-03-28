"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_token = require("../../utils/token.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_my_price2 = common_vendor.resolveComponent("my-price");
  const _easycom_my_plate2 = common_vendor.resolveComponent("my-plate");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_confirm2 = common_vendor.resolveComponent("my-confirm");
  (_easycom_uv_navbar2 + _easycom_uv_icon2 + _easycom_uv_image2 + _easycom_uv_line2 + _easycom_my_price2 + _easycom_my_plate2 + _easycom_uv_button2 + _easycom_my_confirm2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_my_price = () => "../../components/my-price/my-price.js";
const _easycom_my_plate = () => "../../components/my-plate/my-plate.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_confirm = () => "../../components/my-confirm/my-confirm.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_icon + _easycom_uv_image + _easycom_uv_line + _easycom_my_price + _easycom_my_plate + _easycom_uv_button + MapDrawer + StepDrawer + RemarkDrawer + _easycom_my_confirm)();
}
const MapDrawer = () => "./components/MapDrawer.js";
const RemarkDrawer = () => "./components/RemarkDrawer.js";
const StepDrawer = () => "./components/StepDrawer.js";
const _sfc_main = {
  __name: "billDetail",
  setup(__props) {
    const onwayId = common_vendor.ref("");
    const supplyId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      supplyId.value = options.supplyId;
      onwayId.value = options.onwayId;
      getDetail();
      getTimeSteps();
    });
    const detail = common_vendor.ref({});
    async function getDetail() {
      try {
        const res = await api_index.GetSupplyOnwayDetail({
          onwayId: common_vendor.unref(onwayId),
          supplyId: common_vendor.unref(supplyId)
        });
        detail.value = res;
      } catch {
      }
    }
    const steps = common_vendor.ref([]);
    async function getTimeSteps() {
      try {
        const res = await api_index.GetOnwayTimeTree({
          onwayId: common_vendor.unref(onwayId),
          supplyId: common_vendor.unref(supplyId)
        });
        steps.value = res;
      } catch {
      }
    }
    const statusBarHeight = common_vendor.ref();
    common_vendor.onLoad(() => {
      statusBarHeight.value = common_vendor.index.getSystemInfoSync().statusBarHeight;
    });
    const placeholderHeight = common_vendor.computed(() => `${statusBarHeight.value + 56}px`);
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const mapModal = common_vendor.ref();
    function openMapModal(type) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
      const data = {
        type,
        name: type === 1 ? ((_b = (_a = detail.value) == null ? void 0 : _a.SupEnt) == null ? void 0 : _b.Name) ?? "" : ((_d = (_c = detail.value) == null ? void 0 : _c.UnloadEnt) == null ? void 0 : _d.PlaceName) ?? "",
        address: type === 1 ? `${((_f = (_e = detail.value) == null ? void 0 : _e.SupEnt) == null ? void 0 : _f.Province) ?? ""}${((_h = (_g = detail.value) == null ? void 0 : _g.SupEnt) == null ? void 0 : _h.City) ?? ""}${((_j = (_i = detail.value) == null ? void 0 : _i.SupEnt) == null ? void 0 : _j.District) ?? ""}${((_l = (_k = detail.value) == null ? void 0 : _k.SupEnt) == null ? void 0 : _l.Address) ?? ""}` : `${((_n = (_m = detail.value) == null ? void 0 : _m.UnloadEnt) == null ? void 0 : _n.Province) ?? ""}${((_p = (_o = detail.value) == null ? void 0 : _o.UnloadEnt) == null ? void 0 : _p.City) ?? ""}${((_r = (_q = detail.value) == null ? void 0 : _q.UnloadEnt) == null ? void 0 : _r.District) ?? ""}${((_t = (_s = detail.value) == null ? void 0 : _s.UnloadEnt) == null ? void 0 : _t.Address) ?? ""}`,
        user: type === 1 ? ((_v = (_u = detail.value) == null ? void 0 : _u.SupEnt) == null ? void 0 : _v.Linker) ?? "" : ((_x = (_w = detail.value) == null ? void 0 : _w.UnloadEnt) == null ? void 0 : _x.NickName) ?? "",
        phone: type === 1 ? ((_z = (_y = detail.value) == null ? void 0 : _y.SupEnt) == null ? void 0 : _z.LinkerMobile) ?? "" : ((_B = (_A = detail.value) == null ? void 0 : _A.UnloadEnt) == null ? void 0 : _B.Mobile) ?? "",
        longitude: type === 1 ? (_D = (_C = detail.value) == null ? void 0 : _C.Supplier) == null ? void 0 : _D.Logitude : (_F = (_E = detail.value) == null ? void 0 : _E.UnloadEnt) == null ? void 0 : _F.Logitude,
        latitude: type === 1 ? (_H = (_G = detail.value) == null ? void 0 : _G.Supplier) == null ? void 0 : _H.Latitude : (_J = (_I = detail.value) == null ? void 0 : _I.UnloadEnt) == null ? void 0 : _J.Latitude
      };
      mapModal.value.open(data);
    }
    const stepModal = common_vendor.ref();
    function openStepModal() {
      stepModal.value.open();
    }
    const remarkModal = common_vendor.ref();
    function openAssignMemo() {
      remarkModal.value.open({
        title: "运单备注",
        memo: detail.value.AssignMemo
      });
    }
    function openUnloadMemo() {
      remarkModal.value.open({
        title: "卸货说明",
        memo: detail.value.UnloadMemo
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
              onwayId: detail.value.Id,
              supplyId: supplyId.value,
              userId: utils_token.getToken().userInfo.Id,
              userType: "owner"
            });
            confirm.value.close();
            common_vendor.index.showToast({
              title: "操作成功",
              icon: "none"
            });
          } catch (err) {
            confirm.value.closeLoading();
            common_vendor.index.showToast({
              title: err.data,
              icon: "none"
            });
          } finally {
            getDetail();
            getTimeSteps();
          }
        }
      });
    }
    function takePhone() {
      var _a, _b, _c, _d;
      if (!((_b = (_a = detail.value) == null ? void 0 : _a.DriverEnt) == null ? void 0 : _b.Mobile)) {
        return;
      }
      common_vendor.index.makePhoneCall({
        phoneNumber: (_d = (_c = detail.value) == null ? void 0 : _c.DriverEnt) == null ? void 0 : _d.Mobile
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
              onwayId: detail.value.Id,
              supplyId: supplyId.value,
              userId: utils_token.getToken().userInfo.Id,
              uType: "owner"
            });
            confirm.value.close();
            common_vendor.index.showToast({
              title: "操作成功",
              icon: "none"
            });
          } catch (err) {
            console.log("err", err);
            confirm.value.closeLoading();
            common_vendor.index.showToast({
              title: err.data,
              icon: "none"
            });
          } finally {
            getDetail();
            getTimeSteps();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(leftClick),
        b: common_vendor.p({
          bgColor: "rgba(255,255,255,0)"
        }),
        c: placeholderHeight.value,
        d: detail.value.Weightedstatus === "0"
      }, detail.value.Weightedstatus === "0" ? {} : {}, {
        e: detail.value.Weightedstatus === "1"
      }, detail.value.Weightedstatus === "1" ? {} : {}, {
        f: detail.value.Weightedstatus === "2"
      }, detail.value.Weightedstatus === "2" ? {} : {}, {
        g: detail.value.Weightedstatus === "3"
      }, detail.value.Weightedstatus === "3" ? {} : {}, {
        h: detail.value.Weightedstatus === "4"
      }, detail.value.Weightedstatus === "4" ? {} : {}, {
        i: detail.value.Weightedstatus === "5"
      }, detail.value.Weightedstatus === "5" ? {} : {}, {
        j: detail.value.Weightedstatus === "6"
      }, detail.value.Weightedstatus === "6" ? {} : {}, {
        k: detail.value.Weightedstatus === "7"
      }, detail.value.Weightedstatus === "7" ? {} : {}, {
        l: detail.value.Weightedstatus === "8"
      }, detail.value.Weightedstatus === "8" ? {} : {}, {
        m: detail.value.Weightedstatus === "9"
      }, detail.value.Weightedstatus === "9" ? {} : {}, {
        n: common_vendor.p({
          name: "arrow-right",
          size: "32rpx",
          color: "var(--title-color)",
          ["custom-style"]: {
            marginLeft: "8rpx"
          },
          bold: true
        }),
        o: detail.value.Weightedstatus === "0"
      }, detail.value.Weightedstatus === "0" ? common_vendor.e({
        p: detail.value.EndTime && common_vendor.unref(common_vendor.dayjs)().isAfter(detail.value.EndTime)
      }, detail.value.EndTime && common_vendor.unref(common_vendor.dayjs)().isAfter(detail.value.EndTime) ? {} : !detail.value.StartTime && !detail.value.EndTime || detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isAfter(detail.value.StartTime) && !detail.value.EndTime ? {} : !detail.value.EndTime && detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.StartTime) ? {
        s: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(detail.value.StartTime).format("MM-DD HH:mm"))
      } : detail.value.EndTime && detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.StartTime) ? {
        v: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(detail.value.StartTime).format("MM-DD HH:mm")),
        w: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(detail.value.EndTime).format("MM-DD HH:mm"))
      } : detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isAfter(detail.value.StartTime) && detail.value.EndTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.EndTime) || !detail.value.StartTime && detail.value.EndTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.EndTime) ? {
        y: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(detail.value.EndTime).format("MM-DD HH:mm"))
      } : {}, {
        q: !detail.value.StartTime && !detail.value.EndTime || detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isAfter(detail.value.StartTime) && !detail.value.EndTime,
        r: !detail.value.EndTime && detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.StartTime),
        t: detail.value.EndTime && detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.StartTime),
        x: detail.value.StartTime && common_vendor.unref(common_vendor.dayjs)().isAfter(detail.value.StartTime) && detail.value.EndTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.EndTime) || !detail.value.StartTime && detail.value.EndTime && common_vendor.unref(common_vendor.dayjs)().isBefore(detail.value.EndTime)
      }) : {}, {
        z: detail.value.Weightedstatus === "1"
      }, detail.value.Weightedstatus === "1" ? {
        A: common_vendor.t(detail.value.StatusCount && detail.value.StatusCount > 1 ? `当前共 ${detail.value.StatusCount} 辆车等待入厂` : "即将入厂")
      } : {}, {
        B: detail.value.Weightedstatus === "2"
      }, detail.value.Weightedstatus === "2" ? {} : {}, {
        C: detail.value.Weightedstatus === "3"
      }, detail.value.Weightedstatus === "3" ? {
        D: common_vendor.t(detail.value.StatusCount && detail.value.StatusCount > 1 ? `当前共 ${detail.value.StatusCount} 辆车等待装车` : "即将装车")
      } : {}, {
        E: detail.value.Weightedstatus === "4"
      }, detail.value.Weightedstatus === "4" ? {} : {}, {
        F: detail.value.Weightedstatus === "5"
      }, detail.value.Weightedstatus === "5" ? {} : {}, {
        G: detail.value.Weightedstatus === "6"
      }, detail.value.Weightedstatus === "6" ? {} : {}, {
        H: detail.value.Weightedstatus === "7"
      }, detail.value.Weightedstatus === "7" ? {} : {}, {
        I: detail.value.Weightedstatus === "8"
      }, detail.value.Weightedstatus === "8" ? {
        J: common_vendor.t(detail.value.UserType ? detail.value.UserType === "driver" ? "司机" : "货主" : "")
      } : {}, {
        K: detail.value.Weightedstatus === "9"
      }, detail.value.Weightedstatus === "9" ? {
        L: common_vendor.t(detail.value.UserType ? detail.value.UserType === "driver" ? "司机" : "货主" : "")
      } : {}, {
        M: common_vendor.o(openStepModal),
        N: detail.value.SupEnt
      }, detail.value.SupEnt ? common_vendor.e({
        O: common_vendor.t(detail.value.SupEnt.Name || ""),
        P: !detail.value.SupEnt.Linker & !detail.value.Supplier.LinkerMobile
      }, !detail.value.SupEnt.Linker & !detail.value.Supplier.LinkerMobile ? {} : common_vendor.e({
        Q: detail.value.Supplier.Linker
      }, detail.value.Supplier.Linker ? {
        R: common_vendor.t(detail.value.Supplier.Linker || "")
      } : {}, {
        S: detail.value.Supplier.LinkerMobile
      }, detail.value.Supplier.LinkerMobile ? {
        T: common_vendor.t(detail.value.Supplier.LinkerMobile || "")
      } : {}), {
        U: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        V: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        W: detail.value.UnloadPlace ? 1 : "",
        X: common_vendor.o(($event) => openMapModal(1))
      }) : {}, {
        Y: detail.value.UnloadEnt
      }, detail.value.UnloadEnt ? common_vendor.e({
        Z: detail.value.UnloadEnt && detail.value.UnloadEnt.PlaceName
      }, detail.value.UnloadEnt && detail.value.UnloadEnt.PlaceName ? {
        aa: common_vendor.t(detail.value.UnloadEnt.PlaceName)
      } : {}, {
        ab: !detail.value.UnloadEnt.NickName & !detail.value.UnloadEnt.Mobile
      }, !detail.value.UnloadEnt.NickName & !detail.value.UnloadEnt.Mobile ? {} : common_vendor.e({
        ac: detail.value.UnloadEnt.NickName
      }, detail.value.UnloadEnt.NickName ? {
        ad: common_vendor.t(detail.value.UnloadEnt.NickName || "")
      } : {}, {
        ae: detail.value.UnloadEnt.Mobile
      }, detail.value.UnloadEnt.Mobile ? {
        af: common_vendor.t(detail.value.UnloadEnt.Mobile || "")
      } : {}), {
        ag: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        ah: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        ai: common_vendor.o(($event) => openMapModal(2))
      }) : {}, {
        aj: common_vendor.t(detail.value.Materialname || ""),
        ak: ["0", "1", "2", "3", "4", "5", "9"].includes(detail.value.Weightedstatus)
      }, ["0", "1", "2", "3", "4", "5", "9"].includes(detail.value.Weightedstatus) ? {
        al: common_vendor.t(detail.value.EstimiteWeight)
      } : {
        am: common_vendor.t(detail.value.WeightEnt ? detail.value.WeightEnt.Suttle : "")
      }, {
        an: ["0", "1", "2", "3", "4", "5", "9"].includes(detail.value.Weightedstatus)
      }, ["0", "1", "2", "3", "4", "5", "9"].includes(detail.value.Weightedstatus) ? {
        ao: common_vendor.t(detail.value.EstimateAmount)
      } : {}, {
        ap: ["6"].includes(detail.value.Weightedstatus)
      }, ["6"].includes(detail.value.Weightedstatus) ? {
        aq: common_vendor.t(detail.value.RealAmount)
      } : {}, {
        ar: ["7", "8"].includes(detail.value.Weightedstatus)
      }, ["7", "8"].includes(detail.value.Weightedstatus) ? {
        as: common_vendor.p({
          direction: "col",
          color: "var(--divider)",
          margin: "0 24rpx",
          length: "64rpx"
        }),
        at: common_vendor.p({
          price: detail.value.RealAmount,
          color: "var(--red-color)"
        })
      } : {}, {
        av: detail.value.WeightEnt && detail.value.WeightEnt.BillNo
      }, detail.value.WeightEnt && detail.value.WeightEnt.BillNo ? {
        aw: common_vendor.t(detail.value.WeightEnt ? detail.value.WeightEnt.BillNo : "")
      } : {}, {
        ax: detail.value.Carno
      }, detail.value.Carno ? common_vendor.e({
        ay: common_vendor.p({
          plate: detail.value.Carno,
          color: detail.value.CarColor
        }),
        az: detail.value.CarType
      }, detail.value.CarType ? {
        aA: common_vendor.t(detail.value.CarType)
      } : {}, {
        aB: detail.value.DriverEnt && detail.value.DriverEnt.NickName
      }, detail.value.DriverEnt && detail.value.DriverEnt.NickName ? {
        aC: common_vendor.t(detail.value.DriverEnt.NickName)
      } : {}, {
        aD: detail.value.DriverEnt && detail.value.DriverEnt.Mobile
      }, detail.value.DriverEnt && detail.value.DriverEnt.Mobile ? {
        aE: common_vendor.t(detail.value.DriverEnt.Mobile)
      } : {}, {
        aF: detail.value.FirstWeight ? 1 : ""
      }) : {}, {
        aG: ["4", "5", "6", "7", "8"].includes(detail.value.Weightedstatus)
      }, ["4", "5", "6", "7", "8"].includes(detail.value.Weightedstatus) ? common_vendor.e({
        aH: detail.value.WeightEnt
      }, detail.value.WeightEnt ? {
        aI: common_vendor.t(detail.value.WeightEnt.FirstWeight || "")
      } : {}, {
        aJ: detail.value.WeightEnt
      }, detail.value.WeightEnt ? {
        aK: common_vendor.t(detail.value.WeightEnt.FirstTime ? common_vendor.unref(common_vendor.dayjs)(detail.value.WeightEnt.FirstTime).format("MM/DD HH:mm") : "")
      } : {}, {
        aL: detail.value.SecondWeight ? 1 : ""
      }) : {}, {
        aM: ["6", "7", "8"].includes(detail.value.Weightedstatus)
      }, ["6", "7", "8"].includes(detail.value.Weightedstatus) ? common_vendor.e({
        aN: detail.value.WeightEnt
      }, detail.value.WeightEnt ? {
        aO: common_vendor.t(detail.value.WeightEnt.SecondWeight || "")
      } : {}, {
        aP: detail.value.WeightEnt
      }, detail.value.WeightEnt ? {
        aQ: common_vendor.t(detail.value.WeightEnt.SecondTime ? common_vendor.unref(common_vendor.dayjs)(detail.value.WeightEnt.SecondTime).format("MM/DD HH:mm") : "")
      } : {}) : {}, {
        aR: detail.value.OwerName
      }, detail.value.OwerName ? {
        aS: common_vendor.t(detail.value.OwerName)
      } : {}, {
        aT: common_vendor.t(detail.value.OnwayNo),
        aU: common_vendor.t(detail.value.Creatortime),
        aV: ["8", "9"].includes(detail.value.Weightedstatus)
      }, ["8", "9"].includes(detail.value.Weightedstatus) ? {
        aW: common_vendor.t(detail.value.Weightedstatus == "8" ? "完成时间" : "取消时间"),
        aX: common_vendor.t(detail.value.LastModifyTime)
      } : {}, {
        aY: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        }),
        aZ: common_vendor.o(openAssignMemo),
        ba: detail.value.UnloadMemo && detail.value.Weightedstatus == "8"
      }, detail.value.UnloadMemo && detail.value.Weightedstatus == "8" ? {
        bb: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        }),
        bc: common_vendor.o(openUnloadMemo)
      } : {}, {
        bd: detail.value.AssignCode
      }, detail.value.AssignCode ? {
        be: common_vendor.t(detail.value.AssignCode)
      } : {}, {
        bf: ["0", "1", "2", "3", "4", "5", "6", "7"].includes(detail.value.Weightedstatus)
      }, ["0", "1", "2", "3", "4", "5", "6", "7"].includes(detail.value.Weightedstatus) ? common_vendor.e({
        bg: ["0", "1"].includes(detail.value.Weightedstatus)
      }, ["0", "1"].includes(detail.value.Weightedstatus) ? {
        bh: common_vendor.o(cancel),
        bi: common_vendor.p({
          text: "取消运单",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            color: "var(--sub-color)"
          }
        }),
        bj: common_vendor.o(takePhone),
        bk: common_vendor.p({
          text: "呼叫司机",
          color: " linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          }
        })
      } : {}, {
        bl: ["2", "3", "4", "5", "6"].includes(detail.value.Weightedstatus)
      }, ["2", "3", "4", "5", "6"].includes(detail.value.Weightedstatus) ? {
        bm: common_vendor.o(takePhone),
        bn: common_vendor.p({
          text: "呼叫司机",
          color: " linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            width: "100%",
            borderRadius: "16rpx"
          }
        })
      } : {}, {
        bo: ["7"].includes(detail.value.Weightedstatus)
      }, ["7"].includes(detail.value.Weightedstatus) ? {
        bp: common_vendor.o(confirmUnload),
        bq: common_vendor.p({
          text: "确认卸货",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            color: "var(--sub-color)"
          }
        }),
        br: common_vendor.o(takePhone),
        bs: common_vendor.p({
          text: "呼叫司机",
          color: " linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          }
        })
      } : {}) : {}, {
        bt: common_vendor.sr(mapModal, "77326575-14", {
          "k": "mapModal"
        }),
        bv: common_vendor.sr(stepModal, "77326575-15", {
          "k": "stepModal"
        }),
        bw: common_vendor.sr(remarkModal, "77326575-16", {
          "k": "remarkModal"
        }),
        bx: common_vendor.sr(confirm, "77326575-17", {
          "k": "confirm"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/billDetail/billDetail.vue"]]);
wx.createPage(MiniProgramPage);
