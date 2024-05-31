import orderModel from "../../../DB/model/Order.model.js";
import reviewModel from "../../../DB/model/Review.model.js";
import cloudinary from "../../utils/cloudinary.js";



export const create = async(req,res)=>{
    const {productId} = req.params;
    const {comment, rating} = req.body;

    const order = await orderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        "products.productId":productId,
    });
    if(!order){
        return res.status(400).json({message:"can't review this order"});
    }

    const checkReview = await reviewModel.findOne({
        userId:req.user._id,
        productId:productId,
    });
    if(checkReview){
        return res.status(409).json({message:"already reviewed this order"});
    }
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,
            {
                folder:`${process.env.APPNAME}/${productId}/reviews`
            }
        );
        req.body.image = {secure_url,public_id};
    }

    const review = await reviewModel.create({
        comment,
        rating,
        productId,
        userId:req.user._id,
        image:req.body.image,
    });

    
    return res.status(201).json({message:"success",review});
}