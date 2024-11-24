<template>
	<view class="material" :class="{ 'my-border-bottom': borderBottom }" @click="openDrawer">
		<view class="name">{{ model.SSMaterialName }}</view>
		<view class="status">
			<template v-if="modelValue.Limittype === '0'">不拉运</template>
			<template v-if="modelValue.Limittype === '1'">最大 {{ modelValue.EstimateWeight }} 吨</template>
			<template v-if="modelValue.Limittype === '2'">最大 {{ modelValue.EstimateTimes }} 车次</template>
			<uv-image src="/static/images/arrow.png" :duration="0" width="24rpx" height="24rpx"
				:custom-style="{ marginLeft: '4rpx' }" />
		</view>
	</view>
	
	<my-drawer ref="drawer" bgColor="#FFFFFF" title="物料一" closeable showConfirmButton @confirm="confirm">
		<template #title>
			<view style="margin-bottom: 8rpx;">{{ model.SSMaterialName }} </view>
			<view style="font-size: 26rpx;color: var(--sub-color);line-height: 32rpx;">
				<template v-if="model.LeftWeight">订单剩余量 {{ model.LeftWeight }} 吨</template>
				<template v-else>不限制装运量</template>
			</view>
		</template>
		<view class="drawer-form">
			<uv-form labelPosition="left" :model="model" :rules="rules" ref="form" label-width="auto">
				<uv-form-item label="装运设置" prop="Limittype" :customStyle="{ padding: '44rpx 0!important' }">
					<view style="display: flex;justify-content: flex-end;">
						<MyRadio v-model="model.Limittype" @change="typeChange"/>
					</view>
				</uv-form-item>
				<uv-form-item label="最大装运重量" prop="EstimateWeight" v-if="model.Limittype === '1'">
					<view style="display: flex;justify-content: flex-end;">
						<my-number-box v-model="model.EstimateWeight" :max="model.LeftWeight"/>
					</view>
				</uv-form-item>
				<uv-form-item label="最大装运车次" prop="EstimateTimes" v-if="model.Limittype === '2'">
					<view style="display: flex;justify-content: flex-end;">
						<my-number-box v-model="model.EstimateTimes" :max="maxCarNumber" unit="车次"/>
					</view>
				</uv-form-item>
			</uv-form>
		</view>
	</my-drawer>
</template>

<script setup>
	import {
		nextTick,
		ref,
		computed,
		watchEffect
	} from 'vue'
	import MyRadio from './MyRadio.vue';
	import Big from 'big.js'
	const props = defineProps({
		modelValue: {
			type: Object,
			default: () => {}
		},
		borderBottom: {
			type: Boolean,
			default: false
		},
		order: {
			type: Object,
			default: () => {}
		}
	})
	const emits = defineEmits(['update:modelValue']);

	const model = ref({
		Limittype: '0',
		EstimateWeight: 1,
		EstimateTimes: 1
	});
	const rules = ref()
	watchEffect(() => {
		model.value = {
			...model.value,
			...props.modelValue,
		};
	})
	
	// 当选择按车次时,根据每辆车能装运重量计算出最多能选择多少车次
	const maxCarNumber = computed(() => {
		if(!props.modelValue.LeftWeight || !props.order.SingleWeight) return null;
		const no = Big(props.modelValue.LeftWeight).div(props.order.SingleWeight).toFixed(0)
		console.log('maxCarNumber', no)
		return no;
	})

	const drawer = ref();
	function openDrawer() {
		drawer.value.popup.open();
	}
	async function typeChange() {
		await nextTick()
		drawer.value.resize()
	}
	function confirm() {
		console.log('model',model.value)
		emits('update:modelValue', model.value);
	}
</script>

<style lang="scss">
	.material {
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

	.drawer-form {
		padding: 0 24rpx;
	}

</style>