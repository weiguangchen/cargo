<template>
	<view class="map-wrapper">
		<map style="width: 100%;height: 1000rpx;" id="map" :markers="markers" show-location >
			<cover-view slot="callout">
				<cover-view class="customCallout" :marker-id="123">
					<cover-view class="content">在这里{{ type === 1 ? '装货' : '卸货' }}</cover-view>
				</cover-view>
			</cover-view>
		</map>
	</view>

	<view class="page-footer">
		<view class="footer-top">
			<view class="location-wrapper" v-if="type === 1 && data">
				<view class="tag zhuang">装货地</view>
				<view class="name">{{ data.Name }}</view>
				<view class="address">{{ data.Province || '' }}{{ data.City || '' }}{{ data.Address || '' }}</view>
				<uv-line color="#E3E9EF" margin="28rpx 0 32rpx"/>
				<view class="person">
					<text style="margin-right: 24rpx;">{{ data.Linker }}</text>
					<text>{{ data.LinkerMobile }}</text>
				</view>
			</view>
			<view class="location-wrapper" v-if="type === 2 && data">
				<view class="tag xie">卸货地</view>
				<view class="name">{{ data.Placename }}</view>
				<view class="address">{{ data.Province || '' }}{{ data.City || '' }}{{ data.District || '' }}{{ data.Address || '' }}</view>
				<uv-line color="#E3E9EF" margin="28rpx 0 32rpx"/>
				<view class="person">
					<text style="margin-right: 24rpx;">{{ data.Nickname }}</text>
					<text>{{ data.Mobile }}</text>
				</view>
			</view>
		</view>
		
		<view class="btns">
			<uv class="left">
				<uv-button text="更改地址" color="var(--page-bg)" :custom-style="{ color: 'var(--sub-color)', borderRadius: '16rpx' }" @click="openList"/>
			</uv>
			<view class="right">
				<uv-button text="确认所选" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)" :custom-style="{ borderRadius: '16rpx' }" @click="submit"/>
			</view>
		</view>
	</view>
	
	
	<view class="fullpage" :style="{ transform: `translateY(${translateY})` }">
		<AddressList :type="type" @change="changeAddress"/>
	</view>
</template>

<script setup>
	import { ref, getCurrentInstance, onMounted, nextTick } from 'vue'
	import AddressList from './components/AddressList.vue';
	import { onLoad } from '@dcloudio/uni-app'
	const { ctx } = getCurrentInstance();
	
	
	// 地图
	const mapContext = ref();
	onMounted(() => {
		mapContext.value = uni.createMapContext("map", ctx);
	})
	
	
	const type = ref(1);
	const data = ref();
	const eventChannel = ref();
	onLoad((options) => {
		const instance = getCurrentInstance().proxy;
		const channel = instance.getOpenerEventChannel();
		eventChannel.value = channel;
		channel.on('setData', async res => {
			console.log('setData', res);
			type.value = res.type;
			data.value = res.data;
			translateY.value = res.data ? '100%' : 0;
			
			if(!res.data) return;
			await nextTick()
			setLocation({
				longitude: res.data.Logitude,
				latitude: res.data.Latitude
			})
		})
	})
	
	
	const translateY = ref('100%');
	function openList() {
		translateY.value = 0;
	}
	function changeAddress(res) {
		console.log('changeAddress',res)
		data.value = res.data;
		type.value = res.type;
		translateY.value = '100%';
		
		setLocation({
			longitude: res.data.Logitude,
			latitude: res.data.Latitude
		})
	}
	const markers = ref([])
	function setLocation(data) {
		const { longitude, latitude } = data;
		console.log('setLocation', longitude, latitude,mapContext.value)
		if(longitude && latitude) {
			const marker = {
				id: 123,
				longitude,
				latitude,
				iconPath: '/static/images/map-marker.png',
				width: '30rpx',
				height: '42rpx',
				customCallout: {
					display: 'ALWAYS',
					anchorX: 0,
					anchorY: -12
				}
			}
			markers.value = [marker];
			mapContext.value.moveToLocation({
				longitude,
				latitude,
			});
		}
	}
	
	
	function submit() {
		eventChannel.value.emit('confirm', {
			type: type.value,
			data: data.value
		})
		uni.navigateBack()
	}
	
	
	
	
</script>

<style lang="scss">
	.map-wrapper {
		
	}
	.fullpage {
		height: 100vh;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 10000;
		transform: translateY(100%);
		transition: all .4s;
	}
	.page-footer {
		border-radius: 24rpx 24rpx 0rpx 0rpx;
		overflow: hidden;
		padding: 0;
		.footer-top {
			padding: 24rpx;
			background-color: var(--page-bg);
		}
		.location-wrapper {
			padding: 28rpx 24rpx 32rpx;
			background: #FFFFFF;
			border-radius: 24rpx;
			overflow: hidden;

			.tag {
				width: fit-content;
				display: flex;
				align-items: center;
				padding: 0 12rpx;
				height: 44rpx;
				border-radius: 8rpx;
				font-weight: 500;
				font-size: 26rpx;
				color: #FFFFFF;
				margin-bottom: 20rpx;
				&.zhuang {
					background-color: var(--main-color);
				}
				&.xie {
					background-color: #FC7E2C;
				}
			}
			.name {
				color: var(--title-color);
				font-weight: bold;
				font-size: 36rpx;
				line-height: 44rpx;
				margin-bottom: 20rpx;
			}
			.address {
				font-size: 26rpx;
				color: var(--sub-color);
				line-height: 32rpx;
			}
			.person {
				font-weight: bold;
				font-size: 28rpx;
				color: var(--title-color);
				line-height: 48rpx;
			}
		}
		.btns {
			padding: 24rpx 24rpx calc(var(--safe-area-inset-bottom) + 24rpx);
		}
	}
	
	.customCallout {
		.content {
			border-radius: 28rpx;
			box-shadow: 0rpx 4rpx 4rpx 0rpx rgba(0,0,0,0.25);			
			padding: 10rpx 20rpx;
			background-color: #fff;
			font-weight: 500;
			font-size: 26rpx;
			color: var(--title-color);
			line-height: 36rpx;
		}
	}
	
</style>