"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_index = require("../../../utils/index.js");
const stores_location = require("../../../stores/location.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  _easycom_uv_image2();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
if (!Math) {
  _easycom_uv_image();
}
const _sfc_main = {
  __name: "Item",
  props: {
    record: {
      default: () => {
      },
      type: Object
    }
  },
  setup(__props) {
    const locationStore = stores_location.useLocationStore();
    const props = __props;
    const dis = common_vendor.computed(() => {
      console.log("dis", locationStore.location, props.record);
      if (!locationStore.location || !props.record.Latitude || !props.record.Logitude)
        return null;
      const distance = utils_index.gcj02Distance({
        lat1: props.record.Latitude,
        lon1: props.record.Logitude,
        lat2: locationStore.location.latitude,
        lon2: locationStore.location.longitude
      });
      console.log("distance", distance);
      return distance;
    });
    function toDetail() {
      common_vendor.index.navigateTo({
        url: `/pages/enterpriseDetail/enterpriseDetail`,
        success(res) {
          res.eventChannel.emit("setData", {
            supply: props.record
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          width: "100%",
          height: "100%",
          duration: 0,
          src: "/static/images/mfrs/avatar.png"
        }),
        b: common_vendor.t(__props.record.Name),
        c: common_vendor.t(__props.record.Signed === "1" ? "已签约" : "未签约"),
        d: __props.record.Signed === "1" ? 1 : "",
        e: common_vendor.t(__props.record.Province || ""),
        f: common_vendor.t(__props.record.City || ""),
        g: common_vendor.t(__props.record.Address || ""),
        h: dis.value
      }, dis.value ? {
        i: common_vendor.t(dis.value)
      } : {}, {
        j: common_vendor.o(toDetail)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e49e47cf"], ["__file", "/Users/wei/cargo/pages/enterprise/components/Item.vue"]]);
wx.createComponent(Component);
