import Request from '@/js_sdk/luch-request/luch-request/index.js'
const key = '41a9d7f7c472b2ee54402745140bbb99';
var request = new Request();

request.interceptors.request.use(config => {
	config.data = {
		key,
		...config.data
	}

	return config;
})
request.interceptors.response.use(
	function(response) {
		// console.log('response',response)
		return response.data
	},
)

export const baseURL = process.env.BASE_URL;
// 设置超时
request.config.timeout = 60000;
//设置请求基地址
request.config.baseURL = baseURL;

//逆地理编码
export function regeo(params) {
	return request.get("https://restapi.amap.com/v3/geocode/regeo", {
		params: {
			...params
		}
	});
}



