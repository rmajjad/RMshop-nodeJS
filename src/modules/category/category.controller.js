import slugify from "slugify";
import categoryModel from "../../../DB/model/Category.model.js";
import cloudinary from "../../utils/cloudinary.js";


export const getAll = (req, res) => {
    return res.json({message:"categories"});
};

export const createCategory = async(req, res, next) => {
    req.body.name = req.body.name.toLowerCase();
    
    if(await categoryModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"category already exists"});
    }
    req.body.slug = slugify(req.body.name);

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder: `RMshop/categories`
    });

    req.body.image = {secure_url,public_id};

    const category = await categoryModel.create(req.body);  
    return res.json({message:"success", category});
};