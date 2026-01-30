<template>
  <my-bottom-drawer
    :title="
      formMode === 'read'
        ? '成员信息'
        : formMode === 'edit'
        ? '编辑成员'
        : '添加成员'
    "
    ref="bottomDrawer"
    confirmButtonText="确认添加"
    :showConfirmButton="formMode !== 'read'"
    @change="handleDrawerChange"
  >
    <view class="add-member-form">
      <uv-form
        labelPosition="left"
        labelWidth="auto"
        :model="model"
        :rules="rules"
        ref="form"
        errorType="toast"
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
              uptType="StaffName"
              v-model="model.staffName"
              placeholder="请输入"
              :rules="staffNameRules"
              :mode="formMode"
              :disabled="formMode === 'read'"
              :supplyId="supplyId"
              :staff="staff"
              @success="handleSuccess"
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
                :customStyle="{ fontWeight: 'bold' }"
                placeholder-style="font-weight: normal;color:var(--intr-color);"
              />
            </uv-form-item>
          </view>
          <view class="my-border-bottom">
            <InputDrawer
              label="手机号"
              prop="staffMobile"
              uptType="StaffMobile"
              v-model="model.staffMobile"
              placeholder="请输入"
              :rules="staffMobileRules"
              @change="handleMobileChange"
              :mode="formMode"
              :disabled="formMode === 'read'"
              :supplyId="supplyId"
              :staff="staff"
              @success="handleSuccess"
            >
              <template #right>
                <template v-if="formMode === 'read' && staff.Mine !== '1'">
                  <text style="color: #c8d4df">&nbsp;丨&nbsp;</text>
                  <text
                    style="color: var(--main-color); font-weight: bold"
                    @click="handleCall(model.staffMobile)"
                    >呼叫</text
                  >
                </template>
              </template>
            </InputDrawer>
          </view>
          <SelectDrawer
            v-if="formMode !== 'read'"
            label="成员角色"
            prop="leader"
            uptType="Leader"
            v-model="model.leader"
            placeholder="请选择"
            :rules="leaderRules"
            :options="leaderPerOptions"
            :mode="formMode"
            :supplyId="supplyId"
            :staff="staff"
            @success="handleSuccess"
          />
          <uv-form-item
            v-else
            label="成员角色"
            prop="leader"
            :customStyle="{ padding: '32rpx 4rpx' }"
          >
            <view style="font-weight: bold; text-align: right">{{
              staff.Leader === "1" ? "负责人" : "普通成员"
            }}</view>
          </uv-form-item>
        </view>
        <view
          class="form-group"
          v-if="
            formMode !== 'read' ||
            IsLeader === '1' ||
            (IsLeader === '0' && staff.Mine === '1')
          "
        >
          <view class="my-border-bottom">
            <uv-form-item
              label="派车权限"
              prop="assignPer"
              :customStyle="{ padding: '32rpx 4rpx' }"
            >
              <template v-slot:right>
                <uv-switch
                  v-if="formMode !== 'read'"
                  v-model="model.assignPer"
                  active-color="var(--main-color)"
                  inactive-color="#C8D4DF"
                  activeValue="1"
                  inactiveValue="0"
                  :asyncChange="formMode === 'edit'"
                  :loading="assignPerLoading"
                  @change="handleAssignPerChange"
                />
                <template v-else>
                  <view style="font-weight: bold">{{ staff.AssignLabel }}</view>
                </template>
              </template>
            </uv-form-item>
          </view>
          <SelectDrawer
            v-if="formMode !== 'read'"
            label="数据权限"
            prop="dataPer"
            uptType="DataPer"
            v-model="model.dataPer"
            placeholder="请选择"
            :rules="dataPerRules"
            :options="dataPerOptions"
            :mode="formMode"
            :supplyId="supplyId"
            :staff="staff"
            @success="handleSuccess"
          />
          <uv-form-item
            v-else
            label="数据权限"
            prop="dataPer"
            :customStyle="{ padding: '32rpx 4rpx' }"
          >
            <view style="font-weight: bold; text-align: right">{{
              staff.DataLabel
            }}</view>
          </uv-form-item>
        </view>
      </uv-form>
    </view>

    <template #footer>
      <uv-button
        v-if="formMode === 'add'"
        text="确认添加"
        color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
        @click="handleConfirm"
        :loading="loading"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :custom-text-style="{ fontWeight: 'bold' }"
      />
      <uv-button
        v-else-if="formMode === 'edit'"
        text="解除该成员"
        color="#ffffff"
        @click="handleRemove"
        :loading="loading"
        :custom-style="{ borderRadius: '8px', height: '48px' }"
        :custom-text-style="{ color: 'var(--red-color)', fontWeight: 'bold' }"
      />
    </template>
  </my-bottom-drawer>

  <my-confirm ref="confirm" />
