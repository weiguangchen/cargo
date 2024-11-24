"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_my_empty2 = common_vendor.resolveComponent("my-empty");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_confirm2 = common_vendor.resolveComponent("my-confirm");
  (_easycom_uv_image2 + _easycom_uv_load_more2 + _easycom_my_empty2 + _easycom_uv_button2 + _easycom_my_confirm2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_my_empty = () => "../../components/my-empty/my-empty.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_confirm = () => "../../components/my-confirm/my-confirm.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_load_more + _easycom_my_empty + _easycom_uv_button + _easycom_my_confirm)();
}
const _sfc_main = {
  __name: "addressList",
  setup(__props) {
    common_vendor.onLoad(() => {
      getList();
      common_vendor.index.$on("addAddress", async (data) => {
        await utils_index.sleep(500);
        getList();
      });
    });
    common_vendor.onUnload(() => {
      common_vendor.index.$off("addAddress");
    });
    const list = common_vendor.ref([]);
    async function getList() {
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetOwnerUnloadPlace({
          useStatus: 1
        });
        list.value = res.filter((m) => m.EnabledMark === "1");
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    common_vendor.onPullDownRefresh(async () => {
      await getList();
      common_vendor.index.stopPullDownRefresh();
    });
    const confirm = common_vendor.ref();
    function remove(record) {
      confirm.value.confirm({
        title: "确定删除卸货地址？",
        content: "您的货单和运单记录不会被影响",
        // cancelText: '取消',
        confirmText: "删除",
        asyncClose: true,
        async confirm() {
          try {
            await api_index.DeleteUnloadPlace({
              unloadId: record.Id
            });
            common_vendor.index.showToast({
              title: "卸货地删除成功",
              icon: "none"
            });
            confirm.value.close();
            getList();
          } catch {
            confirm.value.closeLoading();
          }
        }
      });
    }
    function edit(record) {
      common_vendor.index.navigateTo({
        url: `/pages/addAddress/addAddress?unloadId=${record.Id}`
      });
    }
    function add() {
      common_vendor.index.navigateTo({
        url: "/pages/addAddress/addAddress"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: list.value.length > 0
      }, list.value.length > 0 ? {
        b: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: "c0dfe14a-0-" + i0,
            b: common_vendor.t(item.Placename),
            c: common_vendor.t(item.Province),
            d: common_vendor.t(item.City),
            e: common_vendor.t(item.Distinct),
            f: common_vendor.t(item.Address),
            g: common_vendor.t(item.Nickname),
            h: common_vendor.t(item.Mobile),
            i: "c0dfe14a-1-" + i0,
            j: common_vendor.o(($event) => remove(item), item.Id),
            k: "c0dfe14a-2-" + i0,
            l: common_vendor.o(($event) => edit(item), item.Id),
            m: item.Id
          };
        }),
        c: common_vendor.p({
          src: "/static/images/location.png",
          width: "32rpx",
          height: "32rpx",
          duration: 0
        }),
        d: common_vendor.p({
          src: "/static/images/remove.png",
          width: "32rpx",
          height: "32rpx",
          ["custom-style"]: {
            marginRight: "8rpx"
          },
          duration: 0
        }),
        e: common_vendor.p({
          src: "/static/images/edit.png",
          width: "32rpx",
          height: "32rpx",
          ["custom-style"]: {
            marginRight: "8rpx"
          },
          duration: 0
        }),
        f: common_vendor.p({
          status: "nomore",
          line: true,
          color: "#B0BECC"
        })
      } : {
        g: common_vendor.p({
          height: "400px",
          text: "暂无卸货地"
        })
      }, {
        h: common_vendor.o(add),
        i: common_vendor.p({
          text: "+ 添加卸货地址",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        }),
        j: common_vendor.sr(confirm, "c0dfe14a-6", {
          "k": "confirm"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/addressList/addressList.vue"]]);
wx.createPage(MiniProgramPage);
