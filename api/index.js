//引入request.js文件
import request from "@/utils/request.js";

/**
 * 根据code获取手机号
 */
export function getPhoneByCode(data) {
  return request.post("/api/CommBusinessData/GetOwnerMobile", data);
}
//登录获取用户信息
export function loginByMobile(data) {
  return request.post("/api/permission/WechatApi/OwnerLogin", data);
}
/**
 * 修改货主昵称
 */
export function UptOwnerUserNickName(data) {
  return request.post("/api/permission/WechatApi/UptOwnerUserNickName", data);
}
/**
 * 获取首页进行中的运单数
 */
export function GetGoodsOrderCount(data) {
  return request.post("/api/permission/WechatApi/GetGoodsOrderCount", data);
}

/**
 * 获取生产企业列表
 */
export function GetSupplierList(data) {
  return request.post("/api/permission/WechatApi/GetSupplierList", data);
}
/**
 * 获取生产企业详情
 */
export function GetSupplyMaterialByOwner(data) {
  return request.post(
    "/api/permission/WechatApi/GetSupplyMaterialByOwner",
    data
  );
}

/**
 * 获取运单详情
 */
export function GetSupplyOnwayDetail(data) {
  return request.post("/api/permission/WechatApi/GetSupplyOnwayDetail", data);
}

/**
 * 取消运单
 */
export function DisableOnwayEnt(data) {
  return request.post("/api/permission/WechatApi/DisableOnwayEnt", data);
}
/**
 * 确认卸货
 */
export function UnloadConfirm(data) {
  return request.post("/api/permission/WechatApi/UnloadConfirm", data);
}

/**
 * 获取运单时间树
 */
export function GetOnwayTimeTree(data) {
  return request.post("/api/permission/WechatApi/GetOnwayTimeTree", data);
}

/**
 * 获取车辆列表
 */
export function getCarList(data) {
  return request.post("/api/permission/WechatApi/GetDriverCarList", data);
}
/**
 * 添加司机车辆
 */
export function UptOrNewDriverCar(data) {
  return request.post("/api/permission/WechatApi/UptOrNewDriverCar", data);
}
/**
 * 删除司机车辆
 */
export function DiabledDriverCar(data) {
  return request.post("/api/permission/WechatApi/DiabledDriverCar", data);
}
// 获取首页可接单列表
export function GetGoodsOrderCanReceived(data) {
  return request.post(
    "/api/permission/WechatApi/GetGoodsOrderCanReceived",
    data
  );
}
// 获取首页进行中的运单数
export function GetDriverWayCount(data) {
  return request.post("/api/permission/WechatApi/GetDriverWayCount", data);
}
// 获取货主列表
export function GetGoodsCompanyList(data) {
  return request.post("/api/permission/WechatApi/GetGoodsCompanyList", data);
}

/**
 * 统计列表
 */
export function GetOwnerTotal(data) {
  return request.post("/api/permission/WechatApi/GetOwnerTotal", data);
}
/**
 * 筛选条件装货厂家
 */
export function GetOwnerSupplyList(data) {
  return request.post("/api/permission/WechatApi/GetOwnerSupplyList", data);
}
/**
 * 筛选条件（物料）
 */
export function GetOwnerMaterialsList(data) {
  return request.post("/api/permission/WechatApi/GetOwnerMaterialsList", data);
}
/**
 * 筛选条件（卸货地）
 */
export function GetUnloadPlaceList(data) {
  return request.post("/api/permission/WechatApi/GetUnloadPlaceList", data);
}
/**
 * 筛选条件（车辆）
 */
export function GetOwnerUserCarList(data) {
  return request.post("/api/permission/WechatApi/GetOwnerUserCarList", data);
}
/**
 * 筛选条件（货主）
 */
export function GetOwnerBySupply(data) {
  return request.post("/api/permission/WechatApi/GetOwnerBySupply", data);
}

/**
 * 卸货地列表
 */
export function GetOwnerUnloadPlace(data) {
  return request.post("/api/permission/WechatApi/GetOwnerUnloadPlace", data);
}

/**
 * 添加/编辑卸货地
 */
