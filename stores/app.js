import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      tabbarValue: 0,
      tabbarList: [
        {
          text: "首页",
          pagePath: "/pages/index/index",
          iconPath: "/static/images/tabbar/home.png",
          selectedIconPath: "/static/images/tabbar/home_selected.png",
        },
        {
          text: "生产企业",
          pagePath: "/pages/enterprise/enterprise",
          iconPath: "/static/images/tabbar/enterprise.png",
          selectedIconPath: "/static/images/tabbar/enterprise_selected.png",
        },
        {
          text: "当前任务",
          pagePath: "/pages/task/task",
          iconPath: "/static/images/tabbar/bill.png",
          selectedIconPath: "/static/images/tabbar/bill_selected.png",
        },
        {
          text: "我的",
          pagePath: "/pages/mine/mine",
          iconPath: "/static/images/tabbar/mine.png",
          selectedIconPath: "/static/images/tabbar/mine_selected.png",
        },
      ],
      // 任务页面相关
      reloadTaskInit: false, //task页面task:reload方法是否初始化
      taskQuery: {
        current: null, // 当前tab
      },
    };
  },
  actions: {
    switchTab(index) {
      this.tabbarValue = index;
    },
    setReloadTaskInit(payload) {
      this.reloadTaskInit = payload;
    },
    setTaskQuery(payload) {
      this.taskQuery = {
        ...this.taskQuery,
        ...payload,
      };
    },
  },
});
