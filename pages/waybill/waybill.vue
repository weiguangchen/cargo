<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view catchtouchmove="true" style="height: 100vh;display: flex;flex-direction: column;">
		<!-- 导航 -->
		<uv-navbar placeholder @leftClick="leftClick">
			<template #center>
				<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
					<uv-search placeholder="搜索运单号、车牌号" v-model="keyWord" :showAction="false" @search="handleSearch" @clear="handleSearch"></uv-search>
					<FilterDrawer ref="filter" @change="changeFilter" />
				</view>
			</template>
		</uv-navbar>
		<!-- end -->
		<!-- tab -->
		<uv-tabs :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }" :inactiveStyle="{ color: 'var(--sub-color)' }" lineWidth="32rpx" lineHeight="8rpx" :list="tabs" @change="changeTabs" :scrollable="false" lineColor="var(--main-color)"
			:customStyle="{ background: '#ffffff' }" />
		<view class="has-filter" v-if="(isFilter && !isFiltering) || (isKeyWord && !isFiltering)">
		已按条件筛选出 {{ total }} 条数据
			<view class="redo" @click="reset">
				<uv-image :duration="0" src="/static/images/filter/redo.png" width="28rpx" height="28rpx" :custom-style="{ marginRight: '4rpx' }"/>重置
			</view>
		</view>
		<!-- end -->
		<!-- 列表 -->
		<scroll-view scroll-y class="scroll-view" :refresher-enabled="false" :refresher-triggered="triggered" @refresherrefresh="onRefresh"  @scrolltolower="onPulling">
			<view class="bill-list" v-if="list.length > 0">
				<Item v-for="item in list" :record="item" :key="item.OnwayId" @success="getList"/>
				<uv-load-more :status="noMore ? 'nomore' : loading ? 'loading' : 'loadmore'" color="#B0BECC"/>
			</view>
			<my-empty v-else/>
		</scroll-view>
		<!-- end -->
	</view>
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
	import { GetOnwayOwnerWithCount } from '@/api/index.js'
	import useList from '@/hooks/useList.js';
	import FilterDrawer from './components/FilterDrawer.vue';
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
	const status = ref();
	const tabs = ref([{
		name: '全部',
		value: ''
	}, {
		name: '已接单',
		value: '10'
	}, {
		name: '已完成',
		value: '8'
	}, {
		name: '已取消',
		value: '9'
	}])
	function changeTabs({
		value
	}) {
		status.value = value;
		getList()
	}
	// 筛选
	const filter = ref();
	const isFilter = ref(false);
	const isFiltering = ref(false);	
	function changeFilter(data) {
		console.log('changeFilter',data)
		isFiltering.value = true;
		isFilter.value = data.isFilter;
		params.value = data.params;
		getList();
	}
	const keyWord = ref('');
	const isKeyWord = ref(false);
	function handleSearch() {
		isFiltering.value = true;
		isKeyWord.value = !!keyWord.value;
		getList();
	}
	// 运单列表
	onLoad(() => {
		getList()
	})
	const list = ref([]);
	const params = ref({});
	const total = ref(0);
	async function getList() {
		const { dateMode, date, ...rest } = params.value;
		try {
			uni.showLoading();
			const res = await GetOnwayOwnerWithCount({
				status: status.value,
				keyWord: keyWord.value,
				...rest
			});
			list.value = res.list;
			total.value = res.cnt;
			uni.hideLoading();
		}
		catch(err) {
			uni.hideLoading();
			uni.showToast({
				title: err.data,
				icon: 'none'
			})
		}
		finally {
			isFiltering.value = false;
		}
	}
	function reset() {
		keyWord.value = '';
		isKeyWord.value = false;
		filter.value.reset();
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
		background: #FFF1E8;
		font-size: 24rpx;
		color: #FC7E2C;
		font-weight: bold;
		.redo {
			background-color: #FC7E2C;
			height: 48rpx;
			padding: 0 20rpx;
			border-radius: 24rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
		}
	}

	.bill-list {
		padding: 24rpx;
	}

	.scroll-view {
		flex: 1;
		height: 400px;
	}
</style>