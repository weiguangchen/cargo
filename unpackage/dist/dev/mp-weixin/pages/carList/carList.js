"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_checkbox2 = common_vendor.resolveComponent("uv-checkbox");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_checkbox_group2 = common_vendor.resolveComponent("uv-checkbox-group");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  const _easycom_my_confirm2 = common_vendor.resolveComponent("my-confirm");
  (_easycom_uv_checkbox2 + _easycom_uv_image2 + _easycom_uv_checkbox_group2 + _easycom_uv_load_more2 + _easycom_uv_button2 + _easycom_uv_form_item2 + _easycom_uv_form2 + _easycom_my_drawer2 + _easycom_my_confirm2)();
}
const _easycom_uv_checkbox = () => "../../uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_checkbox_group = () => "../../uni_modules/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_my_drawer = () => "../../components/my-drawer/my-drawer.js";
const _easycom_my_confirm = () => "../../components/my-confirm/my-confirm.js";
if (!Math) {
  (_easycom_uv_checkbox + _easycom_uv_image + _easycom_uv_checkbox_group + _easycom_uv_load_more + _easycom_uv_button + CarNumber + _easycom_uv_form_item + _easycom_uv_form + _easycom_my_drawer + _easycom_my_confirm)();
}
const CarNumber = () => "./components/CarNumber.js";
const _sfc_main = {
  __name: "carList",
  setup(__props) {
    const checkboxValue = common_vendor.ref([]);
    common_vendor.ref();
    const isEdit = common_vendor.ref(false);
    function edit() {
      if (isEdit.value) {
        checkboxValue.value = [];
      }
      isEdit.value = !isEdit.value;
    }
    common_vendor.ref();
    const confirm = common_vendor.ref();
    function remove(record) {
      confirm.value.confirm({
        title: "确定删除该车辆？",
        content: "您的运单记录不会被影响",
        cancelText: "取消",
        confirmText: "删除",
        asyncClose: true,
        async confirm() {
          try {
            await api_index.DelteUserCarno({
              ownerCarId: record.Id
            });
            common_vendor.index.showToast({
              title: "删除成功",
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
    function patchRemove() {
      console.log("checkboxValue", checkboxValue.value);
      if (checkboxValue.value.length === 0) {
        return;
      }
      confirm.value.confirm({
        title: "确定删除所选车辆？",
        content: "您的运单记录不会被影响",
        cancelText: "取消",
        confirmText: "删除",
        asyncClose: true,
        async confirm() {
          try {
            await api_index.DelteUserCarno({
              ownerCarId: checkboxValue.value.map((m) => m.Id).join(",")
            });
            common_vendor.index.showToast({
              title: "删除成功",
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
    const myCarNumber = common_vendor.ref();
    const form = common_vendor.ref(null);
    const model = common_vendor.reactive({
      number: ""
    });
    const rules = common_vendor.ref({
      number: {
        // type: 'string',
        validator: (rule, value, callback) => {
          if (!value)
            return false;
          const arr = value.split("");
          const isOk1 = arr.slice(0, 7).every((m) => m !== " ");
          const isOk2 = arr.slice(0, 8).every((m) => m !== " ");
          return isOk1 || isOk2;
        },
        message: "请填写正确的车牌号"
      }
    });
    function changeDrawer(show) {
      if (!show.show) {
        model.number = "";
      }
    }
    function addCar() {
      myCarNumber.value.popup.open();
    }
    async function submit() {
      const res = await form.value.validate();
      if (!res)
        return;
      try {
        common_vendor.index.showLoading({
          mask: true
        });
        const result = await api_index.CreateOwnerUserCarno({
          carno: model.number
        });
        myCarNumber.value.popup.close();
        getList();
      } catch (err) {
        common_vendor.index.showToast({
          title: err.data,
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    common_vendor.onLoad(() => {
      getList();
    });
    const list = common_vendor.ref([]);
    common_vendor.onPullDownRefresh(async () => {
      await getList();
      common_vendor.index.stopPullDownRefresh();
    });
    async function getList() {
      try {
        common_vendor.index.showLoading();
        const res = await api_index.GetOwnerCarMgr();
        console.log("res", res);
        list.value = res;
      } finally {
        common_vendor.index.hideLoading();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(list.value.length),
        b: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e(isEdit.value ? {
            a: "c2a962ca-1-" + i0 + ",c2a962ca-0",
            b: common_vendor.p({
              customStyle: {
                marginRight: "6px"
              },
              name: item
            })
          } : {
            c: common_vendor.t(item.Carno)
          }, {
            d: "c2a962ca-2-" + i0 + ",c2a962ca-0",
            e: common_vendor.o(($event) => remove(item), item.Id),
            f: index < list.value.length - 1 ? 1 : "",
            g: item.Id
          });
        }),
        c: isEdit.value,
        d: common_vendor.p({
          duration: 0,
          src: "/static/images/remove.png",
          width: "32rpx",
          height: "32rpx",
          ["custom-style"]: {
            marginRight: "8rpx"
          }
        }),
        e: common_vendor.o(($event) => checkboxValue.value = $event),
        f: common_vendor.p({
          shape: "circle",
          activeColor: "var(--red-color)",
          icon: "32rpx",
          modelValue: checkboxValue.value
        }),
        g: common_vendor.p({
          status: "nomore",
          color: "#B0BECC"
        }),
        h: common_vendor.o(edit),
        i: common_vendor.p({
          text: isEdit.value ? "完成" : "管理",
          color: "var(--page-bg)",
          customTextStyle: {
            color: "var(--content-color)"
          }
        }),
        j: isEdit.value
      }, isEdit.value ? {
        k: common_vendor.o(patchRemove),
        l: common_vendor.p({
          text: "删除所选",
          color: checkboxValue.value.length === 0 ? "#C8D4DF" : "var(--red-color)"
        })
      } : {
        m: common_vendor.o(addCar),
        n: common_vendor.p({
          text: "+ 添加车辆",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        })
      }, {
        o: common_vendor.o(($event) => model.number = $event),
        p: common_vendor.p({
          modelValue: model.number
        }),
        q: common_vendor.p({
          labelPosition: "top",
          label: "车牌号码",
          prop: "number"
        }),
        r: common_vendor.sr(form, "c2a962ca-8,c2a962ca-7", {
          "k": "form"
        }),
        s: common_vendor.p({
          errorType: "toast",
          model,
          rules: rules.value,
          ["label-width"]: "140rpx"
        }),
        t: common_vendor.o(submit),
        v: common_vendor.p({
          text: "确认添加",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
        }),
        w: common_vendor.sr(myCarNumber, "c2a962ca-7", {
          "k": "myCarNumber"
        }),
        x: common_vendor.o(changeDrawer),
        y: common_vendor.p({
          title: "添加车牌号码",
          height: 480,
          closeable: true
        }),
        z: common_vendor.sr(confirm, "c2a962ca-12", {
          "k": "confirm"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/carList/carList.vue"]]);
wx.createPage(MiniProgramPage);
