<template>
	<view class="filter" :class="{ 'active': isFilter }"  @click="openFilter">
		<uv-image v-if="isFilter" src="/static/images/filter/filter-selected.png" width="32rpx" height="32rpx" />
		<uv-image v-else src="/static/images/filter/filter.png" width="32rpx" height="32rpx" />
	</view>
	
	<my-drawer ref="filter" title="数据统计筛选" height="550" @change="change">
		<view class="filter-wrapper">
			<view class="filter-title">时间范围 <text class="sub-title">(出厂结算时间)</text> </view>
			<uv-row customStyle="margin-bottom: 24rpx" gutter="20rpx">
				<uv-col span="4">
					<view class="date-box" :class="{ 'active': dateMode === '全部时间' }" hover-class="select-box--active" hover-start-time="0"
						hover-stay-time="200" @click="setDateMode('全部时间')">全部时间</view>
				</uv-col>
				<uv-col span="4">
					<view class="date-box" :class="{ 'active': dateMode === '今天' }" hover-class="select-box--active" hover-start-time="0" hover-stay-time="200" @click="setDateMode('今天')">今天</view>
				</uv-col>
				<uv-col span="4">
					<view class="date-box" :class="{ 'active': dateMode === '昨天' }"  hover-class="select-box--active" hover-start-time="0" hover-stay-time="200"  @click="setDateMode('昨天')">昨天</view>
				</uv-col>
			</uv-row>
			<uv-row customStyle="margin-bottom: 24rpx" gutter="20rpx">
				<uv-col span="4">
					<view class="date-box" :class="{ 'active': dateMode === '本月' }" hover-class="select-box--active" hover-start-time="0" hover-stay-time="200"  @click="setDateMode('本月')">
						本月</view>
				</uv-col>
				<uv-col span="4">
					<view class="date-box" :class="{ 'active': dateMode === '近7天' }" hover-class="select-box--active" hover-start-time="0" hover-stay-time="200"  @click="setDateMode('近7天')">近 7 天</view>
				</uv-col>
				<uv-col span="4">
					<view class="date-box" :class="{ 'active': dateMode === '自定义时间' }" hover-class="select-box--active" hover-start-time="0" hover-stay-time="200" @click="setDateMode('自定义时间')">自定义时间</view>
				</uv-col>
			</uv-row>
			<MyDatetime v-if="dateMode === '自定义时间'" v-model="date" @change="changeDate" :disabled="disabledDate"/>
			<view class="filter-title">装货信息</view>
			<uv-row customStyle="margin-bottom: 24rpx" gutter="20rpx">
				<uv-col span="6">
					<MySelect :options="mfrsOptions" v-model="mfrs" title="选择装货厂家" placeholder="全部装货厂家" @change="changeMfrs"/>
				</uv-col>
				<uv-col span="6">
					<MySelect :options="materialOptions" v-model="material" title="选择物料" placeholder="全部物料" :disabled="!mfrs" @disabled-click="disabledClick"/>
				</uv-col>
			</uv-row>
			<view class="filter-title">卸货信息</view>
			<uv-row customStyle="margin-bottom: 24rpx" gutter="20rpx">
				<uv-col span="12">
					<MySelect :options="dischargeOptions" v-model="discharge" title="选择卸货地" placeholder="全部卸货地"/>
				</uv-col>
			</uv-row>
			<view class="filter-title">货主信息</view>
			<uv-row customStyle="margin-bottom: 24rpx" gutter="20rpx">
				<uv-col span="12">
					<MySelect :options="cargoOptions" v-model="cargo" title="选择货主信息" placeholder="全部货主信息" :disabled="!mfrs" @disabled-click="disabledClick"/>
				</uv-col>
			</uv-row>
			<view class="filter-title">车辆信息</view>
			<uv-row customStyle="margin-bottom: 24rpx" gutter="20rpx">
				<uv-col span="12">
					<MySelect :options="carOptions" v-model="car" title="选择车辆信息" placeholder="全部车辆信息"/>
				</uv-col>
			</uv-row>
		</view>

		<template #footer>
			<view class="btn-group">
				<view class="left">
					<uv-button text="重置" :custom-style="{ height: '96rpx', color: 'var(--sub-color)', borderRadius: '16rpx', fontSize: '30rpx', fontWeight: 'bold' }" @click="reset"></uv-button>
				</view>
				<view class="right">
					<uv-button text="筛选" color="linear-gradient( 270deg, #31CE57 0%, #07B130 100%)" :custom-style="{ height: '96rpx', borderRadius: '16rpx', fontSize: '30rpx', fontWeight: 'bold' }" @click="submit"></uv-button>
				</view>
			</view>
		</template>
	</my-drawer>

	<!-- 时间类型 -->
	<uv-datetime-picker ref="datetimePicker"  mode="date" confirmColor="var(--main-color)" @confirm="confirmDateTime" :min-date="minDate" :max-date="maxDate"/>

