import jwt from "jsonwebtoken";

const userAuth = async (req, res,next) => {
  const { token } = req.headers;
  if (!token)
    return res.json({ message: "Not authorized login again", success: false });

  try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId=token_decode.id
    next()

  } catch (error) {
    console.log("Failed to authenticate:",error);
    res.json({message:error.message,success:false})
    
  }
};

export default userAuth
