export const valedation = (schema)=>{
    return (req,res,next)=>{
        const errorMessage = [];
        const {error} = schema.validate(req.body,{abortEarly:false});
            if(error) {
                error.details.forEach(err =>{
                    const key = err.context.key;
                    errorMessage.push({[key]:err.message});
                })
                return res.status(400).json({message:"valedation error", errorMessage}); 
            }
            next();
    }
    
}