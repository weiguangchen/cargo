<template>
  <view class="uv-navbar">
    <view
      class="uv-navbar__placeholder"
      v-if="fixed && placeholder"
      :style="{
        height: $uv.addUnit(
          $uv.getPx(height) + $uv.sys().statusBarHeight,
          'px'
        ),
      }"
    ></view>
    <view :class="[fixed && 'uv-navbar--fixed']">
      <image
        class="uv-navbar--bgimg"
        :src="bgColor"
        :mode="imgMode"
        v-if="isImg"
        :style="[bgImgStyle]"
      ></image>
      <uv-status-bar
        v-if="safeAreaInsetTop"
        :bgColor="getStatusbgColor"
      ></uv-status-bar>
      <view
        class="uv-navbar__content"
        :class="[border && 'uv-border-bottom']"
        :style="[
          {
            height: $uv.addUnit(height),
          },
          getBgColor,
        ]"
      >
        <view
          class="uv-navbar__content__left"
          hover-class="uv-navbar__content__left--hover"
          hover-start-time="150"
          @tap="leftClick"
        >
          <slot name="left">
            <uv-icon
              v-if="leftIcon"
              :name="leftIcon"
              :size="leftIconSize"
              :color="leftIconColor"
            ></uv-icon>
            <text
              v-if="leftText"
              :style="{
                color: leftIconColor,
              }"
              class="uv-navbar__content__left__text"
              >{{ leftText }}</text
            >
          </slot>
        </view>
        <view
          class="uv-navbar__content__center"
          :style="{ paddingRight: `${menuInfoLeft}px` }"
        >
          <slot name="center">
            <view
              class="uv-navbar__content__title"
              :style="[$uv.addStyle(titleStyle)]"
            >
              <view class="uv-line-1 title">{{ title }}</view>
            </view>
          </slot>
        </view>
        <!-- <view class="uv-navbar__content__right" @tap="rightClick">
          <slot name="right">
            <uv-icon v-if="rightIcon" :name="rightIcon" size="20"></uv-icon>
            <text v-if="rightText" class="uv-navbar__content__right__text">{{
              rightText
            }}</text>
          </slot>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import mpMixin from "/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js";
import mixin from "/uni_modules/uv-ui-tools/libs/mixin/mixin.js";
import props from "/uni_modules/uv-navbar/components/uv-navbar/props.js";

/**
 * Navbar 自定义导航栏
 * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uni-app带的导航栏。
 * @tutorial https://www.uvui.cn/components/navbar.html
 * @property {Boolean}			safeAreaInsetTop	是否开启顶部安全区适配  （默认 true ）
 * @property {Boolean}			placeholder			固定在顶部时，是否生成一个等高元素，以防止塌陷 （默认 false ）
 * @property {Boolean}			fixed				导航栏是否固定在顶部 （默认 false ）
 * @property {Boolean}			border				导航栏底部是否显示下边框 （默认 false ）
 * @property {String}			leftIcon			左边返回图标的名称，只能为uvui自带的图标 （默认 'arrow-left' ）
 * @property {String}			leftText			左边的提示文字
 * @property {String}			rightText			右边的提示文字
 * @property {String}			rightIcon			右边返回图标的名称，只能为uvui自带的图标
 * @property {String}			title				导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String}			bgColor				导航栏背景设置 （默认 '#ffffff' ）
 * @property {String | Number}	titleWidth			导航栏标题的最大宽度，内容超出会以省略号隐藏 （默认 '400rpx' ）
 * @property {String | Number}	height				导航栏高度(不包括状态栏高度在内，内部自动加上)（默认 '44px' ）
 * @property {String | Number}	leftIconSize		左侧返回图标的大小（默认 20px ）
 * @property {String | Number}	leftIconColor		左侧返回图标的颜色（默认 #303133 ）
 * @property {Boolean}	        autoBack			点击左侧区域(返回图标)，是否自动返回上一页（默认 false ）
 * @property {Object | String}	titleStyle			标题的样式，对象或字符串
 * @event {Function} leftClick		点击左侧区域
 * @event {Function} rightClick		点击右侧区域
 * @example <uv-navbar title="剑未配妥，出门已是江湖" left-text="返回" right-text="帮助" @click-left="onClickBack" @click-right="onClickRight"></uv-navbar>
 */
