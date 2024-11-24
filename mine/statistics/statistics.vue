<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<!-- 导航 -->
	<view class="" id="navbar">
	<uv-navbar placeholder @leftClick="leftClick" >
		<template #center>
			<view class="navbar-content" :style="{ paddingRight: `${navbarPad}px` }">
				<view class="">数据统计</view>
				<FilterDrawer ref="filter" @visible-change="visibleChange" @change="changeFilter"/>
			</view>
		</template>
	</uv-navbar>
	</view>
	
	<uv-sticky :offset-top="navBarHeight"  v-if="isFilter" :zIndex="1">
		<view class="has-filter">
			已按条件完成筛选
			<view class="redo">
				<uv-button color="#FC7E2C" shape="circle" :custom-style="{ height: '48rpx', padding: '0 20rpx' }" @click="resetFilter">
					<uv-image :duration="0" src="/static/images/filter/redo.png" width="28rpx" height="28rpx" :custom-style="{ marginRight: '4rpx' }" :customTextStyle="{ fontSize: '24rpx' }"/>重置
				</uv-button>
			</view>
		</view>
	</uv-sticky>
	<!-- 统计合计 -->
	<view class="stat-total">
		<view class="total-item box1">
			<view class="title">合计金额（元）</view>
			<view class="number">{{ total.TotalAmount ? formatNumberToThousand(total.TotalAmount) : '-' }}</view>
		</view>
		<view class="total-wrapper">
			<view class="total-item box2">
				<view class="title">合计重量（吨）</view>
				<view class="number">{{ total.Totalweight ? formatNumberToThousand(total.Totalweight) : '-' }}</view>
			</view>
			<view class="total-item box3">
				<view class="title">合计车次 (次）</view>
				<view class="number">{{ total.Cartimes ? formatNumberToThousand(total.Cartimes) : '-' }}</view>
			</view>
		</view>
	</view>
	<!-- 列表 -->
	<view class="scroll-list">
		<view class="title">统计详情</view>
		<my-empty v-if="list.length === 0" img="/static/images/empty/statistics.png" height="250px"/>
		<template v-else>
			<Item :record="item" v-for="(item,index) in list" :key="index"/>
			<uv-load-more status="nomore" color="#B0BECC"/>
		</template>
	</view>
</template>

<script setup>
	import { onMounted, ref, getCurrentInstance } from 'vue'
	import { onLoad, onReady } from '@dcloudio/uni-app'
	import FilterDrawer from './components/my-filter-drawer.vue';
	import Item from './components/item.vue';
	import { GetOwnerTotal } from '@/api/index.js'
	import { formatNumberToThousand } from '@/utils/index.js'
	const {
		ctx
	} = getCurrentInstance();
	// 自定义导航条
	const navbarPad = ref(0);
	onLoad(() => {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		navbarPad.value = menuButtonInfo.width + 20;
	});
	// 获取导航条高度
	const navBarHeight = ref(0)
	async function getNavbarHeight() {
		let rectInfo = await ctx.$uv.getRect('#navbar');
		console.log('getNavbarHeight', rectInfo)
		navBarHeight.value = rectInfo.height;
	}
	onReady(() => {
		getNavbarHeight()
	})
	function leftClick() {
		uni.navigateBack()
	}
	// 禁用页面滚动
	const show = ref(false)
	function visibleChange(e) {
		show.value = e.show;
	}
	
	// 筛选
	const filter = ref();
	const isFilter = ref(false);
	const filterParams = ref({})
	function changeFilter(res) {
		isFilter.value = res.isFilter;
		filterParams.value = res.params;
		getList();
	}
	function resetFilter() {
		filter.value.reset();
	}
	
	onLoad(() => {
		getList()
	})
	const list = ref([]);
	const total = ref({});
	async function getList() {
		try {
			uni.showLoading({
				mask: true,
			})
			const res = await GetOwnerTotal(filterParams.value);
			list.value = res?.materialStaticList ?? [];
			total.value = {
				TotalAmount: res.TotalAmount,
				Totalweight: res.Totalweight,
				Cartimes: res.Cartimes,
			}
		}
		catch {
			list.value = [];
			total.value = {};
		}
		finally {
			uni.hideLoading()
		}
	}
</script>

<style lang="scss">
	.navbar-content {
		padding-left: 46px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
	}
	
	
	.stat-total {
		padding: 24rpx;
		background-color: #ffffff;
		.total-wrapper {
			display: flex;
		}
		.total-item {
			flex:1;
			padding: 32rpx 32rpx 28rpx;
			background: #02B72E;
			border-radius: 24rpx;
			.title {
				font-weight: bold;
				font-size: 28rpx;
				color: var(--title-color);
				line-height: 40rpx;
			}
			.number {
				font-weight: bold;
				font-size: 36rpx;
				line-height: 64rpx;
			}
		}
		.box1 {
			margin-bottom: 24rpx;
			background: url(/static/images/stat/icon1.png) no-repeat right 12rpx top 12rpx/72rpx 72rpx,
						rgba(241, 89, 72, .08);
			.number {
				color: var(--red-color);
			}
		}
		.box2 {
			margin-right: 22rpx;
			background: url(/static/images/stat/icon2.png) no-repeat right 12rpx top 12rpx/72rpx 72rpx,
						rgba(2, 183, 46, .08);
			.number {
				color: var(--main-color);
			}
		}
		.box3 {
			background: url(/static/images/stat/icon3.png) no-repeat right 12rpx top 12rpx/72rpx 72rpx,
						rgba(252, 126, 44, .08);
			.number {
				color: #FC7E2C;
			}
		}
	}

	
	.scroll-list {
		padding: 24rpx 24rpx calc(var(--safe-area-inset-bottom) + 24rpx);
		.title {
			padding: 8rpx 8rpx 20rpx;
			font-weight: bold;
			font-size: 32rpx;
			color: var(--title-color);
			line-height: 40rpx;
		}
	}
</style>