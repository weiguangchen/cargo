import Big from "big.js";

export function sleep(time = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

/**
 * 获取两个gcj02坐标点距离
 */
export function gcj02Distance({ lat1, lon1, lat2, lon2 }) {
  function _toRad(degree) {
    return (degree * Math.PI) / 180;
  }
  const R = 6371; // 地球半径，单位为公里
  const dLat = _toRad(lat2 - lat1);
  const dLon = _toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(_toRad(lat1)) *
      Math.cos(_toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // 保留两位小数
}

// 格式化日期
export function formatDateTime(date) {
  const now = new Date();
  const targetDate = new Date(date);

  // 设置时区偏移，确保日期比较正确
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDateOnly = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  // 计算日期差异（以天为单位）
  const diffTime = nowDate.getTime() - targetDateOnly.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 格式化时间部分
  const hours = targetDate.getHours().toString().padStart(2, "0");
  const minutes = targetDate.getMinutes().toString().padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  if (diffDays === 0) {
    return `今天 ${timeStr}`;
  } else if (diffDays === 1) {
    return `昨天 ${timeStr}`;
  } else if (diffDays === -1) {
    return `明天 ${timeStr}`;
  } else {
    // 对于其他日期，显示为 MM-DD HH:mm 格式
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    const day = targetDate.getDate().toString().padStart(2, "0");
    return `${month}-${day} ${timeStr}`;
  }
}

/**
 * 数字转为千分位
 */
export function formatNumberToThousand(value, fixed = -1) {
  const isNumber = typeof value === "number" && !isNaN(value);
  if (!isNumber) return "";
  // 将数字转换为字符串
  const numStr = fixed === -1 ? value.toString() : Big(value).toFixed(fixed);
  // 使用正则表达式来插入逗号
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 拼接省市区地址
export function joinAddStr(province, city, district, address) {
  let newProvince = province;
  let newCity = city === province ? "" : city;
  let newDistrict = district === city ? "" : district;
  let newAddress = address === district ? "" : address;
  return `${newProvince}${newCity}${newDistrict}${newAddress}`;
}

export function showToast(msg, timer = 1500) {
  return new Promise((resolve) => {
    uni.showToast({
      title: msg,
      icon: "none",
      duration: timer,
      mask: true,
    });
    setTimeout(() => {
      resolve();
    }, timer);
  });
}

// 判断数字是不是负数
export function isNegativeNumber(num) {
  return Big(num).lt(0);
}
