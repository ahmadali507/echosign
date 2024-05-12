import { Schema, model } from "mongoose";

const subscribeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    email: { type: String, unique: true },
}, { timestamps: true });

const Subscriber = model("Subscribe", subscribeSchema);
export default Subscriber;
