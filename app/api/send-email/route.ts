import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yellowscooterproduction@gmail.com',
                pass: 'vtvz mibw ordm xgeo', // App password provided by user
            },
        });

        const mailOptions = {
            from: 'yellowscooterproduction@gmail.com',
            to: 'yellowscooterproduction@gmail.com', // Sending to self
            subject: `New Project Inquiry from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #EAB308;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f4f4f4; border-radius: 8px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">Sent from Yellow Scooter Production Website</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
