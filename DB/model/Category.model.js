import { Schema, Types, model } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        requered: true,
        unique: true,
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
        
    },
    updatedBy:{
        type: Types.ObjectId,
        ref: 'User',
        
    },
},{
    timestamps: true,
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
});

categorySchema.virtual('subcategory',{
    localField:'_id',
    foreignField: 'categoryId',
    ref: 'SubCategory'
})
const categoryModel = new model('Category', categorySchema);
export default categoryModel;