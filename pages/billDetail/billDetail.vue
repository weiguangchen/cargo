<template>
	<uv-navbar bgColor="rgba(255,255,255,0)" @leftClick="leftClick"></uv-navbar>
	<view class="placeholder" :style="{ height: placeholderHeight }"></view>
	<!-- 状态 -->
	<view class="status-wrapper" @click="openStepModal">
		<view class="status-text">
			<template v-if="detail.Weightedstatus === '1'">司机暂未到达厂家</template>
			<template v-if="detail.Weightedstatus === '2'">司机正在等待入场</template>
			<template v-if="detail.Weightedstatus === '3'">司机正在等待装车</template>
			<template v-if="detail.Weightedstatus === '4'">司机已进入仓库</template>
			<template v-if="detail.Weightedstatus === '5'">司机装车中</template>
			<template v-if="detail.Weightedstatus === '6'">司机装车完成</template>
			<template v-if="detail.Weightedstatus === '7'">等待司机完成卸货</template>
			<template v-if="detail.Weightedstatus === '8'">运单已完成</template>
			<template v-if="detail.Weightedstatus === '9'">运单已取消</template>
			<uv-icon name="arrow-right" size="32rpx" color="var(--title-color)" :custom-style="{ marginLeft: '8rpx' }" bold />
		</view>
		<view class="status-tip">
			<template v-if="detail.Weightedstatus === '2'">当前共 8 辆车等待入厂</template>
			<template v-if="detail.Weightedstatus === '3'">当前共 8 辆车等待装车</template>
			<template v-if="detail.Weightedstatus === '6'">等待司机出厂并前往卸货地</template>
			<template v-if="detail.Weightedstatus === '7'">司机已出厂并前往卸货地</template>
		</view>
	</view>
	<!-- end -->
	<!-- 地址 -->
	<view class="location-wrapper">
		<view class="from-wrapper" @click="openMapModal" v-if="detail.Supplier">
			<view class="icon">装</view>
			<view class="content-box" :class="{'my-border-bottom': detail.UnloadPlace }">
				<view class="info" @click="selectAddress">
					<view class="name uv-line-1">{{ detail.Supplier.Name || '' }}</view>
					<view class="address uv-line-1" >
						<template v-if="!detail.Supplier.OrderLinker & !detail.Supplier.OrderLinkerMobile">
							暂无联系人信息
						</template>
						<template v-else>
							<text style="margin-right: 15px;" v-if="detail.Supplier.OrderLinker">{{ detail.Supplier.OrderLinker || '' }}</text>
							<text v-if="detail.Supplier.OrderLinkerMobile">{{ detail.Supplier.OrderLinkerMobile || '' }}</text>
						</template>
					</view>
				</view>
				<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" />
			</view>
		</view>
		<view class="to-wrapper" @click="openMapModal" v-if="detail.UnloadPlace">
			<view class="icon">卸</view>
			<view class="content-box">
				<view class="info" @click="selectAddress">
					<view class="name uv-line-1">河南腾圃商这是一个生产企业名</view>
					<view class="address uv-line-1">河南省郑州市高新区科学大道科学大道科学道科道科学道科学</view>
				</view>
				<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" />
			</view>
		</view>
	</view>
	<!-- 物料 -->
	<view class="material-wrapper">
		<view class="material">
			<view class="label">
				<view class="name">{{ detail.Materialname || '' }}</view>
				<view class="info" v-if="['1','2','3','4','5'].includes(detail.Weightedstatus)">
					预装 88.05 吨，预估价格 ￥ {{ detail.TaxPrice }}
				</view>
				<view class="info" v-if="['6'].includes(detail.Weightedstatus)">
					实装 88.05 吨，待结算 ￥ 200
				</view>
				<view class="info" v-if="['7'].includes(detail.Weightedstatus)">
					实装 {{ detail.Suttle || '' }} 吨
				</view>
			</view>
		</view>
	</view>
	<!-- end -->
	<!-- 磅单 -->
	<view class="bangdan" v-if="['6','7','8'].includes(detail.Weightedstatus)">
		<view class="left">
			<view class="name">已生成磅单</view>
			<view class="no">磅单号：{{ detail.Billno }}</view>
		</view>
		<view class="right">
			<uv-button shape="circle" color="var(--page-bg)":custom-style="{ height: '68rpx',color:'var(--main-color)', fontWeight: 'bold' }">
				查看磅单
			</uv-button>
		</view>
	</view>
	<!-- end -->
	<!-- 车 -->
	<view class="bill-car" >
		<view class="car-info-wrapper" :class="{'my-border-bottom': detail.FirstWeight }" v-if="detail.Carno">
			<view class="info">
				<my-plate :plate="detail.Carno"/>
				<text class="type" v-if="detail.Cartype">{{ detail.Cartype }}</text>
			</view>
			<view class="person" v-if="detail.Drivername || detail.Drivermobile">
				<text class="user" v-if="detail.Drivername">{{ detail.Drivername }}</text>
				<text class="phone" v-if="detail.Drivermobile">{{ detail.Drivermobile }}</text>
			</view>
		</view>
		<view class="weight" :class="{'my-border-bottom': detail.SecondWeight }" v-if="detail.FirstWeight">
			<view class="label">皮重 {{ detail.FirstWeight }} 吨</view>
			<view class="value">测量于 {{ dayjs(detail.FirstTime).format('MM/DD HH:mm') }}</view>
		</view>
		<view class="weight" v-if="detail.SecondWeight">
			<view class="label">毛重 {{ detail.SecondWeight }} 吨</view>
			<view class="value">测量于 {{ dayjs(detail.SecondTime).format('MM/DD HH:mm') }}</view>
		</view>
	</view>
	<!-- end -->
	<!-- 运单详情 -->
	<view class="info-wrapper">
		<view class="item my-border-bottom">
			<view class="label">货主公司</view>
			<view class="value" v-if="detail.OwerName">{{ detail.OwerName }}</view>
		</view>
		<view class="item">
			<view class="label">运单号</view>
			<view class="value">{{ detail.OnwayNo }}</view>
		</view>
		<view class="item">
			<view class="label">接单时间</view>
			<view class="value">{{ detail.Creatortime }}</view>
		</view>
		<!-- <view class="item my-border-bottom">
			<view class="label">运单备注</view>
			<view class="value">
				查看 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0"
					:customStyle="{ marginLeft: '2rpx' }" />
			</view>
		</view>
		<view class="item">
			<view class="label">所属货单</view>
			<view class="value">
				查看 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0"
					:customStyle="{ marginLeft: '2rpx' }" />
			</view>
		</view> -->
	</view>
	<!-- end -->

	<view class="page-footer">
		<view class="btns">
			<view class="left">
				<uv-button text="取消运单" color="var(--page-bg)"
					:custom-style="{ height: '96rpx', borderRadius: '16rpx',color: 'var(--sub-color)' }"></uv-button>
			</view>
			<view class="right">
				<uv-button text="呼叫司机" color=" linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
					:custom-style="{ height: '96rpx', borderRadius: '16rpx' }" @click="takePhone"/>
			</view>
		</view>
	</view>
	<!-- 地图 -->
	<MapDrawer ref="mapModal" />
	<!-- 追踪 -->
	<StepDrawer ref="stepModal" />
