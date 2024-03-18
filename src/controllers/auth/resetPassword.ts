import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import "dotenv/config";
import { DateTime } from "luxon";
import logger from "../../utils/logger";
import bcrypt from "bcrypt";

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    if (!token || !newPassword) {
      return res.status(404).json({ message: "Invalid token or password" });
    }
    const user = await UserModel.findOne({ passwordResetToken: token }).select(
      "+passwordResetExpires"
    );
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (DateTime.now().toJSDate() > user.passwordResetExpires) {
      return res.status(404).json({ message: "Token has expired" });
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newPassword, salt);
    await UserModel.findByIdAndUpdate(
      user._id,
      {
        password,
        passwordConfirm: "",
        passwordResetToken: "",
        passwordResetExpires: "",
        passwordResetRetries: 0,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