</template>

<script setup>
import { ref, unref, reactive, onMounted } from "vue";
import InputDrawer from "./InputDrawer.vue";
import SelectDrawer from "./SelectDrawer.vue";
import {
  GetNickNameByMobile,
  GetPerList,
  OprCusStaff,
  UptCusStaff,
} from "@/api/index.js";
import { useResetable } from "@/utils/index.js";

const confirm = ref(null);

const emits = defineEmits(["success", "change"]);
// 表单
// add | edit | read
const formMode = ref("read");
const supplyId = ref("");
const cus = ref({});
const IsLeader = ref("0");
const cusId = ref("");

const form = ref(null);
// const model = ref({
//   staffName: "",
//   nickName: "",
//   staffMobile: "",
//   leader: "",
//   assignPer: "",
//   dataPer: "",
// });
const { data: model, reset: resetModel } = useResetable({
  staffName: "",
  nickName: "",
  staffMobile: "",
  leader: "",
  assignPer: "0",
  dataPer: "",
});

const staffNameRules = [
  { required: true, message: "请填写成员姓名", trigger: "change" },
  { max: 6, message: "成员姓名最多6个字", trigger: "change" },
];
const staffMobileRules = [
  { required: true, message: "请填写成员手机号", trigger: "change" },
  {
    validator: (rule, value, callback) => {
      return uni.$uv.test.mobile(value);
    },
    message: "请填写正确的手机号",
    trigger: "change",
  },
];
const leaderRules = [
  { required: true, message: "请选择成员角色", trigger: "change" },
];
const dataPerRules = [
  { required: true, message: "请选择数据权限", trigger: "change" },
];
const rules = reactive({
  staffName: staffNameRules,
  staffMobile: staffMobileRules,
  leader: leaderRules,
  dataPer: dataPerRules,
});
// 修改手机号
async function handleMobileChange(mobile) {
  try {
    const res = await GetNickNameByMobile({ mobile });
    model.value.nickName = res || "未设置";
  } catch {}
}
// 获取下拉框
const dataPerOptions = ref([]);
async function getDataPerOptions() {
  const res = await GetPerList({ perType: "DataPer" });
  dataPerOptions.value = res;

  //   if (res.length === 1) {
  //     model.value.dataPer = res[0].Value;
  //   }
}
const leaderPerOptions = ref([]);
async function getLeaderPerOptions() {
  const res = await GetPerList({ perType: "LeaderPer" });
  leaderPerOptions.value = res;

  //   if (res.length === 1) {
  //     model.value.leader = res[0].Value;
  //   }
}
onMounted(() => {
  getDataPerOptions();
  getLeaderPerOptions();
});

const assignPerLoading = ref(false);
async function handleAssignPerChange(value) {
  console.log("handleAssignPerChange", value);
  if (formMode.value === "add") {
    model.value.assignPer = value;
    return;
  }
  assignPerLoading.value = true;
  try {
    const params = {
      staffId: unref(staff).StaffId,
      supplyId: unref(supplyId),
      uptType: "AssignPer",
      uptContent: value,
    };
    await UptCusStaff(params);
    model.value.assignPer = value;
  } catch (err) {
    console.log("提交失败", err);
    uni.showToast({
      title: err.data,
      icon: "none",
    });
  } finally {
    assignPerLoading.value = false;
  }
}

