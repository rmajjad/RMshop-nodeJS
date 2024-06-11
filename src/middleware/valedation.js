export const valedation = (schema)=>{
    return (req,res,next)=>{
        const errorMessage = [];
        const filterData = {...req.body,...req.query,...req.params};
        if(req.file){[
            filterData.image = req.file
        ]}
        const {error} = schema.validate(filterData,{abortEarly:false});
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