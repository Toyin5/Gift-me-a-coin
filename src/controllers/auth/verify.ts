import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
// To verify a user, we need to find a user with the given verification token and update the user's verified field to true and remove the verification token from the user's document.

// The verify controller will be called when the user clicks on the verification link sent to the user's email address. The verification link will contain the verification token as a query parameter. The verification token will be used to find the user in the database.

export const verify = async (req: Request, res: Response) => {
  try {
    const { verificationToken } = req.query;

    const user = await UserModel.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verified) {
        return res.status(400).json({ message: "User already verified" });
    }

    if ((user as any).verificationTokenExpiresAt < new Date()) {
        return res.status(400).json({ message: "Verification token expired" });
      }
      if ((user as any).verificationToken !== verificationToken) { 
        return res.status(400).json({ message: "Invalid verification token" });
      }
    (user as any).verified = true;
    (user as any).verificationToken = undefined;
    (user as any).verificationTokenExpiresAt = undefined;

    await user.save();

    return res.status(200).json({ message: "User verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
    }
    

};