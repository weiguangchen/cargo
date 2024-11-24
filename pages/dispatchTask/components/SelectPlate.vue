<template>
	<view @click="showDrawer" class="input-wrapper">
		<view :class="{ 'placeholder': !text, 'text': text }">{{ text || '不限制' }}</view>
		<uv-image src="/static/images/arrow.png" width="24rpx" height="24rpx" :custom-style="{ marginLeft: '6rpx' }" :duration="0" />
	</view>


	<my-drawer ref="drawer">
		<template #title>
			<view style="display: flex;align-items: baseline;">
				选择车牌<text style="font-size: 24rpx;color: var(--intr-color);">（可多选）</text>
			</view>
		</template>
		<view class="my-dropdown-items">
			<view class="my-dropdown-item" :class="{'active': innerValue.includes(item.value) }" v-for="item in options" @click="select(item)" :key="item.value">
				<view class="plate">{{ item.label }}</view>
				<uv-image v-if="innerValue.includes(item.value)" src="/static/images/check.png" :duration="0" width="32rpx" height="32rpx" />
			</view>
		</view>
		<template #footer>
			<view class="btns">
				<view class="left" @click="reset">
					<uv-button text="设为不限" :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"></uv-button>
				</view>
				<view class="right" @click="confirm">
					<uv-button text="确认所选" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"  :custom-style="{ height: '96rpx', borderRadius: '16rpx' }"/>
				</view>
			</view>
		</template>
	</my-drawer>
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
		ref,
		unref,
		watch,
		watchEffect,
		getCurrentInstance,
		onMounted
	} from 'vue'
	import { GetOwnerCarMgr } from '@/api/index.js'
	const {
		ctx
	} = getCurrentInstance();
	const props = defineProps({
		modelValue: {
			default: () => []
		}
	})
	const emits = defineEmits(['update:modelValue', 'change'])
	// 获取选项
	const options = ref([])
	onMounted(() => {
		getOptions();
	})
	async function getOptions() {
		const res = await GetOwnerCarMgr();
		const list = res.map(m => ({
			label: m.Carno,
			value: m.Id
		}))
		options.value = [...list]
	}
	
	const innerValue = ref([])
	const text = ref();
	watchEffect(() => {
		innerValue.value = props.modelValue ? [...props.modelValue] : [];
		const find = options.value.filter(m => props.modelValue.includes(m.value))
		if (find.length > 0) {
			if(find.length > 1) {
				const [first, ...rest] = find;
				text.value = `${first.label} 等 ${find.length} 车牌`;
			}else {
				text.value = find[0].label;
			}
		}else {
			text.value = ''
		}
	})

	const drawer = ref()
	function showDrawer() {
		drawer.value.popup.open()
	}

	function select(item) {
		const index = innerValue.value.findIndex(m => m === item.value);
		if(index === -1) {
			innerValue.value.push(item.value)
		}else {
			innerValue.value.splice(index,1);
		}
	}
	
	function reset() {
		innerValue.value = [];
		confirm();
	}
	function confirm() {
		emits('update:modelValue', innerValue.value)
		ctx.$uv.formValidate(ctx, 'change')
		drawer.value.popup.close()
	}
</script>

<style lang="scss" scoped>
	.input-wrapper {
		width: fit-content;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		.text {
			font-weight: bold;
			color: var(--title-color);
		}
		.placeholder {
			color: #B0BECC;
		}
	}
	
	.my-dropdown-items {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		
		.my-dropdown-item {
			flex:none;
			width: calc(50% - 9rpx);
			.plate {
				flex:1;
			}
		}
	}
	.btns {
		display: flex;
		.left {
			width: 262rpx;
			margin-right: 20rpx;
		}
		.right {
			flex:1;
		}
	}
</style>