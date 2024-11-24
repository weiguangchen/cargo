export const BillStatus = [{
	value: 1,
	label: '待入厂'
}, {
	value: 2,
	label: '待入厂'
}, {
	value: 3,
	label: '已入厂'
}, {
	value: 4,
	label: '已入厂'
}, {
	value: 5,
	label: '装车中'
}, {
	value: 6,
	label: '已装车'
}, {
	value: 7,
	label: '已出厂'
}, {
	value: 8,
	label: '已完成'
}, {
	value: 9,
	label: '已取消'
}]

export const CarTypeOptions = [{
		value: '自卸车',
		label: '自卸车'
	},
	{
		value: '半挂车',
		label: '半挂车'
	},
	{
		value: '罐车',
		label: '罐车'
	}
]

/**
 * 订单状态
*/
export const OrderStatusOptions = [{
	name: '生效中',
	value: 3
}, {
	name: '审核中',
	value: 1
}, {
	name: '待生效',
	value: 2
}, {
	name: '已失效',
	value: 4
}]

/**
 * 货单状态
*/
export const ManifestStatusOptions = [{
	name: '进行中',
	value: 1
}, {
	name: '等待暂停',
	value: 2
}, {
	name: '已暂停',
	value: 3
}, {
	name: '等待完结',
	value: 4
}, {
	name: '已完结',
	value: 5
}]