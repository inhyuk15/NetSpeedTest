import mongoose from 'mongoose';

const MeasurementResultSchema = new mongoose.Schema(
  {
    avgPing: Number,
    jitter: Number,
    upstreamSpeed: Number,
    downstreamSpeed: Number,
  },
  { timestamps: true }
);

const MeasurementResult = mongoose.model('MeasurementResult', MeasurementResultSchema);

export default MeasurementResult;
