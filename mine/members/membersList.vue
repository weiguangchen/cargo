<template>
  <view class="membersList-container">
    <my-navbar :title="cus.CusName" @leftClick="leftClick"></my-navbar>

    <my-empty
      v-if="!inited && loading"
      img="/static/images/empty/loading.gif"
      text="加载中"
    />
    <my-empty
      v-else-if="!hasDataAtLeastOnce"
      img="/static/images/empty/address1.png"
      text="您暂未与生产企业签约"
    />
    <view v-else class="list-wrapper">
      <view class="search-wrapper">
        <my-search-box
          v-model="keyword"
          :showBtn="false"
          placeholder="成员姓名/手机号码/显示名称"
          @search="handleSearch"
          @clear="handleSearch"
        />
      </view>
      <scroll-view
        class="scroll-view"
        :class="{
          'safe-area': cus.IsLeader !== '1',
        }"
        scroll-y
      >
        <my-empty
          v-if="inited && loading"
          img="/static/images/empty/loading.gif"
          text="加载中"
        />
        <my-empty
          v-else-if="list.length === 0"
          img="/static/images/empty/search.png"
          text="暂无相关成员"
        />
        <template v-else>
          <view>
            <view
              class="member-item"
              v-for="staff in list"
              :key="staff.StaffId"
              @click="handleEditMember(staff)"
            >
              <view class="member-info">
                <view class="avatar">
                  <uv-image
                    v-if="staff.headicon === '0' || staff.headicon === null"
                    src="/static/images/avatar/default.png"
                    width="96rpx"
                    height="96rpx"
                    :customStyle="{
                      borderRadius: '50%',
                    }"
                  />
                  <uv-image
                    v-else-if="staff.headicon === '1'"
                    src="/static/images/avatar/male.png"
                    width="96rpx"
                    height="96rpx"
                    :customStyle="{
                      borderRadius: '50%',
                    }"
                  />
                  <uv-image
                    v-else-if="staff.headicon === '2'"
                    src="/static/images/avatar/female.png"
                    width="96rpx"
                    height="96rpx"
                    :customStyle="{
                      borderRadius: '50%',
                    }"
                  />
                </view>
                <view class="info">
                  <view class="name">
                    <view class="username uv-line-1">{{
                      staff.StaffName
                    }}</view>
                    <view class="realname"
                      >（<text class="text uv-line-1">{{
                        staff.StaffNickName || "未设置"
                      }}</text
                      >）</view
                    >
                  </view>
                  <view class="phone">{{
                    staff.StaffMobile ? desensitizePhone(staff.StaffMobile) : ""
                  }}</view>
                </view>
                <view class="tags">
                  <view class="tag boss" v-if="staff.Leader === '1'"
                    >负责人</view
                  >
                  <view class="tag me" v-if="staff.Mine === '1'">我</view>
                </view>
              </view>
              <view
                class="permission-wrapper"
                v-if="staff.AssignLabel || staff.DataLabel"
              >
                <view class="title">权限：</view>
                <view class="tags">
                  <view
                    v-if="staff.AssignLabel"
                    class="tag"
                    :class="{
                      green: staff.AssignLabelType === 1,
                      'light-green': staff.AssignLabelType === 2,
                      red: staff.AssignLabelType === 3,
                      warn: staff.AssignLabelType === 4,
                    }"
                    >{{ staff.AssignLabel }}</view
                  >
                  <view
                    v-if="staff.DataLabel"
                    class="tag"
                    :class="{
                      green: staff.DataLabelType === 1,
                      'light-green': staff.DataLabelType === 2,
                      red: staff.DataLabelType === 3,
                      warn: staff.DataLabelType === 4,
                    }"
                    >{{ staff.DataLabel }}</view
                  >
                </view>
              </view>
            </view>
          </view>
          <view class="total-num">
            -&nbsp;共&nbsp;<text class="num">{{ list.length }}</text
            >&nbsp;人&nbsp;-
          </view>
        </template>
      </scroll-view>
    </view>

    <view class="page-footer" v-if="cus.IsLeader === '1'">
      <uv-button
        text="+ 添加成员"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"
        @click="handleAddMember"
      />
    </view>
  </view>

  <!-- 添加成员抽屉 -->
  <AddMemberDrawer ref="addMemberDrawer" @success="handleSuccess" />
</template>

<script setup>
import { onReady, onLoad } from "@dcloudio/uni-app";
import AddMemberDrawer from "./components/AddMemberDrawer.vue";
import { ref, unref, getCurrentInstance } from "vue";
import { desensitizePhone } from "@/utils/index.js";
import { GetStaffByCusId } from "@/api/index.js";

let eventChannel = null;
const cus = ref({});
const supplyId = ref("");
onLoad(() => {
  console.log("Page loaded");
  const instance = getCurrentInstance().proxy;
  eventChannel = instance.getOpenerEventChannel();
  eventChannel.on("acceptDataFromOpenerPage", async function (data) {
    console.log("acceptDataFromOpenerPage", data);
    cus.value = data?.cus ?? {};
    supplyId.value = data?.supplyId ?? "";

    await getList();
    inited.value = true;
  });
});

