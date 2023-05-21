import asyncHandler from "express-async-handler";

//public
export const auth_user = asyncHandler(async(req,res)=>{
    // res.status(404);
    // throw new Error('Something Wrong')
    res.status(200).json({message:'Auth user',success:true})
})