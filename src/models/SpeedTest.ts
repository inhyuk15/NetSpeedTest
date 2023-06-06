import mongoose, { type Schema } from 'mongoose';

export interface ISpeedTest {
  _id: Schema.Types.ObjectId;
  dlStatus: number;
  ulStatus: number;
  pingStatus: number;
  clientIp: string;
  jitterStatus: number;
}

const SpeedTestSchema = new mongoose.Schema<ISpeedTest>({
  dlStatus: Number,
  ulStatus: Number,
  pingStatus: Number,
  clientIp: String,
  jitterStatus: Number,
});

const SpeedTest = mongoose.model('SpeedTest', SpeedTestSchema);

export default SpeedTest;
