import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
export const verify = async (req: Request, res: Response) => {
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({ err: "Invalid verification token" });
    }

    try {
        // Find the user with the given token
        const user = await UserModel.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ err: "User not found or already verified" });
        }
        // Update the user's verification status to true
        user.verified = true;
        await user.save();
    } catch (err) {
        console.log("Error verifying user: ", err);
        return res.status(500).json({ err: "Internal server error" });
    }

};