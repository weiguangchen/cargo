<template>
  <my-bottom-drawer title="成员信息" ref="bottomDrawer">
    <view class="add-member-form">
      <uv-form
        labelPosition="left"
        labelWidth="auto"
        :model="model"
        :rules="rules"
        ref="form"
        :labelStyle="{
          fontSize: '28rpx',
          color: 'var(--content-color)',
          lineHeight: '48rpx',
        }"
      >
        <view class="form-group">
          <view class="my-border-bottom">
            <InputDrawer
              label="真实姓名"
              prop="staffName"
              v-model="model.staffName"
              placeholder="请输入"
            />
          </view>
          <view class="my-border-bottom">
            <uv-form-item
              label="显示名称"
              prop="nickName"
              :customStyle="{ padding: '32rpx 4rpx' }"
            >
              <uv-input
                v-model="model.nickName"
                border="none"
                disabled
                disabledColor="#ffffff"
                placeholder="自动关联"
                inputAlign="right"
              />
            </uv-form-item>
          </view>
          <view class="my-border-bottom">
            <uv-form-item
              label="手机号"
              prop="staffMobile"
              :customStyle="{ padding: '32rpx 4rpx' }"
            >
              <uv-input
                v-model="model.staffMobile"
                border="none"
                disabled
                disabledColor="#ffffff"
                placeholder="请输入"
                inputAlign="right"
              />
              <template v-slot:right>
                <uv-icon
                  name="/static/images/ui/right-arrow.png"
                  width="24rpx"
                  height="24rpx"
                />
              </template>
            </uv-form-item>
          </view>
          <uv-form-item
            label="成员角色"
            prop="leader"
            :customStyle="{ padding: '32rpx 4rpx' }"
            @click="showSexSelect"
          >
            <uv-input
              v-model="model.leader"
              border="none"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择"
              inputAlign="right"
            />
            <template v-slot:right>
              <uv-icon
                name="/static/images/ui/right-arrow.png"
                width="24rpx"
                height="24rpx"
              />
            </template>
          </uv-form-item>
        </view>
        <view class="form-group">
          <view class="my-border-bottom">
            <uv-form-item
              label="派车权限"
              prop="assignPer"
              :customStyle="{ padding: '32rpx 4rpx' }"
              @click="showSexSelect"
            >
              <template v-slot:right>
                <uv-switch
                  v-model="model.assignPer"
                  active-color="var(--main-color)"
                  inactive-color="#C8D4DF"
                />
              </template>
            </uv-form-item>
          </view>
          <uv-form-item
            label="数据权限"
            prop="dataPer"
            :customStyle="{ padding: '32rpx 4rpx' }"
            @click="showSexSelect"
          >
            <uv-input
              v-model="model.dataPer"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择"
              border="none"
              inputAlign="right"
            >
            </uv-input>
            <template v-slot:right>
              <uv-icon
                name="/static/images/ui/right-arrow.png"
                width="24rpx"
                height="24rpx"
              />
            </template>
          </uv-form-item>
        </view>
      </uv-form>
    </view>
  </my-bottom-drawer>
</template>

<script setup>
import { ref, unref, reactive } from "vue";
import InputDrawer from "./InputDrawer.vue";

const bottomDrawer = ref(null);

function open() {
  unref(bottomDrawer).popup.open();
}

function close() {
  unref(bottomDrawer).popup.close();
}

// 表单
const form = ref(null);
const model = reactive({
  staffName: "",
  nickName: "",
  staffMobile: "",
  leader: "",
  assignPer: false,
  dataPer: "",
});

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.add-member-form {
  padding: 0 24rpx;
  .form-group {
    background-color: #fff;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    padding: 0 24rpx;
  }
}
</style>