export function UptUnloadPlace(data) {
  return request.post("/api/permission/WechatApi/UptUnloadPlace", data);
}

/**
 * 卸货地详情
 */
export function GetUnloadPlace(data) {
  return request.post("/api/permission/WechatApi/GetUnloadPlace", data);
}

/**
 * 删除卸货地
 */
export function DeleteUnloadPlace(data) {
  return request.post("/api/permission/WechatApi/DeleteUnloadPlace", data);
}

/**
 * 高德逆地理
 */
export function GetLocationByJW(data) {
  return request.post("/api/permission/WechatApi/GetLocationByJW", data);
}

/**
 * 我的账户
 */
export function GetOwnerBalanceTotal(data) {
  return request.post("/api/permission/WechatApi/GetOwnerBalanceTotal", data);
}

/**
 * 我的账户详情
 */
export function GetOwnerAmountDetail(data) {
  return request.post("/api/permission/WechatApi/GetOwnerAmountDetail", data);
}

/**
 * 货主车辆列表
 */
export function GetOwnerCarMgr(data) {
  return request.post("/api/permission/WechatApi/GetOwnerCarMgr", data);
}

/**
 * 添加车辆
 */
export function CreateOwnerUserCarno(data) {
  return request.post("/api/permission/WechatApi/CreateOwnerUserCarno", data);
}

/**
 * 删除车辆
 */
export function DelteUserCarno(data) {
  return request.post("/api/permission/WechatApi/DelteUserCarno", data);
}

/**
 * 协议
 */
export function GetProtocolList(data) {
  return request.post("/api/permission/WechatApi/GetProtocolList", data);
}

/**
 * 根据装货地和货主公司获取订单
 */
export function GetOwnerOrderList(data) {
  return request.post("/api/permission/WechatApi/GetOwnerOrderList", data);
}

/**
 * 派单
 */
export function SetAssignTicket(data) {
  return request.post("/api/permission/WechatApi/SetAssignTicket", data);
}

/**
 * 货单列表
 */
export function GetAssignCarList(data) {
  return request.post("/api/permission/WechatApi/GetAssignCarList", data);
}

/**
 * 货单列表
 */
export function GetAssignCarListWithCount(data) {
  return request.post(
    "/api/permission/WechatApi/GetAssignCarListWithCount",
    data
  );
}

/**
 * 货单详情
 */
export function GetAssignDetail(data) {
  return request.post("/api/permission/WechatApi/GetAssignDetail", data);
}

/**
 * 完结或暂停货单
 */
export function SetAssignStatusChg(data) {
  return request.post("/api/permission/WechatApi/SetAssignStatusChg", data);
}

/**
 * 继续货单
 */
export function ResetAssignStatusChg(data) {
  return request.post("/api/permission/WechatApi/ResetAssignStatusChg", data);
}

/**
 * 订单列表
 */
export function GetOrderListByTab(data) {
  return request.post("/api/permission/WechatApi/GetOrderListByTab", data);
}

/**
 * 订单详情
 */
export function GetOrderDetail(data) {
  return request.post("/api/permission/WechatApi/GetOrderDetail", data);
}

/**
 * 货主运单列表
 */
export function GetOwnerOnwayList(data) {
  return request.post("/api/permission/WechatApi/GetOwnerOnwayList", data);
}
export function GetOnwayOwner(data) {
  return request.post("/api/permission/WechatApi/GetOnwayOwner", data);
}
/**
 * 运单列表（带筛选）
 */
export function GetOnwayOwnerWithCount(data) {
  return request.post("/api/permission/WechatApi/GetOnwayOwnerWithCount", data);
}

/**
 * 货主公司筛选条件
 */
export function GetOwnerFilterList(data) {
  return request.post("/api/permission/WechatApi/GetOwnerFilterList", data);
}
/**
 * 账户详情
 */
export function GetCustomerAmountDetail(data) {
  return request.post(
    "/api/permission/wechatapi/GetCustomerAmountDetail",
    data
  );
}
/**
 * 数据统计
 */
export function GetownerTotalsupply(data) {
  return request.post("/api/permission/wechatapi/GetownerTotalsupply", data);
}
