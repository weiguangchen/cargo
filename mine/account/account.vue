<template>
	<view class="stat-wrapper">
		<view class="stat">
			<view class="">
				<view class="title">账户总余额 (元)</view>
				<view class="amount">{{ formatNumberToThousand(total) }}</view>
			</view>
			<uv-button shape="circle" text="账单明细" color="#ffffff" :custom-style="{ border: '1px solid var(--main-color)', color: 'var(--main-color)', height: '64rpx' }" :customTextStyle="{ color: '26rpx', fontWeight: 'bold' }" @click="toDetail"></uv-button>
		</view>
	</view>
	<view class="list-wrapper">
		<view class="list-title">账户详情</view>
		<template v-if="list.length > 0">
			<view class="item" v-for="item in list" :key="item.supplyId">
				<view class="mfrs">{{ item.supplyName }}</view>
				<view class="info-wrapper">
					<view class="info">
						<view class="amount-title">账户余额 (元)</view>
						<view class="amount">{{ item.amountTotal ? formatNumberToThousand(item.amountTotal) : '' }}</view>
					</view>
					<view class="info">
						<view class="amount-title">授信额度 (元)</view>
						<view class="amount">{{ item.creditTotal ? formatNumberToThousand(item.creditTotal) : '' }}</view>
					</view>
				</view>
			</view>
		</template>
		<my-empty img="/static/images/empty/account.png" v-else/>
	</view>
	
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { GetOwnerBalanceTotal } from '@/api/index.js';
	import { formatNumberToThousand } from '@/utils/index.js'
	
	onLoad(() => {
		getInfo();
	})
	
	const total = ref(0);
	const list = ref([])
	async function getInfo() {
		try {
			uni.showLoading()
			const res = await GetOwnerBalanceTotal();
			list.value = res?.supplyList ?? [];
			total.value = res?.totalAmount ?? 0;
		}
		finally {
			uni.hideLoading()
		}
	}
	
	function toDetail() {
		uni.navigateTo({
			url: '/mine/amountDetail/amountDetail'
		})
	}
</script>

<style lang="scss" scoped>
	.stat-wrapper {
		padding: 24rpx;
		margin-bottom: 32rpx;
		.stat {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 44rpx 28rpx;
			border-radius: 32rpx;
			background-color: rgba(2, 183, 46, .08);
			.title {
				font-weight: bold;
				color: var(--title-color);
				font-size: 30rpx;
				line-height: 48rpx;
			}
			.amount {
				color: var(--main-color);
				font-weight: bold;
				font-size: 48rpx;
				line-height: 56rpx;
			}
		}
	}
	.list-wrapper {
		padding: 0 24rpx;
		.list-title {
			font-weight: bold;
			font-size: 32rpx;
			color: var(--title-color);
			line-height: 40rpx;
			margin-bottom: 20rpx;
			padding-left: 8rpx
		}
		.item {
			padding: 28rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			margin-bottom: 20rpx;
			.mfrs {
				font-weight: bold;
				font-size: 32rpx;
				color: var(--title-color);
				line-height: 48rpx;
				margin-bottom: 24rpx;
			}
			.info-wrapper {
				display: flex;
				.info {
					flex:1;
					.amount-title {
						font-size: 24rpx;
						color: var(--sub-color);
						line-height: 40rpx;
					}
					.amount {
						font-weight: bold;
						font-size: 34rpx;
						color: var(--title-color);
						line-height: 48rpx;
					}
				}
			}
		}
	}
	
</style>