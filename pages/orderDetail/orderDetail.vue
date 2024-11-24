<template>
	<uv-navbar placeholder bgColor="rgba(255,255,255,0)" @leftClick="leftClick" />
	<!-- 状态 -->
	<view class="status-wrapper">
		<view class="status-text">
			{{ statusName }} <uv-icon name="arrow-right" size="28rpx" color="var(--title-color)"
				:custom-style="{ marginLeft: '4rpx' }" bold />
		</view>
		<!-- <view class="tip">已停止派单，等待进行中运单任务的结束</view> -->
	</view>
	<!-- end -->
	<!-- 生产企业 -->
	<view class="mfrs-wrapper" v-if="info.Owner">
		<view class="">
			<view class="mfrs-name uv-line-1">{{ info.Owner.Ownername }}</view>
			<view class="person">
				<view class="user">{{ info.Owner.Linker }}</view>
				<view class="phone">{{ info.Owner.Mobile }}</view>
			</view>
		</view>
		<uv-image src="/static/images/phone-icon.png" width="88rpx" height="88rpx" :duration="0" :custom-style="{ marginLeft: '12rpx' }" @click="takePhone"/>
	</view>
	<!-- end -->
	<!-- 物料 -->
	<view class="material-wrapper" v-if="info.MaterialsList && info.MaterialsList.length > 0">
		<view class="material" :class="{'my-border-bottom' : index < info.MaterialsList.length - 1}" v-for="(item,index) in info.MaterialsList" :key="item.SSMaterialId">
			<view class="label">
				<view class="name">{{ item.SSMaterialName }}</view>
				<view class="info">
					<template v-if="item.LeftWeight">
						剩余 {{ item.LeftWeight }} 吨 <uv-line direction="col" length="14" margin="0 18rpx" color="#C8D4DF"/> 签订量 {{ item.EstimiteWeight }} 吨
					</template>
					<template v-else>不限制拉运量</template>
				</view>
			</view>
			<my-price :price="item.TaxPrice" unit="吨" color="var(--red-color)" unitColor="var(--content-color)"/>
		</view>
	</view>
	<!-- end -->
	<view class="info-wrapper">
		<view class="item my-border-bottom">
			<view class="label">货主公司</view>
			<view class="value">{{ info.Owner ? info.Owner.Ownername : '' }}</view>
		</view>
		<view class="item">
			<view class="label">货单号</view>
			<view class="value">96866985585</view>
		</view>
		<view class="item my-border-bottom">
			<view class="label">生效时间</view>
			<view class="value">2024-03-02 20:00:06</view>
		</view>
		<view class="item">
			<view class="label">关联货单</view>
			<view class="value">
				3 单 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0"
					:customStyle="{ marginLeft: '2rpx' }" />
			</view>
		</view>
		<view class="item">
			<view class="label">关联运单</view>
			<view class="value">
				23 单 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0" :customStyle="{ marginLeft: '2rpx' }" />
			</view>
		</view>
	</view>

	<view class="page-footer">
		<view class="btn">
			<uv-button text="立即派单" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)" :custom-style="{ height: '96rpx', borderRadius: '16rpx', fontSize: '30rpx', fontWeight: 'bold' }" />
		</view>
	</view>
</template>

<script setup>
	import { computed, ref } from 'vue'
	import { GetOrderDetail } from '@/api/index.js'
	import { onLoad } from '@dcloudio/uni-app';
	
	const orderId = ref('');
	onLoad((options) => {
		orderId.value = options.orderId;
		getInfo();
	})
	const info = ref({})
	async function getInfo() {
		try {
			const res = await GetOrderDetail({
				orderId: orderId.value
			})
			info.value = res;
		}catch {
			
		}
	}
	const statusName = computed(() => {
		const map = {
			1: '订单审核中',
			2: '将于 23 天后生效',
			3: '订单生效中',
			4: '订单已失效',
			5: '审核未通过'
		}
		return map[info.value.Status]
	})
	
	function leftClick() {
		uni.navigateBack()
	}
	
	function takePhone() {
		uni.makePhoneCall({
			phoneNumber: '13608765432'
		})
	}
</script>

<style lang="scss">
	page {
		padding: 24rpx 24rpx calc(var(--safe-area-inset-bottom) + 180rpx);
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

	.status-wrapper {
		padding-left: 8rpx;
		margin-bottom: 32rpx;

		.status-text {
			color: var(--title-color);
			display: flex;
			align-items: center;
			font-size: 48rpx;
			line-height: 64rpx;
			font-weight: bold;
		}

		.tip {
			color: var(--content-color);
			font-size: 28rpx;
		}
	}
	
	.mfrs-wrapper {
		display: flex;
		justify-content: space-between;
		padding: 32rpx 32rpx 32rpx 28rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		margin-bottom: 20rpx;
		.mfrs-name {
			font-weight: bold;
			font-size: 32rpx;
			color: var(--title-color);
			line-height: 56rpx;
		}
		.person {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: var(--sub-color);
			line-height: 48rpx;
			.user {
				margin-right: 24rpx;
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
	
	.info-wrapper {
		padding: 32rpx 24rpx;
		background: #FFFFFF;
		border-radius: 24rpx;

		.item {
			&.my-border-bottom {
				padding: 0 4rpx 32rpx;
				margin-bottom: 32rpx;
			}

			margin-bottom: 28rpx;
		}
	}

	.page-footer {
		.btn {
			
		}
	}
</style>