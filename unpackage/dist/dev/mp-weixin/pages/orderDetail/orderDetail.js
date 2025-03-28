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
  __name: "orderDetail",
  setup(__props) {
    const orderId = common_vendor.ref("");
    const supplyId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      orderId.value = (options == null ? void 0 : options.orderId) ?? "";
      supplyId.value = (options == null ? void 0 : options.supplyId) ?? "";
      getInfo();
    });
    const info = common_vendor.ref({});
    async function getInfo() {
      try {
        const res = await api_index.GetOrderDetail({
          orderId: orderId.value,
          supplyId: supplyId.value
        });
        info.value = res;
      } catch {
      }
    }
    const statusName = common_vendor.computed(() => {
      const map = {
        1: "订单审核中",
        2: "将于 23 天后生效",
        3: "订单生效中",
        4: "订单已失效",
        5: "审核未通过"
      };
      return map[info.value.Status];
    });
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    function takePhone() {
      common_vendor.index.makePhoneCall({
        phoneNumber: "13608765432"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(leftClick),
        b: common_vendor.p({
          placeholder: true,
          bgColor: "rgba(255,255,255,0)"
        }),
        c: common_vendor.t(statusName.value),
        d: common_vendor.p({
          name: "arrow-right",
          size: "28rpx",
          color: "var(--title-color)",
          ["custom-style"]: {
            marginLeft: "4rpx"
          },
          bold: true
        }),
        e: info.value.Owner
      }, info.value.Owner ? {
        f: common_vendor.t(info.value.Owner.Ownername),
        g: common_vendor.t(info.value.Owner.Linker),
        h: common_vendor.t(info.value.Owner.Mobile),
        i: common_vendor.o(takePhone),
        j: common_vendor.p({
          src: "/static/images/phone-icon.png",
          width: "88rpx",
          height: "88rpx",
          duration: 0,
          ["custom-style"]: {
            marginLeft: "12rpx"
          }
        })
      } : {}, {
        k: info.value.MaterialsList && info.value.MaterialsList.length > 0
      }, info.value.MaterialsList && info.value.MaterialsList.length > 0 ? {
        l: common_vendor.f(info.value.MaterialsList, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.SSMaterialName),
            b: item.LeftWeight
          }, item.LeftWeight ? {
            c: common_vendor.t(item.LeftWeight),
            d: "0152a816-3-" + i0,
            e: common_vendor.p({
              direction: "col",
              length: "14",
              margin: "0 18rpx",
              color: "#C8D4DF"
            }),
            f: common_vendor.t(item.EstimiteWeight)
          } : {}, {
            g: "0152a816-4-" + i0,
            h: common_vendor.p({
              price: item.TaxPrice,
              unit: "吨",
              color: "var(--red-color)",
              unitColor: "var(--content-color)"
            }),
            i: index < info.value.MaterialsList.length - 1 ? 1 : "",
            j: item.SSMaterialId
          });
        })
      } : {}, {
        m: common_vendor.t(info.value.Owner ? info.value.Owner.Ownername : ""),
        n: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        }),
        o: common_vendor.p({
          src: "/static/images/arrow.png",
          width: "18rpx",
          height: "18rpx",
          duration: 0,
          customStyle: {
            marginLeft: "2rpx"
          }
        }),
        p: common_vendor.p({
          text: "立即派单",
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/orderDetail/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);
