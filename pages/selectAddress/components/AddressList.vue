<template>
	<scroll-view class="list-wrapper" scroll-y>
		<template v-if="(type === 1 && supplyList.length > 0 ) || (type === 2) && unloadList.length > 0">
			<view class="location-list">
				<template v-if="type === 1" >
					<view class="location" :class="{ 'my-border-bottom' : index < supplyList.length - 1 }" v-for="(item,index) in supplyList" :key="item.Id" @click="select(item)">
						<view class="name">
							<view class="icon">
								<uv-image src="/static/images/location.png" width="32rpx" height="32rpx" :duration="0" />
							</view>
							{{ item.Name }}
						</view>
						<view class="address">{{ item.Province || '' }}{{ item.City || '' }}{{ item.Address || '' }}</view>
						<view class="dis" v-if="getDis({ latitude: item.Latitude, longitude: item.Logitude })">距您 {{ getDis({ latitude: item.Latitude, longitude: item.Logitude }) }} km</view>
					</view>
				</template>
				<template v-if="type === 2" >
					<view class="location" :class="{ 'my-border-bottom' : index < unloadList.length - 1 }" v-for="(item,index) in unloadList" :key="item.Id" @click="select(item)">
						<view class="name">
							<view class="icon">
								<uv-image src="/static/images/location.png" width="32rpx" height="32rpx" :duration="0" />
							</view>
							{{ item.Placename }}
						</view>
						<view class="address">{{ item.Province || '' }}{{ item.City || '' }}{{ item.District || '' }}{{ item.Address || '' }}</view>
						<view class="dis" v-if="getDis({ latitude: item.Latitude, longitude: item.Logitude })">距您 {{ getDis({ latitude: item.Latitude, longitude: item.Logitude }) }} km</view>
					</view>
				</template>
			</view>
			<uv-load-more status="nomore" color="#B0BECC" line-color="#B0BECC" />
		</template>
		<my-empty v-else :text="type === '1' ? '暂无装货地' : '暂无卸货地'"/>
	</scroll-view>
</template>

<script setup>
	import { watchEffect, ref } from 'vue'
	import { GetSupplierList, GetOwnerUnloadPlace } from '@/api/index.js'
	import {
		gcj02Distance
	} from '@/utils/index.js'
	import {
		useLocationStore
	} from '@/stores/location.js';
	const locationStore = useLocationStore();
	
	const props = defineProps({
		type: {
			default: 1,
		}
	})
	const emits = defineEmits(['change'])

	
	watchEffect(() => {
		if(props.type === 1) {
			getSupply();
		}
		if(props.type === 2) {
			getUnload();
		}
	})
	
	const supplyList = ref([]);
	const unloadList = ref([]);
	// 获取装货地
	async function getSupply() {
		const res = await GetSupplierList();
		supplyList.value = res;
	}
	// 获取卸货地
	async function getUnload() {
		const res = await GetOwnerUnloadPlace({
			useStatus: 1
		})
		unloadList.value = res.filter(m => m.EnabledMark === '1');
	}

	function select(record) {
		emits('change', {
			type: props.type,
			data: record
		})
	}
	
	
	// 计算距离
	function getDis({
		latitude,
		longitude
	}) {
		if (!locationStore.location || !latitude || !longitude) return null;
		const distance = gcj02Distance({
			lat1: latitude,
			lon1: longitude, 
			lat2: locationStore.location.latitude,
			lon2: locationStore.location.longitude,
		})
		return distance;
	}
</script>

<style lang="scss" scoped>
	.list-wrapper {
		box-sizing: border-box;
		height: 100vh;
		padding: 24rpx;
		background-color: var(--page-bg);
		margin-bottom: 24rpx;
	}

	.location-list {
		padding: 0 24rpx;
		background-color: #ffffff;
		border-radius: 24rpx;
		overflow: hidden;

		.location {
			padding: 32rpx 0;

			.name,
			.address {
				margin-bottom: 16rpx;
			}

			.name,
			.address,
			.dis {
				padding-left: 48rpx;
			}

			.name {
				position: relative;
				font-weight: bold;
				font-size: 32rpx;
				color: var(--title-color);
				line-height: 40rpx;

				.icon {
					position: absolute;
					top: 4rpx;
					left: 0;
				}
			}

			.address {
				font-size: 26rpx;
				color: var(--sub-color);
				line-height: 32rpx;
			}

			.dis {
				font-size: 26rpx;
				color: var(--main-color);
				line-height: 40rpx;
			}
		}
	}
</style>