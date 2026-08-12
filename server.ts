import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  emailSentStatus: 'sent' | 'queued' | 'simulated';
}

// In-memory store for received user messages & needs
const receivedMessages: ContactMessage[] = [
  {
    id: 'msg-demo-1',
    name: 'Wipro Talent Acquisition',
    email: 'recruiter@wipro.com',
    subject: 'Software Engineering Internship Welcome & Onboarding',
    message: 'Looking forward to having you join our team in September 2025!',
    timestamp: new Date().toISOString(),
    emailSentStatus: 'simulated',
  },
];

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'SHARAN Cyber Portfolio Full-Stack API',
    time: new Date().toISOString(),
    recipientEmail: process.env.RECIPIENT_EMAIL || 'sharan.26443p@gmail.com',
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
  });
});

// GET /api/messages — Protected server endpoint (messages dispatched to private recipient mailbox)
app.get('/api/messages', (_req, res) => {
  res.json({
    success: true,
    message: 'Recipient mailbox endpoint active. Submitted messages are sent directly to sharan.26443p@gmail.com.',
    total: receivedMessages.length,
    messages: [], // Privacy: Hide submitted message content from public GET API requests
  });
});

// POST /api/contact — Receive user needs & email ID and send directly to mailbox
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email address, and message/needs are required.',
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    const targetRecipient = process.env.RECIPIENT_EMAIL || 'sharan.26443p@gmail.com';
    let emailStatus: 'sent' | 'queued' | 'simulated' = 'simulated';
    let emailNote = 'Saved to server inbox.';

    // Check if real SMTP credentials are provided in environment
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
          to: targetRecipient,
          replyTo: `"${name}" <${email}>`,
          subject: `[Portfolio Inquiry] ${subject || 'New Client Request'} from ${name}`,
          text: `You received a new inquiry from your portfolio website!\n\nName: ${name}\nEmail: ${email}\nSubject/Need: ${subject || 'N/A'}\n\nMessage / Requirements:\n${message}\n\nTimestamp: ${new Date().toLocaleString()}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; border: 1px solid #cbd5e1; rounded-radius: 12px;">
              <h2 style="color: #0284c7; margin-top: 0;">⚡ New Portfolio Inquiry Received</h2>
              <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
              <p><strong>Subject/Need:</strong> ${subject || 'General Need'}</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <p><strong>Message & Requirements:</strong></p>
              <blockquote style="background: #f8fafc; padding: 12px 16px; border-left: 4px solid #0284c7; margin: 0; white-space: pre-wrap;">${message}</blockquote>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <p style="font-size: 12px; color: #64748b;">Dispatched automatically to ${targetRecipient} from your Full-Stack Cyber Portfolio server.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailStatus = 'sent';
        emailNote = `Directly dispatched email to ${targetRecipient}`;
      } catch (mailErr: any) {
        console.error('SMTP Mail Dispatch Error:', mailErr);
        emailStatus = 'queued';
        emailNote = `Saved to server inbox (SMTP error: ${mailErr.message || 'Check credentials'})`;
      }
    } else {
      console.log(`[SERVER INBOX] New message from ${name} <${email}>: "${message}". Target mailbox: ${targetRecipient}`);
      emailNote = `Message recorded in server inbox for ${targetRecipient}. (To enable instant SMTP email delivery to your Gmail box, configure SMTP_HOST, SMTP_USER, SMTP_PASS in secrets).`;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'General Need',
      message,
      timestamp: new Date().toISOString(),
      emailSentStatus: emailStatus,
    };

    receivedMessages.unshift(newMessage);

    return res.status(200).json({
      success: true,
      message: 'Your message and requirements have been received successfully!',
      details: {
        id: newMessage.id,
        recipient: targetRecipient,
        status: emailStatus,
        note: emailNote,
      },
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your request.',
    });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
