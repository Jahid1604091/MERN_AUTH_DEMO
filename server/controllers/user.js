import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";

//public -> api/users/auth
export const auth_user = asyncHandler(async (req, res) => {

    const {email,password} = req.body;
    const user = await User.findOne({ email: req.body.email });
    

    if (user && (await user.matchPassword(password))) {
        //set cookie
        // res.cookie('jwt', user.getSignedJwtToken(), {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV !== 'development',
        //     sameSite: 'strict',
        //     maxAge: 30 * 24 * 24 * 60 * 60
        // })
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
})

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
})