function leftClick() {
  uni.navigateBack();
}

const inited = ref(false);
const loading = ref(true);
const list = ref([]);
const IsLeader = ref("0"); //登录人 0是普通成员1是负责人；
const hasDataAtLeastOnce = ref(false);
const keyword = ref("");
async function getList() {
  try {
    loading.value = true;
    const res = await GetStaffByCusId({
      cusId: unref(cus).CusId,
      supplyId: unref(supplyId),
      htkeyWord: unref(keyword),
    });
    cus.value = res || {};
    list.value = res?.CusStaffList ?? [];
    IsLeader.value = res?.IsLeader ?? "0";

    if (unref(list).length > 0) {
      hasDataAtLeastOnce.value = true;
    }
  } catch (err) {
    uni.showToast({ title: err.data, icon: "none" });
  } finally {
    loading.value = false;
  }
}

async function handleSearch() {
  await getList();
}

// 添加成员抽屉
const addMemberDrawer = ref(null);
function handleAddMember() {
  unref(addMemberDrawer).open({
    cus: unref(cus),
    supplyId: unref(supplyId),
    formMode: "add",
  });
}
// 编辑成员抽屉
function handleEditMember(staff) {
  let formMode = "read";
  const IsLeader = unref(cus).IsLeader;
  if (IsLeader === "1") {
    if (staff.Leader === "1") {
      formMode = "read";
    } else {
      formMode = "edit";
    }
  } else {
    formMode = "read";
  }
  unref(addMemberDrawer).open({
    staff,
    cus: unref(cus),
    supplyId: unref(supplyId),
    formMode,
  });
}

function handleSuccess() {
  getList();
  eventChannel.emit("success");
}
</script>

<style lang="scss">
.membersList-container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .list-wrapper {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;

    .search-wrapper {
      padding: 20rpx 24rpx;
    }

    .scroll-view {
      box-sizing: border-box;
      flex: 1;
      width: 100%;
      min-height: 0;
      padding: 0 24rpx;

      .total-num {
        padding: 28rpx 0;
        text-align: center;
        font-size: 26rpx;
        line-height: 1;
        color: var(--sub-color);
        .num {
          font-family: misans500;
          color: var(--dark-main);
        }
      }
    }

    .safe-area {
      padding-bottom: max(var(--safe-area-inset-bottom), var(--safe-bottom));
    }

    .member-item {
      padding: 28rpx 24rpx 28rpx;
      border-radius: 24rpx;
      background-color: #fff;
      &:not(:last-child) {
        margin-bottom: 20rpx;
      }
      .member-info {
        display: flex;
        justify-content: space-between;
        .avatar {
          width: 96rpx;
          height: 96rpx;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 28rpx;
        }
        .info {
          padding: 4rpx 0;
          flex: 1;
          margin-right: 10rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            display: flex;
            align-items: baseline;
            .username {
              max-width: 192rpx;
              font-weight: 500;
              font-size: 32rpx;
              color: var(--title-color);
              line-height: 48rpx;
            }
            .realname {
              display: inline-flex;
              align-items: baseline;
              font-size: 26rpx;
              color: var(--intr-color);
              line-height: 36rpx;
              .text {
                max-width: 104rpx;
              }
            }
          }
          .phone {
            font-family: misans400;
            font-size: 26rpx;
            color: var(--sub-color);
            line-height: 36rpx;
          }
        }
        .tags {
          align-self: flex-start;
          padding-top: 18rpx;
          flex: none;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: flex-start;
          .tag {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 40rpx;
            line-height: 40rpx;
            padding: 0 12rpx;
            font-weight: bold;
            font-size: 24rpx;
            border-radius: 8rpx;
            &:not(:last-child) {
              margin-right: 16rpx;
            }
            &.boss {
              background-color: #b0becc;
              color: #fff;
            }
            &.me {
              background-color: var(--page-bg);
              color: var(--intr-color);
            }
          }
        }
      }
      .permission-wrapper {
        margin-top: 24rpx;
        .title {
          font-weight: bold;
          font-size: 26rpx;
          color: var(--intr-color);
          line-height: 36rpx;
          margin-bottom: 12rpx;
        }
        .tags {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: flex-start;
          .tag {
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 48rpx;
            padding: 0 16rpx;
            border-radius: 8rpx;
            font-size: 26rpx;
            &:not(:last-child) {
              margin-right: 16rpx;
            }
            &.green {
              background-color: var(--main-color);
              color: #fff;
            }
            &.light-green {
              background-color: var(--light-main);
              color: var(--dark-main);
            }
            &.red {
              background-color: var(--red-color);
              color: #fff;
            }
            &.warn {
              background-color: var(--warn-color);
              color: #fff;
            }
          }
        }
      }
    }
  }

  .page-footer {
    position: relative;
  }
}
</style>
