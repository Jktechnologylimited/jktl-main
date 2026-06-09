import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "jktl-affiliate-dev-secret";
export const COOKIE_NAME = "jktl_aff_token";

export interface AffiliateSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  referralCode: string;
  tier: string;
  status: string;
}

export function signToken(payload: AffiliateSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): AffiliateSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AffiliateSession;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AffiliateSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function generateReferralCode(firstName: string, lastName: string): string {
  const base = (firstName.slice(0, 2) + lastName.slice(0, 2)).toUpperCase().replace(/[^A-Z]/g, "X");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base}${rand}`;
}

//  EMAIL 
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://affiliate.jktl.com.ng";

export async function sendApprovalEmail(email: string, firstName: string) {
  if (!process.env.SMTP_USER) return;
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"JK Technology Limited" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your JKTL Affiliate Account is Approved!",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
        <h2 style="color:#0b1f3a;">Welcome to the JKTL Affiliate Program, ${firstName}!</h2>
        <p>Great news -- your application has been reviewed and approved. You can now log in to your affiliate dashboard and start earning.</p>
        <p><a href="${APP_URL}/login" style="display:inline-block;background:#C9A84C;color:#0b1f3a;padding:12px 28px;text-decoration:none;font-weight:700;border-radius:2px;">Login to Your Dashboard</a></p>
        <p style="color:#666;font-size:13px;">If you have any questions, reply to this email or contact us at info@jktl.com.ng</p>
        <p style="color:#999;font-size:12px;">JK Technology Limited &mdash; affiliate.jktl.com.ng</p>
      </div>
    `,
  });
}

export async function sendRejectionEmail(email: string, firstName: string) {
  if (!process.env.SMTP_USER) return;
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"JK Technology Limited" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Update on Your JKTL Affiliate Application",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
        <h2 style="color:#0b1f3a;">Hi ${firstName},</h2>
        <p>Thank you for applying to the JKTL Affiliate Program. After reviewing your application, we are unable to approve it at this time.</p>
        <p>If you believe this is an error or would like to discuss further, please contact us at <a href="mailto:info@jktl.com.ng">info@jktl.com.ng</a>.</p>
        <p style="color:#999;font-size:12px;">JK Technology Limited</p>
      </div>
    `,
  });
}

export async function sendNewApplicationEmail(affiliateName: string, affiliateEmail: string) {
  if (!process.env.SMTP_USER) return;
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"JKTL Affiliate System" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `New Affiliate Application: ${affiliateName}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
        <h2 style="color:#0b1f3a;">New Affiliate Application</h2>
        <p><strong>Name:</strong> ${affiliateName}</p>
        <p><strong>Email:</strong> ${affiliateEmail}</p>
        <p><a href="${APP_URL}/admin/affiliates" style="display:inline-block;background:#0b1f3a;color:#C9A84C;padding:12px 28px;text-decoration:none;font-weight:700;border-radius:2px;">Review in Admin Panel</a></p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, firstName: string, token: string) {
  if (!process.env.SMTP_USER) return;
  const transporter = getTransporter();
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: `"JK Technology Limited" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset Your JKTL Affiliate Password",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
        <h2 style="color:#0b1f3a;">Password Reset Request</h2>
        <p>Hi ${firstName}, we received a request to reset your password. Click the button below to set a new one.</p>
        <p><a href="${resetUrl}" style="display:inline-block;background:#C9A84C;color:#0b1f3a;padding:12px 28px;text-decoration:none;font-weight:700;border-radius:2px;">Reset Password</a></p>
        <p style="color:#666;font-size:13px;">This link expires in 1 hour. If you did not request this, ignore this email.</p>
      </div>
    `,
  });
}
