<template>
	<view class="enterprise" @click="toDetail">
		<view class="img">
			<uv-image width="100%" height="100%" :duration="0" src="/static/images/mfrs/avatar.png" />
		</view>
		<view class="info">
			<view class="">
				<view class="title uv-line-1">{{ record.Name }}</view>
				<view class="tags">
					<view class="tag" :class="{ 'signed': record.Signed === '1' }">{{ record.Signed === '1' ? '已签约' : '未签约' }}</view>
				</view>
			</view>
			<view class="location">
				<view class="address uv-line-1">
					{{ record.Province || '' }}{{ record.City || '' }}{{ record.Address || '' }}
				</view>
				<view class="dis" v-if="dis">{{ dis }}km</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue';
	import {
		gcj02Distance
	} from '@/utils/index.js'
	import {
		useLocationStore
	} from '@/stores/location.js';
	const locationStore = useLocationStore();

	const props = defineProps({
		record: {
			default: () => {},
			type: Object
		}
	})

	const dis = computed(() => {
		console.log('dis',locationStore.location,props.record)
		if (!locationStore.location || !props.record.Latitude || !props.record.Logitude) return null;
		const distance = gcj02Distance({
			lat1: props.record.Latitude,
			lon1: props.record.Logitude, 
			lat2: locationStore.location.latitude,
			lon2: locationStore.location.longitude,
		})
		console.log('distance',distance)
		return distance;
	})
	
	function toDetail() {
		uni.navigateTo({
			url: `/pages/enterpriseDetail/enterpriseDetail`,
			success(res) {
				res.eventChannel.emit('setData', {
					supply: props.record
				})
			}
		})
	}
</script>

<style lang="scss" scoped>
	.enterprise {
		display: flex;
		background: #ffffff;
		border-radius: 24rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;

		.img {
			flex: none;
			width: 160rpx;
			height: 160rpx;
			border-radius: 16rpx;
			overflow: hidden;
			margin-right: 24rpx;
		}

		.info {
			flex:1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-weight: 600;
				font-size: 32rpx;
				color: $title-color;
				line-height: 48rpx;
				margin-bottom: 14rpx;
			}

			.tags {
				font-size: 0;

				.tag {
					width: fit-content;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 12rpx;
					height: 36rpx;
					border-radius: 6rpx;
					font-size: 22rpx;
					color: var(--main-color);
					border: 1px solid var(--main-color);
					background-color: var(--page-bg);
					
					&.signed {
						background: #03b62e;
						color: #ffffff;
					}
				}
			}

			.location {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.address {
					flex:1;
					margin-right: 24rpx;
					font-size: 24rpx;
					color: $sub-color;
					line-height: 48rpx;
				}

				.dis {
					font-weight: 500;
					font-size: 24rpx;
					color: $main-color;
					line-height: 48rpx;
				}
			}
		}
	}
</style>