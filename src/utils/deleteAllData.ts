import { User, SpeedTest, MeasurementResult } from '../models';

export const deleteAllData = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    await SpeedTest.deleteMany({});
    await MeasurementResult.deleteMany({});
    console.log('All data deleted successfully');
  } catch (e) {
    console.error('Error in deleting data', e);
  }
};
