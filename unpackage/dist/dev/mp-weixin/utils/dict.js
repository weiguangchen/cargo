"use strict";
const CarTypeOptions = [
  {
    value: "自卸车",
    label: "自卸车"
  },
  {
    value: "半挂车",
    label: "半挂车"
  },
  {
    value: "罐车",
    label: "罐车"
  }
];
const OrderStatusOptions = [{
  name: "生效中",
  value: 3
}, {
  name: "审核中",
  value: 1
}, {
  name: "待生效",
  value: 2
}, {
  name: "已失效",
  value: 4
}];
const ManifestStatusOptions = [{
  name: "进行中",
  value: 1
}, {
  name: "等待暂停",
  value: 2
}, {
  name: "已暂停",
  value: 3
}, {
  name: "等待完结",
  value: 4
}, {
  name: "已完结",
  value: 5
}];
exports.CarTypeOptions = CarTypeOptions;
exports.ManifestStatusOptions = ManifestStatusOptions;
exports.OrderStatusOptions = OrderStatusOptions;
