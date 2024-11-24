"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_index = require("../../utils/index.js");
const stores_location = require("../../stores/location.js");
const utils_authorize = require("../../utils/authorize.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_sticky2 = common_vendor.resolveComponent("uv-sticky");
  const _easycom_my_price2 = common_vendor.resolveComponent("my-price");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_navbar2 + _easycom_uv_image2 + _easycom_uv_sticky2 + _easycom_my_price2 + _easycom_my_drawer2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_sticky = () => "../../uni_modules/uv-sticky/components/uv-sticky/uv-sticky.js";
const _easycom_my_price = () => "../../components/my-price/my-price.js";
const _easycom_my_drawer = () => "../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_image + _easycom_uv_sticky + _easycom_my_price + _easycom_my_drawer)();
}
const _sfc_main = {
  __name: "enterpriseDetail",
  setup(__props) {
    const locationStore = stores_location.useLocationStore();
    const {
      ctx
    } = common_vendor.getCurrentInstance();
    const dis = common_vendor.computed(() => {
      if (!locationStore.location || !supply.value.Latitude || !supply.value.Logitude)
        return null;
      const distance = utils_index.gcj02Distance({
        lat1: supply.value.Latitude,
        lon1: supply.value.Logitude,
        lat2: locationStore.location.latitude,
        lon2: locationStore.location.longitude
      });
      return distance;
    });
    const supply = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      utils_authorize.getLocationInfo();
      const instance = common_vendor.getCurrentInstance().proxy;
      const eventChannel = instance.getOpenerEventChannel();
      eventChannel.on("setData", (data) => {
        console.log("setData", data);
        supply.value = (data == null ? void 0 : data.supply) ?? {};
        if (data.supply) {
          getMaterialList();
        }
      });
    });
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const show = common_vendor.ref(false);
    const noticeDrawer = common_vendor.ref();
    function openNotice() {
      noticeDrawer.value.popup.open();
    }
    const cateTop = common_vendor.ref(1);
    const customNavHeight = common_vendor.ref(64);
    common_vendor.onReady(async () => {
      let info = await ctx.$uv.getRect(".categorys-list");
      cateTop.value = info.top;
      const statusBarHeight = ctx.$uv.sys().statusBarHeight;
      customNavHeight.value = statusBarHeight + 44;
    });
    const scrollTop = common_vendor.ref(1);
    common_vendor.onPageScroll((e) => {
      scrollTop.value = e.scrollTop;
    });
    const ratio = common_vendor.computed(() => {
      const r = common_vendor.unref(scrollTop) / common_vendor.unref(cateTop);
      return r >= 1 ? 1 : r;
    });
    const navbarPad = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      navbarPad.value = menuButtonInfo.width + 20;
    });
    const active = common_vendor.ref(0);
    const intoView = common_vendor.computed(() => `category-${active.value}`);
    const list = common_vendor.ref([]);
    const listInit = common_vendor.ref(false);
    async function getMaterialList() {
      listInit.value = false;
      const res = await api_index.GetSupplyMaterialByOwner({
        supplyId: supply.value.Id
      });
      list.value = res;
      listInit.value = true;
      await common_vendor.nextTick$1();
      getRect();
    }
    async function getRect() {
      let info = await ctx.$uv.getRect(".category-item", true);
      info.forEach((m, i) => {
        common_vendor.unref(list)[i].bottom = m.bottom - common_vendor.unref(customNavHeight) - 44;
        common_vendor.unref(list)[i].top = m.top - common_vendor.unref(customNavHeight) - 44;
      });
    }
    function chooseCate(item, index) {
      common_vendor.index.pageScrollTo({
        scrollTop: item.top
      });
    }
    common_vendor.watchEffect(() => {
      if (!listInit.value)
        return;
      const index = common_vendor.unref(list).findIndex((m) => common_vendor.unref(scrollTop) < m.bottom);
      active.value = index;
    });
    function takePhone() {
      if (!supply.value.LinkerMobile) {
        common_vendor.index.showToast({
          title: "暂无联系人电话",
          icon: "none"
        });
        return;
      }
      common_vendor.index.makePhoneCall({
        phoneNumber: supply.value.LinkerMobile
      });
    }
    function openMapApp() {
      if (!supply.value.Latitude || supply.value.Latitude === 0 || !supply.value.Logitude || supply.value.Logitude === 0) {
        common_vendor.index.showToast({
          title: "暂无定位",
          icon: "none"
        });
        return;
      }
      common_vendor.index.openLocation({
        longitude: supply.value.Logitude,
        latitude: supply.value.Latitude,
        name: supply.value.Name
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (show.value ? "hidden" : "visible"),
        b: common_vendor.o(leftClick),
        c: common_vendor.p({
          title: supply.value.Name,
          bgColor: `rgba(255,255,255,${ratio.value})`,
          titleStyle: {
            color: `rgba(26, 27, 28, ${ratio.value})`,
            paddingRight: `${navbarPad.value}px`,
            fontWeight: 500
          }
        }),
        d: common_vendor.t(supply.value.Name),
        e: common_vendor.t(supply.value.Signed === "1" ? "已签约" : "未签约"),
        f: supply.value.Balance
      }, supply.value.Balance ? {
        g: common_vendor.t(supply.value.Balance)
      } : {}, {
        h: supply.value.Notice
      }, supply.value.Notice ? {
        i: common_vendor.p({
          src: "/static/images/enterpriseDetail/notice.png",
          width: "72rpx",
          height: "40rpx"
        }),
        j: common_vendor.t(supply.value.Notice),
        k: common_vendor.p({
          src: "/static/images/enterpriseDetail/arrow.png",
          width: "32rpx",
          height: "32rpx"
        }),
        l: common_vendor.o(openNotice)
      } : {}, {
        m: dis.value
      }, dis.value ? {
        n: common_vendor.t(dis.value)
      } : {}, {
        o: common_vendor.t(supply.value.Province || ""),
        p: common_vendor.t(supply.value.City || ""),
        q: common_vendor.t(supply.value.Address || ""),
        r: common_vendor.p({
          src: "/static/images/enterpriseDetail/phone.png",
          width: "48rpx",
          height: "48rpx"
        }),
        s: common_vendor.o(takePhone),
        t: common_vendor.p({
          src: "/static/images/enterpriseDetail/location.png",
          width: "48rpx",
          height: "48rpx"
        }),
        v: common_vendor.o(openMapApp),
        w: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.typeName),
            b: active.value === index ? 1 : "",
            c: `category-${index}`,
            d: common_vendor.o(($event) => chooseCate(item))
          };
        }),
        x: intoView.value,
        y: common_vendor.p({
          index: "cate",
          customNavHeight: common_vendor.unref(ctx).$uv.addUnit(customNavHeight.value)
        }),
        z: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.typeName),
            b: common_vendor.f(item.materialList, (cate, j, i1) => {
              return {
                a: "5aa14b16-7-" + i0 + "-" + i1 + "," + ("5aa14b16-6-" + i0 + "-" + i1),
                b: "5aa14b16-6-" + i0 + "-" + i1,
                c: common_vendor.p({
                  width: "100%",
                  height: "100%",
                  duration: 0,
                  src: cate.Image,
                  mode: "aspectFit"
                }),
                d: common_vendor.t(cate.MaterialName),
                e: "5aa14b16-8-" + i0 + "-" + i1,
                f: common_vendor.t(cate.TaxPrice),
                g: j < item.materialList.length - 1 ? 1 : "",
                h: cate.MaterialId
              };
            }),
            c: item.typeId
          };
        }),
        A: common_vendor.p({
          width: "100%",
          height: "100%",
          duration: 0,
          src: "/static/images/mfrs/mat.png",
          mode: "aspectFit"
        }),
        B: common_vendor.p({
          color: "var(--red-color)",
          unit: "吨"
        }),
        C: common_vendor.t(supply.value.Notice),
        D: common_vendor.sr(noticeDrawer, "5aa14b16-9", {
          "k": "noticeDrawer"
        }),
        E: common_vendor.o((e) => show.value = e.show),
        F: common_vendor.p({
          title: "生产企业公告",
          closeable: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/enterpriseDetail/enterpriseDetail.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
