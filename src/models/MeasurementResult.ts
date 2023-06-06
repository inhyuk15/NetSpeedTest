import { type Document, Schema, type Model, model } from 'mongoose';
import { type IUser } from './User';
import { type ISpeedTest } from './SpeedTest';

export interface IMeasurementResult extends Document {
  user: IUser['_id'];
  speedTest: ISpeedTest['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const MeasurementResultSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    speedTest: { type: Schema.Types.ObjectId, ref: 'SpeedTest' },
  },
  { timestamps: true }
);

// 모델 인터페이스
interface IMeasurementResultModel extends Model<IMeasurementResult> {}

// 스키마와 인터페이스를 연결해서 모델 생성
const MeasurementResult: IMeasurementResultModel = model<IMeasurementResult, IMeasurementResultModel>(
  'MeasurementResult',
  MeasurementResultSchema
);

export default MeasurementResult;
