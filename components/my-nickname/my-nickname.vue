<template>
	<!-- 输入昵称 -->
	<my-modal ref="modal" title="请填写您的称呼" :show-cancel-button="false" async-close @confirm="submit"
		:close-on-click-overlay="false">
		<view class="nickname">
			<view class="content">希望货主或其他司机怎么称呼您?</view>
			<uv-input v-model="Nickname" input-align="center" placeholder="限 6 个字以内" border="none"
				:customStyle="{ width: '100%', height: '88rpx', background: 'var(--page-bg)' }" maxlength="6" />
		</view>
	</my-modal>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const emits = defineEmits(['success'])
	const modal = ref()
	const Nickname = ref();
	function open() {
		modal.value.open();
	}
	
	function submit() {
		setTimeout(() => {
			modal.value.close()
			emits('success', Nickname.value)
		},2000)
	}
	
	defineExpose({
		open
	})
</script>

<style lang="scss">
	.nickname {
		width: 100%;
		text-align: center;

		.content {
			font-size: 26rpx;
			color: #73838E;
			line-height: 36rpx;
			margin-bottom: 48rpx;
		}
	}
</style>