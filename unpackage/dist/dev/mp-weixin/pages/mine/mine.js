"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_app = require("../../stores/app.js");
const utils_token = require("../../utils/token.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_my_login_drawer2 = common_vendor.resolveComponent("my-login-drawer");
  const _easycom_my_tabbar2 = common_vendor.resolveComponent("my-tabbar");
  (_easycom_uv_navbar2 + _easycom_uv_image2 + _easycom_my_login_drawer2 + _easycom_my_tabbar2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_my_login_drawer = () => "../../components/my-login-drawer/my-login-drawer.js";
const _easycom_my_tabbar = () => "../../components/my-tabbar/my-tabbar.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_image + _easycom_my_login_drawer + QrcodeModal + _easycom_my_tabbar)();
}
const QrcodeModal = () => "./components/qrcodeModal.js";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const appStore = stores_app.useAppStore();
    common_vendor.onLoad(() => {
      appStore.switchTab(3);
    });
    function navigate(type) {
      if (!utils_token.getToken()) {
        openLoginDrawer();
        return;
      }
      switch (type) {
        case "车辆管理":
          common_vendor.index.navigateTo({
            url: "/pages/carList/carList"
          });
          break;
        case "数据统计":
          common_vendor.index.navigateTo({
            url: "/mine/statistics/statistics"
          });
          break;
        case "我的账户":
          common_vendor.index.navigateTo({
            url: "/mine/account/account"
          });
          break;
        case "卸货地址":
          common_vendor.index.navigateTo({
            url: "/pages/addressList/addressList"
          });
          break;
        case "司机黑名单":
          common_vendor.index.navigateTo({
            url: "/mine/forbidden/forbidden"
          });
          break;
        case "成员管理":
          common_vendor.index.navigateTo({
            url: "/mine/member/member"
          });
          break;
        case "我的订单":
          common_vendor.index.navigateTo({
            url: "/pages/orderList/orderList"
          });
          break;
        case "我的货单":
          common_vendor.index.navigateTo({
            url: "/pages/manifestList/manifestList"
          });
          break;
        case "我的运单":
          common_vendor.index.navigateTo({
            url: "/pages/waybill/waybill"
          });
          break;
        case "问题反馈":
          common_vendor.index.navigateTo({
            url: "/pages/feedback/feedback"
          });
          break;
        case "设置":
          common_vendor.index.navigateTo({
            url: "/mine/setting/setting"
          });
          break;
        case "操作指南":
          common_vendor.index.navigateTo({
            url: "/pages/guide/guide"
          });
          break;
      }
    }
    function openScan() {
      if (!utils_token.getToken()) {
        openLoginDrawer();
        return;
      }
      common_vendor.index.scanCode({
        onlyFromCamera: false,
        scanType: ["qrCode"]
      });
    }
    const qrcode = common_vendor.ref();
    function openQrcode() {
      if (!utils_token.getToken()) {
        openLoginDrawer();
        return;
      }
      qrcode.value.open();
    }
    function follow() {
      const src = "https://mp.weixin.qq.com/s?__biz=MzkxOTcyODM5OA==&mid=2247483675&idx=1&sn=3f1378b5f85fe5ed6144eb9446f63a32&chksm=c19cf97af6eb706cee30883335ba2e11ab4ebd79c23dac68af13106c2b56e20eee02ddfe656c#rd";
      common_vendor.index.navigateTo({
        url: `/pages/webview/webview?src=${encodeURIComponent(src)}`
      });
    }
    const loginDrawer = common_vendor.ref();
    function openLoginDrawer() {
      loginDrawer.value.open();
    }
    function loginSuccess() {
      common_vendor.index.reLaunch({
        url: "/pages/mine/mine"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["left-icon"]: "",
          placeholder: true,
          ["bg-color"]: "transparent"
        }),
        b: common_vendor.p({
          src: common_vendor.unref(utils_token.getToken)() ? "/static/images/mine/avatar.png" : "/static/images/mine/no-avatar.png",
          width: "100%",
          height: "100%",
          duration: 0
        }),
        c: common_vendor.unref(utils_token.getToken)()
      }, common_vendor.unref(utils_token.getToken)() ? {
        d: common_vendor.t(common_vendor.unref(utils_token.getToken)().userInfo.Nickname || "暂无昵称"),
        e: common_vendor.t(common_vendor.unref(utils_token.getToken)().userInfo.Mobile || "")
      } : {
        f: common_vendor.p({
          src: "/static/images/arrow3.png",
          duration: 0,
          width: "32rpx",
          height: "32rpx",
          ["custom-style"]: {
            flex: "none"
          }
        }),
        g: common_vendor.o(openLoginDrawer)
      }, {
        h: common_vendor.p({
          src: "/static/images/mine/scan.png",
          width: "56rpx",
          height: "56rpx",
          duration: 0
        }),
        i: common_vendor.o(openScan),
        j: common_vendor.p({
          src: "/static/images/mine/qrcode.png",
          width: "56rpx",
          height: "56rpx",
          duration: 0
        }),
        k: common_vendor.o(openQrcode),
        l: common_vendor.p({
          src: "/static/images/mine/carList.png",
          width: "164rpx",
          height: "100%",
          duration: 0
        }),
        m: common_vendor.o(($event) => navigate("车辆管理")),
        n: common_vendor.p({
          src: "/static/images/mine/stat.png",
          width: "164rpx",
          height: "100%",
          duration: 0
        }),
        o: common_vendor.o(($event) => navigate("数据统计")),
        p: common_vendor.p({
          src: "/static/images/mine/account.png",
          width: "80rpx",
          height: "80rpx",
          ["custom-style"]: {
            marginBottom: "16rpx"
          }
        }),
        q: common_vendor.o(($event) => navigate("我的账户")),
        r: common_vendor.p({
          src: "/static/images/mine/orderList.png",
          width: "80rpx",
          height: "80rpx",
          ["custom-style"]: {
            marginBottom: "16rpx"
          }
        }),
        s: common_vendor.o(($event) => navigate("我的订单")),
        t: common_vendor.p({
          src: "/static/images/mine/manifestList.png",
          width: "80rpx",
          height: "80rpx",
          ["custom-style"]: {
            marginBottom: "16rpx"
          }
        }),
        v: common_vendor.o(($event) => navigate("我的货单")),
        w: common_vendor.p({
          src: "/static/images/mine/waybill.png",
          width: "80rpx",
          height: "80rpx",
          ["custom-style"]: {
            marginBottom: "16rpx"
          }
        }),
        x: common_vendor.o(($event) => navigate("我的运单")),
        y: common_vendor.p({
          width: "100%",
          height: "100%",
          duration: 0,
          src: "/static/images/home/banner.png"
        }),
        z: common_vendor.o(follow),
        A: common_vendor.p({
          src: "/static/images/mine/address.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        B: common_vendor.o(($event) => navigate("卸货地址")),
        C: common_vendor.p({
          src: "/static/images/mine/forbidden.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        D: common_vendor.o(($event) => navigate("司机黑名单")),
        E: common_vendor.p({
          src: "/static/images/mine/member.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        F: common_vendor.o(($event) => navigate("成员管理")),
        G: common_vendor.p({
          src: "/static/images/mine/wechat.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        H: common_vendor.p({
          src: "/static/images/mine/service.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        I: common_vendor.p({
          src: "/static/images/mine/guide.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        J: common_vendor.o(($event) => navigate("操作指南")),
        K: common_vendor.p({
          src: "/static/images/mine/feedback.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        L: common_vendor.o(($event) => navigate("问题反馈")),
        M: common_vendor.p({
          src: "/static/images/mine/setting.png",
          width: "56rpx",
          height: "56rpx",
          ["custom-style"]: {
            marginBottom: "4rpx"
          },
          duration: 0
        }),
        N: common_vendor.o(($event) => navigate("设置")),
        O: common_vendor.sr(loginDrawer, "a2ea8ed6-20", {
          "k": "loginDrawer"
        }),
        P: common_vendor.o(loginSuccess),
        Q: common_vendor.sr(qrcode, "a2ea8ed6-21", {
          "k": "qrcode"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
