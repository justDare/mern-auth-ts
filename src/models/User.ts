import { createSchema, Type, typedModel } from "ts-mongoose";

const UserSchema = createSchema({
  email: Type.string({ required: true, unique: true }),
  user_name: Type.string({ required: true }),
  password: Type.string({ required: true }),
  register_date: Type.date({ default: Date.now }),
});

export default typedModel("User", UserSchema);
