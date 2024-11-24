<template>
	<view class="total-box">当前已绑定车辆：{{ list.length }}</view>
	<view class="car-list">
		<uv-checkbox-group v-model="checkboxValue" shape="circle" activeColor="var(--red-color)" icon="32rpx">
			<view class="car-wrapper" :class="{'my-border-bottom': index < list.length - 1}" v-for="(item,index) in list" :key="item.Id">
				<view class="left">
					<uv-checkbox v-if="isEdit" :customStyle="{ marginRight: '6px' }" :name="item" >京RTY9012</uv-checkbox>
					<view class="" v-else>{{ item.Carno }}</view>
				</view>
				<view class="btn" @click="remove(item)">
					<uv-image :duration="0" src="/static/images/remove.png" width="32rpx" height="32rpx"
						:custom-style="{ marginRight: '8rpx' }" />
					删除
				</view>
			</view>
		</uv-checkbox-group>
	</view>
	<uv-load-more status="nomore" color="#B0BECC" />
	<view class="page-footer">
		<view class="btns">
			<view class="left">
				<uv-button :text="isEdit ? '完成' : '管理'" color="var(--page-bg)"
					:customTextStyle="{ color: 'var(--content-color)' }" @click="edit" />
			</view>
			<view class="right">
				<uv-button v-if="isEdit" text="删除所选" :color="checkboxValue.length === 0 ? '#C8D4DF' : 'var(--red-color)'"
					@click="patchRemove" />
				<uv-button v-else text="+ 添加车辆" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);"
					@click="addCar" />
			</view>
		</view>
	</view>

	<my-drawer title="添加车牌号码" ref="myCarNumber" :height="480" closeable @change="changeDrawer">
		<view class="car-number">
			<view style="margin-bottom: 32rpx;">
				<uv-form errorType="toast" :model="model" :rules="rules" ref="form" label-width="140rpx">
					<view class="number-wrapper">
						<uv-form-item labelPosition="top" label="车牌号码" prop="number">
							<CarNumber v-model="model.number" />
						</uv-form-item>
					</view>
				</uv-form>
			</view>
			<view class="">
				<uv-button text="确认添加" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%);" @click="submit" />
			</view>
		</view>
	</my-drawer>

	<!-- 确认删除	 -->
	<my-confirm ref="confirm"/>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import CarNumber from './components/CarNumber.vue';
	import { GetOwnerCarMgr, CreateOwnerUserCarno, DelteUserCarno } from '@/api/index.js';
	import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
	const checkboxValue = ref([])
	// 管理
	const modal = ref();
	const isEdit = ref(false);

	function edit() {
		if (isEdit.value) {
			checkboxValue.value = [];
		}
		isEdit.value = !isEdit.value;
	}
	// 删除
	const selected = ref();
	const confirm = ref();
	function remove(record) {
		confirm.value.confirm({
			title: '确定删除该车辆？',
			content: '您的运单记录不会被影响',
			cancelText: '取消',
			confirmText: '删除',
			asyncClose: true,
			async confirm() {
				try {
					await DelteUserCarno({
						ownerCarId: record.Id
					})
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
					confirm.value.close();
					getList();
				} catch {
					confirm.value.closeLoading();
				}
			}
		})
	}
	function patchRemove() {
		console.log('checkboxValue', checkboxValue.value)
		if (checkboxValue.value.length === 0) {
			return;
		}
		confirm.value.confirm({
			title: '确定删除所选车辆？',
			content: '您的运单记录不会被影响',
			cancelText: '取消',
			confirmText: '删除',
			asyncClose: true,
			async confirm() {
				try {
					await DelteUserCarno({
						ownerCarId: checkboxValue.value.map(m => m.Id).join(',')
					})
					uni.showToast({
						title: '删除成功',
						icon: 'none'
					})
					confirm.value.close();
					getList();
				} catch {
					confirm.value.closeLoading();
				}
			}
		})
	}

	// 添加
	const myCarNumber = ref();
	const form = ref(null)
	const model = reactive({
		number: '',
	})
	const rules = ref({
		number: {
			// type: 'string',
			validator: (rule, value, callback) => {
				if (!value) return false;
				const arr = value.split('');
				const isOk1 = arr.slice(0, 7).every(m => m !== " ");
				const isOk2 = arr.slice(0, 8).every(m => m !== " ");
				return isOk1 || isOk2;
			},
			message: '请填写正确的车牌号'
		},
	})
	function changeDrawer(show) {
		if(!show.show) {
			model.number = ''
		}
	}
	function addCar() {
		myCarNumber.value.popup.open();
	}
	async function submit() {
		const res = await form.value.validate();
		if(!res) return;
		try {
			uni.showLoading({
				mask: true
			})
			const result = await CreateOwnerUserCarno({
				carno: model.number
			})
			myCarNumber.value.popup.close();
			getList();
		}catch (err){
			uni.showToast({
				title: err.data,
				icon: 'none'
			})
		}
		finally {
			uni.hideLoading()
		}
	}
	
	// 获取列表
	onLoad(() => {
		getList()
	})
	const list = ref([])
	onPullDownRefresh(async () => {
		await getList()
		uni.stopPullDownRefresh();
	})
	async function getList() {
		try {
			uni.showLoading()
			const res = await GetOwnerCarMgr();
			console.log('res',res)
			list.value = res;
		}
		finally {
			uni.hideLoading()
		}
	}
	
	
</script>

<style lang="scss">
	page {
		padding: 96rpx 24rpx calc(var(--safe-area-inset-bottom) + 140rpx);
	}

	.total-box {
		position: fixed;
		z-index: 2000;
		top: 0;
		left: 0;
		width: 100%;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		flex: none;
		background: var(--light-main);
		font-size: 24rpx;
		color: var(--main-color);
	}

	.car-list {
		padding: 0 28rpx;
		background: #ffffff;
		border-radius: 24rpx;

		.uv-checkbox-group {
			display: block !important;
		}

		.car-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32rpx 0;

			.left {
				display: flex;
				align-items: center;
				line-height: 48rpx;
			}

			.btn {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #b0becc;
				line-height: 48rpx;
			}
		}
	}

	.car-number {
		height: 900rpx;
		padding: 0 24rpx;

		.number-wrapper {
			padding: 0 28rpx;
			background: #FFFFFF;
			border-radius: 24rpx;

			.uv-form-item__body {
				padding: 32rpx 0;

				.uv-form-item__body__left {
					margin-bottom: 24rpx !important;

					&__content__label {
						font-size: 28rpx;
						color: var(--content-color);
						line-height: 48rpx;
					}
				}
			}
		}
	}
</style>