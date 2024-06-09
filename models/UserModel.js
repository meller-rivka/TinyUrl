import mongoose, { Schema } from "mongoose";
import validator from 'validator';

import {LinkSchema} from './LinkModel.js';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate: value => {
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                throw new Error({error: 'Password should contain at least one uppercase, one lowercase, and one numeric character.'})
            }
        }
    },
    links: [LinkSchema]
});

export default mongoose.model("users", UserSchema);
