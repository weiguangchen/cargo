<template>
	<view class="materials">
		<view class="item my-border-bottom">
			<view class="name">物料名称一</view>
			<view class="status">
				最大 900.00 吨<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" :custom-style="{ marginLeft: '4rpx' }"/>
			</view>
		</view>
		<view class="item my-border-bottom">
			<view class="name">物料名称二</view>
			<view class="status">
				最大 12 车次<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" :custom-style="{ marginLeft: '4rpx' }"/>
			</view>
		</view>
		<view class="item my-border-bottom">
			<view class="name">物料名称三</view>
			<view class="status">
				不拉运<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx" :custom-style="{ marginLeft: '4rpx' }"/>
			</view>
		</view>
		<view class="item disabled">
			<view class="name">物料名称四</view>
			<view class="status">不满足拉运条件</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
	.materials {
		.item {
			padding: 32rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			line-height: 48rpx;

			.name {
				color: var(--content-color);
			}

			.status {
				display: flex;
				align-items: center;
				font-weight: bold;
				color: var(--title-color);

			}

			&.disabled {
				.status {
					font-weight: normal;
					color: var(--intr-color);
				}
			}
		}
	}
</style>