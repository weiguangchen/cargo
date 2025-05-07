<template>
	<uv-form errorType="toast" :model="model" :rules="rules" ref="form" label-width="88rpx">
		<view class="form-title">卸货地信息 <text v-if="model.Id">（不可修改）</text></view>
		<view class="form-wrapper">
			<uv-form-item labelPosition="left" label="名称" prop="Placename" borderBottom>
				<template v-if="model.Id" >{{ model.Placename }}</template>
				<uv-input v-else v-model="model.Placename" placeholder="请输入，提交后不可修改" border="none" maxlength="30" placeholder-style="color:var(--intr-color)" />
			</uv-form-item>
			<uv-form-item labelPosition="left" label="地区" borderBottom v-if="model.Area.province">
				{{ model.Area.province }} {{ model.Area.city }} {{ model.Area.district }}
			</uv-form-item>
			<uv-form-item v-if="model.Id" labelPosition="left" label="地址" prop="Area.address">
				{{ model.Area.address }}
			</uv-form-item>
			<uv-form-item v-else labelPosition="left" label="地址" prop="Area.address" @click="chooseLocation">
				<uv-input v-model="model.Area.address" placeholder="请输入，提交后不可修改" placeholder-style="color:var(--intr-color)"
					border="none" readonly />
				<template v-slot:right>
					<uv-icon name="arrow-right" :custom-style="{ color: 'var(--intr-color)' }" size="12" />
				</template>
			</uv-form-item>
		</view>
		<view class="form-title">联系人信息</view>
		<view class="form-wrapper">
			<uv-form-item labelPosition="left" label="称呼" prop="Nickname" borderBottom>
				<uv-input v-model="model.Nickname" placeholder="请输入，提交后不可修改" placeholder-style="color:var(--intr-color)"
					maxlength="6" border="none" />
			</uv-form-item>
			<uv-form-item labelPosition="left" label="电话" prop="Mobile">
				<uv-input v-model="model.Mobile" placeholder="请输入，提交后不可修改" placeholder-style="color:var(--intr-color)"
					maxlength="11" border="none" />
			</uv-form-item>
		</view>
	</uv-form>

	<view class="page-footer">
		<view style="width: 262rpx;" v-if="model.Id">
			<uv-button :loading="loading" text="删除地址" :custom-style="{ height: '96rpx', borderRadius: '16rpx', backgroundColor: '#FFF0EE', borderColor: '#FFF0EE' }" :custom-text-style="{ color: 'var(--red-color)' }" color="var(--red-color)"
				@click="remove" />
		</view>
		<view style="flex:1;">
			<uv-button :loading="loading" text="确认添加" :custom-style="{ height: '96rpx', borderRadius: '16rpx' }" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)"
				@click="submit" />
		</view>
	</view>
	
	<my-confirm ref="confirm"/>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		UptUnloadPlace,
		GetUnloadPlace,
		GetLocationByJW,
		DeleteUnloadPlace
	} from '@/api/index.js'
	import {
		onLoad,
		onUnload
	} from '@dcloudio/uni-app'
	onLoad(async (options) => {
		const {
			unloadId
		} = options;
		model.Id = unloadId;
		if (unloadId) {
			uni.setNavigationBarTitle({
				title: '修改卸货地址'
			})
			try {
				const res = await GetUnloadPlace({
					unloadId
				})
				console.log('res', res)
				model.Area = {
					address: res.Address,
					province: res.Province,
					city: res.City,
					district: res.Distinct,
					districtCode: res.DistrictCode,
					latitude: res.Latitude,
					longitude: res.Logitude
				}
				model.Mobile = res.Mobile;
				model.Nickname = res.Nickname;
				model.Placename = res.Placename;
			} catch {

			}
		}else {
			uni.setNavigationBarTitle({
				title: '添加卸货地址'
			})
		}
	})




	const form = ref(null);

	const model = reactive({
		Id: '',
		Placename: '',
		Area: {
			address: ''
		},
		Nickname: '',
		Mobile: '',
	})
	const rules = ref({
		Placename: [{
				type: 'string',
				required: true,
				message: '请填写卸货地名称',
				trigger: ['blur', 'change']
			},
			{
				message: '最多输入30个字',
				max: 30,
				trigger: ['blur', 'change']
			}
		],
		'Area.address': {
			type: 'string',
			required: true,
			message: '请选择地址',
			trigger: ['blur', 'change']
		},
		Nickname: {
			type: 'string',
			required: true,
			message: '请填写联系人称呼',
			trigger: ['blur', 'change']
		},
		Mobile: [
			{
				type: 'string',
				required: true,
				message: '请填写联系人电话',
				trigger: ['blur', 'change']
			},
			{
				type: 'string',
				message: '请填写正确的手机或电话号码',
				pattern:  /^(?:(?:(?:\+|00)86)?1[3-9]\d{9}|(?:\d{3}-)?\d{8}|(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
				trigger: ['blur', 'change'],
			}
		],
	})

	async function chooseLocation() {
		try {
			const res = await uni.chooseLocation();
			console.log('res', res)
			const {
				latitude,
				longitude
			} = res;
			const location = latitude && longitude ? `${longitude},${latitude}` : '';
			if (location) {
				const response = await GetLocationByJW({
					logitude: longitude,
					latitude: latitude
				})
				console.log('response', response)
				const {
					province,
					city,
					distinct,
					address,
					districtCode
				} = response;
				let area = {
					province,
					city,
					district: distinct,
					districtCode: districtCode,
					address,
					latitude,
					longitude
				};
				console.log(area)
				model.Area = area;
			}
		} catch {

		}
	}

	const loading = ref(false);
	const confirm = ref();
	function remove() {
		confirm.value.confirm({
			title: '确定删除卸货地址？',
			content: '您的货单和运单记录不会被影响',
			confirmText: '删除',
			asyncClose: true,
			async confirm() {
				try {
					await DeleteUnloadPlace({
						unloadId: model.Id
					})
					uni.showToast({
						title: '卸货地删除成功',
						icon: 'none'
					})
					uni.$emit('addAddress')
					uni.navigateBack();
				} catch {
					confirm.value.closeLoading();
				}
			}
		})
	}
	async function submit() {
		const valid = await form.value.validate();
		if (valid) {
			const {
				Area: {
					address,
					city,
					province,
					district,
					districtCode,
					longitude,
					latitude
				},
				Placename,
				Mobile,
				Nickname,
				Id
			} = model;
			const params = {
				Id,
				Address: address,
				City: city,
				Province: province,
				Distinct: district,
				DistrictCode: districtCode,
				Placename,
				Logitude: longitude,
				Latitude: latitude,
				Mobile,
				Nickname
			}
			console.log('params', params);
			try {
				loading.value = true;
				UptUnloadPlace(params);
				uni.$emit('addAddress')
				uni.navigateBack();
			} catch (err) {
				console.log('err', err)
				uni.showToast({
					title:err.data,
					icon: 'none'
				})
			} finally {
				loading.value = false;
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding: 24rpx 24rpx 140rpx;
	}

	.form-title {
		font-weight: 500;
		font-size: 26rpx;
		color: var(--content-color);
		line-height: 32rpx;
		margin-bottom: 20rpx;
	}

	.form-wrapper {
		padding: 0 28rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		margin-bottom: 32rpx;

		.uv-form-item__body {
			padding: 38rpx 0 !important;

			.uv-form-item__body__left__content__label {
				font-size: 28rpx !important;
				color: var(--content-color) !important;
				line-height: 36rpx;
			}
		}
	}

	.page-footer {
		display: flex;
		gap: 20rpx;
	}
</style>