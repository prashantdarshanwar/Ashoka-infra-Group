import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, rent, deposit, availableFrom, tenantType, address, description } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const adminMailOptions = {
      from: `"Rental Listing" <${process.env.EMAIL_USER}>`,
      to: 'ashokainfragroup@gmail.com',
      subject: `🔑 NEW RENTAL: ${title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
          <h2 style="color: #1d4ed8; border-bottom: 3px solid #1d4ed8; padding-bottom: 10px;">New Rental Property Submission</h2>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Monthly Rent:</strong> $${rent}</p>
          <p><strong>Security Deposit:</strong> $${deposit}</p>
          <p><strong>Available From:</strong> ${availableFrom}</p>
          <p><strong>Preferred Tenant:</strong> ${tenantType}</p>
          <p><strong>Address:</strong> ${address}</p>
          <div style="background: #eff6ff; padding: 15px; border-radius: 10px; margin-top: 15px;">
            <strong>Features/Description:</strong><br/> ${description}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Rent API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}