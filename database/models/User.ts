import { model, schema } from '@/database/index'

const User = model(
  'User',
  new schema({
    name: String,
    email: String,
    password: String,
    roles: [String],
  }),
);

export default User;
