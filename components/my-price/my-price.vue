<template>
	<text class="my-price" :style="[{ color },customStyle]">
		<text class="symbol">￥</text>
		<text class="number">{{ price || 0.00 }}</text>
		<text class="unit" :style="[{ color: unitColor, fontSize: unitFontSize },unitStyle]" v-if="unit">/{{ unit }}</text>
	</text>
</template>

<script>
	export default {
		options: {
			virtualHost: true
		}
	}
</script>
<script setup>
	const props = defineProps({
		color: {
			default: '',
			type: String
		},
		customStyle: {
			default: () => {},
			type: Object
		},
		unit: {
			default: '',
			type: String
		},
		unitColor: {
			default: 'var(--content-color)',
			type: String
		},
		unitFontSize: {
			default: '',
			type: String
		},
		unitStyle: {
			default: () => {},
			type: Object
		},
		price: {
			default: 0.00,
			type: Number
		}
	})
</script>

<style lang="scss" scoped>
	.my-price {
		display: inline-flex;
		align-items: baseline;
		font-family: misans;
		font-weight: bold;
		color: var(--title-color);
	}

	.symbol,
	.unit {
		font-size: 24rpx;
	}

	.number {
		font-size: 40rpx;
	}
</style>