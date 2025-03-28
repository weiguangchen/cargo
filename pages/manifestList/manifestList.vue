<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view catchtouchmove="true" style="height: 100vh;display: flex;flex-direction: column;">
		<!-- 导航 -->
		<uv-navbar placeholder @leftClick="leftClick">
			<template #center>
				<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
					<uv-search placeholder="搜索货单号、车牌号" v-model="keyWord" :showAction="false" @search="handleSearch" @clear="handleSearch"></uv-search>
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
		<scroll-view scroll-y class="scroll-view">
			<view class="bill-list" v-if="list.length > 0">
				<Item v-for="item in list" :key="item.Id" :record="item" @success="getList"/>
				<uv-load-more status="nomore" color="#B0BECC"/>
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
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import Item from './components/item.vue';
	import { GetAssignCarList, GetAssignCarListWithCount } from '@/api/index.js';
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
	// tab [1]正常[2]等待暂停[3]已暂停[4]等待完结[5]已完结
	const status = ref('');
	const tabs = ref([{
		name: '全部',
		value: ''
	}, {
		name: '进行中',
		value: 10
	}, {
		name: '已暂停',
		value: 3
	}, {
		name: '已完结',
		value: 5
	}])
	function changeTabs({
		name,
		index
	}) {
		console.log(index, name)
		status.value = tabs.value?.find(m => m.name === name)?.value ?? '';
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
	// 列表
	const list = ref([]);
	const params = ref({});
	const total = ref(0);
	async function getList() {
		try {
			uni.showLoading();
			const { dateMode, date, ...rest } = params.value;
			const res = await GetAssignCarListWithCount({
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
	onShow(() => {
		getList();
	})
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