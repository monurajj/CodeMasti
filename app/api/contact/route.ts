import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { appendContactToSheet } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, studentClass, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    console.log('📧 Attempting to send contact form emails');

    // Save to Google Sheets
    if (process.env.GOOGLE_SHEET_ID) {
      const sheetResult = await appendContactToSheet(process.env.GOOGLE_SHEET_ID, {
        name,
        email,
        phone,
        studentClass,
        message,
      });
      if (sheetResult.success) {
        console.log('✅ Contact form data saved to Google Sheet');
      } else {
        console.error('❌ Failed to save to Google Sheet:', sheetResult.error);
      }
    } else {
      console.warn('⚠️ GOOGLE_SHEET_ID not configured, skipping Google Sheets save');
    }

    // Send email notification to admin
    const adminEmailResult = await sendEmail({
      to: 'info.codemasti@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FCD34D; border-bottom: 2px solid #FCD34D; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong style="color: #1f2937;">Name:</strong> ${name}</p>
            <p><strong style="color: #1f2937;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong style="color: #1f2937;">Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong style="color: #1f2937;">Student Class:</strong> ${studentClass || 'Not provided'}</p>
            <p><strong style="color: #1f2937;">Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-left: 4px solid #FCD34D; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This email was sent from the CodeMasti contact form.
          </p>
        </div>
      `,
    });

    if (adminEmailResult.success) {
      console.log('✅ Admin notification email sent successfully');
    } else {
      console.error('❌ Failed to send admin notification email:', adminEmailResult.error);
    }

    // Send confirmation email to user
    const userEmailResult = await sendEmail({
      to: email,
      subject: 'Thank you for contacting CodeMasti! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header with Logo -->
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FCD34D; margin: 0; font-size: 32px; font-weight: bold;">
              Code<span style="color: #ffffff;">Masti</span>
            </h1>
            <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 14px; font-style: italic;">Think. Solve. Create.</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 20px; background-color: #ffffff;">
            <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Thank you for reaching out! 🙏</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              We've received your message and truly appreciate you taking the time to contact us. Our team will review your inquiry and get back to you as soon as possible, typically within 24-48 hours.
            </p>
            
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #FCD34D; margin: 30px 0;">
              <p style="margin: 0; color: #92400e; font-size: 15px; font-weight: 600;">
                🚀 Launching Soon: May 2, 2026
              </p>
              <p style="margin: 10px 0 0 0; color: #78350f; font-size: 14px;">
                Stay tuned for our launch! We're building something amazing for students across India.
              </p>
            </div>
            
            <div style="margin: 30px 0;">
              <p style="color: #1f2937; font-size: 16px; font-weight: 600; margin-bottom: 15px;">What to expect:</p>
              <ul style="color: #4b5563; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                <li>✨ <strong>SPARK</strong> - For Class 5-6 (Ignite curiosity & remove fear of coding)</li>
                <li>🧱 <strong>BUILDERS</strong> - For Class 7-8 (Build strong coding foundations)</li>
                <li>🚀 <strong>INNOVATORS</strong> - For Class 9-10 (Apply skills to real-world problems)</li>
              </ul>
            </div>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-top: 30px;">
              In the meantime, feel free to explore our website and learn more about our mission to make coding education accessible and affordable for every student in India.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #1f2937; font-size: 20px; font-weight: bold; margin: 0;">
                <span style="color: #FCD34D;">Code.</span> 
                <span style="color: #1f2937;">Create.</span> 
                <span style="color: #FCD34D;">Masti.</span> 
                🚀
              </p>
            </div>
          </div>
          
          <!-- Brand Identity Image -->
          <div style="text-align: center; padding: 30px 20px; background-color: #ffffff;">
            <img 
              src="https://i.postimg.cc/j5pVfmvg/Gemini-Generated-Image-varm5mvarm5mvarm.png" 
              alt="CodeMasti - Think. Solve. Create. | SPARK, BUILDERS, INNOVATORS" 
              style="max-width: 100%; height: auto; width: 500px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
            />
            <!-- Note: After deploying to codemasti.com, update the src to: https://codemasti.com/brand-identity.png -->
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              <strong>The CodeMasti Team</strong>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0;">
              Building India's most trusted, affordable, and impact-driven coding education platform
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 15px 0 0 0;">
              Questions? Reply to this email or contact us at <a href="mailto:info.codemasti@gmail.com" style="color: #FCD34D; text-decoration: none;">info.codemasti@gmail.com</a>
            </p>
          </div>
        </div>
      `,
    });

    if (userEmailResult.success) {
      console.log('✅ User confirmation email sent successfully to:', email);
      console.log('📧 Message ID:', userEmailResult.messageId);
    } else {
      console.error('❌ Failed to send user confirmation email:', userEmailResult.error);
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        emailSent: userEmailResult.success
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
