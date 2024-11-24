<template>
	<view class="radio-group">
		<view class="radio-box" :class="{'active':item.value === modelValue}" v-for="item in options"
			@click="select(item)">
			<view class="radio" />
			{{ item.label }}
		</view>
	</view>
</template>

<script>
	export default {
		options: {
			virtualHost: true
		}
	}
</script>
<script setup>
	import {
		ref
	} from 'vue';
	const props = defineProps({
		modelValue: {
			default: '',
		}
	})
	const emits = defineEmits(['update:modelValue','change'])

	const options = ref([{
			value: '0',
			label: '不装运'
		},
		{
			value: '1',
			label: '按重量'
		},
		{
			value: '2',
			label: '按车次'
		}
	])

	function select(item) {
		emits('update:modelValue', item.value)
		emits('change',item.value)
		
	}
</script>

<style lang="scss">
	.radio-group {
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.radio-box {
			width: fit-content;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: var(--content-color);
			line-height: 48rpx;

			&:not(:last-child) {
				margin-right: 20rpx;
			}

			.radio {
				width: 20rpx;
				height: 20rpx;
				border: 2rpx solid var(--divider);
				border-radius: 50%;
				background-color: #fff;
				margin-right: 12rpx;
			}

			&.active {
				color: var(--main-color);

				.radio {
					display: flex;
					align-items: center;
					justify-content: center;
					border-color: var(--main-color);

					&::after {
						content: '';
						display: block;
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						background-color: var(--main-color);
					}
				}

			}
		}
	}
</style>