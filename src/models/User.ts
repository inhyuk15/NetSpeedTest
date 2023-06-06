import mongoose, { type Schema } from 'mongoose';

export interface IUser {
  _id: Schema.Types.ObjectId;
  floorNumber: number;
  roomNumber: number;
  buildingNumber: number; // 새로운 필드
  locationClass: number;
  userCookie: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  floorNumber: Number,
  roomNumber: Number,
  buildingNumber: Number, // 새로운 필드
  locationClass: Number,
  userCookie: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
