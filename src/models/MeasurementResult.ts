import mongoose from 'mongoose';

const MeasurementResultSchema = new mongoose.Schema(
  {
    avgPing: Number,
    jitter: Number,
    upstream: Number,
    downstream: Number,
    floorNumber: Number,
    rootNumber: Number,
    locationClass: Number,
    userCookie: String,
  },
  { timestamps: true }
);

const MeasurementResult = mongoose.model('MeasurementResult', MeasurementResultSchema);

export default MeasurementResult;