</template>

<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue'
	import MySelect from './my-select.vue';
	import MyDatetime from './my-datetime.vue';
	import dayjs from 'dayjs';
	import { GetOwnerSupplyList, GetOwnerMaterialsList, GetUnloadPlaceList, GetOwnerBySupply, GetOwnerUserCarList } from '@/api/index.js'
	
	const emits = defineEmits(['visible-change','change'])
	function change(show) {
		emits('visible-change',show)
	}
	
	const filter = ref();
	function openFilter() {
		filter.value.popup.open();
		getOwnerSupplyListOptions();
		getOwnerMaterialsListOptions();
		getUnloadPlaceListOptions();
		getOwnerUserCarListOptions();
		getOwnerBySupplyOptions();
	}
	
	// 接单时间
	const dateMode = ref('全部时间')
	const disabledDate = ref(true);
	function setDateMode(mode) {
		dateMode.value = mode;
		if(dateMode.value === '全部时间') {
			date.value = []
			disabledDate.value = true;
		}
		if(dateMode.value === '今天') {
			date.value = [dayjs().format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')]
			disabledDate.value = true;
		}
		if(dateMode.value === '昨天') {
			date.value = [dayjs().subtract(1,'day').format('YYYY-MM-DD'),dayjs().subtract(1,'day').format('YYYY-MM-DD')]
			disabledDate.value = true;
		}
		if(dateMode.value === '本月') {
			date.value = [dayjs().startOf('month').format('YYYY-MM-DD'),dayjs().endOf('month').format('YYYY-MM-DD')]
			disabledDate.value = true;
		}
		if(dateMode.value === '近7天') {
			date.value = [dayjs().subtract(7,'day').format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')]
			disabledDate.value = true;
		}
		if(dateMode.value === '自定义时间') {
			disabledDate.value = false;
		}
	}
	const date = ref([]);
	function changeDate(date) {
		console.log(date)
	}
	// 装货厂家
	const mfrsOptions = ref([])
	async function getOwnerSupplyListOptions() {
		try {
			const res = await GetOwnerSupplyList()
			mfrsOptions.value = res.map(m => ({
				value: m.Id,
				label: m.Fullname
			}));
		}
		catch {
			mfrsOptions.value = [];
		}
	}
	const mfrs = ref('')
	function changeMfrs(val) {
		material.value = '';
		cargo.value = '';
		getOwnerMaterialsListOptions();
		getOwnerBySupplyOptions();
	}
	function disabledClick() {
		uni.showToast({
			title: '请先选择装货厂家',
			icon: 'none'
		})
	}
	// 物料
	const materialOptions = ref([])
	async function getOwnerMaterialsListOptions() {
		try {
			const res = await GetOwnerMaterialsList({
				supplyId: mfrs.value
			})
			materialOptions.value = res.map(m => ({
				value: m.MaterialId,
				label: m.MaterialName
			}));
		}
		catch {
			materialOptions.value = [];
		}
	}
	const material = ref('')
	// 卸货信息
	const dischargeOptions = ref([])
	async function getUnloadPlaceListOptions() {
		try {
			const res = await GetUnloadPlaceList()
			dischargeOptions.value = res.map(m => ({
				value: m.Id,
				label: m.Placename
			}));
		}
		catch {
			dischargeOptions.value = [];
		}
	}
	const discharge = ref('')
	// 货主信息
	const cargoOptions = ref([])
	async function getOwnerBySupplyOptions() {
		try {
			const res = await GetOwnerBySupply({
				supplyId: mfrs.value
			})
			cargoOptions.value = res.map(m => ({
				value: m.Id,
				label: m.Ownername
			}));
		}
		catch {
			cargoOptions.value = [];
		}
	}
	const cargo = ref('')
	// 车辆
	const carOptions = ref([])
	async function getOwnerUserCarListOptions() {
		try {
			const res = await GetOwnerUserCarList()
			carOptions.value = res.map(m => ({
				value: m.Id,
				label: m.Carno
			}));
		}
		catch {
			carOptions.value = [];
		}
	}
	const car = ref('')
	
	
	// 包装参数
	const formValues = computed(() => {
		const values = {};
		const [startTime,endTime] = date.value;
		if(startTime) values.startTime = startTime;
		if(endTime) values.endTime = endTime;
		if(mfrs.value) values.supplyId = mfrs.value;
		if(material.value) values.materialId = material.value;
		if(discharge.value) values.unplaceId = discharge.value;
		if(cargo.value) values.ownerId = cargo.value;
		if(car.value) values.carno = car.value;
		console.log('formValues',formValues)
		return values;
	})
	const params = ref({})
	// 是否筛选
	const isFilter = computed(() => {
		return Object.keys(params.value).some(m => params.value[m])
	})
		
	function reset() {
		dateMode.value = '全部时间';
		disabledDate.value = true;
		date.value = [];
		mfrs.value = '';
		material.value = '';
		discharge.value = '';
		cargo.value = '';
		car.value = '';
		params.value = formValues.value;
		getOwnerMaterialsListOptions();
		emits('change', {
			params: params.value,
			isFilter: isFilter.value
		})
		filter.value.popup.close();
	}
	function submit() {
		params.value = formValues.value;
		filter.value.popup.close();
		emits('change', {
			params: params.value,
			isFilter: isFilter.value
		})
	}
	
	
	
	defineExpose({
		reset
	})
</script>

<style lang="scss">
	.filter {
		margin-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64rpx;
		height: 64rpx;
		background: #FFFFFF;
		border-radius: 50%;
		border: 1rpx solid rgba(151, 151, 151, 0.2);
		
		&.active {
			background: #31CE57;
			border: none;
		}
	}
	.filter-wrapper {
		padding: 0 24rpx;

		.filter-title {
			display: flex;
			align-items: center;
			font-weight: 500;
			font-size: 30rpx;
			color: var(--title-color);
			line-height: 48rpx;
			margin-bottom: 16rpx;
			.sub-title {
				font-size: 24rpx;
				color: var(--sub-color);
				line-height: 48rpx;
				margin-left: 8px;
			}
		}

		.date-range {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;
			padding: 0 10rpx;

			.start-date,
			.end-date {
				justify-content: space-between;
				width: 300rpx;
				flex: none;
				color: var(--intr-color);
			}
		}

		.date-box,
		.start-date,
		.end-date {
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--intr-color);
			padding: 0 32rpx;
			height: 72rpx;
			background: #FFFFFF;
			border-radius: 36rpx;
			border: 2rpx solid var(--divider);
			font-size: 26rpx;
			line-height: 48rpx;

			&--active {
				opacity: 0.45;
			}

			&.active {
				background: linear-gradient(270deg, #31CE57 0%, #07B130 100%);
				color: #FFFFFF;
				border: none;
			}
		}
	}

	.btn-group {
		display: flex;

		.left {
			width: 192rpx;
			margin-right: 20rpx;
		}

		.right {
			flex: 1;
		}
	}
</style>