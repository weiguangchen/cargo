<template>
	<view class="tip">您将不再为以下手机号的司机进行派单</view>
	<view class="list-wrapper">
		<view class="list">
			<view class="item" :class="{ 'my-border-bottom': index < 3 }" v-for="(item,index) in 4">
				<view class="label">13666668989</view>
				<view class="value">
					<uv-image src="/static/images/remove.png" width="32rpx" height="32rpx" :duration="0"
						:custom-style="{ marginRight: '8rpx' }" />
					删除
				</view>
			</view>
		</view>
		<uv-load-more status="nomore" color="#B0BECC"/>
	</view>

	<view class="page-footer">
		<uv-button text="添加黑名单" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
			:custom-style="{ height: '96rpx', borderRadius: '16rpx' }" />
	</view>
</template>

<script setup>

</script>

<style lang="scss">
	.tip {
		padding: 18rpx 32rpx;
		font-weight: bold;
		font-size: 24rpx;
		color: #FC7E2C;
		background-color: rgba(252, 126, 44, .18);
		line-height: 36rpx;
	}
	.list-wrapper {
		padding: 24rpx;
	}

	.list {
		padding: 0 24rpx;
		background: #FFFFFF;
		border-radius: 24rpx;

		.item {
			padding: 32rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			line-height: 48rpx;

			.label {
				color: var(--title-color);
			}

			.value {
				display: flex;
				align-items: center;
				color: var(--content-color);
			}
		}
	}
</style>