"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uvUiTools_libs_mixin_mpMixin = require("../../../uv-ui-tools/libs/mixin/mpMixin.js");
const uni_modules_uvUiTools_libs_mixin_mixin = require("../../../uv-ui-tools/libs/mixin/mixin.js");
const _sfc_main = {
  name: "uv-drop-down",
  mixins: [uni_modules_uvUiTools_libs_mixin_mpMixin.mpMixin, uni_modules_uvUiTools_libs_mixin_mixin.mixin],
  emits: ["click"],
  props: {
    isSticky: {
      type: Boolean,
      default: true
    },
    sign: {
      type: [String, Number],
      default: "UVDROPDOWN"
    },
    defaultValue: {
      type: Array,
      default: () => [0, "0", "all"]
    },
    textSize: {
      type: String,
      default: "30rpx"
    },
    textColor: {
      type: String,
      default: "#333"
    },
    textActiveSize: {
      type: String,
      default: "30rpx"
    },
    textActiveColor: {
      type: String,
      default: "#3c9cff"
    },
    extraIcon: {
      type: Object,
      default() {
        return {
          name: "arrow-down",
          size: "30rpx",
          color: "#333"
        };
      }
    },
    extraActiveIcon: {
      type: Object,
      default() {
        return {
          name: "arrow-up",
          size: "30rpx",
          color: "#3c9cff"
        };
      }
    }
  },
  computed: {
    parentData() {
      return [this.defaultValue, this.textSize, this.textColor, this.textActiveColor, this.textActiveSize, this.extraIcon, this.extraActiveIcon, this.sign, this.clickHandler];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      common_vendor.index.$emit(`${this.sign}_CLICKMENU`, {
        show: false
      });
      this.$nextTick(async () => {
        const rect = await this.queryRect();
        common_vendor.index.$emit(`${this.sign}_GETRECT`, rect);
      });
    },
    // 查询内容高度
    queryRect() {
      return new Promise((resolve) => {
        this.$uvGetRect(`.uv-drop-down`).then((size) => {
          resolve(size);
        });
      });
    },
    clickHandler(data) {
      this.$emit("click", data);
    }
  }
};
if (!Array) {
  const _easycom_uv_sticky2 = common_vendor.resolveComponent("uv-sticky");
  _easycom_uv_sticky2();
}
const _easycom_uv_sticky = () => "../../../uv-sticky/components/uv-sticky/uv-sticky.js";
if (!Math) {
  _easycom_uv_sticky();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s(_ctx.$uv.addStyle(_ctx.customStyle)),
    b: common_vendor.p({
      disabled: !$props.isSticky
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3d5a0a1e"], ["__file", "/Users/wei/cargo/uni_modules/uv-drop-down/components/uv-drop-down/uv-drop-down.vue"]]);
wx.createComponent(Component);
