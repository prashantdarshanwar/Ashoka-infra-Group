import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, type, price, address, description, videoUrl } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ashokainfragroup@gmail.com',
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const adminMailOptions = {
      from: '"Property Listing" <ashokainfragroup@gmail.com>',
      to: 'ashokainfragroup@gmail.com',
      subject: `🏠 NEW LISTING: ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
          <h2 style="color: #1e293b; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">New Property Listing Submission</h2>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Price:</strong> $${price}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Video Link:</strong> ${videoUrl || 'No video provided'}</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin-top: 15px;">
            <strong>Description:</strong><br/> ${description}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    return NextResponse.json({ message: "Listing submitted" }, { status: 200 });
  } catch (error) {
    console.error("Sell API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}