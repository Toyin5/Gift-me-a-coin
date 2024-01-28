import { Request, Response } from "express";
import UserModel, { UserDocument } from "../../models/UserModel";
import verifyModel from "../../models/verifyModel";
import generateToken from "../../helpers/generateToken";
import logger from "../../utils/logger";

export const verify = async (req: Request, res: Response) => {
    const { id, token } = req.body;

    try {
        const userExists = await UserModel.findById(id);
        if (!userExists) {
            return res.status(404).json({ err: "User not found" });
        }

        const verificationExists = await verifyModel.findOne({ userId: id, token: token });
        if (!verificationExists) {
            return res.status(404).json({ err: "Invalid Token" });
        }
        return res.status(200).json({ message: "User verified" });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ err: "Internal Server Error" });
        
    }
}