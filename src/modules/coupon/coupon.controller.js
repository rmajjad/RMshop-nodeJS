import slugify from "slugify";
import categoryModel from "../../../DB/model/Category.model.js";
import cloudinary from "../../utils/cloudinary.js";
import couponModel from "../../../DB/model/Coupon.model.js";




export const create = async(req, res) => {

    if(await couponModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"coupon name already exists"});
    }
    req.body.expireDate = new Date(req.body.expireDate); 
    const coupon = await couponModel.create(req.body);
    return res.status(201).json({message:"success",coupon});
};

