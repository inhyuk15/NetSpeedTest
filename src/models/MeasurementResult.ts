import { type Document, Schema, type Model, model } from 'mongoose';
import { type IUser } from './User';
import { type ISpeedTest } from './SpeedTest';

interface IMeasurementResult extends Document {
  user: IUser['_id'];
  speedTest: ISpeedTest['_id'];
  createdAt: Date;
  updatedAt: Date;
}

// const MeasurementResultSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     speedTest: { type: mongoose.Schema.Types.ObjectId, ref: 'SpeedTest' },
//   },
//   { timestamps: true }
// );

// const MeasurementResult = mongoose.model('MeasurementResult', MeasurementResultSchema);

// export default MeasurementResult;

// 실제 DB에 생성될 Collection의 스키마를 정의
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

export { type IMeasurementResult, MeasurementResult };
