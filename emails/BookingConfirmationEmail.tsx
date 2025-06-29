import * as React from 'react';
import { Html, Body, Container, Text, Heading, Section, Hr, Button } from '@react-email/components';

interface BookingConfirmationEmailProps {
  name: string;
  serviceType: string;
  date: string;
  time: string;
  vehicleType: string;
  location: string;
  phone: string;
  notes: string;
}

export default function BookingConfirmationEmail({
  name,
  serviceType,
  date,
  time,
  vehicleType,
  location,
  phone,
  notes,
}: BookingConfirmationEmailProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
          <Heading style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '20px' }}>
            Your Appointment is Confirmed! 🚗
          </Heading>
          <Text style={{ fontSize: '16px', color: '#333333', marginBottom: '20px' }}>
            Hello {name},
          </Text>
          <Text style={{ fontSize: '16px', color: '#333333', marginBottom: '20px' }}>
            Thank you for booking with us! Your appointment details are below:
          </Text>
          <Section style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <Text style={{ fontSize: '14px', color: '#333333' }}><strong>Service:</strong> {serviceType}</Text>
            <Text style={{ fontSize: '14px', color: '#333333' }}><strong>Date:</strong> {date}</Text>
            <Text style={{ fontSize: '14px', color: '#333333' }}><strong>Time:</strong> {time}</Text>
            <Text style={{ fontSize: '14px', color: '#333333' }}><strong>Vehicle Type:</strong> {vehicleType}</Text>
            <Text style={{ fontSize: '14px', color: '#333333' }}><strong>Location:</strong> {location}</Text>
            <Text style={{ fontSize: '14px', color: '#333333' }}><strong>Phone:</strong> {phone}</Text>
            {notes && <Text style={{ fontSize: '14px', color: '#333333' }}><strong>Notes:</strong> {notes}</Text>}
          </Section>
          <Hr style={{ margin: '20px 0', borderColor: '#e0e0e0' }} />
          <Text style={{ fontSize: '14px', color: '#333333', marginBottom: '20px' }}>
            Need to make changes? Contact us at support@yourdomain.com or call us at (123) 456-7890.
          </Text>
          <Button
            href="https://yourdomain.com"
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
            }}
          >
            View Your Booking
          </Button>
          <Text style={{ fontSize: '12px', color: '#666666', marginTop: '20px', textAlign: 'center' }}>
            &copy; 2025 Your Auto Service. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}