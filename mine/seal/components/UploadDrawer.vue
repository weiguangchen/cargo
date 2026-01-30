<template>
  <my-bottom-drawer
    title="上传印鉴图片"
    ref="bottomDrawer"
    show-footer
    :show-sub-title="!!agreement"
    bg-color="#ffffff"
  >
    <template #subTitle>
      确认上传即代表确认并同意<text
        v-if="agreement"
        class="agreement"
        @click="toAgreement"
        >《{{ agreement.AgreementName }}》</text
      >
    </template>
    <view class="upload-wrapper">
      <uv-upload
        :fileList="fileList"
        :maxCount="1"
        width="606rpx"
        height="384rpx"
        imageMode="aspectFit"
        :deletable="false"
        :capture="['album']"
        @afterRead="afterRead"
        @delete="deletePic"
      >
        <view class="upload-placeholder">
          <uv-icon
            name="/static/images/seal/upload-bg.png"
            width="552rpx"
            height="200rpx"
          />
        </view>
      </uv-upload>
    </view>

    <template #footer>
      <view class="footer-wrapper">
        <view class="left-btn">
          <uv-button
            text="重新上传"
            color="var(--page-bg)"
            @click="handleCancel"
            :custom-style="{
              borderRadius: '8px',
              height: '48px',
            }"
            :custom-text-style="{
              color: 'var(--sub-color)',
              fontWeight: 'bold',
            }"
          />
        </view>
        <view class="right-btn">
          <uv-button
            text="确认上传"
            color="linear-gradient( 270deg, #31CE57 0%, #02B72E 100%);"
            @click="handleConfirm"
            :loading="loading"
            :custom-style="{ borderRadius: '8px', height: '48px' }"
            :custom-text-style="{ fontWeight: 'bold' }"
          />
        </view>
      </view>
    </template>
  </my-bottom-drawer>
</template>

<script setup>
import { ref, unref } from "vue";
import { UploadImg, UptSeal } from "@/api/index";

const emits = defineEmits(["success"]);

const bottomDrawer = ref();

const agreement = ref(null);
function toAgreement() {
  console.log("toAgreement");
  uni.navigateTo({
    url: `/pages/richText/richText`,
    success(res) {
      res.eventChannel.emit("acceptDataFromOpenerPage", {
        title: unref(agreement).AgreementName,
        content: unref(agreement).AgreementFwb,
      });
    },
  });
}

// 上传图片
const seal = ref({});
const item = ref({});
const fileList = ref([]);
const loading = ref(false);
async function handleConfirm() {
  if (unref(fileList).length === 0) {
    uni.showToast({
      title: "请先上传图片",
      icon: "none",
    });
    return;
  }
  console.log("handleConfirm", unref(fileList), unref(seal), unref(item));
  const params = {
    supplyId: unref(item).SupplyId,
    cusId: unref(item).cus.CusId,
    cusName: unref(item).cus.CusName,
    sealType: unref(seal).SealType,
    sealTypeName: unref(seal).SealTypeName,
    imgList: unref(fileList).map((item) => {
      return {
        name: item.result.name,
        fileId: item.result.fileId,
        url: item.result.url,
        thumbUrl: item.result.thumbUrl,
      };
    }),
  };
  console.log("params", params);

  try {
    loading.value = true;
    await UptSeal(params);
    emits("success");
    fileList.value = [];
    close();
    uni.showToast({
      title: "上传成功",
      icon: "none",
    });
  } catch (err) {
    uni.showToast({
      title: err.data,
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
}
function handleCancel() {
  fileList.value = [];
}
// 删除图片
function deletePic(event) {
  fileList.value = unref(fileList).filter((item, index) => {
    return index != event.index;
  });
}
// 新增图片
async function afterRead(event) {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  let lists = [].concat(event.file);
  let fileListLen = unref(fileList).length;
  lists.map((item) => {
    unref(fileList).push({
      ...item,
      status: "uploading",
      message: "上传中",
    });
  });
  for (let i = 0; i < lists.length; i++) {
    const result = await uploadFilePromise(lists[i].url);
    let item = unref(fileList)[fileListLen];
    unref(fileList).splice(
      fileListLen,
      1,
      Object.assign(item, {
        status: "ok",
        message: "",
        url: result.url,
        result,
      })
    );
    fileListLen++;
  }
}

async function uploadFilePromise(url) {
  const fileRes = await UploadImg(
    {
      businessType: "Seal",
      supplyId: unref(item).SupplyId,
    },
    url
  );
  return fileRes;
}

function open(res) {
  agreement.value = res.agreementInfo;
  seal.value = res.seal;
  item.value = res.item;

  if (res.seal.SealImg) {
    const result = res?.seal?.imgList?.[0] ?? {};
    fileList.value = [
      {
        result,
        url: result.url,
        status: "ok",
        message: "",
      },
    ];
  } else {
    fileList.value = [];
  }

  unref(bottomDrawer).popup.open();
}
function close() {
  unref(bottomDrawer).popup.close();
}

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.upload-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 24rpx;
  padding: 0 48rpx;
  height: 480rpx;
  background-color: var(--page-bg);
  border-radius: 16rpx;
  .upload-placeholder {
    width: 606rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.agreement {
  font-weight: bold;
  color: var(--dark-main);
}
.footer-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  .left-btn {
    width: 262rpx;
    flex: none;
  }
  .right-btn {
    flex: 1;
  }
}
</style>