const loading = ref(false);
async function handleConfirm() {
  loading.value = true;
  try {
    await unref(form).validate();
  } catch (err) {
    console.log("验证失败", err);
    loading.value = false;
    return;
  }

  try {
    const params = {
      ...unref(model),
      oprType: "Add",
      supplyId: unref(supplyId),
      cusId: unref(cus).CusId,
    };
    console.log("新增params", params);
    await OprCusStaff(params);
    emits("success", unref(model));
    resetModel();
    tempModel.value = {};
    close();
  } catch (err) {
    console.log("提交失败", err);
    uni.showToast({
      title: err.data,
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
}
async function handleRemove() {
  unref(confirm).confirm({
    title: "确认解除该成员?",
    content:
      "该成员将无法进行派车及数据查看等操作，其此前创建的派车等任务不受影响",
    cancelText: "再想想",
    confirmText: "确认解除",
    asyncClose: true,
    closeOnClickOverlay: false,
    async confirm() {
      try {
        const params = {
          ...unref(model),
          oprType: "Del",
          supplyId: unref(supplyId),
          cusId: unref(cus).CusId,
          staffId: unref(staff).StaffId,
        };
        console.log("删除params", params);
        await OprCusStaff(params);
        emits("success", unref(model));
        unref(confirm).close();
        close();
      } catch (err) {
        console.log("提交失败", err);
        uni.showToast({
          title: err.data,
          icon: "none",
        });
        unref(confirm).closeLoading();
      }
    },
  });
}

function handleSuccess() {
  console.log("handleSuccess");
  emits("success", unref(model));
}

function handleCall(mobile) {
  if (!mobile) return;
  uni.makePhoneCall({
    phoneNumber: mobile,
  });
}

const staff = ref({}); //保存成员数据
const bottomDrawer = ref(null);
function open(data) {
  supplyId.value = data?.supplyId ?? "";
  cus.value = data?.cus ?? {};
  cusId.value = data?.cus.cusId ?? "";
  IsLeader.value = data?.cus?.IsLeader ?? "0";
  formMode.value = data?.formMode ?? "read";
  staff.value = data?.staff ?? {};
  model.value = {
    staffName: data.staff?.StaffName ?? "",
    nickName: data.staff?.StaffNickName ?? "",
    staffMobile: data.staff?.StaffMobile ?? "",
    leader: data.staff?.Leader ?? "",
    assignPer: data.staff?.AssignPer ?? "0",
    dataPer: data.staff?.DataPer ?? "",
  };

  if (formMode.value === "add") {
    if (Object.keys(unref(tempModel)).length > 0) {
      console.log("已缓存数据", unref(tempModel));
      model.value = { ...unref(tempModel) };
    } else {
      if (unref(dataPerOptions).length === 1) {
        model.value.dataPer = unref(dataPerOptions)[0].Value;
      }
      if (unref(leaderPerOptions).length === 1) {
        model.value.leader = unref(leaderPerOptions)[0].Value;
      }
    }
  }
  if (formMode.value === "edit") {
    model.value.nickName = data.staff?.StaffNickName ?? "未设置";
  }
  if (formMode.value === "read") {
    model.value.nickName = data.staff?.StaffNickName ?? "未设置";
  }
  console.log("open", data);
  unref(bottomDrawer).popup.open();
}

function close() {
  unref(bottomDrawer).popup.close();
}

const tempModel = ref({});
function handleDrawerChange(e) {
  console.log("handleDrawerChange", e);
  emits("change", e.show);

  if (!e.show && formMode.value === "add") {
    if (unref(model).staffName !== "" || unref(model).staffMobile !== "") {
      tempModel.value = { ...model.value };
      console.log("缓存添加成员数据", unref(model));
    }
    console.log(
      "add弹窗关闭时",
      unref(model),
      unref(tempModel),
      Object.keys(unref(tempModel))
    );
  }
}

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.add-member-form {
  padding: 0 24rpx;
  .form-group {
    background-color: #fff;
    border-radius: 24rpx;
    padding: 0 24rpx;

    &:not(:last-child) {
      margin-bottom: 20rpx;
    }
  }
}
</style>