export default {
  name: "uv-navbar",
  mixins: [mpMixin, mixin, props],
  data() {
    return {
      menuInfoLeft: 0,
    };
  },
  computed: {
    getBgColor() {
      const style = {};
      if (this.bgColor) {
        if (this.bgColor.indexOf("gradient") > -1) {
          // 渐变色
          style.backgroundImage = this.bgColor;
        } else if (this.isImg) {
          style.background = "transparent";
        } else {
          style.background = this.bgColor;
        }
      }
      return style;
    },
    getStatusbgColor() {
      if (this.bgColor) {
        if (this.isImg) {
          return "transparent";
        } else {
          return this.bgColor;
        }
      }
    },
    // 判断传入的bgColor属性，是否图片路径，只要带有"/"均认为是图片形式
    isImg() {
      const isBase64 =
        this.bgColor.indexOf("data:") > -1 &&
        this.bgColor.indexOf("base64") > -1;
      return this.bgColor.indexOf("/") !== -1 || isBase64;
    },
    bgImgStyle() {
      const style = {};
      if (this.safeAreaInsetTop) {
        style.height = this.$uv.addUnit(
          this.$uv.sys().statusBarHeight + 44,
          "px"
        );
      } else {
        style.height = "44px";
      }
      return style;
    },
  },
  methods: {
    // 点击左侧区域
    leftClick() {
      // 如果配置了autoBack，自动返回上一页
      this.$emit("leftClick");
      if (this.autoBack) {
        uni.navigateBack();
      }
    },
    // 点击右侧区域
    rightClick() {
      this.$emit("rightClick");
    },
  },
  mounted() {
    const res = uni.getMenuButtonBoundingClientRect();
    // console.log(res);
    const res2 = uni.getWindowInfo();
    // console.log(res2);
    this.menuInfoLeft = res2.screenWidth - res.left;
    // console.log("menuInfoLeft", this.menuInfoLeft);
  },
};
</script>

<style lang="scss" scoped>
$show-border: 1;
$show-border-bottom: 1;
$show-lines: 1;
@import "/uni_modules/uv-ui-tools/libs/css/variable.scss";
@import "/uni_modules/uv-ui-tools/libs/css/components.scss";
@import "/uni_modules/uv-ui-tools/libs/css/color.scss";
.uv-navbar {
  position: relative;
  &--fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 11;
  }

  &--bgimg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    /* #ifndef APP-NVUE */
    width: 100%;
    height: 100%;
    /* #endif */
    /* #ifdef APP-NVUE */
    width: 750rpx;
    /* #endif */
  }

  &__content {
    @include flex(row);
    // align-items: center;
    height: 44px;
    background-color: #9acafc;
    position: relative;
    justify-content: center;

    &__left,
    &__right {
      padding: 0 13px;
      // position: absolute;
      top: 0;
      bottom: 0;
      @include flex(row);
      align-items: center;
    }

    &__left {
      left: 0;

      &--hover {
        opacity: 0.7;
      }

      &__text {
        font-size: 15px;
        margin-left: 3px;
      }
    }

    &__center {
      flex: 1;
    }

    &__title {
      flex-direction: row;
      flex: 1;
      display: flex;
      align-items: center;
      // justify-content: center;
      justify-content: flex-start;
      font-size: 16px;
      color: var(--title-color);
      font-weight: bold;
      .title {
        flex: 1;
      }
    }

    &__right {
      right: 0;

      &__text {
        font-size: 15px;
        margin-left: 3px;
      }
    }
  }
}
</style>
