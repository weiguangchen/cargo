<template>
	<uv-navbar bgColor="rgba(255,255,255,0)" @leftClick="leftClick"></uv-navbar>
	<view class="placeholder" :style="{ height: placeholderHeight }"></view>
	<!-- 状态 -->
	<view class="status-wrapper" @click="openStepModal">
		<view class="status-text">
			<template v-if="detail.Weightedstatus === '0'">司机暂未到达厂家</template>
			<template v-if="detail.Weightedstatus === '1'">等待入厂</template>
			<template v-if="detail.Weightedstatus === '2'">车辆已入厂</template>
			<template v-if="detail.Weightedstatus === '3'">等待装车</template>
			<template v-if="detail.Weightedstatus === '4'">已进入仓库</template>
			<template v-if="detail.Weightedstatus === '5'">正在装车</template>
			<template v-if="detail.Weightedstatus === '6'">装车完成</template>
			<template v-if="detail.Weightedstatus === '7'">等待完成卸货</template>
			<template v-if="detail.Weightedstatus === '8'">运单已完成</template>
			<template v-if="detail.Weightedstatus === '9'">运单已取消</template>
			<uv-icon name="arrow-right" size="32rpx" color="var(--title-color)" :custom-style="{ marginLeft: '8rpx' }" bold />
		</view>
		<view class="status-tip">
			<template v-if="detail.Weightedstatus === '0'">
				<template v-if="detail.EndTime && dayjs().isAfter(detail.EndTime)">
					已超出可入场时间
				</template>
				<template v-else-if="(!detail.StartTime && !detail.EndTime) || (detail.StartTime && dayjs().isAfter(detail.StartTime)) && !detail.EndTime">等待司机入厂装货</template>
				<template v-else-if="!detail.EndTime && detail.StartTime && dayjs().isBefore(detail.StartTime)">
					{{ dayjs(detail.StartTime).format('MM-DD HH:mm') }} 后司机可入厂装货
				</template>
				<template v-else-if="detail.EndTime && detail.StartTime && dayjs().isBefore(detail.StartTime)">
					{{ dayjs(detail.StartTime).format('MM-DD HH:mm') }} 至 {{ dayjs(detail.EndTime).format('MM-DD HH:mm') }} 司机可入厂装货
				</template>
				<template v-else-if="(detail.StartTime && dayjs().isAfter(detail.StartTime) && detail.EndTime && dayjs().isBefore(detail.EndTime)) || (!detail.StartTime && detail.EndTime && dayjs().isBefore(detail.EndTime))">
					{{ dayjs(detail.EndTime).format('MM-DD HH:mm') }} 前司机可入厂装货
				</template>
			</template>
			<template v-if="detail.Weightedstatus === '1'">{{ detail.StatusCount && detail.StatusCount > 1? `当前共 ${detail.StatusCount} 辆车等待入厂` : '即将入厂' }}</template>
			<template v-if="detail.Weightedstatus === '2'">请遵守厂内规范</template>
			<template v-if="detail.Weightedstatus === '3'">{{ detail.StatusCount && detail.StatusCount > 1? `当前共 ${detail.StatusCount} 辆车等待装车` : '即将装车' }}</template>
			<template v-if="detail.Weightedstatus === '4'">请进行物料装车</template>
			<template v-if="detail.Weightedstatus === '5'">请根据提示信息进行装车</template>
			<template v-if="detail.Weightedstatus === '6'">请及时出厂并前往卸货地完成卸货</template>
			<template v-if="detail.Weightedstatus === '7'">请前往卸货地完成卸货</template>
			<template v-if="detail.Weightedstatus === '8'">{{ detail.UserType ? detail.UserType === 'driver' ? '司机' : '货主' : '' }}已完成运单</template>
			<template v-if="detail.Weightedstatus === '9'">{{ detail.UserType ? detail.UserType === 'driver' ? '司机' : '货主' : '' }}已取消运单</template>
		</view>
	</view>
	<!-- end -->
	<!-- 地址 -->
	<view class="location-wrapper">
		<view class="from-wrapper" @click="openMapModal(1)" v-if="detail.SupEnt">
			<view class="icon">装</view>
			<view class="content-box" :class="{'my-border-bottom': detail.UnloadPlace }">
				<view class="info" @click="selectAddress">
					<view class="name uv-line-1">{{ detail.SupEnt.Name || '' }}</view>
					<view class="address uv-line-1" >
						<template v-if="!detail.SupEnt.Linker & !detail.Supplier.LinkerMobile">
							暂无联系人信息
						</template>
						<template v-else>
							<text style="margin-right: 15px;" v-if="detail.Supplier.Linker">{{ detail.Supplier.Linker || '' }}</text>
							<text v-if="detail.Supplier.LinkerMobile">{{ detail.Supplier.LinkerMobile || '' }}</text>
						</template>
					</view>
				</view>
				<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" />
			</view>
		</view>
		<view class="to-wrapper" @click="openMapModal(2)" v-if="detail.UnloadEnt">
			<view class="icon">卸</view>
			<view class="content-box">
				<view class="info" @click="selectAddress">
					<view class="name uv-line-1" v-if="detail.UnloadEnt && detail.UnloadEnt.PlaceName">{{ detail.UnloadEnt.PlaceName }}</view>
					<view class="address uv-line-1" >
						<template v-if="!detail.UnloadEnt.NickName & !detail.UnloadEnt.Mobile">
							暂无联系人信息
						</template>
						<template v-else>
							<text style="margin-right: 15px;" v-if="detail.UnloadEnt.NickName">{{ detail.UnloadEnt.NickName || '' }}</text>
							<text v-if="detail.UnloadEnt.Mobile">{{ detail.UnloadEnt.Mobile || '' }}</text>
						</template>
					</view>
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
				<view class="info">
					<template v-if="['0','1','2','3','4','5','9'].includes(detail.Weightedstatus)">
						预装 {{ detail.EstimiteWeight }} 吨
					</template>
					<template v-else>
						实装 {{ detail.WeightEnt ? detail.WeightEnt.Suttle : '' }} 吨
					</template>
					<template v-if="['0','1','2','3','4','5','9'].includes(detail.Weightedstatus)">
						，预估价格 ￥ {{ detail.EstimateAmount }}
					</template>
					<template v-if="['6'].includes(detail.Weightedstatus)">
						，待结算 ￥ {{ detail.RealAmount }}
					</template>
				</view>
			</view>
			<template v-if="['7','8'].includes(detail.Weightedstatus)">
				<uv-line direction="col" color="var(--divider)" margin="0 24rpx" length="64rpx"/>
				<view class="value">
					<view class="title">已支付</view>
					<my-price :price="detail.RealAmount" color="var(--red-color)"/>
				</view>
			</template>
		</view>
	</view>
	<!-- end -->
	<!-- 磅单 -->
	<view class="bangdan" v-if="detail.WeightEnt && detail.WeightEnt.BillNo">
		<view class="left">
			<view class="name">已生成磅单</view>
			<view class="no">磅单号：{{ detail.WeightEnt ? detail.WeightEnt.BillNo : '' }}</view>
		</view>
		<!-- <view class="right">
			<uv-button shape="circle" color="var(--page-bg)":custom-style="{ height: '68rpx',color:'var(--main-color)', fontWeight: 'bold' }">
				查看磅单
			</uv-button>
		</view> -->
	</view>
	<!-- end -->
	<!-- 车 -->
	<view class="bill-car" >
		<view class="car-info-wrapper" :class="{'my-border-bottom': detail.FirstWeight }" v-if="detail.Carno">
			<view class="info">
				<my-plate :plate="detail.Carno" :color="detail.CarColor"/>
				<text class="type" v-if="detail.CarType">{{ detail.CarType }}</text>
			</view>
			<view class="person">
				<text class="user" v-if="detail.DriverEnt && detail.DriverEnt.NickName">{{ detail.DriverEnt.NickName }}</text>
				<text class="phone" v-if="detail.DriverEnt && detail.DriverEnt.Mobile">{{ detail.DriverEnt.Mobile }}</text>
			</view>
		</view>
		<view v-if="['4','5','6','7','8'].includes(detail.Weightedstatus)" class="weight" :class="{'my-border-bottom': detail.SecondWeight }">
			<view class="label" v-if="detail.WeightEnt">皮重 {{ detail.WeightEnt.FirstWeight || '' }} 吨</view>
			<view class="value" v-if="detail.WeightEnt">测量于 {{ detail.WeightEnt.FirstTime ? dayjs(detail.WeightEnt.FirstTime).format('MM/DD HH:mm') : '' }}</view>
		</view>
		<view v-if="['6','7','8'].includes(detail.Weightedstatus)" class="weight">
			<view class="label" v-if="detail.WeightEnt">毛重 {{ detail.WeightEnt.SecondWeight || '' }} 吨</view>
			<view class="value" v-if="detail.WeightEnt">测量于 {{ detail.WeightEnt.SecondTime ? dayjs(detail.WeightEnt.SecondTime).format('MM/DD HH:mm') : '' }}</view>
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
		<view class="item my-border-top" v-if="['8','9'].includes(detail.Weightedstatus)">
			<view class="label">{{ detail.Weightedstatus == '8' ? '完成时间' : '取消时间' }}</view>
			<view class="value">{{ detail.LastModifyTime }}</view>
		</view>
		<!-- v-if="detail.AssignMemo" -->
		<view class="item my-border-top" >
			<view class="label">运单备注</view>
			<view class="value" @click="openAssignMemo">
				查看 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0"
					:customStyle="{ marginLeft: '2rpx' }" />
			</view>
		</view>
		<view class="item my-border-top" v-if="detail.UnloadMemo && detail.Weightedstatus == '8'">
			<view class="label">卸货说明</view>
			<view class="value" @click="openUnloadMemo">
				查看 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0"
					:customStyle="{ marginLeft: '2rpx' }" />
			</view>
		</view>
		<view class="item my-border-top" v-if="detail.AssignCode">
			<view class="label">所属货单</view>
			<view class="value">
				{{ detail.AssignCode }}
				<!-- 查看 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0"
					:customStyle="{ marginLeft: '2rpx' }" /> -->
			</view>
		</view>
	</view>
	<!-- end -->

	<view class="page-footer"  v-if="['0','1','2','3','4','5','6','7'].includes(detail.Weightedstatus)">
		<view class="btns" v-if="['0','1'].includes(detail.Weightedstatus)">
			<view class="left">
				<uv-button text="取消运单" color="var(--page-bg)"
					:custom-style="{ height: '96rpx', borderRadius: '16rpx',color: 'var(--sub-color)' }" @click="cancel"/>
			</view>
			<view class="right">
				<uv-button text="呼叫司机" color=" linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
					:custom-style="{ height: '96rpx', borderRadius: '16rpx' }" @click="takePhone"/>
			</view>
		</view>
		<view class="btns" v-if="['2','3','4','5','6'].includes(detail.Weightedstatus)">
			<uv-button text="呼叫司机" color=" linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
				:custom-style="{ height: '96rpx', width: '100%', borderRadius: '16rpx' }" @click="takePhone"/>
		</view>
		<view class="btns" v-if="['7'].includes(detail.Weightedstatus)">
			<view class="left">
				<uv-button text="确认卸货" color="var(--page-bg)"
					:custom-style="{ height: '96rpx', borderRadius: '16rpx',color: 'var(--sub-color)' }" @click="confirmUnload"/>
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
	<!-- 备注 -->
	<RemarkDrawer ref="remarkModal"/>
	<my-confirm ref="confirm" />
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
	import RemarkDrawer from './components/RemarkDrawer.vue';
	import StepDrawer from './components/StepDrawer.vue';
	import { GetSupplyOnwayDetail, GetOnwayTimeTree, DisableOnwayEnt, UnloadConfirm } from '@/api/index.js'
	import dayjs from 'dayjs'
	import { getToken } from '@/utils/token.js';
	
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
	function openMapModal(type) {
		const data = {
			type,
			name: type === 1 ? detail.value?.SupEnt?.Name ?? '' : detail.value?.UnloadEnt?.PlaceName ?? '',
			address: type === 1 ? `${detail.value?.SupEnt?.Province ?? ''}${detail.value?.SupEnt?.City ?? ''}${detail.value?.SupEnt?.District ?? ''}${detail.value?.SupEnt?.Address ?? ''}` : `${detail.value?.UnloadEnt?.Province ?? ''}${detail.value?.UnloadEnt?.City ?? ''}${detail.value?.UnloadEnt?.District ?? ''}${detail.value?.UnloadEnt?.Address ?? ''}`,
			user: type === 1 ? detail.value?.SupEnt?.Linker ?? '' : detail.value?.UnloadEnt?.NickName ?? '',
			phone: type === 1 ? detail.value?.SupEnt?.LinkerMobile ?? '' : detail.value?.UnloadEnt?.Mobile ?? '',
			longitude: type === 1 ? detail.value?.Supplier?.Logitude : detail.value?.UnloadEnt?.Logitude,
			latitude: type === 1 ? detail.value?.Supplier?.Latitude : detail.value?.UnloadEnt?.Latitude
		}
		mapModal.value.open(data);
	}
	// 跟踪
	const stepModal = ref();
	function openStepModal() {
		stepModal.value.open();
	}
	// 备注
	const remarkModal = ref();
	function openAssignMemo() {
		remarkModal.value.open({
			title: '运单备注',
			memo: detail.value.AssignMemo
		})
	}
	function openUnloadMemo() {
		remarkModal.value.open({
			title: '卸货说明',
			memo: detail.value.UnloadMemo
		})
	}
	// 取消运单
	const confirm = ref();
	function cancel() {
		confirm.value.confirm({
			title: '确定取消该笔运单？',
			content: '取消前，建议您联系司机说明原因',
			cancelText: '再想想',
			confirmText: '取消运单',
			asyncClose: true,
			async confirm() {
				try {
					await DisableOnwayEnt({
						onwayId: detail.value.Id,
						supplyId: supplyId.value,
						userId: getToken().userInfo.Id,
						userType: 'owner'
					})
					confirm.value.close();
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
				} catch(err) {
					confirm.value.closeLoading();
					uni.showToast({
						title:err.data,
						icon: 'none'
					})
				}finally {
					getDetail()
					getTimeSteps()
				}
			}
		})
	}
	// 呼叫司机
	function takePhone() {
		if(!detail.value?.DriverEnt?.Mobile) {
			return;
		}
		uni.makePhoneCall({
			phoneNumber: detail.value?.DriverEnt?.Mobile
		})
	}
	// 确认卸货
	function confirmUnload() {
		confirm.value.confirm({
			title: '确认完成卸货？',
			content: '确认前，建议您联系司机了解情况',
			cancelText: '再想想',
			confirmText: '确认卸货',
			confirmBgColor: 'var(--main-color)',
			asyncClose: true,
			async confirm() {
				try {
					await UnloadConfirm({
						onwayId: detail.value.Id,
						supplyId: supplyId.value,
						userId: getToken().userInfo.Id,
						uType: 'owner',
					})
					confirm.value.close();
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
				}catch (err){
					console.log('err',err)
					confirm.value.closeLoading();
					uni.showToast({
						title: err.data,
						icon: 'none'
					})
				}finally {
					getDetail()
					getTimeSteps()
				}
			}
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
				.number {
					font-size: 36rpx!important;
				}
			}
			.value {
				text-align: center;
				.title {
					font-size: 26rpx;
					color: #73838E;
				}
			}
		}
	}
	
	.bangdan,
	.bill-car,
	.remark {
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
			&.my-border-top {
				padding: 32rpx 4rpx 0;
			}
			margin-bottom: 28rpx;
		}
	}
</style>