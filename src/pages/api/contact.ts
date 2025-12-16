/**
 * Contact Form API Endpoint
 * Sends contact form submissions via SendGrid
 */

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get SendGrid configuration from environment
    const SENDGRID_API_KEY = import.meta.env.SENDGRID_API_KEY;
    const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL || 'hello@randomprompts.org';
    const FROM_EMAIL = import.meta.env.SENDGRID_FROM_EMAIL || 'noreply@randomprompts.org';

    if (!SENDGRID_API_KEY) {
      console.error('[contact] SendGrid API key not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare email content
    const emailData = {
      personalizations: [
        {
          to: [{ email: CONTACT_EMAIL }],
          subject: `Contact Form: ${subject}`
        }
      ],
      from: {
        email: FROM_EMAIL,
        name: 'Random Prompts Contact Form'
      },
      reply_to: {
        email: email,
        name: name
      },
      content: [
        {
          type: 'text/html',
          value: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
                  .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
                  .field { margin-bottom: 20px; }
                  .label { font-weight: bold; color: #4b5563; margin-bottom: 5px; }
                  .value { background: white; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb; }
                  .message { white-space: pre-wrap; }
                  .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Random Prompts Generator</p>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">From:</div>
                      <div class="value">${name}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email:</div>
                      <div class="value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    <div class="field">
                      <div class="label">Subject:</div>
                      <div class="value">${subject}</div>
                    </div>
                    <div class="field">
                      <div class="label">Message:</div>
                      <div class="value message">${message}</div>
                    </div>
                    <div class="footer">
                      <p>This message was sent from the contact form at randomprompts.org</p>
                      <p>Received: ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `
        },
        {
          type: 'text/plain',
          value: `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Received: ${new Date().toISOString()}
          `.trim()
        }
      ]
    };

    // Send email via SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[contact] SendGrid error:', response.status, errorText);
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    // Log success
    console.log('[contact] Email sent successfully from:', email);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully. We\'ll get back to you within 24-48 hours.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[contact] Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to send message. Please try again or email us directly at hello@randomprompts.org'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
