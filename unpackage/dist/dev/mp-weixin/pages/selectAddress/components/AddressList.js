"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
const utils_index = require("../../../utils/index.js");
const stores_location = require("../../../stores/location.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  (_easycom_uv_image2 + _easycom_uv_load_more2 + _easycom_my_empty2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_load_more = () => "../../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_empty = () => "../../../components/my-empty/my-empty.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_load_more + _easycom_my_empty)();
}
const _sfc_main = {
  __name: "AddressList",
  props: {
    type: {
      default: 1
    }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const locationStore = stores_location.useLocationStore();
    const props = __props;
    const emits = __emit;
    common_vendor.watchEffect(() => {
      if (props.type === 1) {
        getSupply();
      }
      if (props.type === 2) {
        getUnload();
      }
    });
    const supplyList = common_vendor.ref([]);
    const unloadList = common_vendor.ref([]);
    async function getSupply() {
      const res = await api_index.GetSupplierList();
      supplyList.value = res;
    }
    async function getUnload() {
      const res = await api_index.GetOwnerUnloadPlace({
        useStatus: 1
      });
      unloadList.value = res.filter((m) => m.EnabledMark === "1");
    }
    function select(record) {
      emits("change", {
        type: props.type,
        data: record
      });
    }
    function getDis({
      latitude,
      longitude
    }) {
      if (!locationStore.location || !latitude || !longitude)
        return null;
      const distance = utils_index.gcj02Distance({
        lat1: latitude,
        lon1: longitude,
        lat2: locationStore.location.latitude,
        lon2: locationStore.location.longitude
      });
      return distance;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.type === 1 && supplyList.value.length > 0 || __props.type === 2 && unloadList.value.length > 0
      }, __props.type === 1 && supplyList.value.length > 0 || __props.type === 2 && unloadList.value.length > 0 ? common_vendor.e({
        b: __props.type === 1
      }, __props.type === 1 ? {
        c: common_vendor.f(supplyList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "886974dc-0-" + i0,
            b: common_vendor.t(item.Name),
            c: common_vendor.t(item.Province || ""),
            d: common_vendor.t(item.City || ""),
            e: common_vendor.t(item.Address || ""),
            f: getDis({
              latitude: item.Latitude,
              longitude: item.Logitude
            })
          }, getDis({
            latitude: item.Latitude,
            longitude: item.Logitude
          }) ? {
            g: common_vendor.t(getDis({
              latitude: item.Latitude,
              longitude: item.Logitude
            }))
          } : {}, {
            h: index < supplyList.value.length - 1 ? 1 : "",
            i: item.Id,
            j: common_vendor.o(($event) => select(item), item.Id)
          });
        }),
        d: common_vendor.p({
          src: "/static/images/location.png",
          width: "32rpx",
          height: "32rpx",
          duration: 0
        })
      } : {}, {
        e: __props.type === 2
      }, __props.type === 2 ? {
        f: common_vendor.f(unloadList.value, (item, index, i0) => {
          return common_vendor.e({
            a: "886974dc-1-" + i0,
            b: common_vendor.t(item.Placename),
            c: common_vendor.t(item.Province || ""),
            d: common_vendor.t(item.City || ""),
            e: common_vendor.t(item.District || ""),
            f: common_vendor.t(item.Address || ""),
            g: getDis({
              latitude: item.Latitude,
              longitude: item.Logitude
            })
          }, getDis({
            latitude: item.Latitude,
            longitude: item.Logitude
          }) ? {
            h: common_vendor.t(getDis({
              latitude: item.Latitude,
              longitude: item.Logitude
            }))
          } : {}, {
            i: index < unloadList.value.length - 1 ? 1 : "",
            j: item.Id,
            k: common_vendor.o(($event) => select(item), item.Id)
          });
        }),
        g: common_vendor.p({
          src: "/static/images/location.png",
          width: "32rpx",
          height: "32rpx",
          duration: 0
        })
      } : {}, {
        h: common_vendor.p({
          status: "nomore",
          color: "#B0BECC",
          ["line-color"]: "#B0BECC"
        })
      }) : {
        i: common_vendor.p({
          text: __props.type === "1" ? "暂无装货地" : "暂无卸货地"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-886974dc"], ["__file", "/Users/wei/cargo/pages/selectAddress/components/AddressList.vue"]]);
wx.createComponent(Component);
