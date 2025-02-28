import jwt from "jsonwebtoken"

const isAdminAuth=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({message:"Not authorized login again",success:false})
        }
        const token_decode= jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({message:"Not authorized login again",success:false})
        }
        next()
    } catch (error) {
        console.log("failed to authorized:",error);
        return res.json({message:"Not authorized login again",success:false})
        
    }
}

export default isAdminAuth