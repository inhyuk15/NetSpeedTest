import { MeasurementResult, SpeedTest, User } from '../models';

const getPreviousDateByDay = (day: number): Date => {
  const date = new Date();
  const diff = date.getDay() - day;
  if (diff > 0) {
    date.setDate(date.getDate() - diff);
  } else if (diff < 0) {
    date.setDate(date.getDate() - 7 + diff);
  }
  return date;
};

export const createDummy = async (day: number, dlMinRange: number, dlMaxRange: number): Promise<void> => {
  const floorNumberRange = [4, 6]; // 층수 범위
  const roomPerFloor = 30; // 각 층에 있는 방의 개수

  const locationClassRange = [1, 9]; // 위치 클래스 범위
  const dlStatusRange = [dlMinRange, dlMaxRange]; // 다운로드 속도 범위
  const pingStatusRange = [1, 100]; // 핑 상태 범위

  const floorNumber = Math.floor(Math.random() * (floorNumberRange[1] - floorNumberRange[0] + 1)) + floorNumberRange[0];
  const roomNumber = floorNumber * 100 + Math.floor(Math.random() * roomPerFloor) + 1; // 층수에 따른 방 번호 계산
  const locationClass =
    Math.floor(Math.random() * (locationClassRange[1] - locationClassRange[0] + 1)) + locationClassRange[0];
  const userCookie = '9c011d7d-d02a-48fb-8958-2f02dc35a0c6';
  const dlStatus = Math.random() * (dlStatusRange[1] - dlStatusRange[0]) + dlStatusRange[0];
  const ulStatus = 333.73;
  const pingStatus = Math.random() * (pingStatusRange[1] - pingStatusRange[0]) + pingStatusRange[0];
  const clientIp = '115.94.80.117';
  const jitterStatus = 6.89;

  const createdAt = getPreviousDateByDay(day);

  const speedTest = new SpeedTest({
    dlStatus,
    ulStatus,
    pingStatus,
    jitterStatus,
    clientIp,
  });

  const user = new User({
    floorNumber,
    roomNumber,
    locationClass,
    userCookie,
  });

  try {
    await speedTest.save();
    await user.save();

    const newMeasurement = new MeasurementResult({
      user,
      speedTest,
      createdAt,
    });
    await newMeasurement.save();
  } catch (e) {
    console.error(e);
  }
};

export const createDummys = async (): Promise<void> => {
  for (let i = 0; i < 300; i++) {
    for (let j = 0; j < 2; j++) await createDummy(j, 40, 300);
    for (let j = 3; j <= 6; j++) await createDummy(j, 40, 300);
    await createDummy(2, 10, 50);
  }
};
