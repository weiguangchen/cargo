<template>
	<my-drawer ref="drawer" :showTitle="false" bgColor="#FFFFFF" round="12px" @change="drawerChange">
		<view class="map-wrapper">
			<map id="map" style="width: 100%;height: 100%;" show-location v-if="isOpen">
				<cover-view slot="callout">
					<cover-view :marker-id="1" class="marker">在这里装货</cover-view>
				</cover-view>
			</map>
		</view>
		<view class="info-wrapper">
			<view class="map-location-wrapper">
				<view class="tag" :class="{ 'xie': location.type === '卸货地', 'zhuang': location.type === '装货地' }">{{ location.type }}</view>
				<view class="name">{{ location.name }}</view>
				<view class="address">{{ location.address }}</view>
				<uv-line color="#E3E9EF" margin="28rpx 0 32rpx" />
				<view class="person">
					<template v-if="location.username || location.phone">
						<text style="margin-right: 24rpx;" v-if="location.username">{{ location.username }}</text>
						<text v-if="location.phone">{{ location.phone }}</text>
					</template>
					<template v-else>暂无联系人信息</template>
				</view>
			</view>
		</view>

		<template #footer>
			<view class="map-footer">
				<view class="btn" style="margin-right: 22rpx;">
					<uv-button color="#E7F9E9"
						:custom-style="{ height: '96rpx', border: '1px solid var(--main-color)', borderRadius: '16rpx', color: 'var(--main-color)' }" @click="takePhone">
						<uv-image src="/static/images/phone.png" width="40rpx" height="40rpx" :duration="0"
							:custom-style="{ marginRight: '4rpx' }" />
						呼叫
					</uv-button>
				</view>
				<view class="btn">
					<uv-button color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
						:custom-style="{ height: '96rpx',borderRadius: '16rpx' }"  @click="openApp">
						<uv-image src="/static/images/white-location.png" width="40rpx" height="40rpx" :duration="0" :custom-style="{ marginRight: '4rpx' }"/>
						导航
					</uv-button>
				</view>
			</view>
		</template>
	</my-drawer>
</template>

<script setup>
	import {
		ref,
		onMounted,
		getCurrentInstance
	} from 'vue';
	const { ctx } = getCurrentInstance();
	const drawer = ref();
	
	const mapContext = ref();
	onMounted(() => {
		mapContext.value = uni.createMapContext("map", ctx);
	})
	
	function openApp() {
		const { latitude, longitude, address } = location.value
		mapContext.value.openMapApp({
			longitude,
			latitude,
			destination: address
		});
	}
	
	const location = ref({
		name: '',
		address: '',
		username: '',
		phone: '',
		type: '装货地',
		longitude: '',
		latitude: ''
	});
	function open(data) {
		location.value = data;
		drawer.value.popup.open();
	}
	const isOpen = ref(false);
	function drawerChange(event) {
		isOpen.value = event.show;
		if(event.show) {
			setTimeout(() => {
				const marker = {
					id: 1,
					longitude: location.value.longitude,
					latitude: location.value.latitude,
					iconPath: '/static/images/map-marker.png',
					width: '20rpx',
					height: '28rpx',
					customCallout: {
						display: 'ALWAYS',
						anchorX: 0,
						anchorY: -16
					}
				}
				mapContext.value.addMarkers({
					markers: [marker],
					clear: true
				})
				mapContext.value.moveToLocation({
					longitude: location.value.longitude,
					latitude: location.value.latitude,
				});
			},300)
		}
	}
	
	function takePhone() {
		if(!location.value.phone) {
			uni.showToast({
				icon: 'none',
				title: '暂无司机手机号'
			})
			return;
		}
		uni.makePhoneCall({
			phoneNumber: location.value.phone
		})
	}

	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.map-wrapper {
		height: 480rpx;
		border-radius: 12px;
		overflow: hidden;
		transform: translateY(0)
	}
	
	.marker {
		padding: 10rpx 20rpx;
		background-color: #fff;
		font-weight: 500;
		font-size: 26rpx;
		color: var(--title-color);
		line-height: 36rpx;
		box-shadow: 0rpx 4rpx 4rpx 0rpx rgba(0,0,0,0.25);
		border-radius: 28rpx;
	}
	
	.info-wrapper {
		padding: 24rpx;
		background-color: var(--page-bg);
		border-radius: 24rpx 24rpx 0 0;
		margin-top: -40rpx;
		position: relative;
		z-index: 200;
	}
	.map-location-wrapper {
		padding: 28rpx;
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

	.map-footer {
		display: flex;
		.btn {
			flex: 1;
		}
	}
</style>