import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Hr,
    Row,
    Column,
  } from '@react-email/components'
  
  interface ContactFormEmailProps {
    formData: {
      name: string
      email: string
      phone: string
      subject: string
      message: string
    }
  }
  
  export default function ContactFormEmail({ formData }: ContactFormEmailProps) {
    return (
      <Html>
        <Head />
        <Preview>New contact form submission</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section>
              <Heading as="h2">New Contact Form Submission</Heading>
              <Text>
                <strong>Subject:</strong> {formData.subject}
              </Text>
              <Hr />
              
              <Row>
                <Column>
                  <Text>
                    <strong>Name:</strong> {formData.name}
                  </Text>
                </Column>
                <Column>
                  <Text>
                    <strong>Email:</strong> {formData.email}
                  </Text>
                </Column>
              </Row>
              
              {formData.phone && (
                <Text>
                  <strong>Phone:</strong> {formData.phone}
                </Text>
              )}
              
              <Hr />
              
              <Text>
                <strong>Message:</strong>
              </Text>
              <Text>{formData.message}</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    )
  }
  
  const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  }
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '600px',
  }