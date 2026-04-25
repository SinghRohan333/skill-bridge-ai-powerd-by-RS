import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, name, code) => {
  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your Skill Bridge AI account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; background-color: #0a0a0f; color: #ffffff; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #a78bfa; font-size: 24px; margin: 0;">Skill Bridge AI</h1>
          <p style="color: #ffffff99; font-size: 14px; margin-top: 4px;">Smart Resume Analyzer</p>
        </div>
        <h2 style="font-size: 20px; margin-bottom: 10px;">Hi ${name} 👋</h2>
        <p style="color: #ffffff99; line-height: 1.6;">Thank you for signing up. Please use the verification code below to complete your registration.</p>
        <div style="background-color: #1a1a2e; border: 1px solid #a78bfa33; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
          <p style="color: #ffffff99; font-size: 13px; margin: 0 0 8px 0;">Your verification code</p>
          <h1 style="color: #a78bfa; font-size: 42px; letter-spacing: 12px; margin: 0; font-weight: bold;">${code}</h1>
          <p style="color: #ffffff55; font-size: 12px; margin: 12px 0 0 0;">This code expires in 10 minutes</p>
        </div>
        <p style="color: #ffffff55; font-size: 12px; text-align: center;">If you did not create an account, please ignore this email.</p>
        <div style="border-top: 1px solid #ffffff10; margin-top: 24px; padding-top: 16px; text-align: center;">
          <p style="color: #ffffff30; font-size: 11px; margin: 0;">© ${new Date().getFullYear()} Skill Bridge AI · Built by Rohan Singh</p>
        </div>
      </div>
    `,
  });
};
