<template>
	<view class="order" @click="toDetail">
		<view class="tag" :class="[statusClass]">{{ statusText }}</view>
		<view class="mfrs-name">{{ record.Supplier && record.Supplier.Fullname ? record.Supplier.Fullname : '' }}</view>
		<view class="material-info">包含 {{ record.MaterialsList.length }} 物料</view>
		<view class="materials" v-if="record.MaterialsList">
			<view class="material" :class="{ 'my-border-bottom': j < record.MaterialsList.length - 1 }" v-for="(mat,j) in record.MaterialsList" :key="mat.SSMaterialId">
				<view class="label">{{ mat.SSMaterialName }}</view>
				<view class="value">
					{{ mat.LeftWeight ? `剩余 ${mat.LeftWeight} 吨` : '不限装运量' }}
				</view>
			</view>
		</view>
		
		<!-- <uv-line color="var(--divider)" margin="24rpx 0"/> -->
		<!-- <view class="footer">
			<view class="btn" @click.stop>
				<uv-button shape="circle" text="完结货单" color="var(--page-bg)"
					:customTextStyle="{ color: 'var(--content-color)', fontSize: '26rpx' }"
					:customStyle="{ height: '32px' }"></uv-button>
			</view>
			<view class="btn" @click.stop>
				<uv-button shape="circle" text="暂停货单" color="var(--page-bg)"
					:customTextStyle="{ color: 'var(--content-color)', fontSize: '26rpx' }"
					:customStyle="{ height: '32px' }"></uv-button>
			</view>
			<view class="btn" @click.stop>
				<uv-button shape="circle" text="确认到厂" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
					:customTextStyle="{ fontSize: '26rpx' }" :customStyle="{ height: '32px' }"></uv-button>
			</view>
		</view> -->
	</view>
</template>

<script setup>
	import { computed } from 'vue';
	import { OrderStatusOptions } from '@/utils/dict.js'
	
	const props = defineProps({
		record: {
			type: Object,
			default: () => {}
		}
	})
	const emits = defineEmits(['toDetail']);
	function toDetail() {
		emits('toDetail', props.record)
	}
	
	
	const statusText = computed(() => {
		if(props.record.Status === '2') {
			return '24天后生效'
		}
		return OrderStatusOptions.find(m => m.value == props.record?.Status)?.name ?? ''
	})
	const statusClass = computed(() => {
		const map = {
			1: 'review',
			2: 'pending',
			3: 'success',
			4: 'expired'
		}
		return map[props.record?.Status]
	})
</script>

<style lang="scss" scoped>
	.order {
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

			&.success {
				background: var(--main-color);
				color: #FFFFFF;
			}
			&.pending {
				background: rgba(49, 206, 87, .18);
				color: var(--main-color);
			}
			&.review {
				background: #FC7E2C;
				color: #ffffff;
			}
			&.expired {
				background: var(--red-color);
				color: #FFFFFF;
			}
		}

		.mfrs-name {
			font-weight: bold;
			font-size: 32rpx;
			color: var(--title-color);
			line-height: 48rpx;
		}

		.material-info {
			display: flex;
			font-size: 26rpx;
			color: var(--sub-color);
			line-height: 48rpx;
			margin-bottom: 24rpx;
		}

		.materials {
			background-color: var(--page-bg);
			padding: 20rpx 24rpx;
			border-radius: 16rpx;
			.material {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 26rpx;
				line-height: 48rpx;
				.label {
					color: var(--title-color);
				}
				.value {
					color: var(--sub-color);
				}
				&.my-border-bottom {
					padding-bottom: 20rpx;
					margin-bottom: 20rpx;
				}
			}
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