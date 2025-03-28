"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_my_price2 = common_vendor.resolveComponent("my-price");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_confirm2 = common_vendor.resolveComponent("my-confirm");
  (_easycom_uv_navbar2 + _easycom_uv_image2 + _easycom_uv_line2 + _easycom_my_price2 + _easycom_uv_button2 + _easycom_my_confirm2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_my_price = () => "../../components/my-price/my-price.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_confirm = () => "../../components/my-confirm/my-confirm.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_image + _easycom_uv_line + _easycom_my_price + _easycom_uv_button + MapDrawer + RemarkDrawer + _easycom_my_confirm + CarnoDrawer)();
}
const RemarkDrawer = () => "../billDetail/components/RemarkDrawer.js";
const MapDrawer = () => "../billDetail/components/MapDrawer.js";
const CarnoDrawer = () => "./components/CarnoDrawer.js";
const _sfc_main = {
  __name: "manifestDetail",
  setup(__props) {
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const assignId = common_vendor.ref();
    const supplyId = common_vendor.ref();
    common_vendor.onLoad((options) => {
      assignId.value = (options == null ? void 0 : options.assignId) ?? "";
      supplyId.value = (options == null ? void 0 : options.supplyId) ?? "";
      getDetail();
    });
    const info = common_vendor.ref({});
    async function getDetail() {
      try {
        const res = await api_index.GetAssignDetail({
          assignId: assignId.value,
          supplyId: supplyId.value
        });
        info.value = res || {};
      } catch {
      }
    }
    const carTypeText = common_vendor.computed(() => {
      var _a, _b;
      if (!info.value.CarType)
        return "";
      const arr = ((_b = (_a = info.value) == null ? void 0 : _a.CarType) == null ? void 0 : _b.split(",")) ?? [];
      return arr.join(" + ");
    });
    const carnoList = common_vendor.computed(() => {
      var _a, _b;
      if (!info.value.Carno)
        return [];
      return ((_b = (_a = info.value) == null ? void 0 : _a.Carno) == null ? void 0 : _b.split(",")) ?? [];
    });
    const carLimitText = common_vendor.computed(() => {
      if (carnoList.value.length === 0)
        return "";
      if (carnoList.value.length === 1)
        return carnoList.value[0];
      if (carnoList.value.length > 1) {
        return `${carnoList.value[0]} 等 ${carnoList.value.length} 车`;
      }
    });
    const carnoModal = common_vendor.ref();
    function showAllCarno() {
      if (carnoList.value.length <= 1)
        return;
      carnoModal.value.open(carnoList.value);
    }
    const mapModal = common_vendor.ref();
    function openMapModal(type) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
      const data = {
        type,
        name: type === 1 ? ((_b = (_a = info.value) == null ? void 0 : _a.SupEnt) == null ? void 0 : _b.SupplierName) ?? "" : ((_d = (_c = info.value) == null ? void 0 : _c.UnloadEnt) == null ? void 0 : _d.PlaceName) ?? "",
        address: type === 1 ? `${((_f = (_e = info.value) == null ? void 0 : _e.SupEnt) == null ? void 0 : _f.Province) ?? ""}${((_h = (_g = info.value) == null ? void 0 : _g.SupEnt) == null ? void 0 : _h.City) ?? ""}${((_j = (_i = info.value) == null ? void 0 : _i.SupEnt) == null ? void 0 : _j.District) ?? ""}${((_l = (_k = info.value) == null ? void 0 : _k.SupEnt) == null ? void 0 : _l.Address) ?? ""}` : `${((_n = (_m = info.value) == null ? void 0 : _m.UnloadEnt) == null ? void 0 : _n.Province) ?? ""}${((_p = (_o = info.value) == null ? void 0 : _o.UnloadEnt) == null ? void 0 : _p.City) ?? ""}${((_r = (_q = info.value) == null ? void 0 : _q.UnloadEnt) == null ? void 0 : _r.District) ?? ""}${((_t = (_s = info.value) == null ? void 0 : _s.UnloadEnt) == null ? void 0 : _t.Address) ?? ""}`,
        user: type === 1 ? ((_v = (_u = info.value) == null ? void 0 : _u.SupEnt) == null ? void 0 : _v.Linker) ?? "" : ((_x = (_w = info.value) == null ? void 0 : _w.UnloadEnt) == null ? void 0 : _x.NickName) ?? "",
        phone: type === 1 ? ((_z = (_y = info.value) == null ? void 0 : _y.SupEnt) == null ? void 0 : _z.LinkerMobile) ?? "" : ((_B = (_A = info.value) == null ? void 0 : _A.UnloadEnt) == null ? void 0 : _B.Mobile) ?? "",
        longitude: type === 1 ? (_D = (_C = info.value) == null ? void 0 : _C.SupEnt) == null ? void 0 : _D.Logitude : (_F = (_E = info.value) == null ? void 0 : _E.UnloadEnt) == null ? void 0 : _F.Logitude,
        latitude: type === 1 ? (_H = (_G = info.value) == null ? void 0 : _G.SupEnt) == null ? void 0 : _H.Latitude : (_J = (_I = info.value) == null ? void 0 : _I.UnloadEnt) == null ? void 0 : _J.Latitude
      };
      mapModal.value.open(data);
    }
    const remarkModal = common_vendor.ref();
    function openMemo() {
      remarkModal.value.open({
        title: "派单备注",
        memo: info.value.Memo
      });
    }
    const confirm = common_vendor.ref();
    function finishHandle() {
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
              assignId: assignId.value,
              supplyId: supplyId.value
            });
            common_vendor.index.showToast({
              title: "操作成功",
              icon: "none"
            });
            confirm.value.close();
            getDetail();
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
              assignId: assignId.value,
              supplyId: supplyId.value
            });
            common_vendor.index.showToast({
              title: "操作成功",
              icon: "none"
            });
            confirm.value.close();
            getDetail();
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
              assignId: assignId.value,
              supplyId: supplyId.value
            });
            common_vendor.index.showToast({
              title: "操作成功",
              icon: "none"
            });
            confirm.value.close();
            getDetail();
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
        a: common_vendor.o(leftClick),
        b: common_vendor.p({
          placeholder: true,
          bgColor: "var(--page-bg)"
        }),
        c: info.value.Status === "1"
      }, info.value.Status === "1" ? {} : {}, {
        d: info.value.Status === "2"
      }, info.value.Status === "2" ? {} : {}, {
        e: info.value.Status === "3"
      }, info.value.Status === "3" ? {} : {}, {
        f: info.value.Status === "4"
      }, info.value.Status === "4" ? {} : {}, {
        g: info.value.Status === "5"
      }, info.value.Status === "5" ? {} : {}, {
        h: ["2", "3", "4"].includes(info.value.Status)
      }, ["2", "3", "4"].includes(info.value.Status) ? common_vendor.e({
        i: info.value.Status === "2"
      }, info.value.Status === "2" ? {} : {}, {
        j: info.value.Status === "3"
      }, info.value.Status === "3" ? {} : {}, {
        k: info.value.Status === "4"
      }, info.value.Status === "4" ? {} : {}) : {}, {
        l: info.value.SupEnt
      }, info.value.SupEnt ? {
        m: common_vendor.t(info.value.SupEnt ? info.value.SupEnt.SupplierName : ""),
        n: common_vendor.t(info.value.SupEnt ? info.value.SupEnt.Linker : ""),
        o: common_vendor.t(info.value.SupEnt ? info.value.SupEnt.LinkerMobile : ""),
        p: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        q: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        r: common_vendor.o(($event) => openMapModal(1))
      } : {}, {
        s: info.value.UnloadEnt
      }, info.value.UnloadEnt ? {
        t: common_vendor.t(info.value.UnloadEnt ? info.value.UnloadEnt.PlaceName : ""),
        v: common_vendor.t(info.value.UnloadEnt ? info.value.UnloadEnt.NickName : ""),
        w: common_vendor.t(info.value.UnloadEnt ? info.value.UnloadEnt.Mobile : ""),
        x: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        y: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        z: common_vendor.o(($event) => openMapModal(2))
      } : {}, {
        A: common_vendor.f(info.value.MatList, (mat, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(mat.MaterialName),
            b: mat.Limittype === "0"
          }, mat.Limittype === "0" ? {
            c: common_vendor.t(mat.Realweight)
          } : {}, {
            d: mat.Limittype === "1"
          }, mat.Limittype === "1" ? {
            e: common_vendor.t(mat.Realweight),
            f: common_vendor.t(mat.EstimateWeight)
          } : {}, {
            g: mat.Limittype === "2"
          }, mat.Limittype === "2" ? {
            h: common_vendor.t(mat.Realtimes),
            i: common_vendor.t(mat.EstimateTimes)
          } : {}, {
            j: "b418e216-3-" + i0,
            k: common_vendor.t(mat.Realamount || 0),
            l: index < info.value.MatList.length - 1 ? 1 : "",
            m: mat.Id
          });
        }),
        B: common_vendor.p({
          direction: "col",
          color: "#B0BECC",
          length: "24rpx",
          margin: "0 24rpx"
        }),
        C: common_vendor.f(100, (item, k0, i0) => {
          return {};
        }),
        D: common_vendor.p({
          color: "var(--red-color)",
          price: info.value.RealCarAmount
        }),
        E: common_vendor.t(info.value.EstimateCarAmount),
        F: common_vendor.t(info.value.OwnerEnt ? info.value.OwnerEnt.OwnerName : ""),
        G: common_vendor.t(info.value.AssignCode),
        H: common_vendor.t(info.value.CreatorTime ? common_vendor.unref(common_vendor.dayjs)(info.value.CreatorTime).format("YYYY-MM-DD HH:mm:ss") : ""),
        I: info.value.StartTime
      }, info.value.StartTime ? {
        J: common_vendor.t(info.value.StartTime),
        K: !info.value.EndTime ? 1 : ""
      } : {}, {
        L: info.value.EndTime
      }, info.value.EndTime ? {
        M: common_vendor.t(info.value.EndTime)
      } : {}, {
        N: common_vendor.t(carTypeText.value),
        O: info.value.Carno
      }, info.value.Carno ? common_vendor.e({
        P: common_vendor.t(carLimitText.value),
        Q: carnoList.value.length > 1
      }, carnoList.value.length > 1 ? {
        R: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        })
      } : {}, {
        S: common_vendor.o(showAllCarno)
      }) : {}, {
        T: !!info.value.Memo
      }, !!info.value.Memo ? {
        U: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        }),
        V: common_vendor.o(openMemo)
      } : {}, {
        W: info.value.Orderno
      }, info.value.Orderno ? {
        X: common_vendor.t(info.value.Orderno)
      } : {}, {
        Y: !!info.value.RelOnwayCount
      }, !!info.value.RelOnwayCount ? {
        Z: common_vendor.t(info.value.RelOnwayCount),
        aa: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        })
      } : {}, {
        ab: ["1", "2", "3", "4"].includes(info.value.Status)
      }, ["1", "2", "3", "4"].includes(info.value.Status) ? common_vendor.e({
        ac: ["1"].includes(info.value.Status)
      }, ["1"].includes(info.value.Status) ? {
        ad: common_vendor.o(finishHandle),
        ae: common_vendor.p({
          text: "完结货单",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            color: "var(--sub-color)"
          }
        }),
        af: common_vendor.o(pauseHandle),
        ag: common_vendor.p({
          text: "暂停货单",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            color: "var(--sub-color)"
          }
        })
      } : {}, {
        ah: ["2", "3"].includes(info.value.Status)
      }, ["2", "3"].includes(info.value.Status) ? {
        ai: common_vendor.o(finishHandle),
        aj: common_vendor.p({
          text: "完结货单",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            color: "var(--sub-color)"
          }
        }),
        ak: common_vendor.o(goOnHandle),
        al: common_vendor.p({
          text: "继续派单",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx"
          }
        })
      } : {}, {
        am: ["5"].includes(info.value.Status)
      }, ["5"].includes(info.value.Status) ? {
        an: common_vendor.o(goOnHandle),
        ao: common_vendor.p({
          text: "继续派单",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            width: "100%",
            borderRadius: "16rpx",
            fontSize: "30rpx"
          }
        })
      } : {}) : {}, {
        ap: common_vendor.sr(mapModal, "b418e216-13", {
          "k": "mapModal"
        }),
        aq: common_vendor.sr(remarkModal, "b418e216-14", {
          "k": "remarkModal"
        }),
        ar: common_vendor.sr(confirm, "b418e216-15", {
          "k": "confirm"
        }),
        as: common_vendor.sr(carnoModal, "b418e216-16", {
          "k": "carnoModal"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/manifestDetail/manifestDetail.vue"]]);
wx.createPage(MiniProgramPage);
