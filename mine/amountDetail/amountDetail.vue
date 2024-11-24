<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<!-- 导航 -->
	<uv-navbar placeholder @leftClick="leftClick">
		<template #center>
			<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
				<view class="">账单明细</view>
				<FilterDrawer ref="filter" @change="changeFilter" />
			</view>
		</template>
	</uv-navbar>
	<view class="stat">
		<view class="item-wrapper box1">
			<view class="title">合计支付（元）</view>
			<view class="amount">{{ formatNumberToThousand(totalAmount) }}</view>
		</view>
		<view class="total-wrapper">
			<view class="item-wrapper box2">
				<view class="title">合计充值（元）</view>
				<view class="amount">{{ formatNumberToThousand(totalChongZhi) }}</view>
			</view>
			<view class="item-wrapper box3">
				<view class="title">合计调价 (元)</view>
				<view class="amount">{{ formatNumberToThousand(totalAdjuct) }}</view>
			</view>
		</view>
	</view>
	<view class="list-wrapper">
		<view class="list-title">统计详情</view>
		<view class="item" v-for="(item,index) in detailList" :key="index">
			<view class="mfrs">这是一个生产企业名</view>
			<view class="amount-wrapper">
				<view class="type">充值 (元)</view>
				<view class="amount-box">
					<view class="amount">{{ item.Amount }}</view>
					<view class="date">{{ item.Paytime ? dayjs(item.Paytime).format('YYYY-MM-DD HH:mm:ss'): '' }}</view>
				</view>
			</view>
			<view class="info">
				<!-- <template>
					<view class="text">津A·88888 丨 超级机制砂 丨 实装 35.98 吨</view>
					<uv-image src="/static/images/arrow.png" width="24rpx" height="24rpx" :duration="0"/>
				</template> -->
				<view class=""><text class="label">调价原因：</text>出厂未结算，在此进行补差价的处理，早知道还是是滴哈还好嗲。</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import FilterDrawer from './components/my-filter-drawer.vue';
	import { GetOwnerAmountDetail } from '@/api/index.js';
	import { getToken } from '@/utils/token.js'
	import { formatNumberToThousand } from '@/utils/index.js'
	import dayjs from 'dayjs'
	
	onMounted(() => {
		getNavbarPad()
		getList();
	});
	// 自定义导航条
	const show = ref(false)
	function leftClick() {
		uni.navigateBack()
	}
	const navbarPad = ref(0);
	function getNavbarPad() {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		navbarPad.value = menuButtonInfo.width + 20;
	}
	const filter = ref();
	function changeFilter(e) {
		show.value = e.show;
	}
	
	
	const totalAmount = ref(0);
	const totalChongZhi = ref(0);
	const totalAdjuct = ref(0)
	const detailList = ref([])
	async function getList() {
		try {
			uni.showLoading()
			const res = await GetOwnerAmountDetail({
				mobile: getToken()?.userInfo?.Mobile
			})
			totalAmount.value = res.totalAmount;
			totalChongZhi.value = res.totalChongZhi;
			totalAdjuct.value = res.totalAdjuct;
			detailList.value = res.detailList;
		}
		catch {
			
		}
		finally {
			uni.hideLoading()
		}
	}
</script>

<style lang="scss" scoped>
	.navbar-content {
		padding-left: 46px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.stat {
		padding: 24rpx;
		background-color: #ffffff;
		margin-bottom: 32rpx;
		.item-wrapper {
			flex:1;
			padding: 32rpx 32rpx 28rpx;
			border-radius: 24rpx;
			.title {
				font-weight: bold;
				font-size: 28rpx;
				color: var(--title-color);
				line-height: 40rpx;
			}
			.amount {
				font-weight: bold;
				font-size: 36rpx;
				color: var(--red-color);
				line-height: 64rpx;
			}
		}
		.total-wrapper {
			display: flex;
		}
		.box1 {
			background: url(/static/images/account/icon1.png) no-repeat right 12rpx top 12rpx/72rpx 72rpx rgba(241, 89, 72, 0.08);
			margin-bottom: 24rpx;
			.amount {
				color: var(--red-color);
			}
		}
		.box2 {
			background:url(/static/images/account/icon2.png) no-repeat right 12rpx top 12rpx/72rpx 72rpx  rgba(2, 183, 46, 0.08);
			margin-right: 22rpx;
			.amount {
				color: var(--main-color);
			}
		}
		.box3 {
			background:url(/static/images/account/icon3.png) no-repeat right 12rpx top 12rpx/72rpx 72rpx rgba(252, 126, 44, 0.08);
			.amount {
				color: #FC7E2C;
			}
		}
	}

	.list-wrapper {
		padding: 24rpx;
		.list-title {
			font-weight: bold;
			font-size: 32rpx;
			color: var(--title-color);
			line-height: 40rpx;
			margin-bottom: 20rpx;
			padding-left: 8rpx;
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
			.amount-wrapper {
				.type {
					font-size: 24rpx;
					color: var(--sub-color);
					line-height: 40rpx;
				}
				.amount-box {
					display: flex;
					align-items: center;
					justify-content: space-between;
					line-height: 48rpx;
					.amount {
						font-weight: bold;
						font-size: 34rpx;
						color: var(--red-color);
					}
					.date {
						font-size: 24rpx;
						color: var(--sub-color);
					}
				}
			}
			.info {
				padding: 24rpx;
				font-size: 24rpx;
				color: var(--content-color);
				line-height: 36rpx;
				background: var(--page-bg);
				border-radius: 16rpx;
				margin-top: 28rpx;
				display: flex;
				align-items: center;
				.text {
					flex:1;
				}
				.label {
					color: var(--sub-color);
				}
			}
		}
	}
</style>