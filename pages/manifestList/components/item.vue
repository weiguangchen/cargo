<template>
	<view class="bill" @click="toDetail">
		<view class="tag" :class="{ 'process': record.Status === '1', 'pause': ['2','3'].includes(record.Status), 'finish': ['4','5'].includes(record.Status)}">{{ statusText }}</view>
		<view class="material-name">{{ materialName }}</view>
		<view class="weight">
			<template  v-if="!!record.EstimateCarWeight && !!record.EstimateCarTimes">
				已装运 {{ record.RealCarWeight || 0.00 }}/{{ record.EstimateCarWeight || 0.00 }} 吨 + {{ record.RealCarTimes || 0.00 }}/{{ record.EstimateCarTimes || 0.00 }} 车次
			</template>
			<template v-else-if="!!record.EstimateCarTimes">
				已装运 {{ record.RealCarTimes || 0.00 }}/{{ record.EstimateCarTimes || 0.00 }} 车次
			</template>
			<template v-else-if="!!record.EstimateCarWeight">
				已装运 {{ record.RealCarWeight || 0.00 }}/{{ record.EstimateCarWeight || 0.00 }} 吨
			</template>
		</view>
		<view class="location-wrapper">
			<view class="from" v-if="record.SupEnt">
				<view class="line">
					<view class="dot" v-for="dot in 3" />
				</view>
				<uv-image src="/static/images/dot1.png" width="16rpx" height="16rpx" :duration="0"
					:custom-style="{ marginRight: '16rpx' }" />
				<view class="city">{{ record.SupEnt ? record.SupEnt.City : '' }}</view>
				<view class="name uv-line-1">{{ record.SupEnt ? record.SupEnt.SupplierName : '' }}</view>
			</view>
			<view class="to" v-if="record.UnloadEnt">
				<uv-image src="/static/images/dot2.png" width="16rpx" height="16rpx" :duration="0"
					:custom-style="{ marginRight: '16rpx' }" />
				<view class="city">{{ record.UnloadEnt ? record.UnloadEnt.City : '' }}</view>
				<view class="name uv-line-1">{{ record.UnloadEnt ? record.UnloadEnt.PlaceName : '' }}</view>
			</view>
		</view>
		<view class="price-wrapper">
			<template v-if="!!record.RealCarAmount">
				<text style="margin-right: 8rpx;">已支付</text>
				<my-price color="var(--red-color)" :price="record.RealCarAmount"/>
				<uv-line direction="col" color="#C8D4DF" length="26rpx" margin="0 20rpx 0 20rpx" />
			</template>
			<view class="price">
				预估总价 <text style="font-weight: bold;">¥ {{ record.EstimateCarAmount || 0.00 }}</text> 
			</view>
		</view>
		<template v-if="['1','2','3','4'].includes(record.Status)">
			<uv-line color="var(--divider)" margin="24rpx 0"/>
			<view class="footer">
				<template v-if="record.Status === '1'">
					<view class="btn" @click.stop>
						<uv-button shape="circle" text="完结货单" color="var(--page-bg)"
							:customTextStyle="{ color: 'var(--content-color)', fontSize: '26rpx' }"
							:customStyle="{ height: '32px' }" @click="finishHandle"/>
					</view>
					<view class="btn" @click.stop>
						<uv-button shape="circle" text="暂停货单" color="var(--page-bg)"
							:customTextStyle="{ color: 'var(--content-color)', fontSize: '26rpx' }"
							:customStyle="{ height: '32px' }" @click="pauseHandle" />
					</view>
				</template>
				<template v-else-if="['2','3'].includes(record.Status)">
					<view class="btn" @click.stop>
						<uv-button shape="circle" text="完结货单" color="var(--page-bg)"
							:customTextStyle="{ color: 'var(--content-color)', fontSize: '26rpx' }"
							:customStyle="{ height: '32px' }" @click="finishHandle" />
					</view>
					<view class="btn" @click.stop>
						<uv-button shape="circle" text="继续派单" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);" :customTextStyle="{ fontSize: '26rpx' }" :customStyle="{ height: '32px' }" @click="goOnHandle"/>
					</view>
				</template>
				<template v-else-if="['4'].includes(record.Status)">
					<view class="btn" @click.stop>
						<uv-button shape="circle" text="继续派单" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);" :customTextStyle="{ fontSize: '26rpx' }" :customStyle="{ height: '32px' }" @click="goOnHandle"/>
					</view>
				</template>
			</view>
		</template>
	</view>
	
	<my-confirm ref="confirm"/>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { ManifestStatusOptions } from '@/utils/dict.js'
	import { SetAssignStatusChg, ResetAssignStatusChg } from '@/api/index.js'
	const emits = defineEmits(['toDetail','success']);
	const props = defineProps({
		record: {
			default: () => {},
			type: Object
		}
	})
	
	const materialName = computed(() => {
		const name = props.record?.MatList?.[0]?.MaterialName ?? '';
		if(props.record?.MatList?.length <= 1) return name;
		return `${name} 等 ${props.record?.MatList?.length} 物料`;
	})
	const statusText = computed(() => {
		return ManifestStatusOptions?.find(m => m.value == props.record.Status)?.name ?? '';
	})
	
	function toDetail() {
		uni.navigateTo({
			url: `/pages/manifestDetail/manifestDetail?assignId=${props.record.Id}&supplyId=${props.record.Supply}`
		})
	}
	
	const confirm = ref();
	async function finishHandle() {
		confirm.value.confirm({
			title: '确定完结货单？',
			content: '完结后将不再派发新的运单任务，当前进行中的运单任务不受影响',
			cancelText: '再想想',
			confirmText: '完结货单',
			asyncClose: true,
			async confirm() {
				try {
					await SetAssignStatusChg({
						optType: 'end',
						assignId: props.record.Id,
						supplyId: props.record.Supply
					})
					uni.showToast({
						title: '操作成功',
						icon: 'none',
						complete() {
							setTimeout(() => {
								emits('success')
							},1500)
						}
					})
					confirm.value.close();
				} catch(err) {
					uni.showToast({
						icon: 'none',
						title: err.data
					})
					confirm.value.closeLoading();
				}
			}
		})
	}
	function pauseHandle() {
		confirm.value.confirm({
			title: '确定暂停货单？',
			content: '暂停后将不再派发新的运单任务，后续可随时继续派单，当前进行中的运单任务不受影响',
			cancelText: '再想想',
			confirmText: '暂停货单',
			confirmBgColor: 'var(--main-color)',
			asyncClose: true,
			async confirm() {
				try {
					await SetAssignStatusChg({
						optType: 'pause',
						assignId: props.record.Id,
						supplyId: props.record.Supply
					})
					uni.showToast({
						title: '操作成功',
						icon: 'none',
						complete() {
							setTimeout(() => {
								emits('success')
							},1500)
						}
					})
					confirm.value.close();
				} catch(err) {
					uni.showToast({
						icon: 'none',
						title: err.data
					})
					confirm.value.closeLoading();
				}
			}
		})
	}
	function goOnHandle() {
		confirm.value.confirm({
			title: '确定继续派单？',
			content: '将继续派发运单任务',
			cancelText: '再想想',
			confirmText: '继续派单',
			confirmBgColor: 'var(--main-color)',
			asyncClose: true,
			async confirm() {
				try {
					await ResetAssignStatusChg({
						assignId: props.record.Id,
						supplyId: props.record.Supply
					})
					await uni.showToast({
						title: '操作成功',
						icon: 'none',
						complete() {
							setTimeout(() => {
								emits('success')
							},1500)
						}
					})
					confirm.value.close();
				} catch(err) {
					uni.showToast({
						icon: 'none',
						title: err.data
					})
					confirm.value.closeLoading();
				}
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
				background: #FC7E2C;
				color: #FFFFFF;
			}
			&.finish {
				background: var(--red-color);
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

			.from {
				position: relative;
				margin-bottom: 20rpx;
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