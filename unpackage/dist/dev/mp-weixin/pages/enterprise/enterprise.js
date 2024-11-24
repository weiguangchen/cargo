"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_app = require("../../stores/app.js");
const utils_authorize = require("../../utils/authorize.js");
const utils_token = require("../../utils/token.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_search2 = common_vendor.resolveComponent("uv-search");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_drop_down_item2 = common_vendor.resolveComponent("uv-drop-down-item");
  const _easycom_uv_drop_down2 = common_vendor.resolveComponent("uv-drop-down");
  const _easycom_uv_drop_down_popup2 = common_vendor.resolveComponent("uv-drop-down-popup");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_login_drawer2 = common_vendor.resolveComponent("my-login-drawer");
  const _easycom_my_tabbar2 = common_vendor.resolveComponent("my-tabbar");
  (_easycom_uv_search2 + _easycom_uv_navbar2 + _easycom_uv_drop_down_item2 + _easycom_uv_drop_down2 + _easycom_uv_drop_down_popup2 + _easycom_my_empty2 + _easycom_uv_load_more2 + _easycom_my_login_drawer2 + _easycom_my_tabbar2)();
}
const _easycom_uv_search = () => "../../uni_modules/uv-search/components/uv-search/uv-search.js";
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_drop_down_item = () => "../../uni_modules/uv-drop-down/components/uv-drop-down-item/uv-drop-down-item.js";
const _easycom_uv_drop_down = () => "../../uni_modules/uv-drop-down/components/uv-drop-down/uv-drop-down.js";
const _easycom_uv_drop_down_popup = () => "../../uni_modules/uv-drop-down/components/uv-drop-down-popup/uv-drop-down-popup.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_login_drawer = () => "../../components/my-login-drawer/my-login-drawer.js";
const _easycom_my_tabbar = () => "../../components/my-tabbar/my-tabbar.js";
if (!Math) {
  (_easycom_uv_search + _easycom_uv_navbar + _easycom_uv_drop_down_item + _easycom_uv_drop_down + _easycom_uv_drop_down_popup + _easycom_my_empty + Item + _easycom_uv_load_more + _easycom_my_login_drawer + _easycom_my_tabbar)();
}
const Item = () => "./components/Item.js";
const _sfc_main = {
  __name: "enterprise",
  setup(__props) {
    const appStore = stores_app.useAppStore();
    common_vendor.onLoad(() => {
      appStore.switchTab(1);
    });
    const loginDrawer = common_vendor.ref();
    function openLoginDrawer() {
      loginDrawer.value.open();
    }
    function loginSuccess() {
      common_vendor.index.reLaunch({
        url: "/pages/enterprise/enterprise"
      });
    }
    common_vendor.onLoad(async () => {
      utils_authorize.getLocationInfo();
      if (!utils_token.getToken()) {
        return;
      }
      getList();
    });
    const keyword = common_vendor.ref("");
    const navbarPad = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      let menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      navbarPad.value = menuButtonInfo.width + 20;
    });
    const dropDownPopup = common_vendor.ref();
    const defaultValue = common_vendor.ref([0, "all", "0"]);
    const result = common_vendor.ref([]);
    const activeName = common_vendor.ref("order");
    const options = common_vendor.reactive({
      order: {
        label: "综合排序",
        value: "all",
        activeIndex: 0,
        child: [
          {
            label: "综合排序",
            value: "all"
          },
          {
            label: "距离最近",
            value: "new"
          }
        ]
      },
      type: {
        label: "全部签约状态",
        value: "all",
        activeIndex: 0,
        child: [
          {
            label: "全部签约状态",
            value: "all"
          },
          {
            label: "已签约",
            value: "pdf"
          },
          {
            label: "未签约",
            value: "word"
          }
        ]
      }
    });
    const dropItem = common_vendor.computed((name) => {
      return (name2) => {
        const res = {};
        const find = result.value.find((item) => item.name === name2);
        if (find) {
          res.label = find.label;
          res.value = find.value;
        } else {
          res.label = options[name2].label;
          res.value = options[name2].value;
        }
        return res;
      };
    });
    const currentDropItem = common_vendor.computed(() => options[activeName.value]);
    function change(e) {
      console.log("弹窗打开状态：", e);
    }
    function selectMenu(e) {
      console.log(e);
      const {
        name,
        active,
        type
      } = e;
      activeName.value = name;
      const find = result.value.find((item) => item.name == activeName.value);
      if (find) {
        const findIndex = options[activeName.value].child.findIndex(
          (item) => item.label == find.label && item.value == find.value
        );
        options[activeName.value].activeIndex = findIndex;
      } else {
        options[activeName.value].activeIndex = 0;
      }
    }
    function clickItem(e) {
      let {
        label,
        value
      } = e;
      const findIndex = result.value.findIndex(
        (item) => item.name == activeName.value
      );
      if (defaultValue.value.indexOf(value) > -1 && options[activeName.value].label) {
        label = options[activeName.value].label;
      }
      if (findIndex > -1) {
        result.value[findIndex] = {
          name: activeName.value,
          label,
          value
        };
      } else {
        result.value.push({
          name: activeName.value,
          label,
          value
        });
      }
      result.value = result.value.filter(
        (item) => defaultValue.value.indexOf(item.value) == -1
      );
      common_vendor.index.showModal({
        content: `筛选的值：${JSON.stringify(result.value)}`
      });
      dropDownPopup.value.close();
    }
    const status = common_vendor.ref("nomore");
    const list = common_vendor.ref([]);
    async function getList() {
      const res = await api_index.GetSupplierList();
      list.value = res;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => keyword.value = $event),
        b: common_vendor.p({
          placeholder: "搜索生产企业",
          showAction: false,
          modelValue: keyword.value
        }),
        c: `${navbarPad.value}px`,
        d: common_vendor.p({
          placeholder: true,
          ["left-icon"]: ""
        }),
        e: common_vendor.p({
          name: "order",
          type: "2",
          label: dropItem.value("order").label,
          value: dropItem.value("order").value
        }),
        f: common_vendor.p({
          name: "type",
          type: "2",
          label: dropItem.value("type").label,
          value: dropItem.value("type").value
        }),
        g: common_vendor.sr("dropDown", "14959c56-2"),
        h: common_vendor.o(selectMenu),
        i: common_vendor.p({
          sign: "dropDown_1",
          ["text-size"]: "26rpx",
          ["text-color"]: "var(--title-color)",
          ["text-active-size"]: "26rpx",
          ["text-active-color"]: "var(--main-color)",
          ["extra-icon"]: {
            name: "arrow-down-fill",
            color: "var(--title-color)",
            size: "16rpx"
          },
          ["extra-active-icon"]: {
            name: "arrow-up-fill",
            color: "var(--main-color)",
            size: "14rpx"
          },
          defaultValue: defaultValue.value
        }),
        j: common_vendor.f(currentDropItem.value.child, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: currentDropItem.value.activeIndex === index ? 1 : "",
            c: item.value,
            d: common_vendor.o(($event) => clickItem(item), item.value)
          };
        }),
        k: common_vendor.sr(dropDownPopup, "14959c56-5", {
          "k": "dropDownPopup"
        }),
        l: common_vendor.o(clickItem),
        m: common_vendor.o(change),
        n: common_vendor.p({
          sign: "dropDown_1",
          ["click-overlay-on-close"]: true,
          currentDropItem: currentDropItem.value
        }),
        o: !common_vendor.unref(utils_token.getToken)()
      }, !common_vendor.unref(utils_token.getToken)() ? {
        p: common_vendor.o(openLoginDrawer),
        q: common_vendor.p({
          height: "100%",
          showButton: true,
          text: "登录后查看生产企业"
        })
      } : {
        r: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.Id,
            b: "14959c56-7-" + i0,
            c: common_vendor.p({
              record: item
            })
          };
        }),
        s: common_vendor.p({
          status: status.value,
          color: "#B0BECC"
        })
      }, {
        t: common_vendor.sr(loginDrawer, "14959c56-9", {
          "k": "loginDrawer"
        }),
        v: common_vendor.o(loginSuccess)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/enterprise/enterprise.vue"]]);
wx.createPage(MiniProgramPage);
