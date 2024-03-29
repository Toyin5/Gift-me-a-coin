import { resetPassword } from "../templates/resetPasswordEmail";
import { welcome } from "../templates/welcomeEmail";

export const TEMPLATES = {
  welcome: {
    subject: "Welcome to Gift-Me-A-Coin",
    from: "Gift-Me-A-Coin Customer Support",
    template: welcome,
  },
  resetPassword: {
    subject: "Reset your password",
    from: "Gift-Me-A-Coin Customer Support",
    template: resetPassword,
  },
};
