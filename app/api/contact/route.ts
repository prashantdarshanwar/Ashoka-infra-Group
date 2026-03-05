import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message, property_name } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'futureinfragrow@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD, // Your 16-digit Google App Password
      },
    });

    // --- 1. THE AUTO-REPLY (To the User) ---
    const autoReplyOptions = {
      from: '"Future Infra Grow" <futureinfragrow@gmail.com>',
      to: email, // Sending back to the user who filled the form
      subject: `We've received your enquiry for ${property_name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Future Infra Grow</h1>
          </div>
          <div style="padding: 40px; color: #334155; line-height: 1.6;">
            <h2 style="color: #0f172a;">Hi ${name},</h2>
            <p>Thank you for reaching out to us! We have successfully received your enquiry regarding <strong>${property_name}</strong>.</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; font-style: italic;">
              "${message}"
            </div>
            <p>Our real estate experts are reviewing your request and will get back to you with the requested details within <strong>24 to 48 hours</strong>.</p>
            <p>If you need immediate assistance, feel free to call us at <a href="tel:+918007635649" style="color: #2563eb; font-weight: bold; text-decoration: none;">+91 80076 35649</a>.</p>
            <br />
            <p style="margin-bottom: 0;">Best regards,</p>
            <p style="margin-top: 5px; font-weight: bold; color: #0f172a;">The Future Infra Grow</p>
          </div>
          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
            Nagpur Region, Maharashtra | www.futureinfragrow.in
          </div>
        </div>
      `,
    };

    // --- 2. THE LEAD NOTIFICATION (To You) ---
    const adminNotificationOptions = {
      from: '"Website Lead" <ashokainfragroup@gmail.com>',
      to: 'ashokainfragroup@gmail.com',
      subject: `🚨 NEW LEAD: ${name} - ${property_name}`,
      text: `New enquiry from ${name} (${email}) for ${property_name}: ${message}`,
    };

    // Execute both emails
    await Promise.all([
      transporter.sendMail(autoReplyOptions),
      transporter.sendMail(adminNotificationOptions)
    ]);

    return NextResponse.json({ message: "Emails sent successfully" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}