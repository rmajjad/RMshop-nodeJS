import userModel from "../../../DB/model/User.model.js";
import bcrypt from 'bcryptjs' ;
import jwt from 'jsonwebtoken';

export const registor = async (req,res)=> {
    const {userName,email,password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    const createUser = await userModel.create({userName,email,password:hashedPassword});
    return res.status(201).json({message:"success",user:createUser}); 
}


export const login = async(req, res) => {
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"invaled data"});
    }
    const match = await bcrypt.compare(password, user.password);
    if(user.status == "NotActive"){
        return res.status(400).json({message:"user account us blocked"});
    }
    if(!match){
        return res.status(400).json({message:"invaled data"});
    }

    const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG);
    return res.status(200).json({message:"success",token});
}
