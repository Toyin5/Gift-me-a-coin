export interface ICommonFields {
  to: string;
  priority?: string;
}

export interface WelcomeEmail extends ICommonFields {
  name: string;
  token: string;
}

export type EmailData = { type: "welcome"; data: WelcomeEmail };
