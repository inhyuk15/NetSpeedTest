import mongoose from 'mongoose';

// User.js
const UserSchema = new mongoose.Schema({
  floorNumber: Number,
  roomNumber: Number,
  buildingNumber: Number, // 새로운 필드
  locationClass: Number,
  userCookie: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
