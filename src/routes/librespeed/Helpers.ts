const distance = require('gps-distance');

// 실제로 이 위치는 크게는 몇키로만큼이나 차이나기 때문에 Helpers는 사용하지 않는 것이 좋겟다.
/**
 * @param pointA - Array of two Coordinates. Lat / Lng
 * @param pointB - Array of two Coordinates. Lat / Lng
 */
type Coordinate = [string, string];
const calcDistance = (pointA: Coordinate, pointB: Coordinate): string => {
  return distance(
    parseFloat(pointA[0]),
    parseFloat(pointA[1]),
    parseFloat(pointB[0]),
    parseFloat(pointB[1])
  ).toPrecision(4);
};

export { calcDistance, type Coordinate };
