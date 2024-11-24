import {
	defineStore
} from 'pinia';
import { setToken, removeToken } from '@/utils/token.js'
import { getPhoneByCode, loginByMobile } from '@/api/index.js'

export const useUserStore = defineStore('user', {
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
			},
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
			console.log('login',payload)
			const userInfo = await loginByMobile({
				...payload
			})
			console.log('userInfo',userInfo)
			this.userInfo = userInfo;
			setToken({
				userInfo,
				token: userInfo.Token
			})
			return userInfo;
		},
		logout() {
			removeToken();
		},
		setUserInfo(payload) {
			this.userInfo = payload;
		},
	},
});