import mongoose from 'mongoose';

const MeasurementResultSchema = new mongoose.Schema(
  {
    avgPing: Number,
    jitter: Number,
    upstreamSpeed: Number,
    downstreamSpeed: Number,
    floorNumber: Number,
    roomNumber: Number,
    locationClass: Number,
    userCookie: String,
  },
  { timestamps: true }
);

const MeasurementResult = mongoose.model('MeasurementResult', MeasurementResultSchema);

export default MeasurementResult;
