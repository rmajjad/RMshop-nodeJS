
import cartModel from "../../../DB/model/Cart.model.js";
import couponModel from "../../../DB/model/Coupon.model.js";
import orderModel from "../../../DB/model/Order.model.js";
import productModel from "../../../DB/model/Product.model.js";
import userModel from "../../../DB/model/User.model.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);



export const create = async(req, res) => {
    const {couponName} = req.body;
    const cart =  await cartModel.findOne({userId:req.user._id});
    if(!cart || cart.products.length === 0) {
        return res.status(400).json({message:"cart is empty"});
    }
    req.body.products = cart.products;
    if(couponName){ 
        const coupon = await couponModel.findOne({name:couponName});
        if(!coupon){
            return res.status(409).json({message:"coupon not found"});
        }
        if(coupon.expireDate < new Date()){
            return res.status(400).json({message:"coupon expired"});
        } 
        if(coupon.usedBy.includes(req.user._id)){ 
            return res.status(409).json({message:"coupon already used "})
        }
        req.body.coupon = coupon;
    } 
    
    let finalProductList = [];
    let subTotal = 0;
    for(let product of req.body.products){

        const checkProduct = await productModel.findOne({
            _id:product.productId,
            stock:{$gte:product.quantity},
        }); 
        
        if(!checkProduct){
            return res.status(400).json({message:"product quantity not available"});
        }


        product = product.toObject();
        
        product.productName = checkProduct.name;
        product.mainImage = checkProduct.mainImage;
        product.discount = checkProduct.discount;
        product.unitPrice = checkProduct.price;
        product.finalPrice = product.quantity * checkProduct.finalPrice;
        subTotal += product.finalPrice
        finalProductList.push(product);

    }

    const user = await userModel.findById(req.user._id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
        req.body.phone = user.phone;
    }
    
    const session = await stripe.checkout.sessions.create({
        line_items:[{
            price_data: {
                currency: 'USD', 
                unit_amount: subTotal - (subTotal * ((req.body.coupon?.amount || 0))/100), 
                product_data: {
                    name: user.userName,
                }
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `https://www.facebook.com/`,
        cancel_url: `https://www.youtube.com/`,   
    });
    

    const order = await orderModel.create({
        userId: req.user._id,
        products: finalProductList,
        finalPrice: subTotal - (subTotal * ((req.body.coupon?.amount || 0))/100), 
        address: req.body.address,
        phoneNumber : req.body.phone,
        updatedBy:req.user._id,
    });
    

    if(order){

        for(const product of req.body.products){
            await productModel.findOneAndUpdate({_id:product.productId},
                {
                    $inc:{
                        stock:-product.quantity,
                    }
                }
            )
        }
        
        if(req.body.coupon){
            await couponModel.findByIdAndUpdate({_id:req.body.coupon._id},
                {
                    $addToSet:{
                        usedBy:req.user._id,
                    }
                    
                }
            );
        }
    
        await cartModel.findOneAndUpdate({userId:req.user._id},{
            products : []
        })
    }
    await order.save();
    return res.json({message:"success",order});
    
}; 

export const getOrders = async(req, res) => {
    const orders = await orderModel.find({$or:[
        {
            status: "pending",
        },
        {
            status:"confirmed",
        }
    ]});

    return res.json({message:"success",orders});
};

export const getUserOrders = async(req, res) => {
    const orders = await orderModel.find({userId:req.user._id}); 
    return res.json({message:"success",orders});
};

export const changeStatus = async(req, res) => {
    const {orderId} = req.params;
    const {status} =  req.body;

    const order = await orderModel.findById(orderId);
    if(!order){
        return res.status(400).json({message:"order not found"});
    }
    order.status = status;
    await order.save();
    return res.status(201).json({message:"success",order})
}