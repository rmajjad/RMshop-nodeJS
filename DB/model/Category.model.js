import { Model, Schema, Types } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        requered: true,
    },
    slug:{
        type: String,
        requered: true,
    },
    image: {
        type: Object,
        requered: true,
    },
    status:{
        type: String,
        default: "Active",
        enum: ["Active", "NotActive"]
    },
    createdBy:{
        type: Types.ObjectId,
        ref: 'User',
        requered: true,
    },
    updatedBy:{
        type: Types.ObjectId,
        ref: 'User',
        requered: true,
    },
});

const categoryModel = new Model('Category', categorySchema);
export default categoryModel;