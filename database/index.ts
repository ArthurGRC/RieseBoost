import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL as string);

const schema = mongoose.Schema;
const model = mongoose.model;

export { schema, model };
