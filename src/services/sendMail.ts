import { Resend } from "resend";
import "dotenv/config";
import { EmailData } from "../interfaces/EmailBody";
import { TEMPLATES } from "../constants/templates";
import logger from "../utils/logger";
const resend = new Resend(process.env.RESEND_KEY);

export const sendMail = async (body: EmailData) => {
  const { data, type } = body;
  const options = TEMPLATES[type];
  try {
    const dispatch = await resend.emails.send({
      from: options.from,
      to: data.to,
      subject: options.subject,
      html: options.template(data),
    });
    console.log(dispatch);
    logger.info(
      `Resend api successfully delivered ${type} email to ${data.to}`
    );
  } catch (error) {
    console.error(error);
    logger.error(
      `Resend api failed to deliver ${type} email to ${data.to}` + error
    );
  }
};
