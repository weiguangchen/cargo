"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_index = require("../../../api/index.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_col2 = common_vendor.resolveComponent("uv-col");
  const _easycom_uv_row2 = common_vendor.resolveComponent("uv-row");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  const _easycom_uv_datetime_picker2 = common_vendor.resolveComponent("uv-datetime-picker");
  (_easycom_uv_image2 + _easycom_uv_col2 + _easycom_uv_row2 + _easycom_uv_button2 + _easycom_my_drawer2 + _easycom_uv_datetime_picker2)();
}
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_col = () => "../../../uni_modules/uv-row/components/uv-col/uv-col.js";
const _easycom_uv_row = () => "../../../uni_modules/uv-row/components/uv-row/uv-row.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_my_drawer = () => "../../../components/my-drawer/my-drawer.js";
const _easycom_uv_datetime_picker = () => "../../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_col + _easycom_uv_row + MyDatetime + MySelect + _easycom_uv_button + _easycom_my_drawer + _easycom_uv_datetime_picker)();
}
const MySelect = () => "./my-select.js";
const MyDatetime = () => "./my-datetime.js";
const _sfc_main = {
  __name: "my-filter-drawer",
  emits: ["visible-change", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    function change(show) {
      emits("visible-change", show);
    }
    const filter = common_vendor.ref();
    function openFilter() {
      filter.value.popup.open();
      getOwnerSupplyListOptions();
      getOwnerMaterialsListOptions();
      getUnloadPlaceListOptions();
      getOwnerUserCarListOptions();
      getOwnerBySupplyOptions();
    }
    const dateMode = common_vendor.ref("全部时间");
    const disabledDate = common_vendor.ref(true);
    function setDateMode(mode) {
      dateMode.value = mode;
      if (dateMode.value === "全部时间") {
        date.value = [];
        disabledDate.value = true;
      }
      if (dateMode.value === "今天") {
        date.value = [common_vendor.dayjs().format("YYYY-MM-DD"), common_vendor.dayjs().format("YYYY-MM-DD")];
        disabledDate.value = true;
      }
      if (dateMode.value === "昨天") {
        date.value = [common_vendor.dayjs().subtract(1, "day").format("YYYY-MM-DD"), common_vendor.dayjs().subtract(1, "day").format("YYYY-MM-DD")];
        disabledDate.value = true;
      }
      if (dateMode.value === "本月") {
        date.value = [common_vendor.dayjs().startOf("month").format("YYYY-MM-DD"), common_vendor.dayjs().endOf("month").format("YYYY-MM-DD")];
        disabledDate.value = true;
      }
      if (dateMode.value === "近7天") {
        date.value = [common_vendor.dayjs().subtract(7, "day").format("YYYY-MM-DD"), common_vendor.dayjs().format("YYYY-MM-DD")];
        disabledDate.value = true;
      }
      if (dateMode.value === "自定义时间") {
        disabledDate.value = false;
      }
    }
    const date = common_vendor.ref([]);
    function changeDate(date2) {
      console.log(date2);
    }
    const mfrsOptions = common_vendor.ref([]);
    async function getOwnerSupplyListOptions() {
      try {
        const res = await api_index.GetOwnerSupplyList();
        mfrsOptions.value = res.map((m) => ({
          value: m.Id,
          label: m.Fullname
        }));
      } catch {
        mfrsOptions.value = [];
      }
    }
    const mfrs = common_vendor.ref("");
    function changeMfrs(val) {
      material.value = "";
      cargo.value = "";
      getOwnerMaterialsListOptions();
      getOwnerBySupplyOptions();
    }
    function disabledClick() {
      common_vendor.index.showToast({
        title: "请先选择装货厂家",
        icon: "none"
      });
    }
    const materialOptions = common_vendor.ref([]);
    async function getOwnerMaterialsListOptions() {
      try {
        const res = await api_index.GetOwnerMaterialsList({
          supplyId: mfrs.value
        });
        materialOptions.value = res.map((m) => ({
          value: m.MaterialId,
          label: m.MaterialName
        }));
      } catch {
        materialOptions.value = [];
      }
    }
    const material = common_vendor.ref("");
    const dischargeOptions = common_vendor.ref([]);
    async function getUnloadPlaceListOptions() {
      try {
        const res = await api_index.GetUnloadPlaceList();
        dischargeOptions.value = res.map((m) => ({
          value: m.Id,
          label: m.Placename
        }));
      } catch {
        dischargeOptions.value = [];
      }
    }
    const discharge = common_vendor.ref("");
    const cargoOptions = common_vendor.ref([]);
    async function getOwnerBySupplyOptions() {
      try {
        const res = await api_index.GetOwnerBySupply({
          supplyId: mfrs.value
        });
        cargoOptions.value = res.map((m) => ({
          value: m.Id,
          label: m.Ownername
        }));
      } catch {
        cargoOptions.value = [];
      }
    }
    const cargo = common_vendor.ref("");
    const carOptions = common_vendor.ref([]);
    async function getOwnerUserCarListOptions() {
      try {
        const res = await api_index.GetOwnerUserCarList();
        carOptions.value = res.map((m) => ({
          value: m.Id,
          label: m.Carno
        }));
      } catch {
        carOptions.value = [];
      }
    }
    const car = common_vendor.ref("");
    const formValues = common_vendor.computed(() => {
      const values = {};
      const [startTime, endTime] = date.value;
      if (startTime)
        values.startTime = startTime;
      if (endTime)
        values.endTime = endTime;
      if (mfrs.value)
        values.supplyId = mfrs.value;
      if (material.value)
        values.materialId = material.value;
      if (discharge.value)
        values.unplaceId = discharge.value;
      if (cargo.value)
        values.ownerId = cargo.value;
      if (car.value)
        values.carno = car.value;
      console.log("formValues", formValues);
      return values;
    });
    const params = common_vendor.ref({});
    const isFilter = common_vendor.computed(() => {
      return Object.keys(params.value).some((m) => params.value[m]);
    });
    function reset() {
      dateMode.value = "全部时间";
      disabledDate.value = true;
      date.value = [];
      mfrs.value = "";
      material.value = "";
      discharge.value = "";
      cargo.value = "";
      car.value = "";
      params.value = formValues.value;
      getOwnerMaterialsListOptions();
      emits("change", {
        params: params.value,
        isFilter: isFilter.value
      });
      filter.value.popup.close();
    }
    function submit() {
      params.value = formValues.value;
      filter.value.popup.close();
      emits("change", {
        params: params.value,
        isFilter: isFilter.value
      });
    }
    __expose({
      reset
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isFilter.value
      }, isFilter.value ? {
        b: common_vendor.p({
          src: "/static/images/filter/filter-selected.png",
          width: "32rpx",
          height: "32rpx"
        })
      } : {
        c: common_vendor.p({
          src: "/static/images/filter/filter.png",
          width: "32rpx",
          height: "32rpx"
        })
      }, {
        d: isFilter.value ? 1 : "",
        e: common_vendor.o(openFilter),
        f: dateMode.value === "全部时间" ? 1 : "",
        g: common_vendor.o(($event) => setDateMode("全部时间")),
        h: common_vendor.p({
          span: "4"
        }),
        i: dateMode.value === "今天" ? 1 : "",
        j: common_vendor.o(($event) => setDateMode("今天")),
        k: common_vendor.p({
          span: "4"
        }),
        l: dateMode.value === "昨天" ? 1 : "",
        m: common_vendor.o(($event) => setDateMode("昨天")),
        n: common_vendor.p({
          span: "4"
        }),
        o: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        p: dateMode.value === "本月" ? 1 : "",
        q: common_vendor.o(($event) => setDateMode("本月")),
        r: common_vendor.p({
          span: "4"
        }),
        s: dateMode.value === "近7天" ? 1 : "",
        t: common_vendor.o(($event) => setDateMode("近7天")),
        v: common_vendor.p({
          span: "4"
        }),
        w: dateMode.value === "自定义时间" ? 1 : "",
        x: common_vendor.o(($event) => setDateMode("自定义时间")),
        y: common_vendor.p({
          span: "4"
        }),
        z: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        A: dateMode.value === "自定义时间"
      }, dateMode.value === "自定义时间" ? {
        B: common_vendor.o(changeDate),
        C: common_vendor.o(($event) => date.value = $event),
        D: common_vendor.p({
          disabled: disabledDate.value,
          modelValue: date.value
        })
      } : {}, {
        E: common_vendor.o(changeMfrs),
        F: common_vendor.o(($event) => mfrs.value = $event),
        G: common_vendor.p({
          options: mfrsOptions.value,
          title: "选择装货厂家",
          placeholder: "全部装货厂家",
          modelValue: mfrs.value
        }),
        H: common_vendor.p({
          span: "6"
        }),
        I: common_vendor.o(disabledClick),
        J: common_vendor.o(($event) => material.value = $event),
        K: common_vendor.p({
          options: materialOptions.value,
          title: "选择物料",
          placeholder: "全部物料",
          disabled: !mfrs.value,
          modelValue: material.value
        }),
        L: common_vendor.p({
          span: "6"
        }),
        M: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        N: common_vendor.o(($event) => discharge.value = $event),
        O: common_vendor.p({
          options: dischargeOptions.value,
          title: "选择卸货地",
          placeholder: "全部卸货地",
          modelValue: discharge.value
        }),
        P: common_vendor.p({
          span: "12"
        }),
        Q: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        R: common_vendor.o(disabledClick),
        S: common_vendor.o(($event) => cargo.value = $event),
        T: common_vendor.p({
          options: cargoOptions.value,
          title: "选择货主信息",
          placeholder: "全部货主信息",
          disabled: !mfrs.value,
          modelValue: cargo.value
        }),
        U: common_vendor.p({
          span: "12"
        }),
        V: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        W: common_vendor.o(($event) => car.value = $event),
        X: common_vendor.p({
          options: carOptions.value,
          title: "选择车辆信息",
          placeholder: "全部车辆信息",
          modelValue: car.value
        }),
        Y: common_vendor.p({
          span: "12"
        }),
        Z: common_vendor.p({
          customStyle: "margin-bottom: 24rpx",
          gutter: "20rpx"
        }),
        aa: common_vendor.o(reset),
        ab: common_vendor.p({
          text: "重置",
          ["custom-style"]: {
            height: "96rpx",
            color: "var(--sub-color)",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            fontWeight: "bold"
          }
        }),
        ac: common_vendor.o(submit),
        ad: common_vendor.p({
          text: "筛选",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          ["custom-style"]: {
            height: "96rpx",
            borderRadius: "16rpx",
            fontSize: "30rpx",
            fontWeight: "bold"
          }
        }),
        ae: common_vendor.sr(filter, "348d4abf-2", {
          "k": "filter"
        }),
        af: common_vendor.o(change),
        ag: common_vendor.p({
          title: "数据统计筛选",
          height: "550"
        }),
        ah: common_vendor.sr("datetimePicker", "348d4abf-28"),
        ai: common_vendor.o(_ctx.confirmDateTime),
        aj: common_vendor.p({
          mode: "date",
          confirmColor: "var(--main-color)",
          ["min-date"]: _ctx.minDate,
          ["max-date"]: _ctx.maxDate
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/mine/statistics/components/my-filter-drawer.vue"]]);
wx.createComponent(Component);
