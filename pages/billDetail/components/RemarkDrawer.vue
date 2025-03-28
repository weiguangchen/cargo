<template>
	<my-drawer :title="title" ref="drawer">
		<view class="memo-wrapper">{{ memo }}</view>
	</my-drawer>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const drawer = ref();
	const title = ref();
	const memo = ref();
	function open(config) {
		title.value = config?.title ?? '运单备注';
		memo.value = config?.memo ?? '';
		drawer.value.popup.open()
	}
	
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.memo-wrapper {
		padding: 0 32rpx 32rpx;
		font-size: 28rpx;
		color: #4E5356;
		line-height: 36rpx;
	}
</style>