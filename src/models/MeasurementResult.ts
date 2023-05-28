import mongoose from 'mongoose';

const SpeedTestSchema = new mongoose.Schema({
  dlStatus: Number,
  ulStatus: Number,
  pingStatus: Number,
  jitterStatus: Number,
  clientIp: String,
});

const UserSchema = new mongoose.Schema({
  floorNumber: Number,
  roomNumber: Number,
  locationClass: Number,
  userCookie: String,
});

const MeasurementResultSchema = new mongoose.Schema(
  {
    ...SpeedTestSchema.obj,
    ...UserSchema.obj,
  },
  { timestamps: true }
);

const MeasurementResult = mongoose.model('MeasurementResult', MeasurementResultSchema);

export default MeasurementResult;
