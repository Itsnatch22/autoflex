'use server'
import { Resend } from 'resend'
import ContactFormEmail from '@/components/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'AutoFlex Contact <onboarding@resend.dev>',
      to: ['your-email@example.com'],
      subject: `New Contact: ${formData.subject}`,
      react: ContactFormEmail({ formData }),
      replyTo: formData.email
    })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}