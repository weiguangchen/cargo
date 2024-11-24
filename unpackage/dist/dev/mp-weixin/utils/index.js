"use strict";
function sleep(time = 2e3) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
function gcj02Distance({
  lat1,
  lon1,
  lat2,
  lon2
}) {
  function _toRad(degree) {
    return degree * Math.PI / 180;
  }
  const R = 6371;
  const dLat = _toRad(lat2 - lat1);
  const dLon = _toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(_toRad(lat1)) * Math.cos(_toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100;
}
function formatNumberToThousand(value) {
  const isNumber = typeof value === "number" && !isNaN(value);
  if (!isNumber)
    return "";
  const numStr = value.toString();
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.formatNumberToThousand = formatNumberToThousand;
exports.gcj02Distance = gcj02Distance;
exports.sleep = sleep;
