import mongoose from 'mongoose';

// MeasurementResult.js
const MeasurementResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    speedTest: { type: mongoose.Schema.Types.ObjectId, ref: 'SpeedTest' },
  },
  { timestamps: true }
);

const MeasurementResult = mongoose.model('MeasurementResult', MeasurementResultSchema);

export default MeasurementResult;
