<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<!-- 导航 -->
	<uv-navbar placeholder left-icon="">
		<template v-slot:center>
			<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
				<uv-search placeholder="搜索单号" v-model="keyword":showAction="false"></uv-search>
			</view>
		</template>
	</uv-navbar>
	<!-- end -->
	<!-- tab -->
	<uv-tabs :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }" :inactiveStyle="{ color: 'var(--sub-color)' }" lineWidth="32rpx" lineHeight="8rpx" :list="tabs" @change="changeTabs" :scrollable="false" lineColor="var(--main-color)" :customStyle="{ background: '#ffffff' }" :current="current"/>
	<!-- end -->
	<!-- 列表 -->
	<scroll-view scroll-y class="scroll-view" :refresher-enabled="getToken()" :refresher-triggered="triggered" @refresherrefresh="onRefresh"  @scrolltolower="onPulling">
		<!-- 未登录 -->
		<my-empty height="100%" v-if="!getToken()" showButton 
			:text="current === 0 ? '暂无进行中的货单' : '暂无进行中的运单'" @confirm="openLoginDrawer"/>
		<!-- 已登录 -->
		<template v-else>
			<template v-if="current === 0">
				<my-empty v-if="list1.length === 0" height="100%" text="暂无进行中的货单"/>
				<view class="task-list" v-else>
					<ManifestItem v-for="item in list1" :key="item.Id" :record="item" @toDetail="toDetail"/>
					<uv-load-more status="nomore" color="#B0BECC"/>
				</view>
			</template>
			<template v-if="current === 1">
				<my-empty v-if="list2.length === 0" height="100%" text="暂无进行中的运单"/>
				<view class="task-list" v-else>
					<WaybillItem v-for="item in list2" :record="item" :key="item.OnwayId"/>
					<uv-load-more :status="noMore2 ? 'nomore' : loading2 ? 'loading' : 'loadmore'" color="#B0BECC"/>
				</view>
			</template>
		</template>
	</scroll-view>
	<!-- end -->
	<!-- 登录弹窗 -->
	<my-login-drawer ref="loginDrawer" @success="loginSuccess"/>
	<!-- tabbar -->
	<my-tabbar />
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
	import ManifestItem from '@/pages/manifestList/components/item.vue';
	import WaybillItem from '@/pages/waybill/components/item.vue';
	import {
		useAppStore
	} from '@/stores/app.js'
	import { sleep } from '@/utils/index.js'
	import { GetAssignCarList, GetOwnerOnwayList } from '@/api/index.js'
	import useList from '@/hooks/useList.js'
	
	const appStore = useAppStore();
	onLoad(() => {
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
	}
	// 运单相关
	function toDetail(record) {
		if(current.value === 0) {
			uni.navigateTo({
				url: `/pages/manifestDetail/manifestDetail?assignId=${record.Id}`
			})
		}
		if(current.value === 1) {
			uni.navigateTo({
				url: '/pages/billDetail/billDetail'
			})
		}
	}
		
	// 货单
	const list1 = ref([]);
	async function getList1() {
		const res = await GetAssignCarList();
		list1.value = res;
	}
	// 运单列表
	const list2 = ref([])
	async function getList2() {
		const res = await GetOwnerOnwayList();
		list2.value = res;
	}
	// const { list: list2, fetchData: fetchData2, noMore: noMore2, loading: loading2 } = useList({
	// 	immediate: false,
	// 	api: GetSupplyOnwayList,
	// 	// params: {
	// 	// 	userMobile: getToken()?.userInfo?.Mobile ?? ''
	// 	// }
	// });
	onLoad(() => {
		if(!getToken()) {
			return;
		}
		getList1()
		getList2();
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

	.task-list {
		padding: 24rpx;
	}
	.scroll-view {
		flex:1;
		height: 400px;
	}
</style>