</template>

<script setup>
	import {
		computed,
		ref,
		unref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import Material from './components/Material.vue';
	import MapDrawer from './components/MapDrawer.vue';
	import StepDrawer from './components/StepDrawer.vue';
	import { GetSupplyOnwayDetail, GetOnwayTimeTree } from '@/api/index.js'
	import dayjs from 'dayjs'
	
	const onwayId = ref('');
	const supplyId = ref('');
	onLoad((options) => {
		supplyId.value = options.supplyId;
		onwayId.value = options.onwayId;
		
		getDetail()
		getTimeSteps()
	})
	const detail = ref({})
	async function getDetail() {
		try {
			const res = await GetSupplyOnwayDetail({
				onwayId: unref(onwayId),
				supplyId: unref(supplyId)
			})
			detail.value = res;
		}
		catch {}
	}
	
	const steps = ref([])
	async function getTimeSteps() {
		try {
			const res = await GetOnwayTimeTree({
				onwayId: unref(onwayId),
				supplyId: unref(supplyId)
			})
			steps.value = res;
		}
		catch {
			
		}
	}
	

	
	const statusBarHeight = ref()
	onLoad(() => {
		statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
	})
	const placeholderHeight = computed(() => `${statusBarHeight.value + 56}px`)
	// 导航条
	function leftClick() {
		uni.navigateBack()
	}
	// 地图
	const mapModal = ref();
	function openMapModal() {
		if(detail.value.Supplier && detail.value.Supplier.Latitude && detail.value.Supplier.Logitude) {
			const { Province, City, Address, OrderLinker, OrderLinkerMobile } = detail.value.Supplier;
			mapModal.value.open({
				name: detail.value.Supplier.Name,
				address: `${Province || ''}${ City || '' }${ Address || '' }`,
				username: OrderLinker,
				phone: OrderLinkerMobile,
				type: '装货地',
				latitude: detail.value.Supplier.Latitude,
				longitude: detail.value.Supplier.Logitude 
			});
		}
	}
	// 跟踪
	const stepModal = ref();
	function openStepModal() {
		stepModal.value.open();
	}
	
	function takePhone() {
		if(!detail.value.Drivermobile) {
			uni.showToast({
				icon: 'none',
				title: '暂无司机手机号'
			})
			return;
		}
		uni.makePhoneCall({
			phoneNumber: detail.value.Drivermobile
		})
	}
</script>

<style lang="scss">
	page {
		padding: 0 24rpx 180rpx;
	}

	.status-wrapper {
		margin-bottom: 32rpx;
		padding-left: 12rpx;

		.status-text {
			display: flex;
			align-items: center;
			font-weight: bold;
			font-size: 48rpx;
			line-height: 64rpx;
			color: var(--title-color);
		}

		.status-tip {
			font-size: 28rpx;
			line-height: 48rpx;
			color: var(--content-color);
		}
	}

	.location-wrapper {
		padding: 0 24rpx;
		margin: 0 0 20rpx;
		background: #FFFFFF;
		border-radius: 24rpx;

		.from-wrapper,
		.to-wrapper {
			display: flex;
			align-items: center;

			.icon {
				flex: none;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 36rpx;
				height: 36rpx;
				border-radius: 8rpx;
				font-weight: 600;
				font-size: 22rpx;
				color: #FFFFFF;
				margin-right: 24rpx;
			}

			.content-box {
				flex:1;
				display: flex;
				align-items: center;
				padding: 24rpx 0;

				.info {
					flex: 1;
					line-height: 48rpx;
					margin-right: 20rpx;

					.name {
						font-weight: 500;
						font-size: 30rpx;
						color: var(--title-color);
					}

					.address {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						color: var(--sub-color);
					}
				}
			}
		}

		.from-wrapper {
			.icon {
				background-color: var(--main-color);
			}
		}

		.to-wrapper {
			.icon {
				background-color: #FC7E2C;
			}
		}
	}
		
	.material-wrapper {
		padding: 0 24rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		margin-bottom: 20rpx;
		.material {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 28rpx 4rpx;
			.label {
				flex:1;
				.name {
					font-weight: bold;
					font-size: 30rpx;
					color: var(--title-color);
					line-height: 48rpx;
				}
				.info {
					display: flex;
					align-items: center;
					color: var(--sub-color);
					font-size: 26rpx;
				}
			}
			.my-price {
				&.unit {
					color: var(--content-color)!important;
				}
			}
		}
	}
	
	.bangdan,
	.bill-car,
	.remark,{
		padding: 28rpx;
		background-color: #FFFFFF;
		margin: 0 0 24rpx;
		border-radius: 24rpx;
	}

	.bangdan {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--title-color);
		line-height: 48rpx;

		.name {
			font-weight: bold;
			font-size: 30rpx;
		}

		.no {
			font-size: 26rpx;
			color: var(--sub-color);
		}
	}

	.bill-car {
		padding: 0 28rpx;

		.car-info-wrapper {
			padding: 32rpx 0;

			.info {
				display: flex;
				align-items: center;
				.type {
					margin-left: 16rpx;
					color: var(--title-color);
					font-size: 26rpx;
					font-weight: bold;
				}
			}

			.person {
				margin-top: 16rpx;
				font-size: 26rpx;
				color: var(--sub-color);

				.user {
					margin-right: 24rpx;
				}
			}
		}

		.weight {
			font-weight: bold;
			padding: 32rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			color: var(--content-color);
			line-height: 48rpx;
		}
	}

	.remark {
		line-height: 40rpx;

		.title {
			font-weight: bold;
			font-size: 30rpx;
			color: var(--title-color);
			margin-bottom: 16rpx;
		}

		.content {
			font-size: 26rpx;
			color: #4E5356;
			text-align: left;
		}
	}
	
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 40rpx;
		font-size: 26rpx;
	
		.label {
			color: var(--sub-color)
		}
	
		.value {
			display: flex;
			align-items: center;
			color: var(--title-color);
		}
	}
	
	.info-wrapper {
		padding: 32rpx 24rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
	
		.item {
			&:last-child {
				margin-bottom: 0;
			}
			&.my-border-bottom {
				padding: 0 4rpx 32rpx;
				margin-bottom: 32rpx;
			}
			margin-bottom: 28rpx;
		}
	}
</style>