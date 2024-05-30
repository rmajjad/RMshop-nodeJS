import { Schema, Types, model } from "mongoose";


const couponSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    usedBy:[{
        
            type:Types.ObjectId,
            ref:'User',
            required:true,
        
    }],
    amount:{
        type:Number,
        required:true,
    },
    expireDate:{
        type:Date,
        required:true,
    },  
    
},{
    timestamps: true,
    
});


const couponModel = new model('Coupon', couponSchema);
export default couponModel;