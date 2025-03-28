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
        d: supply.value
      }, supply.value ? {
        e: common_vendor.p({
          width: "100%",
          height: "100%",
          src: supply.value.Photo,
          mode: "aspectFill"
        })
      } : {}, {
        f: common_vendor.t(supply.value.Name),
        g: common_vendor.t(supply.value.Signed === "1" ? "已签约" : "未签约"),
        h: supply.value.Signed === "1" ? 1 : "",
        i: supply.value.Balance
      }, supply.value.Balance ? {
        j: common_vendor.t(supply.value.Balance)
      } : {}, {
        k: supply.value.Notice
      }, supply.value.Notice ? {
        l: common_vendor.p({
          src: "/static/images/enterpriseDetail/notice.png",
          width: "72rpx",
          height: "40rpx"
        }),
        m: common_vendor.t(supply.value.Notice),
        n: common_vendor.p({
          src: "/static/images/enterpriseDetail/arrow.png",
          width: "32rpx",
          height: "32rpx"
        }),
        o: common_vendor.o(openNotice)
      } : {}, {
        p: dis.value
      }, dis.value ? {
        q: common_vendor.t(dis.value)
      } : {}, {
        r: common_vendor.t(supply.value.Province || ""),
        s: common_vendor.t(supply.value.City || ""),
        t: common_vendor.t(supply.value.Address || ""),
        v: common_vendor.p({
          src: "/static/images/enterpriseDetail/phone.png",
          width: "48rpx",
          height: "48rpx"
        }),
        w: common_vendor.o(takePhone),
        x: common_vendor.p({
          src: "/static/images/enterpriseDetail/location.png",
          width: "48rpx",
          height: "48rpx"
        }),
        y: common_vendor.o(openMapApp),
        z: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.typeName),
            b: active.value === index ? 1 : "",
            c: `category-${index}`,
            d: common_vendor.o(($event) => chooseCate(item))
          };
        }),
        A: intoView.value,
        B: common_vendor.p({
          index: "cate",
          customNavHeight: common_vendor.unref(ctx).$uv.addUnit(customNavHeight.value)
        }),
        C: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.typeName),
            b: common_vendor.f(item.materialList, (cate, j, i1) => {
              return {
                a: "5aa14b16-7-" + i0 + "-" + i1,
                b: common_vendor.p({
                  width: "100%",
                  height: "100%",
                  duration: 0,
                  src: cate.Image,
                  mode: "aspectFill"
                }),
                c: common_vendor.t(cate.MaterialName),
                d: "5aa14b16-8-" + i0 + "-" + i1,
                e: common_vendor.p({
                  price: cate.TaxPrice,
                  color: "var(--red-color)",
                  unit: "吨"
                }),
                f: j < item.materialList.length - 1 ? 1 : "",
                g: cate.MaterialId
              };
            }),
            c: item.typeId
          };
        }),
        D: common_vendor.t(supply.value.Notice),
        E: common_vendor.sr(noticeDrawer, "5aa14b16-9", {
          "k": "noticeDrawer"
        }),
        F: common_vendor.o((e) => show.value = e.show),
        G: common_vendor.p({
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
