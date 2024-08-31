import { model, schema } from '@/database/index';
import { userValidate } from '@/src/helpers/validate';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new schema({
  name: {
    type: String,
    required: [true, userValidate.notNullName],
  },
  email: {
    type: String,
    required: [true, userValidate.notNullEmail],
    validate: {
      validator: (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      message: userValidate.wrongEmail,
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, userValidate.notNullPassword],
    validate: {
      validator: (value: string) =>
        /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/.test(value),
      message: userValidate.wrongPassword,
    },
  },
  roles: {
    type: [String],
    required: [true, userValidate.notNullRole],
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.models.User || model('User', userSchema);
export default User;
