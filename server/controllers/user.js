import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";

//public -> api/users/auth
export const auth_user = asyncHandler(async (req, res) => {

    const {email,password} = req.body;
    const user = await User.findOne({email});
    

    if (user && (await user.matchPassword(password))) {
        //set cookie
        res.cookie('jwt', user.getSignedJwtToken(), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 24 * 60 * 60
        })
        return res.status(200).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });

    }
    else {
        res.status(400);
        throw new Error('Invalid Email or Password');
    }
});

//private -> api/users/logout
export const logout = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"User Logged Out!"});
});

//public -> api/users
export const register = asyncHandler(async (req, res) => {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) {
        res.status(400);
        throw new Error('User Already Exist')
    }
    const user = await User.create(req.body);
    if (user) {
        res.cookie('jwt', user.getSignedJwtToken(), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 24 * 60 * 60
        })
        return res.status(201).json({
            success: true,
            data: user,
            token: user.getSignedJwtToken()
        });

    }
    else {
        res.status(400);
        throw new Error('Invalid Data');
    }
});

//private -> api/users/profile/
export const get_profile = asyncHandler(async (req, res) => {
    res.json("My Profile")
});

//private -> api/users/profile/
export const update_profile = asyncHandler(async (req, res) => {
    res.json("Update My Profile")
});