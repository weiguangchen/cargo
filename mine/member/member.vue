<template>
	<!-- tab -->
	<uv-tabs :activeStyle="{ fontWeight: 'bold', color: 'var(--title-color)' }" :inactiveStyle="{ color: 'var(--sub-color)' }" lineWidth="32rpx" lineHeight="8rpx" :list="tabs" @change="changeTabs" :scrollable="false" lineColor="var(--main-color)"
		:customStyle="{ background: '#ffffff' }" :current="current"/>
	<!-- end -->
	<!-- 列表 -->
	<scroll-view scroll-y class="scroll-view">
		<view class="task-list">
			<template v-if="current === 0">
				<Item v-for="(item,index) in 20"/>
			</template>
			<template v-if="current === 1">
				<Item v-for="(item,index) in 20"/>
			</template>
			<uv-load-more status="nomore" color="#B0BECC"/>
		</view>
	</scroll-view>
	<!-- end -->
	<view class="footer">
		<uv-button v-if="current === 0" text="扫码关联" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);" @click="relate" />
		<uv-button v-if="current === 1" text="出示二维码" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);" @click="openQrcode" />
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
	import Item from './components/item.vue';
	import {
		useAppStore
	} from '@/stores/app.js'
	const appStore = useAppStore();
	// tab
	const current = ref(0);
	const tabs = ref([{
		name: '我关联的成员',
	}, {
		name: '关联我的成员',
	}])
	function changeTabs({
		name,
		index
	}) {
		current.value = index;
		console.log(index, name)
	}
	// 运单相关
	function toDetail() {
		if(current.value === 0) {
			uni.navigateTo({
				url: '/pages/manifestDetail/manifestDetail'
			})
		}
		if(
		current.value === 1) {
			uni.navigateTo({
				url: '/pages/billDetail/billDetail'
			})
		}
	}
	
	function relate() {
		uni.navigateTo({
			url: '/mine/relateMember/relateMember'
		})
	}
	function openQrcode() {}
</script>

<style lang="scss">
	page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.task-list {
		padding: 24rpx;
	}
	.scroll-view {
		flex:1;
		height: 400px;
	}
	.footer {
		background-color: #fff;
		padding: 16rpx 24rpx calc(var(--safe-area-inset-bottom) + 16rpx);
	}
</style>