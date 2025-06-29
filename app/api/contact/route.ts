import ContactFormEmail from '@/components/emails/contact-form-email';
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request){
    const data = await req.json();
    const { name, email, phone, message, subject } = data;

    try{
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: 'AutoFlex Contact <onboarding@resend.dev>',
            to: ['your-email@example.com'],
            subject: `New Contact: ${subject}`,
            react: ContactFormEmail({ formData: { name, email, phone, subject, message } }),
            replyTo: email,
            text: `
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Email: ${email}
                Message: ${message}
                `
        })

        if(error){
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}