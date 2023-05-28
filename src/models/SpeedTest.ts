import mongoose from 'mongoose';

// SpeedTest.js
const SpeedTestSchema = new mongoose.Schema({
  dlStatus: Number,
  ulStatus: Number,
  pingStatus: Number,
  clientIp: String,
  jitterStatus: Number,
});

const SpeedTest = mongoose.model('SpeedTest', SpeedTestSchema);

export default SpeedTest;
