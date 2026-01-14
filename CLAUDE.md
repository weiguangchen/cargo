# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 uni-app 框架的货主端微信小程序，用于管理货主运单、车辆、生产企业等物流相关业务。

## 开发工具与命令

### 运行项目
使用 HBuilderX 打开项目，选择对应环境运行到微信小程序开发者工具。

### 环境配置
在 `package.json` 的 `uni-app.scripts` 中配置了多个环境：

- `mp-weixin-test` - 货主端测试环境 (BASE_URL: https://www.wwwxapp.cn:28064)
- `mp-weixin-test:wanning` - 万宁货主端测试环境 (BASE_URL: https://www.wnlsjc.com:8029)
- `mp-weixin-prod` - 货主端生产环境 (BASE_URL: https://www.wwwxapp.cn:28063)
- `mp-weixin-prod:wanning` - 万宁货主端生产环境 (BASE_URL: https://www.wnlsjc.com:8023)

在 HBuilderX 中运行前选择对应的环境脚本。

## 架构说明

### 技术栈
- Vue 3 (Composition API)
- Pinia (状态管理)
- uv-ui-tools (UI 组件库)
- luch-request (HTTP 请求封装)

### 目录结构
```
├── api/              # API 接口定义
├── components/       # 全局组件
├── hooks/           # 自定义 hooks (useList, usePage)
├── js_sdk/          # 第三方 SDK
├── mine/            # 我的模块相关页面
├── pages/           # 页面目录
├── stores/          # Pinia 状态管理
│   ├── app.js       # 应用级状态 (tabbar、任务页面状态)
│   ├── location.js  # 位置相关状态
│   └── user.js      # 用户信息状态
├── static/          # 静态资源
├── styles/          # 全局样式
├── uni_modules/     # uni-app 插件模块 (uv-ui 组件库)
└── utils/           # 工具函数
    ├── authorize.js # 微信授权相关
    ├── dict.js      # 字典数据
    ├── index.js     # 通用工具
    ├── request.js   # HTTP 请求封装
    └── token.js     # Token 管理
```

### 核心架构要点

#### API 层
所有 API 接口在 `api/index.js` 中定义，使用 `request.post()` 方法调用。请求会自动携带 `ownerUserId` 和 `Authorization` token。

#### 请求拦截
- 请求拦截器自动在请求体中添加 `ownerUserId` (来自 token 中的 userInfo.Id)
- 响应拦截器处理 code: 200 (成功返回 data) 和 code: 600 (登录过期，退出登录)
- Token 存储在 localStorage 中，key 由环境变量 `TOKEN_KEY` 控制

#### 状态管理
- `user.js` - 用户信息 (Id, Mobile, OwnerId, Nickname 等) 和登录/登出逻辑
- `app.js` - tabbar 状态、任务页面查询条件、reload 状态
- `location.js` - 位置相关状态

#### 页面路由
页面路由配置在 `pages.json` 中，主要页面包括：
- `index` - 首页
- `enterprise` - 生产企业
- `task` - 当前任务
- `mine` - 我的
- `dispatchTask` - 派车任务
- `waybill` - 运单相关
- `orderList/orderDetail` - 订单相关
- `manifestList/manifestDetail` - 货单相关

### 自定义 Hooks
- `useList.js` - 列表数据管理的通用 hook
- `usePage.js` - 分页和筛选逻辑的通用 hook

### 微信相关
- 小程序 appid: `wxb5fad8a0509b83a9` (在 manifest.json 中配置)
- 使用了地理位置相关权限 (getLocation, chooseLocation 等)
- App.vue 中实现了微信小程序自动更新机制
- 加载了自定义字体 (misans400/500/600)

### 重要注意事项
1. 添加新的 API 接口时，在 `api/index.js` 中定义，会自动携带认证信息
2. 需要用户信息的页面使用 `useUserStore` 获取
3. 跨页面的状态共享考虑使用 Pinia store
4. 涉及位置的页面需要确认已配置相关隐私权限
