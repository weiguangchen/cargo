<template>
	<my-drawer title="车牌限制" ref="drawer">
		<view class="carno-wrapper">
			<view class="carno" v-for="(item,i) in list" :key="i">{{ item }}</view>
		</view>
	</my-drawer>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const drawer = ref();
	const list = ref([]);
	function open(carno) {
		list.value = carno;
		drawer.value.popup.open()
	}
	
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.carno-wrapper {
		padding: 0 26rpx 26rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.carno {
			box-sizing: border-box;
			border-radius: 8rpx;
			padding: 32rpx;
			display: flex;
			align-items: center;
			background-color: #fff;
			width: calc(50% - 9rpx); 
			height: 112rpx;
			font-size: 28rpx;
			color: #1A1B1C;
			margin-bottom: 16rpx;
		}
	}
</style>