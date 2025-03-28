<template>
	<uv-navbar placeholder left-icon="">
		<template v-slot:center>
			<view style="padding-left: 24rpx; width: 100%" :style="{ paddingRight: `${navbarPad}px` }">
				<uv-search placeholder="搜索生产企业" v-model="keyword" :showAction="false"></uv-search>
			</view>
		</template>
	</uv-navbar>
	<!-- 搜索条件 -->
	<view class="my-dropdown">
		<uv-drop-down ref="dropDown" sign="dropDown_1" text-size="26rpx" text-color="var(--title-color)"
			text-active-size="26rpx" text-active-color="var(--main-color)" :extra-icon="{
        name: 'arrow-down-fill',
        color: 'var(--title-color)',
        size: '16rpx',
      }" :extra-active-icon="{
        name: 'arrow-up-fill',
        color: 'var(--main-color)',
        size: '14rpx',
      }" :defaultValue="defaultValue" @click="selectMenu">
			<uv-drop-down-item name="order" type="2" :label="dropItem('order').label" :value="dropItem('order').value">
			</uv-drop-down-item>
			<uv-drop-down-item name="type" type="2" :label="dropItem('type').label" :value="dropItem('type').value">
			</uv-drop-down-item>
		</uv-drop-down>
		<uv-drop-down-popup ref="dropDownPopup" sign="dropDown_1" :click-overlay-on-close="true"
			:currentDropItem="currentDropItem" @clickItem="clickItem" @popupChange="change">
			<view class="my-dropdown-items">
				<view class="my-dropdown-item" :class="{ 'active' : currentDropItem.activeIndex === index }" v-for="(item,index) in currentDropItem.child" :key="item.value" @click="clickItem(item)">
					<!-- <view style="flex:1;">{{ item.label }}</view>
					<uv-image v-if="currentDropItem.activeIndex === index" src="/static/images/check.png" :duration="0" width="32rpx" height="32rpx" /> -->
					{{ item.label }}
				</view>
			</view>
		</uv-drop-down-popup>
	</view>
	<!-- 列表 -->
	<scroll-view scroll-y style="height: 0; flex: 1">
		<my-empty height="100%" v-if="!getToken()" showButton text="登录后查看生产企业" @confirm="openLoginDrawer"/>
		<view class="list" v-else>
			<Item :record="item" v-for="item in list" :key="item.Id" />
			<uv-load-more :status="status" color="#B0BECC"/>
		</view>
	</scroll-view>
	<!-- 登录弹窗 -->
	<my-login-drawer ref="loginDrawer" @success="loginSuccess"/>
	<!-- end -->
	<my-tabbar />
</template>

<script setup>
	import {
		computed,
		onMounted,
		reactive,
		ref
	} from "vue";
	import { onLoad } from '@dcloudio/uni-app'
	import Item from './components/Item.vue'
	import {
		useAppStore
	} from '@/stores/app.js'
	import { getLocationInfo } from '@/utils/authorize.js'
	import { getToken } from '@/utils/token.js'
	import { GetSupplierList } from '@/api/index.js'
	const appStore = useAppStore();
	onLoad(() => {
		appStore.switchTab(1)
	})
	// 登录
	const loginDrawer = ref()
	function openLoginDrawer() {
		loginDrawer.value.open();
	}
	function loginSuccess() {
		uni.reLaunch({
			url: '/pages/enterprise/enterprise'
		})
	}
	
	onLoad(async() => {
		if(!getToken()) {
			return;
		}
		
		try {
			// 定位授权
			await getLocationInfo();
		}finally {
			getList()
		}
	})

	// 导航条
	const keyword = ref("");
	const navbarPad = ref(0);
	onMounted(() => {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		navbarPad.value = menuButtonInfo.width + 20;
	});
	// 搜索条件
	const dropDownPopup = ref();
	const defaultValue = ref([0, "all", "0"]);
	const result = ref([]);
	const activeName = ref("order");
	const options = reactive({
		order: {
			label: "综合排序",
			value: "all",
			activeIndex: 0,
			child: [{
					label: "综合排序",
					value: "all",
				},
				{
					label: "距离最近",
					value: "new",
				}
			],
		},
		type: {
			label: "全部签约状态",
			value: "all",
			activeIndex: 0,
			child: [{
					label: "全部签约状态",
					value: "all",
				},
				{
					label: "已签约",
					value: "pdf",
				},
				{
					label: "未签约",
					value: "word",
				}
			],
		},
	});
	const dropItem = computed((name) => {
		return (name) => {
			const res = {};
			const find = result.value.find((item) => item.name === name);
			if (find) {
				res.label = find.label;
				res.value = find.value;
			} else {
				res.label = options[name].label;
				res.value = options[name].value;
			}
			return res;
		};
	});
	const currentDropItem = computed(() => options[activeName.value]);
	function change(e) {
		console.log("弹窗打开状态：", e);
	}
	function selectMenu(e) {
		console.log(e);
		const {
			name,
			active,
			type
		} = e;
		activeName.value = name;
		const find = result.value.find((item) => item.name == activeName.value);
		if (find) {
			const findIndex = options[activeName.value].child.findIndex(
				(item) => item.label == find.label && item.value == find.value
			);
			options[activeName.value].activeIndex = findIndex;
		} else {
			options[activeName.value].activeIndex = 0;
		}
	}
	function clickItem(e) {
		// 下面有重新赋值，所以用let
		let {
			label,
			value
		} = e;
		const findIndex = result.value.findIndex(
			(item) => item.name == activeName.value
		);
		if (
			defaultValue.value.indexOf(value) > -1 &&
			options[activeName.value].label
		) {
			label = options[activeName.value].label;
		}
		// 已经存在筛选项
		if (findIndex > -1) {
			result.value[findIndex] = {
				name: activeName.value,
				label,
				value,
			};
		} else {
			result.value.push({
				name: activeName.value,
				label,
				value,
			});
		}
		result.value = result.value.filter(
			(item) => defaultValue.value.indexOf(item.value) == -1
		);
		uni.showModal({
			content: `筛选的值：${JSON.stringify(result.value)}`,
		});
		dropDownPopup.value.close()
	}
	// 列表
	const status = ref("nomore");
	
	
	
	// 获取列表
	const list = ref([])
	async function getList() {
		const res = await GetSupplierList();
		list.value = res;
	}
</script>

<style lang="scss">
	page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.my-dropdown {
		.uv-drop-down {
			border-bottom: none !important;

			.uv-drop-down-item {
				flex: 1;
				justify-content: center;

				.uv-text {
					flex: none;
					width: auto;
				}
			}
		}

		.my-dropdown-items {
			padding: 24rpx;
			.my-dropdown-item {
				height: 112rpx;
				line-height: 112rpx;
				padding-left: 32rpx;
				font-size: 28rpx;
				color: var(--title-color);
				border-radius: 16rpx;
				background: var(--page-bg);

				&:not(:last-child) {
					margin-bottom: 16rpx;
				}

				&.active {
					background: var(--light-main);
					color: var(--dark-main);
					font-weight: 600;
				}
			}
		}
	}

	.list {
		padding: 24rpx;
	}
</style>