import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../user.model';

const SALT_FACTOR = 10;

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  const thisObj = (this as unknown) as User;

  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    thisObj.password = await bcrypt.hash(thisObj.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

UserSchema.methods.validatePassword = async function (pass: string) {
  const thisObj = (this as unknown) as User;
  return bcrypt.compare(pass, thisObj.password);
};
