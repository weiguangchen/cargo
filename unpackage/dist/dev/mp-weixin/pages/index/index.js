"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_authorize = require("../../utils/authorize.js");
const stores_app = require("../../stores/app.js");
const utils_token = require("../../utils/token.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_status_bar2 = common_vendor.resolveComponent("uv-status-bar");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_login_drawer2 = common_vendor.resolveComponent("my-login-drawer");
  const _easycom_my_tabbar2 = common_vendor.resolveComponent("my-tabbar");
  (_easycom_uv_status_bar2 + _easycom_uv_image2 + _easycom_uv_button2 + _easycom_my_login_drawer2 + _easycom_my_tabbar2)();
}
const _easycom_uv_status_bar = () => "../../uni_modules/uv-status-bar/components/uv-status-bar/uv-status-bar.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_login_drawer = () => "../../components/my-login-drawer/my-login-drawer.js";
const _easycom_my_tabbar = () => "../../components/my-tabbar/my-tabbar.js";
if (!Math) {
  (_easycom_uv_status_bar + _easycom_uv_image + SelectCarType + _easycom_uv_button + _easycom_my_login_drawer + _easycom_my_tabbar)();
}
const SelectCarType = () => "../dispatchTask/components/SelectCarType.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const appStore = stores_app.useAppStore();
    common_vendor.onLoad(() => {
      appStore.switchTab(0);
    });
    common_vendor.onLoad(async () => {
      utils_authorize.getLocationInfo();
      if (!utils_token.getToken()) {
        return;
      }
      getCount();
    });
    const loginDrawer = common_vendor.ref();
    function openLoginDrawer() {
      loginDrawer.value.open();
    }
    function loginSuccess() {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
    const count = common_vendor.ref(0);
    async function getCount() {
      const res = await api_index.GetGoodsOrderCount();
      count.value = res;
    }
    const supply = common_vendor.ref(null);
    const unload = common_vendor.ref(null);
    function selectAddress(type) {
      if (!utils_token.getToken()) {
        openLoginDrawer();
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/selectAddress/selectAddress`,
        success(res) {
          res.eventChannel.emit("setData", {
            type,
            data: type === 1 ? supply.value : unload.value
          });
        },
        events: {
          confirm(res) {
            console.log("confirm", res);
            if (res.type === 1)
              supply.value = res.data;
            if (res.type === 2)
              unload.value = res.data;
          }
        }
      });
    }
    const carType = common_vendor.ref([]);
    function dispatch() {
      if (!utils_token.getToken()) {
        openLoginDrawer();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/dispatchTask/dispatchTask",
        success(res) {
          res.eventChannel.emit("setData", {
            carType: carType.value,
            supply: supply.value,
            unload: unload.value
          });
        }
      });
    }
    function toGuide() {
      common_vendor.index.navigateTo({
        url: "/pages/guide/guide"
      });
    }
    function follow() {
      const src = "https://mp.weixin.qq.com/s?__biz=MzkxOTcyODM5OA==&mid=2247483675&idx=1&sn=3f1378b5f85fe5ed6144eb9446f63a32&chksm=c19cf97af6eb706cee30883335ba2e11ab4ebd79c23dac68af13106c2b56e20eee02ddfe656c#rd";
      common_vendor.index.navigateTo({
        url: `/pages/webview/webview?src=${encodeURIComponent(src)}`
      });
    }
    function navigate(type) {
      if (!utils_token.getToken()) {
        openLoginDrawer();
        return;
      }
      switch (type) {
        case "数据统计":
          common_vendor.index.navigateTo({
            url: "/pages/statistics/statistics"
          });
          break;
        case "问题反馈":
          common_vendor.index.navigateTo({
            url: "/pages/feedback/feedback"
          });
          break;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: "/static/images/home/logo.png",
          width: "488rpx",
          height: "144rpx",
          duration: 0
        }),
        b: !common_vendor.unref(utils_token.getToken)()
      }, !common_vendor.unref(utils_token.getToken)() ? {
        c: common_vendor.p({
          src: "/static/images/dispatchTask/arrow2.png",
          width: "24rpx",
          height: "24rpx",
          duration: 0
        }),
        d: common_vendor.o(openLoginDrawer)
      } : count.value === 0 ? {} : {
        f: common_vendor.t(count.value),
        g: common_vendor.p({
          src: "/static/images/orange-arrow.png",
          width: "24rpx",
          height: "24rpx",
          duration: 0
        })
      }, {
        e: count.value === 0,
        h: supply.value
      }, supply.value ? {
        i: common_vendor.t(supply.value.Name)
      } : {}, {
        j: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        k: common_vendor.o(($event) => selectAddress(1)),
        l: unload.value
      }, unload.value ? {
        m: common_vendor.t(unload.value.Placename)
      } : {}, {
        n: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        o: common_vendor.o(($event) => selectAddress(2)),
        p: common_vendor.o(($event) => carType.value = $event),
        q: common_vendor.p({
          disabled: !common_vendor.unref(utils_token.getToken)(),
          modelValue: carType.value
        }),
        r: common_vendor.o(dispatch),
        s: common_vendor.p({
          text: "立即派单",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "104rpx",
            fontWeight: "bold",
            borderRadius: "16rpx",
            marginBottom: "24rpx"
          },
          customTextStyle: {
            fontSize: "32rpx"
          }
        }),
        t: common_vendor.p({
          src: "/static/images/home/scan.png",
          width: "80rpx",
          height: "80rpx",
          duration: 0,
          ["custom-style"]: {
            marginBottom: "14rpx"
          }
        }),
        v: common_vendor.p({
          src: "/static/images/home/statistics.png",
          width: "80rpx",
          height: "80rpx",
          duration: 0,
          ["custom-style"]: {
            marginBottom: "14rpx"
          }
        }),
        w: common_vendor.o(($event) => navigate("数据统计")),
        x: common_vendor.p({
          src: "/static/images/home/guide.png",
          width: "80rpx",
          height: "80rpx",
          duration: 0,
          ["custom-style"]: {
            marginBottom: "14rpx"
          }
        }),
        y: common_vendor.o(toGuide),
        z: common_vendor.p({
          src: "/static/images/home/feedback.png",
          width: "80rpx",
          height: "80rpx",
          duration: 0,
          ["custom-style"]: {
            marginBottom: "14rpx"
          }
        }),
        A: common_vendor.o(($event) => navigate("问题反馈")),
        B: common_vendor.p({
          width: "100%",
          height: "100%",
          duration: 0,
          src: "/static/images/home/banner.png"
        }),
        C: common_vendor.o(follow),
        D: common_vendor.sr(loginDrawer, "5be606db-13", {
          "k": "loginDrawer"
        }),
        E: common_vendor.o(loginSuccess)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
