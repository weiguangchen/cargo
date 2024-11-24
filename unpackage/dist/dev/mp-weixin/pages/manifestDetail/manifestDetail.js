"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_my_price2 = common_vendor.resolveComponent("my-price");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_navbar2 + _easycom_uv_icon2 + _easycom_uv_image2 + _easycom_uv_line2 + _easycom_my_price2 + _easycom_uv_button2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_my_price = () => "../../components/my-price/my-price.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_icon + _easycom_uv_image + _easycom_uv_line + _easycom_my_price + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "manifestDetail",
  setup(__props) {
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const assignId = common_vendor.ref();
    common_vendor.onLoad((options) => {
      assignId.value = options.assignId;
      getDetail();
    });
    const info = common_vendor.ref({});
    async function getDetail() {
      try {
        const res = await api_index.GetAssignDetail({
          assignId: assignId.value
        });
        info.value = res || {};
      } catch {
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(leftClick),
        b: common_vendor.p({
          placeholder: true,
          bgColor: "rgba(255,255,255,0)"
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
        h: common_vendor.p({
          name: "arrow-right",
          size: "28rpx",
          color: "var(--title-color)",
          ["custom-style"]: {
            marginLeft: "4rpx"
          },
          bold: true
        }),
        i: ["2", "3", "4"].includes(info.value.Status)
      }, ["2", "3", "4"].includes(info.value.Status) ? common_vendor.e({
        j: info.value.Status === "2"
      }, info.value.Status === "2" ? {} : {}, {
        k: info.value.Status === "3"
      }, info.value.Status === "3" ? {} : {}, {
        l: info.value.Status === "4"
      }, info.value.Status === "4" ? {} : {}) : {}, {
        m: info.value.SupEnt
      }, info.value.SupEnt ? {
        n: common_vendor.t(info.value.SupEnt ? info.value.SupEnt.SupplierName : ""),
        o: common_vendor.t(info.value.SupEnt ? info.value.SupEnt.Linker : ""),
        p: common_vendor.t(info.value.SupEnt ? info.value.SupEnt.LinkerMobile : ""),
        q: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        r: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        s: common_vendor.o((...args) => _ctx.openMapModal && _ctx.openMapModal(...args))
      } : {}, {
        t: info.value.UnloadEnt
      }, info.value.UnloadEnt ? {
        v: common_vendor.t(info.value.UnloadEnt ? info.value.UnloadEnt.PlaceName : ""),
        w: common_vendor.t(info.value.UnloadEnt ? info.value.UnloadEnt.NickName : ""),
        x: common_vendor.t(info.value.UnloadEnt ? info.value.UnloadEnt.Mobile : ""),
        y: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        z: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        A: common_vendor.o((...args) => _ctx.openMapModal && _ctx.openMapModal(...args))
      } : {}, {
        B: common_vendor.f(info.value.MatList, (mat, index, i0) => {
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
            j: "b418e216-4-" + i0,
            k: common_vendor.t(mat.Realamount),
            l: index < info.value.MatList.length - 1 ? 1 : "",
            m: mat.Id
          });
        }),
        C: common_vendor.p({
          direction: "col",
          color: "#B0BECC",
          length: "24rpx",
          margin: "0 24rpx"
        }),
        D: common_vendor.f(100, (item, k0, i0) => {
          return {};
        }),
        E: common_vendor.p({
          color: "var(--red-color)",
          price: info.value.RealCarAmount
        }),
        F: common_vendor.t(info.value.EstimateCarAmount),
        G: common_vendor.t(info.value.OwnerEnt ? info.value.OwnerEnt.OwnerName : ""),
        H: common_vendor.t(info.value.AssignCode),
        I: common_vendor.t(info.value.CreatorTime ? common_vendor.unref(common_vendor.dayjs)(info.value.CreatorTime).format("YYYY-MM-DD HH:mm:ss") : ""),
        J: info.value.StartTime
      }, info.value.StartTime ? {
        K: common_vendor.t(info.value.StartTime),
        L: !info.value.EndTime ? 1 : ""
      } : {}, {
        M: info.value.EndTime
      }, info.value.EndTime ? {
        N: common_vendor.t(info.value.EndTime)
      } : {}, {
        O: common_vendor.t(info.value.CarType),
        P: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        }),
        Q: !!info.value.Memo
      }, !!info.value.Memo ? {
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
        S: info.value.OrderId
      }, info.value.OrderId ? {
        T: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        })
      } : {}, {
        U: !!info.value.RelOnwayCount
      }, !!info.value.RelOnwayCount ? {
        V: common_vendor.t(info.value.RelOnwayCount),
        W: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        })
      } : {}, {
        X: common_vendor.p({
          text: "完结货单",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            color: "var(--sub-color)",
            fontWeight: "bold"
          }
        }),
        Y: common_vendor.p({
          text: "继续派单",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            fontWeight: "bold"
          }
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/manifestDetail/manifestDetail.vue"]]);
wx.createPage(MiniProgramPage);
