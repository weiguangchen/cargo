<template>
	<uv-navbar placeholder bgColor="rgba(255,255,255,0)" @leftClick="leftClick"></uv-navbar>
	<!-- 状态 -->
	<view class="status-wrapper">
		<view class="status-text">
			<template v-if="info.Status === '1'">货单进行中</template>
			<template v-if="info.Status === '2'">等待货单暂停</template>
			<template v-if="info.Status === '3'">货单已暂停</template>
			<template v-if="info.Status === '4'">等待货单完结</template>
			<template v-if="info.Status === '5'">货单已完结</template>
			 <uv-icon name="arrow-right" size="28rpx" color="var(--title-color)"
				:custom-style="{ marginLeft: '4rpx' }" bold />
		</view>
		<view class="tip" v-if="['2','3','4'].includes(info.Status)">
			<template v-if="info.Status === '2'">已停止派单，等待进行中运单任务的结束</template>
			<template v-if="info.Status === '3'">可点击下方按钮继续派单</template>
			<template v-if="info.Status === '4'">已停止派单，等待进行中运单任务的结束</template>
		</view>
	</view>
	<!-- end -->
	<!-- 地址 -->
	<view class="location-wrapper">
		<view class="from-wrapper" @click="openMapModal" v-if="info.SupEnt">
			<view class="icon">装</view>
			<view class="content-box my-border-bottom">
				<view class="info" @click="selectAddress">
					<view class="name uv-line-1">{{ info.SupEnt ? info.SupEnt.SupplierName : '' }}</view>
					<view class="person">
						<text class="user">{{ info.SupEnt ? info.SupEnt.Linker : '' }}</text><text class="phone">{{ info.SupEnt ? info.SupEnt.LinkerMobile : '' }}</text>
					</view>
				</view>
				<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" />
			</view>
		</view>
		<view class="to-wrapper" @click="openMapModal" v-if="info.UnloadEnt">
			<view class="icon">卸</view>
			<view class="content-box">
				<view class="info" @click="selectAddress">
					<view class="name uv-line-1">{{ info.UnloadEnt ? info.UnloadEnt.PlaceName : '' }}</view>
					<view class="person">
						<text class="user">{{ info.UnloadEnt ? info.UnloadEnt.NickName : '' }}</text><text class="phone">{{ info.UnloadEnt ? info.UnloadEnt.Mobile : '' }}</text>
					</view>
				</view>
				<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" />
			</view>
		</view>
	</view>
	<!-- end -->
	<!-- 物料列表 -->
	<view class="material-wrapper">
		<view class="list">
			<view class="material" :class="{'my-border-bottom': index < info.MatList.length - 1}" v-for="(mat,index) in info.MatList" :key="mat.Id">
				<view class="name">{{ mat.MaterialName }}</view>
				<view class="info">
					<view class="weight">
						<template v-if="mat.Limittype === '0'">
							已装运 {{ mat.Realweight }} / 不限制
						</template>
						<template v-if="mat.Limittype === '1'">
							已装运 {{ mat.Realweight }} / {{ mat.EstimateWeight }} 吨
						</template>
						<template v-if="mat.Limittype === '2'">
							已装运 {{ mat.Realtimes }} / {{ mat.EstimateTimes }} 车次
						</template>
					</view>
					<uv-line direction="col" color="#B0BECC" length="24rpx" margin="0 24rpx" />
					<view class="payed">已支付 ¥ {{ mat.Realamount }}</view>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="divider">
			<view class="dots">
				<view class="dot" v-for="item in 100" />
			</view>
		</view>
		<view class="total-payed item">
			<view class="label">合计已支付</view>
			<view class="value">
				<my-price color="var(--red-color)" :price="info.RealCarAmount"/>
			</view>
		</view>
		<view class="expect-price item">
			<view class="label">预估总价</view>
			<view class="value"> ¥ {{ info.EstimateCarAmount }}</view>
		</view>
	</view>
	<!-- end -->
	<view class="info-wrapper">
		<view class="item my-border-bottom">
			<view class="label">货主公司</view>
			<view class="value">{{ info.OwnerEnt ? info.OwnerEnt.OwnerName : '' }}</view>
		</view>
		<view class="item">
			<view class="label">货单号</view>
			<view class="value">{{ info.AssignCode }}</view>
		</view>
		<view class="item">
			<view class="label">创建时间</view>
			<view class="value">{{ info.CreatorTime ? dayjs(info.CreatorTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</view>
		</view>
		<view class="item my-border-bottom">
			<view class="label">创建人</view>
			<view class="value">张三 18566669999</view>
		</view>
		<view class="item" :class="{'my-border-bottom': !info.EndTime }" v-if="info.StartTime">
			<view class="label">车辆入场时间</view>
			<view class="value">{{ info.StartTime }}</view>
		</view>
		<view class="item my-border-bottom" v-if="info.EndTime">
			<view class="label">结束派单时间</view>
			<view class="value">{{ info.EndTime }}</view>
		</view>
		<view class="item">
			<view class="label">车辆类型限制</view>
			<view class="value">{{ info.CarType }}</view>
		</view>
		<view class="item my-border-bottom">
			<view class="label">车牌限制</view>
			<view class="value">
				京YU987W 等 6 车 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0":customStyle="{ marginLeft: '2rpx' }"/>
			</view>
		</view>
		<view class="item" v-if="!!info.Memo">
			<view class="label">派单备注</view>
			<view class="value">
				查看 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0":customStyle="{ marginLeft: '2rpx' }"/>
			</view>
		</view>
		<view class="item" v-if="info.OrderId">
			<view class="label">所属订单</view>
			<view class="value">
				查看 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0":customStyle="{ marginLeft: '2rpx' }"/>
			</view>
		</view>
		<view class="item" style="margin-bottom: 0;" v-if="!!info.RelOnwayCount">
			<view class="label">关联运单</view>
			<view class="value">
				{{ info.RelOnwayCount }} 单 <uv-image src="/static/images/arrow.png" width="18rpx" height="18rpx" :duration="0":customStyle="{ marginLeft: '2rpx' }"/>
			</view>
		</view>
	</view>
	
	<view class="page-footer">
		<view class="btns">
			<view class="left">
				<uv-button text="完结货单" color="var(--page-bg)" :custom-style="{ height: '96rpx', borderRadius: '16rpx', fontSize: '30rpx', color: 'var(--sub-color)', fontWeight: 'bold' }" />
			</view>
			<view class="right">
				<uv-button text="继续派单" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)" :custom-style="{ height: '96rpx', borderRadius: '16rpx', fontSize: '30rpx', fontWeight: 'bold' }" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app';
	import { GetAssignDetail } from '@/api/index.js'
	import dayjs from 'dayjs'
	
	function leftClick() {
		uni.navigateBack()
	}
	
	const assignId = ref();
	onLoad((options) => {
		assignId.value = options.assignId;
		getDetail();
	})
	
	const info = ref({});
	async function getDetail() {
		try {
			const res = await GetAssignDetail({
				assignId: assignId.value
			})
			info.value = res || {};
		}catch {
		}
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

					.person {
						display: flex;
						align-items: center;
						font-size: 26rpx;
						color: var(--sub-color);

						.user {
							margin-right: 24rpx;
						}
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
		background: #FFFFFF;
		border-radius: 24rpx;
		padding: 0 24rpx 32rpx;
		margin-bottom: 20rpx;

		.list {
			.material {
				padding: 28rpx 4rpx;
				line-height: 48rpx;

				.name {
					font-weight: bold;
					font-size: 30rpx;
					color: var(--title-color);
				}

				.info {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					color: var(--sub-color);
				}
			}
		}

		.divider {
			position: relative;
			margin-bottom: 30rpx;

			&::before,
			&::after {
				content: '';
				display: block;
				position: absolute;
				z-index: 200;
				width: 24rpx;
				height: 24rpx;
				background-color: var(--page-bg);
				border-radius: 50%;
			}

			&::before {
				left: -36rpx;
				top: 0;
			}

			&::after {
				right: -36rpx;
				bottom: 0;
			}

			.dots {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 24rpx;
				width: 100%;
				overflow: hidden;
				.dot {
					flex: none;
					width: 8rpx;
					height: 8rpx;
					margin: 0 6rpx;
					border-radius: 50%;
					background-color: var(--page-bg);
				}
			}
		}

		.total-payed.item {
			margin-bottom: 22rpx;
			.label {
				color: var(--red-color);
			}
		}
		.expect-price.item {
			.value {
				font-weight: bold;
				color: var(--sub-color);
			}
		}
		view:last-child {
			margin-bottom: 0!important;
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
</style>