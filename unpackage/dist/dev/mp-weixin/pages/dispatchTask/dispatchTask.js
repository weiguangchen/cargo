"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const utils_token = require("../../utils/token.js");
if (!Array) {
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_datetime_picker2 = common_vendor.resolveComponent("uv-datetime-picker");
  const _easycom_my_drawer2 = common_vendor.resolveComponent("my-drawer");
  (_easycom_uv_navbar2 + _easycom_uv_image2 + _easycom_uv_icon2 + _easycom_uv_line2 + _easycom_uv_form_item2 + _easycom_uv_form2 + _easycom_uv_button2 + _easycom_uv_datetime_picker2 + _easycom_my_drawer2)();
}
const _easycom_uv_navbar = () => "../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_datetime_picker = () => "../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.js";
const _easycom_my_drawer = () => "../../components/my-drawer/my-drawer.js";
if (!Math) {
  (_easycom_uv_navbar + _easycom_uv_image + _easycom_uv_icon + _easycom_uv_line + SelectCargo + _easycom_uv_form_item + SelectCarType + SelectPlate + Material + Remark + _easycom_uv_form + _easycom_uv_button + _easycom_uv_datetime_picker + _easycom_my_drawer)();
}
const SelectCarType = () => "./components/SelectCarType.js";
const SelectPlate = () => "./components/SelectPlate.js";
const SelectCargo = () => "./components/SelectCargo.js";
const Remark = () => "./components/Remark.js";
const Material = () => "./components/Material.js";
const _sfc_main = {
  __name: "dispatchTask",
  setup(__props) {
    const eventChannel = common_vendor.ref();
    common_vendor.onLoad((options) => {
      const instance = common_vendor.getCurrentInstance().proxy;
      const channel = instance.getOpenerEventChannel();
      eventChannel.value = channel;
      channel.on("setData", (res) => {
        console.log("setData", res);
        supply.value = res.supply;
        unload.value = res.unload;
        model.CarType = res.carType;
        if (res.supply) {
          getCargpOptions();
        }
      });
    });
    function leftClick() {
      common_vendor.index.navigateBack();
    }
    const supply = common_vendor.ref(null);
    const unload = common_vendor.ref(null);
    function selectAddress(type) {
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
            if (res.type === 1) {
              supply.value = res.data;
              model.OwnerId = "";
              getCargpOptions();
            }
            if (res.type === 2)
              unload.value = res.data;
          }
        }
      });
    }
    const datetimePicker = common_vendor.ref();
    const timeMode = common_vendor.ref("start");
    const startTime = common_vendor.ref("");
    const endTime = common_vendor.ref("");
    const min = common_vendor.dayjs().valueOf();
    const max = common_vendor.dayjs().add(1, "year").valueOf();
    const minDate = common_vendor.ref();
    const maxDate = common_vendor.ref();
    function formatter(type, value) {
      if (type === "year")
        return `${value}年`;
      if (type === "month")
        return `${value}月`;
      if (type === "day")
        return `${value}日`;
      if (type === "hour")
        return `${value}时`;
      if (type === "minute")
        return `${value}分`;
      return value;
    }
    function selectTime(type) {
      timeMode.value = type;
      if (type === "start") {
        minDate.value = min;
        maxDate.value = endTime.value ? common_vendor.dayjs(endTime.value).valueOf() : max;
      }
      if (type === "end") {
        minDate.value = startTime.value ? common_vendor.dayjs(startTime.value).valueOf() : min;
        maxDate.value = max;
      }
      datetimePicker.value.open();
    }
    function clearTime(type) {
      if (type === "start")
        startTime.value = "";
      if (type === "end")
        endTime.value = "";
    }
    function confirmTime({
      value
    }) {
      console.log("value", value, common_vendor.dayjs(value).format("YYYY-MM-DD HH:mm"));
      if (timeMode.value === "start")
        startTime.value = value;
      if (timeMode.value === "end")
        endTime.value = value;
    }
    const model = common_vendor.reactive({
      OwnerId: "",
      CarType: [],
      Carno: [],
      Memo: ""
    });
    const rules = common_vendor.ref({
      OwnerId: [{
        type: "string",
        required: true,
        message: "请选择货主公司",
        trigger: ["blur", "change"]
      }]
    });
    const cargoOptions = common_vendor.ref([]);
    async function getCargpOptions() {
      var _a;
      if (!supply.value.Id) {
        return;
      }
      const res = await api_index.GetOwnerBySupply({
        supplyId: supply.value.Id,
        qType: 1
      });
      cargoOptions.value = res.map((m) => ({
        value: m.Id,
        label: m.Ownername
      }));
      if (res.length === 1) {
        model.OwnerId = ((_a = res == null ? void 0 : res[0]) == null ? void 0 : _a.Id) ?? "";
        getOrder();
      }
    }
    const cargoDisabled = common_vendor.computed(() => {
      var _a;
      return !((_a = supply.value) == null ? void 0 : _a.Id);
    });
    function cargoDisabledClick() {
      common_vendor.index.showToast({
        title: "请先选择装货地",
        icon: "none"
      });
    }
    function cargoChange(val) {
      order.value = null;
      orderList.value = [];
      getOrder();
    }
    const orderDrawer = common_vendor.ref();
    const order = common_vendor.ref();
    const orderList = common_vendor.ref([]);
    async function getOrder() {
      const res = await api_index.GetOwnerOrderList({
        supplyId: supply.value.Id,
        ownerId: model.OwnerId
      });
      const temp = res.map((m) => {
        var _a;
        return {
          ...m,
          MaterialsList: ((_a = m.MaterialsList) == null ? void 0 : _a.map((n) => ({
            ...n,
            Limittype: "0",
            EstimiteWeight: n.minWgtLeft
          }))) ?? []
        };
      });
      orderList.value = temp;
      if (temp.length === 1) {
        order.value = (temp == null ? void 0 : temp[0]) ?? null;
      }
    }
    function openOrder() {
      if (orderList.value.length <= 1) {
        return;
      }
      orderDrawer.value.popup.open();
    }
    function selectOrder(item) {
      order.value = item;
      orderDrawer.value.popup.close();
    }
    const totalPrice = common_vendor.computed(() => {
      let price = common_vendor.Big(0).toFixed(2);
      if (!order.value)
        return price;
      if (!order.value.MaterialsList || order.value.MaterialsList && order.value.MaterialsList.length === 0)
        return price;
      const total = order.value.MaterialsList.map((m) => {
        const { TaxPrice, Limittype, EstimiteWeight, EstimiteTimes } = m;
        const SingleWeight = order.value.SingleWeight;
        if (Limittype === "0")
          price = common_vendor.Big(0).toFixed(2);
        if (Limittype === "1")
          price = common_vendor.Big(EstimiteWeight || 0).times(TaxPrice || 0).toFixed(2);
        if (Limittype === "2")
          price = common_vendor.Big(EstimiteTimes || 0).times(SingleWeight || 0).times(TaxPrice || 0).toFixed(2);
        console.log("price", price);
        return price;
      }).reduce((p, n) => common_vendor.Big(p).plus(n).toFixed(2), 0);
      console.log("total", total, order.value.MaterialsList);
      return total;
    });
    const showTip = common_vendor.computed(() => {
      if (!order.value)
        return false;
      const limit = common_vendor.Big(order.value.AlertBalance || 0);
      const total = common_vendor.Big(order.value.Balance || 0).plus(order.value.CreditBalance || 0).minus(totalPrice.value);
      return total.lt(limit);
    });
    const submiting = common_vendor.ref(false);
    async function submit() {
      var _a, _b;
      console.log("order", order.value);
      if (!supply.value) {
        common_vendor.index.showToast({
          title: "请选择装货地",
          icon: "none"
        });
        return;
      }
      if (!unload.value) {
        common_vendor.index.showToast({
          title: "请选择卸货地",
          icon: "none"
        });
        return;
      }
      if (!model.OwnerId) {
        common_vendor.index.showToast({
          title: "请选择货主公司",
          icon: "none"
        });
        return;
      }
      if (!order.value) {
        common_vendor.index.showToast({
          title: "请选择订单",
          icon: "none"
        });
        return;
      }
      const params = {
        Supply: supply.value.Id,
        //生产企业主键
        OwnerId: model.OwnerId,
        //货主主键
        UnloadPlaceId: unload.value.Id,
        // 卸货地址主键
        Orderid: order.value.SSOrderId,
        //订单主键
        Orderno: order.value.SSOrderNo,
        // 订单编码
        StartTime: startTime.value ? common_vendor.dayjs(startTime.value).format("YYYY-MM-DD HH:mm") : "",
        //开始进厂时间
        EndTime: endTime.value ? common_vendor.dayjs(endTime.value).format("YYYY-MM-DD HH:mm") : "",
        // 截止接单时间
        Carno: model.Carno.join(","),
        // 限制车牌，多个‘,’分隔
        CarType: model.CarType.join(","),
        MatList: order.value.MaterialsList.map((m) => {
          const item = {
            Material: m.SSMaterialId,
            Materialname: m.SSMaterialName,
            Limittype: m.Limittype,
            LeftWeight: m.WeightLeft,
            EstimatePrice: m.TaxPrice
          };
          if (m.Limittype === "1")
            item.EstimiteWeight = m.EstimiteWeight;
          if (m.Limittype === "2")
            item.EstimiteTimes = m.EstimiteTimes;
          return item;
        }),
        Memo: model.Memo,
        OwnerUserId: ((_b = (_a = utils_token.getToken()) == null ? void 0 : _a.userInfo) == null ? void 0 : _b.Id) ?? ""
      };
      console.log("params", params);
      try {
        submiting.value = true;
        await api_index.SetAssignTicket(params);
        common_vendor.index.showToast({
          title: "派单成功！",
          icon: "none"
        });
        common_vendor.index.navigateBack();
      } catch (err) {
        common_vendor.index.showToast({
          title: err.data,
          icon: "none"
        });
      } finally {
        submiting.value = false;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(leftClick),
        b: common_vendor.p({
          title: "确认派单信息",
          ["bg-color"]: "transparent",
          ["title-style"]: {
            color: "#FFFFFF"
          },
          leftIconColor: "#FFFFFF",
          placeholder: true
        }),
        c: supply.value
      }, supply.value ? {
        d: common_vendor.t(supply.value.Name),
        e: common_vendor.t(supply.value.Linker),
        f: common_vendor.t(supply.value.LinkerMobile)
      } : {}, {
        g: common_vendor.o(($event) => selectAddress(1)),
        h: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        i: unload.value
      }, unload.value ? {
        j: common_vendor.t(unload.value.Placename),
        k: common_vendor.t(unload.value.Nickname),
        l: common_vendor.t(unload.value.Mobile)
      } : {}, {
        m: common_vendor.o(($event) => selectAddress(2)),
        n: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx"
        }),
        o: common_vendor.p({
          src: "/static/images/dispatchTask/clock.png",
          width: "36rpx",
          height: "36rpx",
          duration: 0,
          ["custom-style"]: {
            marginRight: "24rpx"
          }
        }),
        p: startTime.value
      }, startTime.value ? {
        q: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(startTime.value).format("MM-DD HH:mm")),
        r: common_vendor.o(($event) => clearTime("start")),
        s: common_vendor.p({
          name: "close",
          size: "12",
          color: "var(--intr-color)",
          ["custom-style"]: {
            marginLeft: "18rpx"
          }
        }),
        t: common_vendor.o(() => {
        })
      } : {
        v: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx",
          ["custom-style"]: {
            marginLeft: "6rpx"
          }
        })
      }, {
        w: common_vendor.o(($event) => selectTime("start")),
        x: common_vendor.p({
          direction: "col",
          length: "24rpx",
          color: "#B0BECC",
          margin: "0 20rpx"
        }),
        y: endTime.value
      }, endTime.value ? {
        z: common_vendor.t(common_vendor.unref(common_vendor.dayjs)(endTime.value).format("MM-DD HH:mm")),
        A: common_vendor.o(($event) => clearTime("end")),
        B: common_vendor.p({
          name: "close",
          size: "12",
          color: "var(--intr-color)",
          ["custom-style"]: {
            marginLeft: "18rpx"
          }
        }),
        C: common_vendor.o(() => {
        })
      } : {
        D: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx",
          ["custom-style"]: {
            marginLeft: "6rpx"
          }
        })
      }, {
        E: common_vendor.o(($event) => selectTime("end")),
        F: common_vendor.o(cargoDisabledClick),
        G: common_vendor.o(cargoChange),
        H: common_vendor.o(($event) => model.OwnerId = $event),
        I: common_vendor.p({
          options: cargoOptions.value,
          disabled: cargoDisabled.value,
          modelValue: model.OwnerId
        }),
        J: common_vendor.p({
          label: "货主公司"
        }),
        K: common_vendor.o(($event) => model.CarType = $event),
        L: common_vendor.p({
          modelValue: model.CarType
        }),
        M: common_vendor.p({
          label: "车辆类型限制",
          prop: "CarType"
        }),
        N: common_vendor.o(($event) => model.Carno = $event),
        O: common_vendor.p({
          modelValue: model.Carno
        }),
        P: common_vendor.p({
          label: "车牌限制",
          prop: "Carno"
        }),
        Q: order.value
      }, order.value ? common_vendor.e({
        R: common_vendor.t(order.value.SSOrderNo),
        S: orderList.value.length > 1
      }, orderList.value.length > 1 ? {
        T: common_vendor.p({
          src: "/static/images/arrow.png",
          duration: 0,
          width: "24rpx",
          height: "24rpx",
          ["custom-style"]: {
            marginLeft: "6rpx"
          }
        })
      } : {}, {
        U: common_vendor.o(openOrder)
      }) : {}, {
        V: !(supply.value && model.OwnerId)
      }, !(supply.value && model.OwnerId) ? {} : orderList.value.length === 0 ? {} : !order.value ? {
        Y: common_vendor.p({
          src: "/static/images/dispatchTask/arrow2.png",
          duration: 0,
          width: "16rpx",
          height: "16rpx"
        }),
        Z: common_vendor.o(openOrder)
      } : {
        aa: common_vendor.f(order.value.MaterialsList, (item, index, i0) => {
          return {
            a: item.SSMaterialId,
            b: "1988e7d6-19-" + i0 + ",1988e7d6-17",
            c: common_vendor.o(($event) => order.value.MaterialsList[index] = $event, item.SSMaterialId),
            d: common_vendor.p({
              borderBottom: index < order.value.MaterialsList.length - 1,
              order: order.value,
              modelValue: order.value.MaterialsList[index]
            })
          };
        })
      }, {
        W: orderList.value.length === 0,
        X: !order.value,
        ab: common_vendor.p({
          prop: "material",
          labelPosition: "top"
        }),
        ac: common_vendor.o(($event) => model.Memo = $event),
        ad: common_vendor.p({
          modelValue: model.Memo
        }),
        ae: common_vendor.p({
          label: "备注",
          prop: "Memo"
        }),
        af: common_vendor.sr("form", "1988e7d6-9"),
        ag: common_vendor.p({
          labelPosition: "left",
          model,
          rules: rules.value,
          ["label-width"]: "200rpx"
        }),
        ah: common_vendor.t(totalPrice.value),
        ai: common_vendor.t(order.value ? order.value.Balance ? order.value.Balance : 0 : "-"),
        aj: common_vendor.o(submit),
        ak: common_vendor.p({
          loading: submiting.value,
          text: "确认派单",
          color: "linear-gradient( 270deg, #31CE57 0%, #07B130 100%)",
          customStyle: {
            height: "96rpx"
          }
        }),
        al: showTip.value
      }, showTip.value ? {} : {}, {
        am: common_vendor.sr(datetimePicker, "1988e7d6-23", {
          "k": "datetimePicker"
        }),
        an: common_vendor.o(confirmTime),
        ao: common_vendor.o(($event) => _ctx.value = $event),
        ap: common_vendor.p({
          mode: "datetime",
          confirmColor: "var(--main-color)",
          formatter,
          maxDate: maxDate.value,
          minDate: minDate.value,
          modelValue: _ctx.value
        }),
        aq: common_vendor.f(orderList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.SSOrderNo),
            b: order.value && order.value.SSOrderId === item.SSOrderId
          }, order.value && order.value.SSOrderId === item.SSOrderId ? {
            c: "1988e7d6-25-" + i0 + ",1988e7d6-24",
            d: common_vendor.p({
              src: "/static/images/check.png",
              duration: 0,
              width: "32rpx",
              height: "32rpx"
            })
          } : {}, {
            e: order.value && order.value.SSOrderId === item.SSOrderId ? 1 : "",
            f: item.SSOrderId,
            g: common_vendor.o(($event) => selectOrder(item), item.SSOrderId)
          });
        }),
        ar: common_vendor.sr(orderDrawer, "1988e7d6-24", {
          "k": "orderDrawer"
        }),
        as: common_vendor.p({
          title: "选择订单"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wei/cargo/pages/dispatchTask/dispatchTask.vue"]]);
wx.createPage(MiniProgramPage);
