"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _component_uv = common_vendor.resolveComponent("uv");
  (_easycom_uv_line2 + _easycom_uv_button2 + _component_uv)();
}
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_line + _easycom_uv_button + AddressList)();
}
const AddressList = () => "./components/AddressList.js";
const _sfc_main = {
  __name: "selectAddress",
  setup(__props) {
    const { ctx } = common_vendor.getCurrentInstance();
    const mapContext = common_vendor.ref();
    common_vendor.onMounted(() => {
      mapContext.value = common_vendor.index.createMapContext("map", ctx);
    });
    const type = common_vendor.ref(1);
    const data = common_vendor.ref();
    const eventChannel = common_vendor.ref();
    common_vendor.onLoad((options) => {
      const instance = common_vendor.getCurrentInstance().proxy;
      const channel = instance.getOpenerEventChannel();
      eventChannel.value = channel;
      channel.on("setData", async (res) => {
        console.log("setData", res);
        type.value = res.type;
        data.value = res.data;
        translateY.value = res.data ? "100%" : 0;
        if (!res.data)
          return;
        await common_vendor.nextTick$1();
        setLocation({
          longitude: res.data.Logitude,
          latitude: res.data.Latitude
        });
      });
    });
    const translateY = common_vendor.ref("100%");
    function openList() {
      translateY.value = 0;
    }
    function changeAddress(res) {
      console.log("changeAddress", res);
      data.value = res.data;
      type.value = res.type;
      translateY.value = "100%";
      setLocation({
        longitude: res.data.Logitude,
        latitude: res.data.Latitude
      });
    }
    const markers = common_vendor.ref([]);
    function setLocation(data2) {
      const { longitude, latitude } = data2;
      console.log("setLocation", longitude, latitude, mapContext.value);
      if (longitude && latitude) {
        const marker = {
          id: 123,
          longitude,
          latitude,
          iconPath: "/static/images/map-marker.png",
          width: "30rpx",
          height: "42rpx",
          customCallout: {
            display: "ALWAYS",
            anchorX: 0,
            anchorY: -12
          }
        };
        markers.value = [marker];
        mapContext.value.moveToLocation({
          longitude,
          latitude
        });
      }
    }
    function submit() {
      eventChannel.value.emit("confirm", {
        type: type.value,
        data: data.value
      });
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(type.value === 1 ? "装货" : "卸货"),
        b: markers.value,
        c: type.value === 1 && data.value
      }, type.value === 1 && data.value ? {
        d: common_vendor.t(data.value.Name),
        e: common_vendor.t(data.value.Province || ""),
        f: common_vendor.t(data.value.City || ""),
        g: common_vendor.t(data.value.Address || ""),
        h: common_vendor.p({
          color: "#E3E9EF",
          margin: "28rpx 0 32rpx"
        }),
        i: common_vendor.t(data.value.Linker),
        j: common_vendor.t(data.value.LinkerMobile)
      } : {}, {
        k: type.value === 2 && data.value
      }, type.value === 2 && data.value ? {
        l: common_vendor.t(data.value.Placename),
        m: common_vendor.t(data.value.Province || ""),
        n: common_vendor.t(data.value.City || ""),
        o: common_vendor.t(data.value.District || ""),
        p: common_vendor.t(data.value.Address || ""),
        q: common_vendor.p({
          color: "#E3E9EF",
          margin: "28rpx 0 32rpx"
        }),
        r: common_vendor.t(data.value.Nickname),
        s: common_vendor.t(data.value.Mobile)
      } : {}, {
        t: common_vendor.o(openList),
        v: common_vendor.p({
          text: "更改地址",
          color: "var(--page-bg)",
          ["custom-style"]: {
            color: "var(--sub-color)",
            borderRadius: "16rpx"
          }
        }),
        w: common_vendor.o(submit),
        x: common_vendor.p({
          text: "确认所选",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            borderRadius: "16rpx"
          }
        }),
        y: common_vendor.o(changeAddress),
        z: common_vendor.p({
          type: type.value
        }),
        A: `translateY(${translateY.value})`
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/selectAddress/selectAddress.vue"]]);
wx.createPage(MiniProgramPage);
