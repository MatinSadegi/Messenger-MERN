import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedData.id)
            next();
        }catch(error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
}