<template>
	<view class="item">
		<view class="title-wrapper">
			<view class="left">
				<view class="name">霍货主</view>
				<view class="phone">13806053204</view>
			</view>
			<view class="right">我将TA关联了 2 生产企业</view>
		</view>
		<view class="mfrs-list">
			<view class="mfrs">
				<view class="">这是一个生产企业名</view>
				<uv-icon name="close" size="24rpx" color="#B0BECC"/>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style scoped lang="scss">
	.item {
		padding: 24rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		margin-bottom: 20rpx;
		.title-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
			.left {
				.name {
					font-weight: bold;
					font-size: 32rpx;
					color: var(--title-color);
					line-height: 48rpx;
				}
				.phone {
					font-size: 26rpx;
					color: var(--sub-color);
					line-height: 40rpx;
				}
			}
			.right {
				font-size: 26rpx;
				color: var(--sub-color);
				line-height: 40rpx;
			}
		}
		.mfrs-list {
			background: var(--page-bg);
			border-radius: 16rpx;
			padding: 0 24rpx;
			.mfrs {
				font-size: 26rpx;
				color: var(--content-color);
				padding: 24rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
</style>