<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<!-- 导航 -->
	<uv-navbar placeholder @leftClick="leftClick">
		<template #center>
			<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
				<uv-search placeholder="搜索运单号、车牌" v-model="keyword" :showAction="false"></uv-search>
				<my-filter-drawer ref="filter" @change="changeFilter" />
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
	<uv-tabs :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }" :inactiveStyle="{ color: 'var(--sub-color)' }" lineWidth="32rpx" lineHeight="8rpx" :list="tabs" @change="changeTabs" :scrollable="false" lineColor="var(--main-color)"
		:customStyle="{ background: '#ffffff' }" />
	<!-- end -->
	<!-- 列表 -->
	<scroll-view scroll-y class="scroll-view" :refresher-enabled="false" :refresher-triggered="triggered" @refresherrefresh="onRefresh"  @scrolltolower="onPulling">
		<view class="bill-list" v-if="list.length > 0">
			<Item v-for="item in list" :record="item" :key="item.OnwayId"/>
			<uv-load-more :status="noMore ? 'nomore' : loading ? 'loading' : 'loadmore'" color="#B0BECC"/>
		</view>
		<my-empty v-else/>
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
	import { getToken } from'@/utils/token.js'
	import Item from './components/item.vue';
	import { GetOnwayOwner } from '@/api/index.js'
	import useList from '@/hooks/useList.js'
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
	// tab
	const tabs = ref([{
		name: '全部',
	}, {
		name: '已接单',
	}, {
		name: '已完成'
	}, {
		name: '已取消'
	}])
	function changeTabs({
		name,
		index
	}) {
		console.log(index, name)
	}
	// 筛选
	const filter = ref();
	function changeFilter(e) {
		show.value = e.show;
	}
	// 运单相关
	function toDetail() {
		uni.navigateTo({
			url: '/pages/billDetail/billDetail'
		})
	}
	
	// 运单列表
	onLoad(() => {
		getList()
	})
	const list = ref([])
	async function getList() {
		try {
			const res = await GetOnwayOwner({});
			list.value = res;
		}catch {
			
		}
	}
	// const { list, fetchData, noMore, loading } = useList({
	// 	api: GetSupplyOnwayList,
	// });
	// const triggered = ref(false)
	// async function onRefresh() {
	// 	if(triggered.value) {
	// 		return;
	// 	}
	// 	try {
	// 		triggered.value = true;
	// 		await fetchData(true)
	// 	}
	// 	finally {
	// 		triggered.value = false;
	// 	}
	// }
	
	// function onPulling() {
	// 	if(loading.value || triggered.value) return;
	// 	fetchData();
	// }
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
		flex: 1;
		height: 400px;
	}
</style>