import redis from "../config/client.js";


export const getCachedData = (key)=> async (req,res,next) =>{
    let data = await redis.get(key);
    if(data){
        return res.json({
          success: true,
          messsage: "All category List from redis returned successfully",
          categories: JSON.parse(data),
        });
    }
    next();
}