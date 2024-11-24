"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_line2 + _easycom_uv_image2 + _easycom_uv_button2 + _easycom_my_drawer2)();
}
const _easycom_uv_line = () => "../../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_line + _easycom_uv_image + _easycom_uv_button + _easycom_my_drawer)();
}
const _sfc_main = {
  __name: "MapDrawer",
  setup(__props, { expose: __expose }) {
    const { ctx } = common_vendor.getCurrentInstance();
    const drawer = common_vendor.ref();
    const mapContext = common_vendor.ref();
    common_vendor.onMounted(() => {
      mapContext.value = common_vendor.index.createMapContext("map", ctx);
    });
    function openApp() {
      const { latitude, longitude, address } = location.value;
      mapContext.value.openMapApp({
        longitude,
        latitude,
        destination: address
      });
    }
    const location = common_vendor.ref({
      name: "",
      address: "",
      username: "",
      phone: "",
      type: "装货地",
      longitude: "",
      latitude: ""
    });
    function open(data) {
      location.value = data;
      drawer.value.popup.open();
    }
    const isOpen = common_vendor.ref(false);
    function drawerChange(event) {
      isOpen.value = event.show;
      if (event.show) {
        setTimeout(() => {
          const marker = {
            id: 1,
            longitude: location.value.longitude,
            latitude: location.value.latitude,
            iconPath: "/static/images/map-marker.png",
            width: "20rpx",
            height: "28rpx",
            customCallout: {
              display: "ALWAYS",
              anchorX: 0,
              anchorY: -16
            }
          };
          mapContext.value.addMarkers({
            markers: [marker],
            clear: true
          });
          mapContext.value.moveToLocation({
            longitude: location.value.longitude,
            latitude: location.value.latitude
          });
        }, 300);
      }
    }
    function takePhone() {
      if (!location.value.phone) {
        common_vendor.index.showToast({
          icon: "none",
          title: "暂无司机手机号"
        });
        return;
      }
      common_vendor.index.makePhoneCall({
        phoneNumber: location.value.phone
      });
    }
    __expose({
      open
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isOpen.value
      }, isOpen.value ? {} : {}, {
        b: common_vendor.t(location.value.type),
        c: location.value.type === "卸货地" ? 1 : "",
        d: location.value.type === "装货地" ? 1 : "",
        e: common_vendor.t(location.value.name),
        f: common_vendor.t(location.value.address),
        g: common_vendor.p({
          color: "#E3E9EF",
          margin: "28rpx 0 32rpx"
        }),
        h: location.value.username || location.value.phone
      }, location.value.username || location.value.phone ? common_vendor.e({
        i: location.value.username
      }, location.value.username ? {
        j: common_vendor.t(location.value.username)
      } : {}, {
        k: location.value.phone
      }, location.value.phone ? {
        l: common_vendor.t(location.value.phone)
      } : {}) : {}, {
        m: common_vendor.p({
          src: "/static/images/phone.png",
          width: "40rpx",
          height: "40rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "4rpx"
          }
        }),
        n: common_vendor.o(takePhone),
        o: common_vendor.p({
          color: "#E7F9E9",
          ["custom-style"]: {
            height: "96rpx",
            border: "1px solid var(--main-color)",
            borderRadius: "16rpx",
            color: "var(--main-color)"
          }
        }),
        p: common_vendor.p({
          src: "/static/images/white-location.png",
          width: "40rpx",
          height: "40rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "4rpx"
          }
        }),
        q: common_vendor.o(openApp),
        r: common_vendor.p({
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx"
          }
        }),
        s: common_vendor.sr(drawer, "a251a19b-0", {
          "k": "drawer"
        }),
        t: common_vendor.o(drawerChange),
        v: common_vendor.p({
          showTitle: false,
          bgColor: "#FFFFFF",
          round: "12px"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a251a19b"], ["__file", "/Users/wei/cargo/pages/billDetail/components/MapDrawer.vue"]]);
wx.createComponent(Component);
