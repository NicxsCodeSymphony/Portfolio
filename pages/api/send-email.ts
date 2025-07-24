import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const EMAIL_USER = 'edisannico@gmail.com';
const EMAIL_PASS = 'nlfc obbf wdkr brys';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Define types for function parameters
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ConfirmationEmailData {
  name: string;
  email: string;
}

// Helper: Email to Edisan Nico (you)
const sendToOwner = async ({ name, email, subject, message }: ContactFormData) => {
  await transporter.sendMail({
    from: `"${name}" <${email}>`,
    to: EMAIL_USER,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
          .content { padding: 40px 30px; }
          .message-card { background: #f8fafc; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .info-row { margin: 15px 0; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
          .info-label { font-weight: 600; color: #374151; margin-bottom: 5px; }
          .info-value { color: #6b7280; }
          .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <p style="font-size: 16px; color: #374151; margin-bottom: 30px;">You have received a new message through your portfolio contact form.</p>
            
            <div class="info-row">
              <div class="info-label">From:</div>
              <div class="info-value">${name}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Email Address:</div>
              <div class="info-value">${email}</div>
            </div>
            
            <div class="info-row">
              <div class="info-label">Subject:</div>
              <div class="info-value">${subject}</div>
            </div>
            
            <div class="message-card">
              <div class="info-label" style="margin-bottom: 10px;">Message:</div>
              <div style="color: #374151; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This message was automatically forwarded from your portfolio contact form.</p>
            <p>Please respond directly to ${email} to continue the conversation.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
};

// Helper: Confirmation email to visitor
const sendToSender = async ({ name, email }: ConfirmationEmailData) => {
  await transporter.sendMail({
    from: `"Edisan Nico" <${EMAIL_USER}>`,
    to: email,
    subject: 'Thank you for your message - Edisan Nico',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1f2937;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.04);
    }
    .header {
      background-color: #276C6B;
      padding: 40px 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
    }
    .header p {
      margin-top: 8px;
      font-size: 15px;
      color: #d1fae5;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #276C6B;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .message-box {
      background: #f0fdf4;
      border: 1px solid #c7f1db;
      padding: 25px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .cta-button {
      display: inline-block;
      background-color: #c7f1db;
      color: #000000;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      margin-top: 10px;
    }
    .cta-button:hover {
      background-color: #b5e4ce;
    }
    .social-links {
      text-align: center;
      margin-top: 40px;
    }
    .social-links h3 {
      color: #374151;
      margin-bottom: 12px;
    }
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      padding: 8px 16px;
      background-color: #e2e8f0;
      color: #276C6B;
      text-decoration: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
    }
    .social-links a:hover {
      background-color: #d8e3ea;
    }
    .footer {
      background-color: #f1f5f9;
      text-align: center;
      padding: 25px 20px;
      font-size: 13px;
      color: #6b7280;
    }
    .footer p {
      margin: 6px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You, ${name}!</h1>
      <p>Your message has been successfully received.</p>
    </div>
    <div class="content">
      <h2>Hello ${name},</h2>
      <div class="message-box">
        <p style="margin: 0; font-size: 16px;">
          I truly appreciate you reaching out. I’ll personally review your message and get back to you within 24–48 hours on business days.
        </p>
      </div>

      <p style="margin: 20px 0;">While you wait, you’re welcome to explore my portfolio:</p>
      <a href="https://portfolio-rouge-xi-72.vercel.app" class="cta-button">View My Portfolio</a>

      <div class="social-links">
        <h3>Connect with me</h3>
        <a href="https://www.linkedin.com/in/john-nico-edisan-b4b239354">LinkedIn</a>
        <a href="https://github.com/NicxsCodeSymphony">GitHub</a>
        <a href="mailto:${EMAIL_USER}">Email</a>
      </div>
    </div>
    <div class="footer">
      <p><strong>John Nico Edisan</strong></p>
      <p>Web & App Developer</p>
      <p style="margin-top: 15px;">This is an automated confirmation email. Please don’t reply directly.</p>
      <p>If you need further assistance, email me at <a href="mailto:${EMAIL_USER}" style="color:#276C6B; text-decoration: underline;">${EMAIL_USER}</a></p>
    </div>
  </div>
</body>
</html>
`
,
  });
};

// POST handler
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, subject, and message' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    await sendToOwner({ name, email, subject, message });
    await sendToSender({ name, email });

    return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error('Error sending emails:', err);
    return res.status(500).json({ error: 'Failed to send emails. Please try again.' });
  }
};

const handleGet = async (_req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ 
    message: 'Contact form API is operational',
    endpoints: {
      POST: 'Send contact form email',
      GET: 'Check API status'
    }
  });
};

// Main API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method || 'POST';

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  switch (method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
}