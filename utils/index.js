export function sleep(time = 2000) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, time)
	})
}

/**
 * 获取两个gcj02坐标点距离
*/
export function gcj02Distance({
	lat1, lon1, lat2, lon2
}) {
	function _toRad(degree) {
	    return degree * Math.PI / 180;
	}
    const R = 6371; // 地球半径，单位为公里
    const dLat = _toRad(lat2 - lat1);
    const dLon = _toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(_toRad(lat1)) * Math.cos(_toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 100) / 100; // 保留两位小数
}

/**
 * 数字转为千分位
*/
export function formatNumberToThousand(value) {
	const isNumber = typeof value === 'number' && !isNaN(value)
	 if(!isNumber) return ''; 
    // 将数字转换为字符串
    const numStr = value.toString();
    // 使用正则表达式来插入逗号
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
