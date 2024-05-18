import slugify from "slugify";
import categoryModel from "../../../DB/model/Category.model.js";
import subcategoryModel from "../../../DB/model/Subcategory.model.js";
import cloudinary from "../../utils/cloudinary.js";
import productModel from "../../../DB/model/Product.model.js";


export const create = async(req,res) => {
    
    const {name,price,discount,categoryId,subcategoryId} = req.body;
    const checkCategory = await categoryModel.findById(categoryId);
    
    

    if(!checkCategory){
        return res.status(404).json({message: "Category not found"});
    }
    const checksubCategory = await subcategoryModel.findOne({_id:subcategoryId,categoryId});
    if(!checksubCategory){
        return res.status(404).json({message: "subcategory not found"});
    }
    if(await productModel.findOne({name})){
        return res.status(409).json({message:"product already exists"});
    }else{
    req.body.slug = slugify(name);
    req.body.finalPrice = price - ((price*(discount||0))/100);

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path, {folder: `${process.env.APPNAME}/product/${name}`});
    req.body.mainImage = {secure_url,public_id}; 
    req.body.subImages = [];
    for (const file of req.files.subImages) {
    const {secure_url,public_id} = await cloudinary.uploader.upload(file.path, 
        {folder: `${process.env.APPNAME}/product/${name}/subImages`});
        req.body.subImages.push({secure_url,public_id});
    }
    
    
    const product = await productModel.create(req.body);
    return res.json({message:"success",product});
}
}
export const getAll = (req, res) => {
    return res.json({message:"product"})
}


