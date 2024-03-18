import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import verifyModel from "../../models/verifyModel";
import logger from "../../utils/logger";

export const verify = async (req: Request, res: Response) => {
  const { token } = req.body;
  const id = res.locals.user.user.id;
  try {
    const userExists = await UserModel.findById(id);
    if (!userExists) {
      return res.status(404).json({ err: "User not found" });
    }

    const verificationExists = await verifyModel.findOne({
      userId: id,
      token: token,
    });
    if (!verificationExists) {
      return res.status(404).json({ err: "Invalid Token" });
    }
    await UserModel.findByIdAndUpdate(id, { verified: true }, { new: true });
    return res.status(200).json({ message: "User verified" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};
