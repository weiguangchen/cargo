<template>
	<view class="tip">
		请为 <text style="font-weight: bold;">张三 (13808080909)</text> 设置关联的生产企业
	</view>
	<view class="list-wrapper">
		<uv-radio-group v-model="radiovalue" size="16" activeColor="var(--main-color)">
			<view class="item" :class="{'my-border-bottom': index < 9 }" v-for="(item,index) in 10">
				<uv-radio :name="item" >
					<view class="mfrs">这是一个生产企业名</view>
				</uv-radio>
			</view>
		</uv-radio-group>
	</view>

	<view class="page-footer">
		<uv-button text="确定关联" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)" :custom-style="{ height: '96rpx', borderRadius: '16rpx' }" />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const radiovalue = ref()
</script>

<style lang="scss">
	page {
		padding: 96rpx 24rpx 200rpx;
	}
	.tip {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 200;
		width: 100%;
		text-align: center;
		padding: 18rpx 0;
		background-color: #E7F9E9;
		color: var(--main-color);
		font-size: 24rpx;
		line-height: 36rpx;
	}
	
	.list-wrapper {
		padding: 0 24rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		.item {
			width: 100%;
			padding: 32rpx 0;
			.mfrs {
				padding-left: 22rpx;
				font-size: 26rpx;
				color: var(--title-color);
				line-height: 48rpx;
			}
		}
	}
</style>