<template>
  <my-drawer title="成员信息" ref="drawer">
    <view class="member-info">
      <!-- 添加/编辑 -->
      <template>
        <my-item-group>
          <my-item showArrow title="真实姓名" value="欧阳娜娜" />
          <my-item title="显示名称" value="娜姐" />
          <my-item showArrow title="手机号" value="13800138000" />
          <my-item
            :border="false"
            showArrow
            title="成员角色"
            value="普通成员"
          />
        </my-item-group>
        <my-item-group>
          <my-item title="派车权限" value="欧阳娜娜">
            <template #value>
              <uv-switch
                v-model="value"
                active-color="var(--main-color)"
                inactive-color="#C8D4DF"
              />
            </template>
          </my-item>
          <my-item
            :border="false"
            showArrow
            title="数据权限"
            value="全部数据"
          />
        </my-item-group>
      </template>

      <!-- 查看 -->
      <!-- <template>
        <my-item-group>
          <my-item
            title="真实姓名"
            value="欧阳娜娜"
            :valueStyle="{ fontWeight: 'bold' }"
          />
          <my-item
            title="显示名称"
            value="娜姐"
            :valueStyle="{ fontWeight: 'bold' }"
          />
          <my-item title="手机号">
            <template #value>
              <view>
                <text style="font-family: misans500">13824500566</text>
                <text style="color: #c8d4df">&nbsp;丨&nbsp;</text>
                <text style="color: var(--main-color); font-weight: bold"
                  >呼叫</text
                ></view
              >
            </template>
          </my-item>
          <my-item
            :border="false"
            title="成员角色"
            value="普通成员"
            :valueStyle="{ fontWeight: 'bold' }"
          />
        </my-item-group>
        <my-item-group>
          <my-item
            title="派车权限"
            value="准许派车"
            :valueStyle="{ fontWeight: 'bold' }"
          />
          <my-item
            :border="false"
            title="数据权限"
            value="全部数据"
            :valueStyle="{ fontWeight: 'bold' }"
          />
        </my-item-group>
      </template> -->
    </view>

    <template #footer>
      <!-- <uv-button
        text="确认"
        color="linear-gradient( 270deg, #31CE57 0%, #02B72E 100%)"
        :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
        :custom-text-style="{ fontWeight: 'bold' }"
      /> -->
      <uv-button
        text="解除该成员"
        color="#ffffff"
        :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
        :custom-text-style="{ fontWeight: 'bold', color: 'var(--red-color)' }"
        @click="handleDelete"
      />
    </template>
  </my-drawer>

  <my-confirm ref="confirm" />
</template>

<script setup>
import { ref, unref } from "vue";

const drawer = ref(null);

const value = ref(false);

const confirm = ref(null);
function handleDelete() {
  unref(confirm).confirm({
    title: "确认解除该成员?",
    content:
      "该成员将无法进行派车及数据查看等操作，其此前创建的派车等任务不受影响",
    cancelText: "再想想",
    confirmText: "确认解除",
    asyncClose: true,
    closeOnClickOverlay: false,
    async confirm() {
      // try {
      //   await DelteUserCarno({
      //     Id: model.Id,
      //   });
      //   confirm.value.close();
      //   await showToast("删除成功");
      //   eventChannel.emit("success");
      //   uni.navigateBack();
      // } catch (err) {
      //   uni.showToast({
      //     title: err.data,
      //     icon: "none",
      //   });
      //   confirm.value.closeLoading();
      // }
    },
  });
}

function open() {
  unref(drawer).popup.open();
}

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.member-info {
  padding: 0 24rpx;
  .my-item {
    &-value {
      display: flex;
      align-items: center;
    }
  }
}
</style>
