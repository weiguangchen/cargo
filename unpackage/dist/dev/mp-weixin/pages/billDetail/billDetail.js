"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_plate2 = common_vendor.resolveComponent("my-plate");
  (_easycom_uv_navbar2 + _easycom_uv_icon2 + _easycom_uv_image2 + _easycom_uv_button2 + _easycom_my_plate2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_plate = () => "../../components/my-plate/my-plate.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_icon + _easycom_uv_image + _easycom_uv_button + _easycom_my_plate + MapDrawer + StepDrawer)();
}
const MapDrawer = () => "./components/MapDrawer.js";
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
    function openMapModal() {
      if (detail.value.Supplier && detail.value.Supplier.Latitude && detail.value.Supplier.Logitude) {
        const { Province, City, Address, OrderLinker, OrderLinkerMobile } = detail.value.Supplier;
        mapModal.value.open({
          name: detail.value.Supplier.Name,
          address: `${Province || ""}${City || ""}${Address || ""}`,
          username: OrderLinker,
          phone: OrderLinkerMobile,
          type: "装货地",
          latitude: detail.value.Supplier.Latitude,
          longitude: detail.value.Supplier.Logitude
        });
      }
    }
    const stepModal = common_vendor.ref();
    function openStepModal() {
      stepModal.value.open();
    }
    function takePhone() {
      if (!detail.value.Drivermobile) {
        common_vendor.index.showToast({
          icon: "none",
          title: "暂无司机手机号"
        });
        return;
      }
      common_vendor.index.makePhoneCall({
        phoneNumber: detail.value.Drivermobile
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(leftClick),
        b: common_vendor.p({
          bgColor: "rgba(255,255,255,0)"
        }),
        c: placeholderHeight.value,
        d: detail.value.Weightedstatus === "1"
      }, detail.value.Weightedstatus === "1" ? {} : {}, {
        e: detail.value.Weightedstatus === "2"
      }, detail.value.Weightedstatus === "2" ? {} : {}, {
        f: detail.value.Weightedstatus === "3"
      }, detail.value.Weightedstatus === "3" ? {} : {}, {
        g: detail.value.Weightedstatus === "4"
      }, detail.value.Weightedstatus === "4" ? {} : {}, {
        h: detail.value.Weightedstatus === "5"
      }, detail.value.Weightedstatus === "5" ? {} : {}, {
        i: detail.value.Weightedstatus === "6"
      }, detail.value.Weightedstatus === "6" ? {} : {}, {
        j: detail.value.Weightedstatus === "7"
      }, detail.value.Weightedstatus === "7" ? {} : {}, {
        k: detail.value.Weightedstatus === "8"
      }, detail.value.Weightedstatus === "8" ? {} : {}, {
        l: detail.value.Weightedstatus === "9"
      }, detail.value.Weightedstatus === "9" ? {} : {}, {
        m: common_vendor.p({
          name: "arrow-right",
          size: "32rpx",
          color: "var(--title-color)",
          ["custom-style"]: {
            marginLeft: "8rpx"
          },
          bold: true
        }),
        n: detail.value.Weightedstatus === "2"
      }, detail.value.Weightedstatus === "2" ? {} : {}, {
        o: detail.value.Weightedstatus === "3"
      }, detail.value.Weightedstatus === "3" ? {} : {}, {
        p: detail.value.Weightedstatus === "6"
      }, detail.value.Weightedstatus === "6" ? {} : {}, {
        q: detail.value.Weightedstatus === "7"
      }, detail.value.Weightedstatus === "7" ? {} : {}, {
        r: common_vendor.o(openStepModal),
        s: detail.value.Supplier
      }, detail.value.Supplier ? common_vendor.e({
        t: common_vendor.t(detail.value.Supplier.Name || ""),
        v: !detail.value.Supplier.OrderLinker & !detail.value.Supplier.OrderLinkerMobile
      }, !detail.value.Supplier.OrderLinker & !detail.value.Supplier.OrderLinkerMobile ? {} : common_vendor.e({
        w: detail.value.Supplier.OrderLinker
      }, detail.value.Supplier.OrderLinker ? {
        x: common_vendor.t(detail.value.Supplier.OrderLinker || "")
      } : {}, {
        y: detail.value.Supplier.OrderLinkerMobile
      }, detail.value.Supplier.OrderLinkerMobile ? {
        z: common_vendor.t(detail.value.Supplier.OrderLinkerMobile || "")
      } : {}), {
        A: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        B: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        C: detail.value.UnloadPlace ? 1 : "",
        D: common_vendor.o(openMapModal)
      }) : {}, {
        E: detail.value.UnloadPlace
      }, detail.value.UnloadPlace ? {
        F: common_vendor.o((...args) => _ctx.selectAddress && _ctx.selectAddress(...args)),
        G: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        H: common_vendor.o(openMapModal)
      } : {}, {
        I: common_vendor.t(detail.value.Materialname || ""),
        J: ["1", "2", "3", "4", "5"].includes(detail.value.Weightedstatus)
      }, ["1", "2", "3", "4", "5"].includes(detail.value.Weightedstatus) ? {
        K: common_vendor.t(detail.value.TaxPrice)
      } : {}, {
        L: ["6"].includes(detail.value.Weightedstatus)
      }, ["6"].includes(detail.value.Weightedstatus) ? {} : {}, {
        M: ["7"].includes(detail.value.Weightedstatus)
      }, ["7"].includes(detail.value.Weightedstatus) ? {
        N: common_vendor.t(detail.value.Suttle || "")
      } : {}, {
        O: ["6", "7", "8"].includes(detail.value.Weightedstatus)
      }, ["6", "7", "8"].includes(detail.value.Weightedstatus) ? {
        P: common_vendor.t(detail.value.Billno),
        Q: common_vendor.p({
          shape: "circle",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "68rpx",
            color: "var(--main-color)",
            fontWeight: "bold"
          }
        })
      } : {}, {
        R: detail.value.Carno
      }, detail.value.Carno ? common_vendor.e({
        S: common_vendor.p({
          plate: detail.value.Carno
        }),
        T: detail.value.Cartype
      }, detail.value.Cartype ? {
        U: common_vendor.t(detail.value.Cartype)
      } : {}, {
        V: detail.value.Drivername || detail.value.Drivermobile
      }, detail.value.Drivername || detail.value.Drivermobile ? common_vendor.e({
        W: detail.value.Drivername
      }, detail.value.Drivername ? {
        X: common_vendor.t(detail.value.Drivername)
      } : {}, {
        Y: detail.value.Drivermobile
      }, detail.value.Drivermobile ? {
        Z: common_vendor.t(detail.value.Drivermobile)
      } : {}) : {}, {
        aa: detail.value.FirstWeight ? 1 : ""
      }) : {}, {
        ab: detail.value.FirstWeight
      }, detail.value.FirstWeight ? {
        ac: common_vendor.t(detail.value.FirstWeight),
        ad: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(detail.value.FirstTime).format("MM/DD HH:mm")),
        ae: detail.value.SecondWeight ? 1 : ""
      } : {}, {
        af: detail.value.SecondWeight
      }, detail.value.SecondWeight ? {
        ag: common_vendor.t(detail.value.SecondWeight),
        ah: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(detail.value.SecondTime).format("MM/DD HH:mm"))
      } : {}, {
        ai: detail.value.OwerName
      }, detail.value.OwerName ? {
        aj: common_vendor.t(detail.value.OwerName)
      } : {}, {
        ak: common_vendor.t(detail.value.OnwayNo),
        al: common_vendor.t(detail.value.Creatortime),
        am: common_vendor.p({
          text: "取消运单",
          color: "var(--page-bg)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            color: "var(--sub-color)"
          }
        }),
        an: common_vendor.o(takePhone),
        ao: common_vendor.p({
          text: "呼叫司机",
          color: " linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          }
        }),
        ap: common_vendor.sr(mapModal, "77326575-8", {
          "k": "mapModal"
        }),
        aq: common_vendor.sr(stepModal, "77326575-9", {
          "k": "stepModal"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/billDetail/billDetail.vue"]]);
wx.createPage(MiniProgramPage);
