<template>
	<view>
		<uv-drop-down ref="dropDown" sign="dropDown_1" text-size="26rpx" text-active-color="#3c9cff"
			:extra-icon="{name:'arrow-down-fill',color:'#1A1B1C',size:'16rpx'}"
			:extra-active-icon="{name:'arrow-up-fill',color:'#03B62E',size:'16rpx'}" :defaultValue="defaultValue"
			:custom-style="{padding: '0 30rpx'}" @click="selectMenu">
			<uv-drop-down-item name="order" type="2" :label="dropItem('order').label" :value="dropItem('order').value">
			</uv-drop-down-item>
			<uv-drop-down-item name="type" type="2" :label="dropItem('type').label" :value="dropItem('type').value">
			</uv-drop-down-item>
			<uv-drop-down-item name="vip_type" type="1" label='VIP文档' :value="dropItem('vip_type').value">
			</uv-drop-down-item>
		</uv-drop-down>
		<uv-drop-down-popup sign="dropDown_1" :click-overlay-on-close="true" :currentDropItem="currentDropItem"
			@clickItem="clickItem" @popupChange="change"></uv-drop-down-popup>
	</view>
</template>

<script setup>
	import {
		computed,
		reactive,
		ref
	} from 'vue'
	// const props = defineProps({
	// 	defaultValue: {
	// 		default: () => []
	// 	}
	// })
	const defaultValue = ref([0, 'all', 0])
	const result = ref([])
	const activeName = ref('order')
	const options = reactive({
		order: {
			label: '综合排序',
			value: 'all',
			activeIndex: 0,
			color: '#333',
			activeColor: '#2878ff',
			child: [{
				label: '综合排序',
				value: 'all'
			}, {
				label: '最新发布',
				value: 'new'
			}, {
				label: '低价优先',
				value: 'money'
			}]
		},
		type: {
			label: '文档格式',
			value: 'all',
			activeIndex: 0,
			color: '#333',
			activeColor: '#2878ff',
			child: [{
				label: '全部',
				value: 'all'
			}, {
				label: 'PDF',
				value: 'pdf'
			}, {
				label: 'WROD',
				value: 'word'
			}, {
				label: 'PPT',
				value: 'ppt'
			}]
		},
		vip_type: {
			label: 'VIP文档',
			value: 0,
			activeIndex: 0
		}
	})
	const dropItem = computed((name) => {
		return (name) => {
			const res = {};
			const find = result.value.find(item => item.name === name);
			if (find) {
				res.label = find.label;
				res.value = find.value;
			} else {
				res.label = options[name].label;
				res.value = options[name].value;
			}
			return res;
		}
	})
	// 获取当前下拉筛选项
	const currentDropItem = computed(() => options[activeName.value])

	function change(e) {
		console.log('弹窗打开状态：', e);
	}

	function selectMenu(e) {
		const {
			name,
			active,
			type
		} = e;
		activeName.value = name;
		// type 等于1 的需要特殊处理：type不等于1可以忽略
		if (type == 1) {
			clickItem({
				name: 'vip_type',
				label: 'VIP文档',
				value: e.active ? 1 : 0
			});
		} else {
			const find = result.value.find(item => item.name == activeName.value);
			if (find) {
				const findIndex = options[activeName.value].child.findIndex(item => item.label == find.label && item
					.value == find.value);
				options[activeName.value].activeIndex = findIndex;
			} else {
				options[activeName.value].activeIndex = 0;
			}
		}
	}

	function clickItem(e) {
		// 下面有重新赋值，所以用let
		let {
			label,
			value
		} = e;
		const findIndex = result.value.findIndex(item => item.name == activeName.value);
		if (defaultValue.value.indexOf(value) > -1 && options[activeName.value].label) {
			label = options[activeName.value].label;
		}
		// 已经存在筛选项
		if (findIndex > -1) {
			result.value[findIndex] = {
				name: activeName.value,
				label,
				value
			}
		} else {
			result.value.push({
				name: activeName.value,
				label,
				value
			})
		}
		result.value = result.value.filter(item => defaultValue.value.indexOf(item.value) == -1);
		uni.showModal({
			content: `筛选的值：${JSON.stringify(result.value)}`
		})
	}
</script>

<style>
</style>