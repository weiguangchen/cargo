"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const _sfc_main = {
  name: "uv-drop-down-popup",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin],
  props: {
    sign: {
      type: [String, Number],
      default: "UVDROPDOWN"
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    opacity: {
      type: [Number, String],
      default: 0.5
    },
    clickOverlayOnClose: {
      type: Boolean,
      default: true
    },
    // 当前下拉选项对象
    currentDropItem: {
      type: Object,
      default() {
        return {
          activeIndex: 0,
          child: []
        };
      }
    },
    keyName: {
      type: String,
      default: "label"
    }
  },
  data() {
    return {
      show: false,
      rect: {},
      height: 0
    };
  },
  computed: {
    overlayStyle() {
      let { height = 0, top = 0 } = this.rect;
      const style = {
        position: "fixed",
        top: `${top + height}px`,
        left: 0,
        right: 0,
        zIndex: this.zIndex,
        bottom: 0,
        "background-color": `rgba(0, 0, 0, ${this.opacity})`
      };
      return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
    },
    list() {
      try {
        return Array.isArray(this.currentDropItem.child) ? this.currentDropItem.child : [];
      } catch (e) {
        return [];
      }
    },
    getTextColor(index) {
      return (index2) => {
        const active = this.currentDropItem.activeIndex == index2;
        const color = this.currentDropItem.color;
        const activeColor = this.currentDropItem.activeColor;
        if (active) {
          return activeColor ? activeColor : "#3c9cff";
        }
        return color ? color : "#333";
      };
    },
    getTextSize(index) {
      return (index2) => {
        const active = this.currentDropItem.activeIndex == index2;
        const size = this.currentDropItem.size;
        const activeSize = this.currentDropItem.activeSize;
        if (active) {
          return activeSize ? activeSize : "30rpx";
        }
        return size ? size : "30rpx";
      };
    },
    itemCustomStyle() {
      return (index) => {
        const active = this.currentDropItem.activeIndex == index;
        const style = {};
        if (active && this.currentDropItem.itemActiveCustomStyle) {
          return this.$uv.deepMerge(style, this.$uv.addStyle(this.currentDropItem.itemActiveCustomStyle));
        }
        if (this.currentDropItem.itemCustomStyle) {
          return this.$uv.deepMerge(style, this.$uv.addStyle(this.currentDropItem.itemCustomStyle));
        }
        return style;
      };
    }
  },
  created() {
    this.init();
  },
  methods: {
    blockClick() {
    },
    clickHandler(item, index) {
      this.currentDropItem.activeIndex = index;
      this.$emit("clickItem", item);
      this.close();
    },
    init() {
      common_vendor.index.$off(`${this.sign}_GETRECT`);
      common_vendor.index.$on(`${this.sign}_GETRECT`, (rect) => {
        this.rect = rect;
      });
      common_vendor.index.$off(`${this.sign}_CLICKMENU`);
      common_vendor.index.$on(`${this.sign}_CLICKMENU`, async (res) => {
        if (res.show) {
          this.open();
        } else {
          this.close();
        }
      });
    },
    open() {
      this.show = true;
      this.$nextTick(async () => {
        const res = await this.queryRect();
        this.height = res.height;
        this.$emit("popupChange", { show: true });
      });
    },
    close() {
      if (!this.show)
        return;
      this.height = 0;
      this.height = 0;
      this.show = false;
      common_vendor.index.$emit(`${this.sign}_CLOSEPOPUP`);
      this.$emit("popupChange", { show: false });
    },
    clickOverlay() {
      if (this.clickOverlayOnClose) {
        this.close();
      }
    },
    // 查询内容高度
    queryRect() {
      return new Promise((resolve) => {
        this.$uvGetRect(`.uv-dp__container__list`).then((size) => {
          resolve(size);
        });
      });
    },
    // nvue下设置高度
    animation(height, duration = 200) {
    }
  }
};
if (!Array) {
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_transition2 = common_vendor.resolveComponent("uv-transition");
  (_easycom_uv_text2 + _easycom_uv_transition2)();
}
const _easycom_uv_text = () => "../../../uv-text/components/uv-text/uv-text.js";
const _easycom_uv_transition = () => "../../../uv-transition/components/uv-transition/uv-transition.js";
if (!Math) {
  (_easycom_uv_text + _easycom_uv_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.list, (item, index, i0) => {
      return {
        a: "8097163a-1-" + i0 + ",8097163a-0",
        b: common_vendor.p({
          text: item[$props.keyName],
          size: $options.getTextSize(index),
          color: $options.getTextColor(index)
        }),
        c: index,
        d: common_vendor.o(($event) => $options.clickHandler(item, index), index),
        e: common_vendor.s($options.itemCustomStyle(index))
      };
    }),
    b: `${$data.height}px`,
    c: common_vendor.o((...args) => $options.blockClick && $options.blockClick(...args)),
    d: common_vendor.o($options.clickOverlay),
    e: common_vendor.p({
      show: $data.show,
      mode: "fade",
      duration: 300,
      ["custom-style"]: $options.overlayStyle
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8097163a"], ["__file", "/Users/wei/cargo/uni_modules/uv-drop-down/components/uv-drop-down-popup/uv-drop-down-popup.vue"]]);
wx.createComponent(Component);
