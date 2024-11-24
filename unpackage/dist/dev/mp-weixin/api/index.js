"use strict";
const utils_request = require("../utils/request.js");
function getPhoneByCode(data) {
  return utils_request.request.post("/api/CommBusinessData/GetOwnerMobile", data);
}
function loginByMobile(data) {
  return utils_request.request.post("/api/permission/WechatApi/OwnerLogin", data);
}
function UptOwnerUserNickName(data) {
  return utils_request.request.post("/api/permission/WechatApi/UptOwnerUserNickName", data);
}
function GetGoodsOrderCount(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetGoodsOrderCount", data);
}
function GetSupplierList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetSupplierList", data);
}
function GetSupplyMaterialByOwner(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetSupplyMaterialByOwner", data);
}
function GetSupplyOnwayDetail(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetSupplyOnwayDetail", data);
}
function GetOnwayTimeTree(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOnwayTimeTree", data);
}
function GetOwnerTotal(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerTotal", data);
}
function GetOwnerSupplyList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerSupplyList", data);
}
function GetOwnerMaterialsList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerMaterialsList", data);
}
function GetUnloadPlaceList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetUnloadPlaceList", data);
}
function GetOwnerUserCarList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerUserCarList", data);
}
function GetOwnerBySupply(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerBySupply", data);
}
function GetOwnerUnloadPlace(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerUnloadPlace", data);
}
function UptUnloadPlace(data) {
  return utils_request.request.post("/api/permission/WechatApi/UptUnloadPlace", data);
}
function GetUnloadPlace(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetUnloadPlace", data);
}
function DeleteUnloadPlace(data) {
  return utils_request.request.post("/api/permission/WechatApi/DeleteUnloadPlace", data);
}
function GetLocationByJW(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetLocationByJW", data);
}
function GetOwnerBalanceTotal(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerBalanceTotal", data);
}
function GetOwnerAmountDetail(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerAmountDetail", data);
}
function GetOwnerCarMgr(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerCarMgr", data);
}
function CreateOwnerUserCarno(data) {
  return utils_request.request.post("/api/permission/WechatApi/CreateOwnerUserCarno", data);
}
function DelteUserCarno(data) {
  return utils_request.request.post("/api/permission/WechatApi/DelteUserCarno", data);
}
function GetProtocolList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetProtocolList", data);
}
function GetOwnerOrderList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerOrderList", data);
}
function SetAssignTicket(data) {
  return utils_request.request.post("/api/permission/WechatApi/SetAssignTicket", data);
}
function GetAssignCarList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetAssignCarList", data);
}
function GetAssignDetail(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetAssignDetail", data);
}
function GetOrderListByTab(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOrderListByTab", data);
}
function GetOrderDetail(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOrderDetail", data);
}
function GetOwnerOnwayList(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOwnerOnwayList", data);
}
function GetOnwayOwner(data) {
  return utils_request.request.post("/api/permission/WechatApi/GetOnwayOwner", data);
}
exports.CreateOwnerUserCarno = CreateOwnerUserCarno;
exports.DeleteUnloadPlace = DeleteUnloadPlace;
exports.DelteUserCarno = DelteUserCarno;
exports.GetAssignCarList = GetAssignCarList;
exports.GetAssignDetail = GetAssignDetail;
exports.GetGoodsOrderCount = GetGoodsOrderCount;
exports.GetLocationByJW = GetLocationByJW;
exports.GetOnwayOwner = GetOnwayOwner;
exports.GetOnwayTimeTree = GetOnwayTimeTree;
exports.GetOrderDetail = GetOrderDetail;
exports.GetOrderListByTab = GetOrderListByTab;
exports.GetOwnerAmountDetail = GetOwnerAmountDetail;
exports.GetOwnerBalanceTotal = GetOwnerBalanceTotal;
exports.GetOwnerBySupply = GetOwnerBySupply;
exports.GetOwnerCarMgr = GetOwnerCarMgr;
exports.GetOwnerMaterialsList = GetOwnerMaterialsList;
exports.GetOwnerOnwayList = GetOwnerOnwayList;
exports.GetOwnerOrderList = GetOwnerOrderList;
exports.GetOwnerSupplyList = GetOwnerSupplyList;
exports.GetOwnerTotal = GetOwnerTotal;
exports.GetOwnerUnloadPlace = GetOwnerUnloadPlace;
exports.GetOwnerUserCarList = GetOwnerUserCarList;
exports.GetProtocolList = GetProtocolList;
exports.GetSupplierList = GetSupplierList;
exports.GetSupplyMaterialByOwner = GetSupplyMaterialByOwner;
exports.GetSupplyOnwayDetail = GetSupplyOnwayDetail;
exports.GetUnloadPlace = GetUnloadPlace;
exports.GetUnloadPlaceList = GetUnloadPlaceList;
exports.SetAssignTicket = SetAssignTicket;
exports.UptOwnerUserNickName = UptOwnerUserNickName;
exports.UptUnloadPlace = UptUnloadPlace;
exports.getPhoneByCode = getPhoneByCode;
exports.loginByMobile = loginByMobile;
