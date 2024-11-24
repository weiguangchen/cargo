<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<!-- 导航 -->
	<uv-navbar placeholder @leftClick="leftClick">
		<template v-slot:center>
			<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
				<uv-search placeholder="搜索订单号" v-model="keyword":showAction="false"></uv-search>
			</view>
		</template>
	</uv-navbar>
	<!-- <view class="has-filter">
		已按条件筛选出 99 条数据
		<view class="redo">
			<uv-button color="#FC7E2C" shape="circle" :custom-style="{ height: '48rpx', padding: '0 20rpx' }">
				<uv-image :duration="0" src="/static/images/filter/redo.png" width="28rpx" height="28rpx" :custom-style="{ marginRight: '4rpx' }" :customTextStyle="{ fontSize: '24rpx' }"/>重置
			</uv-button>
		</view>
	</view> -->
	<!-- end -->
	<!-- tab -->
	<uv-tabs :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }" :inactiveStyle="{ color: 'var(--sub-color)' }" lineWidth="32rpx" lineHeight="8rpx" :list="OrderStatusOptions" @change="changeTabs" :scrollable="false" lineColor="var(--main-color)"
		:customStyle="{ background: '#ffffff' }" />
	<!-- end -->
	<!-- 列表 -->
	<scroll-view scroll-y class="scroll-view">
		<view class="bill-list">
			<template v-if="list.length > 0">
				<Order v-for="item in list" :key="item.SSOrderId" :record="item" @toDetail="toDetail"/>
				<uv-load-more status="nomore" color="#B0BECC"/>
			</template>
			<my-empty v-else/>
		</view>
	</scroll-view>
	<!-- end -->
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import Order from './components/order.vue';
	import { GetOrderListByTab } from '@/api/index.js'
	import { OrderStatusOptions } from '@/utils/dict.js'
	
	// hack滚动穿透
	const show = ref(false);

	// 自定义导航条
	function leftClick() {
		uni.navigateBack()
	}
	const navbarPad = ref(0);
	onMounted(() => {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		console.log("menuButtonInfo", menuButtonInfo);
		navbarPad.value = menuButtonInfo.width + 20;
	});

	const status = ref(3);
	function changeTabs({
		name,
		index,
	}) {
		console.log(index, name)
		status.value = OrderStatusOptions?.find(m => m.name === name)?.value ?? ''
		getList();
	}
	// 筛选
	const filter = ref();
	function changeFilter(e) {
		show.value = e.show;
	}
	// 运单相关
	function toDetail(record) {
		uni.navigateTo({
			url: `/pages/orderDetail/orderDetail?orderId=${record.SSOrderId}`
		})
	}
	
	// 1-审核中 2-待生效 3-生效中 4-已失效 5-审核未通过 
	onLoad(() => {
		getList()
	})
	const list = ref([])
	async function getList() {
		try {
			uni.showLoading()
			const res = await GetOrderListByTab({
				status: status.value
			})
			list.value = res;
		}catch {
			list.value = [];
		}finally {
			uni.hideLoading()
		}
		
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.navbar-content {
		padding-left: 46px;
		width: 100%;
		display: flex;
		align-items: center;
	}

	.has-filter {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		height: 72rpx;
		background: rgba(252, 126, 44, .18);
		font-size: 24rpx;
		color: #FC7E2C;
		font-weight: bold;
	}

	.bill-list {
		padding: 24rpx;
	}
	.scroll-view {
		flex:1;
		height: 400px;
	}
</style>