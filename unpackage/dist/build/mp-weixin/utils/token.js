"use strict";const e=require("../common/vendor.js"),n="cargo-token:wanning";exports.getToken=function(){return e.index.getStorageSync(n)},exports.removeToken=function(){return e.index.removeStorageSync(n)},exports.setToken=function(o){return e.index.setStorageSync(n,o)};
