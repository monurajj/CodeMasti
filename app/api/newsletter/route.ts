import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { appendNewsletterToSheet } from '@/lib/google-sheets';
import { validateEmailExistence } from '@/lib/email-validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email actually exists
    const validationResult = await validateEmailExistence(email);

    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.error || 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!validationResult.isDeliverable) {
      return NextResponse.json(
        { error: validationResult.error || 'This email address does not exist or cannot receive emails.' },
        { status: 400 }
      );
    }

    console.log('📧 Attempting to send welcome email to:', email);

    // Save to Google Sheets
    if (process.env.GOOGLE_SHEET_ID) {
      const sheetResult = await appendNewsletterToSheet(process.env.GOOGLE_SHEET_ID, {
        email,
      });
      if (sheetResult.success) {
        console.log('✅ Newsletter signup saved to Google Sheet');
      } else {
        console.error('❌ Failed to save to Google Sheet:', sheetResult.error);
      }
    } else {
      console.warn('⚠️ GOOGLE_SHEET_ID not configured, skipping Google Sheets save');
    }

    // Send welcome email to user
    const userEmailResult = await sendEmail({
      to: email,
      subject: 'Welcome to CodeMasti Waitlist! 🚀',
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
            <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Welcome to CodeMasti! 🎉</h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Thank you for joining our waitlist! We're thrilled to have you on this journey with us.
            </p>
            
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #FCD34D; margin: 30px 0;">
              <p style="margin: 0; color: #92400e; font-size: 18px; font-weight: 700;">
                🚀 Launch Date: May 2, 2026
              </p>
              <p style="margin: 10px 0 0 0; color: #78350f; font-size: 15px;">
                We'll notify you as soon as we launch! Get ready to transform how you learn coding.
              </p>
            </div>
            
            <div style="margin: 30px 0;">
              <p style="color: #1f2937; font-size: 18px; font-weight: 600; margin-bottom: 20px;">What's Coming:</p>
              
              <!-- SPARK Program -->
              <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #fb923c;">
                <p style="margin: 0; color: #c2410c; font-size: 16px; font-weight: 700;">
                  ✨ SPARK (Class 5-6)
                </p>
                <p style="margin: 8px 0 0 0; color: #7c2d12; font-size: 14px;">
                  Ignite curiosity & remove fear of coding
                </p>
              </div>
              
              <!-- BUILDERS Program -->
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; color: #1e40af; font-size: 16px; font-weight: 700;">
                  🧱 BUILDERS (Class 7-8)
                </p>
                <p style="margin: 8px 0 0 0; color: #1e3a8a; font-size: 14px;">
                  Build strong coding foundations
                </p>
              </div>
              
              <!-- INNOVATORS Program -->
              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
                <p style="margin: 0; color: #166534; font-size: 16px; font-weight: 700;">
                  🚀 INNOVATORS (Class 9-10)
                </p>
                <p style="margin: 8px 0 0 0; color: #14532d; font-size: 14px;">
                  Apply skills to real-world problems
                </p>
              </div>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <p style="color: #1f2937; font-size: 15px; margin: 0; line-height: 1.6;">
                <strong>Our Mission:</strong> To build India's most trusted, affordable, and impact-driven coding education platform. We focus on <strong>logic before language</strong>, <strong>projects before theory</strong>, and <strong>confidence before complexity</strong>.
              </p>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <p style="color: #1f2937; font-size: 22px; font-weight: bold; margin: 0;">
                Get ready to 
                <span style="color: #FCD34D;">Code.</span> 
                <span style="color: #1f2937;">Create.</span> 
                <span style="color: #FCD34D;">Masti!</span> 
                🚀
              </p>
            </div>
            
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-top: 30px;">
              We're not just teaching coding. We're shaping how students think, solve, and create in an AI-driven world.
            </p>
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
              Founded by Aditya Raj & Monu Raj
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 15px 0 0 0;">
              Questions? Contact us at <a href="mailto:info.codemasti@gmail.com" style="color: #FCD34D; text-decoration: none;">info.codemasti@gmail.com</a>
            </p>
          </div>
        </div>
      `,
    });

    if (userEmailResult.success) {
      console.log('✅ User welcome email sent successfully to:', email);
      console.log('📧 Message ID:', userEmailResult.messageId);
    } else {
      console.error('❌ Failed to send user welcome email:', userEmailResult.error);
    }

    // Notify admin about new signup
    const adminEmailResult = await sendEmail({
      to: 'info.codemasti@gmail.com',
      subject: 'New Waitlist Signup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #FCD34D;">New Waitlist Signup</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    if (adminEmailResult.success) {
      console.log('✅ Admin notification email sent successfully');
    } else {
      console.error('❌ Failed to send admin notification email:', adminEmailResult.error);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waitlist! We\'ll notify you when we launch.',
        emailSent: userEmailResult.success
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing newsletter signup:', error);
    return NextResponse.json(
      { error: 'Failed to add email. Please try again later.' },
      { status: 500 }
    );
  }
}
