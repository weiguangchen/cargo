"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_icon2 + _easycom_uv_form2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_form_item + _easycom_uv_icon + _easycom_uv_form + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "addAddress",
  setup(__props) {
    common_vendor.onLoad(async (options) => {
      const {
        unloadId
      } = options;
      model.Id = unloadId;
      if (unloadId) {
        try {
          const res = await api_index.GetUnloadPlace({
            unloadId
          });
          console.log("res", res);
          model.Area = {
            address: res.Address,
            province: res.Province,
            city: res.City,
            district: res.Distinct,
            districtCode: res.DistrictCode,
            latitude: res.Latitude,
            longitude: res.Logitude
          };
          model.Mobile = res.Mobile;
          model.Nickname = res.Nickname;
          model.Placename = res.Placename;
        } catch {
        }
      }
    });
    const form = common_vendor.ref(null);
    const model = common_vendor.reactive({
      Id: "",
      Placename: "",
      Area: {
        address: ""
      },
      Nickname: "",
      Mobile: ""
    });
    const rules = common_vendor.ref({
      Placename: [
        {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"]
        },
        {
          message: "最多输入30个字",
          max: 30,
          trigger: ["blur", "change"]
        }
      ],
      "Area.address": {
        type: "string",
        required: true,
        message: "请选择地址",
        trigger: ["blur", "change"]
      },
      Nickname: {
        type: "string",
        required: true,
        message: "请填写昵称",
        trigger: ["blur", "change"]
      },
      Mobile: {
        type: "string",
        required: true,
        message: "请填写手机号",
        trigger: ["blur", "change"]
      }
    });
    async function chooseLocation() {
      try {
        const res = await common_vendor.index.chooseLocation();
        console.log("res", res);
        const {
          latitude,
          longitude
        } = res;
        const location = latitude && longitude ? `${longitude},${latitude}` : "";
        if (location) {
          const response = await api_index.GetLocationByJW({
            logitude: longitude,
            latitude
          });
          console.log("response", response);
          const {
            province,
            city,
            distinct,
            address,
            districtCode
          } = response;
          let area = {
            province,
            city,
            district: distinct,
            districtCode,
            address,
            latitude,
            longitude
          };
          console.log(area);
          model.Area = area;
        }
      } catch {
      }
    }
    const loading = common_vendor.ref(false);
    async function submit() {
      const valid = await form.value.validate();
      if (valid) {
        const {
          Area: {
            address,
            city,
            province,
            district,
            districtCode,
            longitude,
            latitude
          },
          Placename,
          Mobile,
          Nickname,
          Id
        } = model;
        const params = {
          Id,
          Address: address,
          City: city,
          Province: province,
          Distinct: district,
          DistrictCode: districtCode,
          Placename,
          Logitude: longitude,
          Latitude: latitude,
          Mobile,
          Nickname
        };
        console.log("params", params);
        try {
          loading.value = true;
          api_index.UptUnloadPlace(params);
          common_vendor.index.$emit("addAddress");
          common_vendor.index.navigateBack();
        } catch (err) {
          console.log("err", err);
        } finally {
          loading.value = false;
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => model.Placename = $event),
        b: common_vendor.p({
          placeholder: "请输入",
          border: "none",
          maxlength: "30",
          ["laceholder-style"]: "color:var(--intr-color)",
          modelValue: model.Placename
        }),
        c: common_vendor.p({
          labelPosition: "left",
          label: "名称",
          prop: "Placename",
          borderBottom: true
        }),
        d: model.Area.province
      }, model.Area.province ? {
        e: common_vendor.t(model.Area.province),
        f: common_vendor.t(model.Area.city),
        g: common_vendor.t(model.Area.district),
        h: common_vendor.p({
          labelPosition: "left",
          label: "地区",
          borderBottom: true
        })
      } : {}, {
        i: common_vendor.o(($event) => model.Area.address = $event),
        j: common_vendor.p({
          placeholder: "请选择",
          ["placeholder-style"]: "color:var(--intr-color)",
          border: "none",
          readonly: true,
          modelValue: model.Area.address
        }),
        k: common_vendor.p({
          name: "arrow-right",
          ["custom-style"]: {
            color: "var(--intr-color)"
          },
          size: "12"
        }),
        l: common_vendor.o(chooseLocation),
        m: common_vendor.p({
          labelPosition: "left",
          label: "地址",
          prop: "Area.address"
        }),
        n: common_vendor.o(($event) => model.Nickname = $event),
        o: common_vendor.p({
          placeholder: "请输入",
          ["placeholder-style"]: "color:var(--intr-color)",
          maxlength: "6",
          border: "none",
          modelValue: model.Nickname
        }),
        p: common_vendor.p({
          labelPosition: "left",
          label: "昵称",
          prop: "Nickname",
          borderBottom: true
        }),
        q: common_vendor.o(($event) => model.Mobile = $event),
        r: common_vendor.p({
          placeholder: "请输入",
          ["placeholder-style"]: "color:var(--intr-color)",
          maxlength: "11",
          border: "none",
          modelValue: model.Mobile
        }),
        s: common_vendor.p({
          labelPosition: "left",
          label: "电话",
          prop: "Mobile"
        }),
        t: common_vendor.sr(form, "5e5462d6-0", {
          "k": "form"
        }),
        v: common_vendor.p({
          errorType: "toast",
          model,
          rules: rules.value,
          ["label-width"]: "88rpx"
        }),
        w: common_vendor.o(submit),
        x: common_vendor.p({
          loading: loading.value,
          text: "确认添加",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/addAddress/addAddress.vue"]]);
wx.createPage(MiniProgramPage);
