<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view catchtouchmove="true" style="height: 100vh;display: flex;flex-direction: column;">
		<!-- 导航 -->
		<uv-navbar placeholder left-icon="">
			<template v-slot:center>
				<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
					<uv-search placeholder="搜索单号、车牌号" v-model="keyWord":showAction="false" @search="handleSearch" @clear="handleSearch"></uv-search>
				</view>
			</template>
		</uv-navbar>
		<!-- end -->
		<!-- tab -->
		<uv-tabs :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }" :inactiveStyle="{ color: 'var(--sub-color)' }" lineWidth="32rpx" lineHeight="8rpx" :list="tabs" @change="changeTabs" :scrollable="false" lineColor="var(--main-color)" :customStyle="{ background: '#ffffff' }" :current="current"/>
		<view class="has-filter" v-if="isKeyWord && !isFiltering">
			已按条件筛选出 {{ total }} 条数据
			<view class="redo" @click="reset">
				<uv-image :duration="0" src="/static/images/filter/redo.png" width="28rpx" height="28rpx" :custom-style="{ marginRight: '4rpx' }"/>重置
			</view>
		</view>
		<!-- end -->
		<!-- 列表 -->
		<scroll-view scroll-y class="scroll-view" :refresher-enabled="false" :refresher-triggered="triggered" @refresherrefresh="onRefresh"  @scrolltolower="onPulling">
			<!-- 未登录 -->
			<my-empty height="100%" v-if="!getToken()" showButton 
				:text="current === 0 ? '暂无进行中的货单' : '暂无进行中的运单'" @confirm="openLoginDrawer"/>
			<!-- 已登录 -->
			<template v-else>
				<template v-if="current === 0">
					<my-empty v-if="list1.length === 0" height="100%" text="暂无进行中的货单"/>
					<view class="task-list" v-else>
						<ManifestItem v-for="item in list1" :key="item.Id" :record="item" @success="getList1"/>
						<uv-load-more status="nomore" color="#B0BECC"/>
					</view>
				</template>
				<template v-if="current === 1">
					<my-empty v-if="list2.length === 0" height="100%" text="暂无进行中的运单"/>
					<view class="task-list" v-else>
						<WaybillItem v-for="item in list2" :record="item" :key="item.OnwayId" @success="getList2"/>
						<uv-load-more status="nomore" color="#B0BECC"/>
						<!-- <uv-load-more :status="noMore2 ? 'nomore' : loading2 ? 'loading' : 'loadmore'" color="#B0BECC"/> -->
					</view>
				</template>
			</template>
		</scroll-view>
		<!-- end -->
	</view>
	<!-- 登录弹窗 -->
	<my-login-drawer ref="loginDrawer" @success="loginSuccess"/>
	<!-- tabbar -->
	<my-tabbar />
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick
	} from 'vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import { getToken } from'@/utils/token.js'
	import ManifestItem from '@/pages/manifestList/components/item.vue';
	import WaybillItem from '@/pages/waybill/components/item.vue';
	import {
		useAppStore
	} from '@/stores/app.js'
	import { GetAssignCarListWithCount, GetOnwayOwnerWithCount } from '@/api/index.js'
	import useList from '@/hooks/useList.js'
	
	const appStore = useAppStore();
	onShow(() => {
		appStore.switchTab(2)
	})
	// 登录
	const loginDrawer = ref()
	function openLoginDrawer() {
		loginDrawer.value.open();
	}
	function loginSuccess() {
		uni.reLaunch({
			url: '/pages/task/task'
		})
	}
	// hack滚动穿透
	const show = ref(false);
	const navbarPad = ref(0);
	onMounted(() => {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		console.log("menuButtonInfo", menuButtonInfo);
		navbarPad.value = menuButtonInfo.width + 20;
	});
	// tab
	const current = ref(0);
	const tabs = ref([{
		name: '进行中的货单',
	}, {
		name: '进行中的运单',
	}])
	function changeTabs({
		name,
		index
	}) {
		triggered.value = false;
		current.value = index;
		console.log(index, name)
		if(index === 0) {
			getList1();
		}
		if(index === 1) {
			getList2();
		}
	}
	// 搜索
	const isFiltering = ref(false);	
	const keyWord = ref('');
	const isKeyWord = ref(false);
	function handleSearch() {
		isFiltering.value = true;
		isKeyWord.value = !!keyWord.value;
		if(current.value === 0) {
			getList1();
		}
		if(current.value === 1) {
			getList2();
		}
	}
	function reset() {
		keyWord.value = '';
		isKeyWord.value = false;
		if(current.value === 0) {
			getList1();
		}
		if(current.value === 1) {
			getList2();
		}
	}
	const total = ref(0);
	// 货单
	const list1 = ref([]);
	const inInit1 = ref(false);
	async function getList1() {
		try {
			uni.showLoading();
			const res = await GetAssignCarListWithCount({
				status: 10,
				keyWord: keyWord.value,
			});
			list1.value = res.list;
			total.value = res.cnt;
			uni.hideLoading();
		} catch(err) {
			console.log('err',err)
			uni.hideLoading();
			uni.showToast({
				title: err.data,
				icon: 'none'
			})
		} finally {
			isFiltering.value = false;
		}
	}
	// 运单列表
	const list2 = ref([]);
	const inInit2 = ref(false);
	async function getList2() {
		try {
			uni.showLoading();
			const res = await GetOnwayOwnerWithCount({
				status: 10,
				keyWord: keyWord.value,
			});
			list2.value = res.list;
			total.value = res.cnt;
			uni.hideLoading();
		} catch(err) {
			console.log('err',err)
			uni.hideLoading();
			uni.showToast({
				title: err.data,
				icon: 'none'
			})
		} finally {
			isFiltering.value = false;
		}
	}
	// const { list: list2, fetchData: fetchData2, noMore: noMore2, loading: loading2 } = useList({
	// 	immediate: false,
	// 	api: GetSupplyOnwayList,
	// 	// params: {
	// 	// 	userMobile: getToken()?.userInfo?.Mobile ?? ''
	// 	// }
	// });
	onShow(() => {
		if(!getToken()) {
			return;
		}
		if(current.value === 0) {
			if(inInit1.value) return;
			inInit1.value = true;
			getList1();
		}
		if(current.value === 1) {
			if(inInit2.value) return;
			inInit2.value = true;
			getList2();
		}
		// fetchData2();
	})
	const triggered = ref(false)
	// async function onRefresh() {
	// 	if(triggered.value) {
	// 		return;
	// 	}
	// 	triggered.value = true;
	// 	if(current.value === 0) {
	// 		await sleep(2000)
	// 	}
	// 	if(current.value === 1) {
	// 		await fetchData2(true)
	// 	}
	// 	triggered.value = false;
	// }
	
	// function onPulling() {
	// 	if(loading2.value || triggered.value) return;
	// 	fetchData2();
	// }
</script>

<style lang="scss">
	page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.navbar-content {
		padding-left: 24rpx;
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
	.task-list {
		padding: 24rpx;
	}
	.scroll-view {
		flex:1;
		height: 400px;
	}
</style>