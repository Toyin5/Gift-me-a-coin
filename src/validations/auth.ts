import { object, string } from "zod";

export const loginUserValidation = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export const registerUserValidation = object({
  body: object({
    firstName: string(),
    lastName: string(),
    email: string({
      required_error: "Email is required",
    }).email("Enter a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - 6 chars minimum"),
    username: string({ required_error: "Username is required" }),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const verifyUserValidation = object({
  body: object({
    token: string({ required_error: "Token is required" }),
  }),
});

export const forgotPasswordValidation = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Please enter a valid email"),
  }),
});

export const resetPasswordValidation = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});