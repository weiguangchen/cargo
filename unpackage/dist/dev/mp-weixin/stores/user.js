"use strict";
const common_vendor = require("../common/vendor.js");
const utils_token = require("../utils/token.js");
const api_index = require("../api/index.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => {
    return {
      userInfo: {
        Id: "",
        Mobile: "",
        MgrMobile: "",
        OwnerId: "",
        Ownername: "",
        Nickname: "",
        Ismanager: "",
        Headicon: ""
      }
      // carList: []
    };
  },
  getters: {
    // defaultCar: (state) => {
    // 	return state.carList.find(m => m.Isdefault === '1')
    // }
  },
  actions: {
    async login(payload) {
      console.log("login", payload);
      const userInfo = await api_index.loginByMobile({
        ...payload
      });
      console.log("userInfo", userInfo);
      this.userInfo = userInfo;
      utils_token.setToken({
        userInfo,
        token: userInfo.Token
      });
      return userInfo;
    },
    logout() {
      utils_token.removeToken();
    },
    setUserInfo(payload) {
      this.userInfo = payload;
    }
  }
});
exports.useUserStore = useUserStore;
