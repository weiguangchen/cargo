<template>
	<view class="material" :class="{'uv-border-bottom': borderBottom, 'has-border': borderBottom}">
		<view class="left">
			<view class="name">物料名称一</view>
			<view class="info">暂无可接量，当前库高 9.00 米</view>
		</view>
		<view class="right">
			<view class="btn">
				<uv-button shape="circle" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)" text="接单"
					:custom-style="{ height: '68rpx' }" @click="openDrawer"></uv-button>
			</view>
		</view>
	</view>

	<my-drawer title="设置预计装运量" ref="drawer" showConfirmButton confirmText="确认订单" bgColor="#FFFFFF" asyncClose @confirm="confirm">
		<view class="form-wrapper">
			<uv-form labelPosition="left" :model="model" :rules="rules" ref="form">
				<uv-form-item prop="sex" :customStyle="{ padding: '28rpx 0' }">
					<template #label>
						<view class="main-title">预估空车重量（皮重）</view>
						<view class="sub-title">首次接单需填写皮重</view>
					</template>
					<view style="display: flex;justify-content: flex-end;">
						<my-number-box v-model="model.name1"/>
					</view>
				</uv-form-item>
				<uv-form-item prop="name" :customStyle="{ padding: '28rpx 0' }">
					<template #label>
						<view class="main-title">满载拉运</view>
						<view class="sub-title">开启后，自动测量车辆满载值</view>
					</template>
					<view style="display: flex;justify-content: flex-end;">
						<uv-switch v-model="model.name2" active-color="var(--main-color)" /> 
					</view>
				</uv-form-item>
				<uv-form-item prop="sex" :customStyle="{ padding: '28rpx 0' }">
					<template #label>
						<view class="main-title">预装总重（毛重）</view>
						<view class="sub-title">限 30.00 ~ 50.00 吨</view>
					</template>
					<view style="display: flex;justify-content: flex-end;">
						<my-number-box v-model="model.name3"/>
					</view>
				</uv-form-item>
			</uv-form>
			<view class="tip">本次预估装运物料 32.05 吨，结算请以实际装运为准</view>
		</view>
	</my-drawer>
</template>

<script>
	export default {
		options: {
			virtualHost: true
		}
	}
</script>
<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import { sleep } from '@/utils/index.js'

	const props = defineProps({
		borderBottom: {
			default: false
		}
	})
	const emits = defineEmits(['confirm'])
	const model = reactive({
		name1: 10,
		name2: false,
		name3: 34
	})
	const rules = reactive({
		name1: [{ require: true, message: '请填写预计空车重量' }],
		name3: [{ require: true, message: '请填写预计总重' }]
	})

	const drawer = ref();

	function openDrawer() {
		drawer.value.popup.open()
	}
	
	async function confirm() {
		console.log('confirm')
		await sleep()
		drawer.value.closeLoading();
		// emits('confirm')
	}
</script>

<style lang="scss" scoped>
	.material {
		padding: 0 4rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			line-height: 48rpx;

			.name {
				font-weight: bold;
				font-size: 30rpx;
				color: var(--title-color);
			}

			.info {
				font-size: 26rpx;
				color: var(--content-color);
			}
		}

		.btn {
			width: 168rpx;
		}
		&.has-border {
			padding-bottom: 24rpx;
			margin-bottom: 24rpx;
		}
	}

	.form-wrapper {
		padding: 0 24rpx;

		.main-title {
			font-weight: bold;
			font-size: 30rpx;
			color: var(--title-color);
			line-height: 48rpx;
		}

		.sub-title {
			font-size: 24rpx;
			color: var(--sub-color);
			line-height: 32rpx;
		}

		.tip {
			margin-top: 20rpx;
			padding: 28rpx 0;
			text-align: center;
			background: var(--page-bg);
			border-radius: 16rpx;
			font-size: 24rpx;
			color: var(--content-color);
			line-height: 32rpx
		}
	}
</style>