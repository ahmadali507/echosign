import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String },
    email: { type: String },
    subject: { type: String },
    message: { type: String },
}, { timestamps: true });

const Contact = model("Contact", contactSchema);
export default Contact