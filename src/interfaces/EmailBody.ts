export interface ICommonFields {
  to: string;
  priority?: string;
  name: string;
}

export interface WelcomeEmail extends ICommonFields {
  token: string;
}
export interface ResetPasswordEmail extends ICommonFields {
  url: string;
}
export type EmailData =
  | { type: "welcome"; data: WelcomeEmail }
  | { type: "resetPassword"; data: ResetPasswordEmail };
