import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, phone, service, message } = await req.json();

    // 1. Validation check
    if (!name || !phone || !message) {
      return NextResponse.json(
        { message: "Missing required fields" }, 
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'futureinfragrow@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD, 
      },
    });

    // 2. Format the Email Content (Admin Notification)
    const adminMailOptions = {
      from: '"Ashoka Website" <futureinfragrow@gmail.com>',
      to: 'ashokainfragroup@gmail.com',
      subject: `📢 New Enquiry: ${name} (${service})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Business Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Service Interest:</strong> ${service}</p>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <strong>Message:</strong><br/>
            ${message}
          </div>
          <footer style="margin-top: 20px; font-size: 12px; color: #64748b;">
            This enquiry was sent from the Contact Us page on ashokanfragroup.in
          </footer>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ message: "Enquiry submitted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}