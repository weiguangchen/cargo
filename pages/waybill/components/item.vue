<template>
	<view class="bill" @click="toDetail">
		<view class="tag process">{{ billStatusName }}</view>
		<view class="material-name">{{ record.Materialname }}</view>
		<view class="weight">
			<template v-if="['1','2','3','4','5','9'].includes(record.Weightedstatus)">
				预装 {{ record.Preload }} 吨
			</template>
			<template v-if="['6','7','8'].includes(record.Weightedstatus)">
				实装 {{ record.Suttle }} 吨
			</template>
		</view>
		<view class="location-wrapper">
			<view class="from">
				<view class="line">
					<view class="dot" v-for="dot in 11" />
				</view>
				<uv-image src="/static/images/dot1.png" width="16rpx" height="16rpx" :duration="0"
					:custom-style="{ marginRight: '16rpx' }" />
				<view class="city" v-if="record.Supplier && record.Supplier.City">
					{{ record.Supplier.City }}
				</view>
				<view class="name" v-if="record.Supplier && record.Supplier.Name">
					{{ record.Supplier.Name }}
				</view>
			</view>
			<view class="plate">
				<my-plate :plate="record.Carno" />
			</view>
			<view class="to">
				<uv-image src="/static/images/dot2.png" width="16rpx" height="16rpx" :duration="0"
					:custom-style="{ marginRight: '16rpx' }" />
				<view class="city"></view>
				<view class="name uv-line-1"></view>
			</view>
		</view>
		<view class="price-wrapper" v-if="record.TaxPrice">
			<view class="price">
				预估总价 <text style="font-weight: bold;">¥ {{ record.TaxPrice }}</text>
			</view>
		</view>
		<uv-line color="var(--divider)" margin="24rpx 0" />
		<view class="footer">
			<view class="btn" @click.stop>
				<uv-button shape="circle" text="取消运单" color="var(--page-bg)"
					:customTextStyle="{ color: 'var(--content-color)', fontSize: '26rpx' }"
					:customStyle="{ height: '32px' }" @click="cancel"></uv-button>
			</view>
			<view class="btn" @click.stop>
				<uv-button shape="circle" text="呼叫司机" color="var(--page-bg)"
					:customTextStyle="{ color: 'var(--content-color)', fontSize: '26rpx' }"
					:customStyle="{ height: '32px' }"></uv-button>
			</view>
			<!-- <view class="btn" @click.stop>
				<uv-button shape="circle" text="确认到厂" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
					:customTextStyle="{ fontSize: '26rpx' }" :customStyle="{ height: '32px' }"></uv-button>
			</view> -->
		</view>
	</view>

	<my-confirm ref="confirm" />
</template>

<script setup>
	import {
		BillStatus
	} from '@/utils/dict.js'
	import {
		ref,
		computed
	} from 'vue'
	import { DisableOnwayEnt } from '@/api/index.js'

	const props = defineProps({
		record: {
			default: () => {},
			type: Object
		}
	})
	const emits = defineEmits(['toDetail'])

	// 运单状态
	const billStatusName = computed(() => BillStatus.find(m => m.value == props.record?.Weightedstatus)?.label ?? '')

	function toDetail() {
		if (!props.record.OnwayId || !props.record.Supplier) return;
		uni.navigateTo({
			url: `/pages/billDetail/billDetail?onwayId=${props.record.OnwayId}&supplyId=${props.record.Supplier.Id}`
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
				// try {
				// 	await DisableOnwayEnt({
				// 		supplyId: model.value.Id,
				// 		onwayNo: props.record.
				// 	})
				// 	await userStore.getCarList()
				// 	uni.showToast({
				// 		title: '车辆删除成功',
				// 		success() {
				// 			uni.navigateBack()
				// 		}
				// 	})
				// } catch {
				// 	modal.value.closeLoading();
				// }
			}
		})
	}
</script>

<style lang="scss" scoped>
	.bill {
		position: relative;
		margin-bottom: 20rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		padding: 32rpx 24rpx 24rpx;
		overflow: hidden;

		.tag {
			padding: 8rpx 24rpx;
			position: absolute;
			right: 0;
			top: 0;
			border-radius: 0rpx 0 0rpx 24rpx;
			font-weight: 500;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 40rpx;

			&.process {
				background: rgba(49, 206, 87, .18);
				color: var(--main-color);
			}

			&.pause {
				background: rgba(252, 126, 44, .18);
				color: #FC7E2C;
			}

			&.finish {
				background: #C8D4DF;
				color: #FFFFFF;
			}
		}

		.material-name {
			font-weight: 500;
			font-size: 32rpx;
			color: var(--title-color);
			line-height: 48rpx;
		}

		.weight {
			display: flex;
			font-size: 26rpx;
			color: var(--intr-color);
			line-height: 48rpx;
			margin-bottom: 24rpx;

			.mfrs {
				flex: 1;
				color: var(--content-color);
			}
		}

		.location-wrapper {
			padding: 24rpx 20rpx;
			background: var(--page-bg);
			border-radius: 16rpx;
			margin-bottom: 28rpx;

			.line {
				position: absolute;
				height: 24rpx;
				top: 34rpx;
				left: 6rpx;

				.dot {
					width: 4rpx;
					height: 4rpx;
					border-radius: 50%;
					background-color: #C8D4DF;

					&:not(:last-child) {
						margin-bottom: 6rpx;
					}
				}
			}

			.from,
			.to {
				display: flex;
				align-items: center;
				font-weight: 500;
				font-size: 26rpx;
				line-height: 36rpx;

				.city {
					color: var(--title-color);
					margin-right: 16rpx;
				}

				.name {
					flex: 1;
					color: var(--content-color);
				}
			}

			.plate {
				padding-left: 28rpx;
				margin: 20rpx 0;
			}

			.from {
				position: relative;
			}
		}

		.price-wrapper {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: var(--sub-color);
			line-height: 40rpx;
		}

		.footer {
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.btn {
				margin-left: 20rpx;
			}
		}
	}
</style>