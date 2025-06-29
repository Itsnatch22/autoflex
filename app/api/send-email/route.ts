import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import BookingConfirmationEmail from '@/emails/BookingConfirmationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, serviceType, date, time, vehicleType, location, phone, notes } = formData;

    const { data, error } = await resend.emails.send({
      from: 'Auto Flex <onboarding@resend.dev>',
      to: [email],
      subject: 'Your Appointment Confirmation',
      react: BookingConfirmationEmail({
        name,
        serviceType,
        date,
        time,
        vehicleType,
        location,
        phone,
        notes,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}