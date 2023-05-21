import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";





//public -> api/users/auth
export const auth_user = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Auth user', success: true })
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