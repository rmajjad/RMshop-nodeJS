import { Model, Schema } from "mongoose";


const userSchema =  new Schema({
    userName: { 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: Object,
    },
    confirmEmail:{
        type: Boolean,
        default: false
    },
    phone:{
        type: String
    },
    address: {
        type: String
    },
    gender:{
        type: String,
        enum: ["Male", "Female"]
    },
    status:{
        type: String,
        default: "Active",
        enum: ["Active", "NotActive"]
    },
    role:{
        type: String,
        default: "User",
        enum: ["User", "Admin"],
    }
},{
    timestamps: true,
}
);

const userModel = new Model('User', userSchema);

export default userModel;