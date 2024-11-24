"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const _sfc_main = {
  name: "uv-drop-down-item",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin],
  emits: ["click"],
  props: {
    name: {
      type: [String, Number],
      default: ""
    },
    // 类型 1 没有筛选项，直接进行选中和不选中  2 有多个选项
    type: {
      type: [String, Number],
      default: "2"
    },
    // 筛选的文本
    label: {
      type: [String],
      default: ""
    },
    // 筛选值
    value: {
      type: [String, Number, null],
      default: ""
    },
    // 是否下拉菜单打开
    isDrop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parentData: {
        defaultValue: [0, "0", "all"],
        textSize: "30rpx",
        textColor: "#333",
        textActiveSize: "30rpx",
        textActiveColor: "#3c9cff",
        extraIcon: {},
        extraActiveIcon: {},
        sign: "",
        clickHandler: Function
      },
      active: false,
      isDroped: false,
      elId: ""
    };
  },
  watch: {
    isDrop: {
      handler(newVal) {
        this.isDroped = newVal;
      },
      immediate: true
    },
    value: {
      handler(newVal) {
        this.$nextTick(() => {
          this.active = this.parentData.defaultValue.indexOf(newVal) == -1;
        });
      },
      immediate: true
    }
  },
  computed: {
    getDownIcon() {
      var _a, _b, _c, _d, _e;
      const style = {
        size: "30rpx",
        color: "#333",
        ...this.parentData.extraIcon
      };
      if (this.active || this.isDroped) {
        style.color = ((_a = this.parentData.extraActiveIcon) == null ? void 0 : _a.color) ? (_b = this.parentData.extraActiveIcon) == null ? void 0 : _b.color : "#3c9cff";
        style.size = ((_c = this.parentData.extraActiveIcon) == null ? void 0 : _c.size) ? (_d = this.parentData.extraActiveIcon) == null ? void 0 : _d.size : "30rpx";
      }
      if (this.isDroped) {
        style.name = (_e = this.parentData.extraActiveIcon) == null ? void 0 : _e.name;
      }
      return style;
    },
    getTextStyle() {
      const style = {
        size: this.parentData.textSize,
        color: this.parentData.textColor
      };
      if (this.active || this.isDroped) {
        style.size = this.parentData.textActiveSize;
        style.color = this.parentData.textActiveColor;
      }
      return style;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.elId = this.$uv.guid();
      this.getParentData("uv-drop-down");
      if (!this.parent) {
        this.$uv.error("uv-drop-down必须搭配uv-drop-down-item组件使用");
      }
      common_vendor.index.$on("HANDLE_DROPDOWN_ONE", (id) => {
        if (this.isDroped && this.elId != id) {
          this.isDroped = false;
        }
      });
      common_vendor.index.$on(`${this.parentData.sign}_CLOSEPOPUP`, async () => {
        if (this.isDroped) {
          this.isDroped = false;
        }
      });
    },
    async clickHandler() {
      let data = {};
      common_vendor.index.$emit("HANDLE_DROPDOWN_ONE", this.elId);
      switch (+this.type) {
        case 1:
          this.active = !this.active;
          data = {
            name: this.name,
            active: this.active,
            type: this.type
          };
          break;
        case 2:
          this.isDroped = !this.isDroped;
          data = {
            name: this.name,
            active: this.isDroped,
            type: this.type
          };
          break;
      }
      this.parentData.clickHandler(data);
      this.$emit("click", data);
      common_vendor.index.$emit(`${this.parentData.sign}_CLICKMENU`, {
        show: +this.type > 1 && this.isDroped
      });
    }
  }
};
if (!Array) {
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  (_easycom_uv_text2 + _easycom_uv_icon2)();
}
const _easycom_uv_text = () => "../../../uv-text/components/uv-text/uv-text.js";
const _easycom_uv_icon = () => "../../../uv-icon/components/uv-icon/uv-icon.js";
if (!Math) {
  (_easycom_uv_text + _easycom_uv_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      text: $props.label,
      size: $options.getTextStyle.size,
      color: $options.getTextStyle.color,
      lines: "1",
      ["custom-style"]: {
        marginRight: "10rpx",
        maxWidth: "200rpx"
      }
    }),
    b: [1, "1"].indexOf($props.type) == -1
  }, [1, "1"].indexOf($props.type) == -1 ? {
    c: common_vendor.p({
      name: $options.getDownIcon.name,
      size: $options.getDownIcon.size,
      color: $options.getDownIcon.color
    })
  } : {}, {
    d: common_vendor.o((...args) => $options.clickHandler && $options.clickHandler(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b6164b16"], ["__file", "/Users/wei/cargo/uni_modules/uv-drop-down/components/uv-drop-down-item/uv-drop-down-item.vue"]]);
wx.createComponent(Component);
