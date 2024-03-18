import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import "dotenv/config";
import generateRandomString from "../../helpers/generateRandomString";
import { DateTime } from "luxon";
import logger from "../../utils/logger";
import { sendMail } from "../../services/sendMail";
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await UserModel.findOne({ email }).select(
      "+passwordResetToken +passwordResetExpires +passwordResetRetries"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.passwordResetRetries >= 3) {
      await UserModel.findByIdAndUpdate(user._id, {
        isSuspended: true,
      });
      return res
        .status(401)
        .json({ message: "Exceed number of tries. Account suspended!" });
    }
    const passwordResetToken = generateRandomString();
    const url = `${process.env.SERVER_URI}/reset-password?token=${passwordResetToken}`;
    await UserModel.findByIdAndUpdate(user._id, {
      passwordResetToken: passwordResetToken,
      passwordResetExpires: DateTime.now().plus({ minutes: 15 }).toJSDate(),
      $inc: {
        passwordResetRetries: 1,
      },
    });
    //send an email
    await sendMail({
      type: "resetPassword",
      data: {
        name: user.firstName,
        to: user.email,
        url: url,
        priority: "1",
      },
    });
    return res.status(200).json({ message: "Reset url successfully sent" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
