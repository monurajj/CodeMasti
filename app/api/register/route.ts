import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { appendRegistrationToSheet, registrationEmailExists } from '@/lib/google-sheets';

// Batch-specific information for emails
const batchInfo = {
  spark: {
    name: 'SPARK',
    emoji: '✨',
    classes: 'Class 5-6',
    color: '#fb923c',
    bgColor: '#fff7ed',
    borderColor: '#fb923c',
    textColor: '#c2410c',
    goal: 'Ignite curiosity & remove fear of coding',
    description: 'The foundation stage where we introduce students to the world of coding through fun, interactive activities that build confidence and logical thinking.',
    features: [
      'Logical thinking activities',
      'Visual programming & flowcharts',
      'Creative problem solving',
      'Introduction to how computers think'
    ],
    outcome: 'Students enjoy coding and feel confident exploring technology.',
    nextSteps: [
      'We will contact you within 24-48 hours to confirm your registration',
      'You will receive your course schedule and learning materials via email',
      'Join our welcome session where we\'ll introduce you to the SPARK program',
      'Get ready to start with fun coding activities and logical thinking activities',
      'Access to our online learning platform will be provided before classes begin'
    ],
    startDate: 'Classes begin in May 2026',
    duration: '6 months program with weekly sessions'
  },
  builders: {
    name: 'BUILDERS',
    emoji: '🧱',
    classes: 'Class 7-8',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#3b82f6',
    textColor: '#1e40af',
    goal: 'Build strong coding foundations',
    description: 'Students dive into real programming with Python, learning core concepts through hands-on projects and challenges that make coding tangible and exciting.',
    features: [
      'Python fundamentals',
      'Conditions, loops, functions',
      'Mini projects & challenges',
      'Introduction to AI concepts (conceptual)'
    ],
    outcome: 'Students can write code and build simple applications independently.',
    nextSteps: [
      'We will contact you within 24-48 hours to confirm your registration',
      'You will receive your course schedule and Python learning materials via email',
      'Join our welcome session where we\'ll introduce you to the BUILDERS program',
      'Set up your development environment (we\'ll guide you through this)',
      'Access to our online learning platform and coding challenges will be provided',
      'Get ready to start building your first Python projects!'
    ],
    startDate: 'Classes begin in May 2026',
    duration: '8 months program with weekly sessions and projects'
  },
  innovators: {
    name: 'INNOVATORS',
    emoji: '🚀',
    classes: 'Class 9-10',
    color: '#22c55e',
    bgColor: '#f0fdf4',
    borderColor: '#22c55e',
    textColor: '#166534',
    goal: 'Apply skills to real-world problems',
    description: 'Advanced level where students apply their coding skills to solve real-world problems, explore AI tools, and prepare for future tech careers.',
    features: [
      'Advanced Python & logic',
      'Project-based learning',
      'AI tools & automation concepts',
      'Career awareness & tech exposure'
    ],
    outcome: 'Students think like engineers and innovators.',
    nextSteps: [
      'We will contact you within 24-48 hours to confirm your registration',
      'You will receive your course schedule and advanced learning materials via email',
      'Join our welcome session where we\'ll introduce you to the INNOVATORS program',
      'Set up your development environment and AI tools (we\'ll guide you through this)',
      'Access to our online learning platform, project repository, and AI tools will be provided',
      'Prepare for your first real-world project challenge!',
      'You\'ll also receive information about tech career pathways and opportunities'
    ],
    startDate: 'Classes begin in May 2026',
    duration: '10 months program with weekly sessions, projects, and mentorship'
  }
};

function generateRegistrationEmail(batchId: string, studentName: string, studentClass: string, paymentStatus: string) {
  const batch = batchInfo[batchId as keyof typeof batchInfo];
  if (!batch) {
    throw new Error(`Invalid batch ID: ${batchId}`);
  }

  const paymentStatusHtml = paymentStatus === 'Paid'
    ? '<div style="background-color: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 20px 0;"><p style="color: #166534; font-size: 15px; margin: 0;"><strong>Payment status:</strong> Paid – Your registration fee has been received. Your seat is confirmed.</p></div>'
    : paymentStatus === 'Pay Later'
      ? '<div style="background-color: #fffbeb; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;"><p style="color: #92400e; font-size: 15px; margin: 0;"><strong>Payment status:</strong> Pay Later – We will follow up with payment details. Complete payment to confirm your seat.</p></div>'
      : '';

  return `
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
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px;">Thank You for Registering, ${studentName}! 🎉</h2>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
          We're thrilled that you've chosen to join CodeMasti! Your registration for the <strong>${batch.name}</strong> batch has been successfully received.
        </p>
        ${paymentStatusHtml}
        
        <!-- Selected Batch Highlight -->
        <div style="background: linear-gradient(135deg, ${batch.bgColor} 0%, ${batch.bgColor} 100%); padding: 30px; border-radius: 8px; border-left: 4px solid ${batch.borderColor}; margin: 30px 0;">
          <div style="text-align: center; margin-bottom: 15px;">
            <span style="font-size: 48px;">${batch.emoji}</span>
          </div>
          <p style="margin: 0; color: ${batch.textColor}; font-size: 20px; font-weight: 700; text-align: center;">
            ${batch.name} (${batch.classes})
          </p>
          <p style="margin: 10px 0 0 0; color: ${batch.textColor}; font-size: 16px; text-align: center;">
            ${batch.goal}
          </p>
        </div>

        <!-- Program Details -->
        <div style="margin: 30px 0;">
          <h3 style="color: #1f2937; font-size: 20px; font-weight: 600; margin-bottom: 15px;">About Your Program</h3>
          
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 15px;">
            ${batch.description}
          </p>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #1f2937; font-size: 16px; font-weight: 600; margin-bottom: 10px;">What You'll Learn:</h4>
            <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
              ${batch.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>

          <div style="background-color: ${batch.bgColor}; padding: 20px; border-radius: 8px; border-left: 4px solid ${batch.borderColor}; margin: 20px 0;">
            <h4 style="color: ${batch.textColor}; font-size: 16px; font-weight: 600; margin-bottom: 10px;">Program Outcome:</h4>
            <p style="color: ${batch.textColor}; font-size: 14px; margin: 0;">
              ${batch.outcome}
            </p>
          </div>
        </div>

        <!-- Next Steps -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #FCD34D; margin: 30px 0;">
          <h3 style="color: #92400e; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 15px;">
            📋 Next Steps
          </h3>
          <ol style="color: #78350f; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
            ${batch.nextSteps.map(step => `<li style="margin-bottom: 10px;">${step}</li>`).join('')}
          </ol>
        </div>

        <!-- Program Schedule -->
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 10px;">Program Schedule</h3>
          <p style="color: #4b5563; font-size: 15px; margin: 5px 0;">
            <strong>Start Date:</strong> ${batch.startDate}
          </p>
          <p style="color: #4b5563; font-size: 15px; margin: 5px 0;">
            <strong>Duration:</strong> ${batch.duration}
          </p>
        </div>

        <!-- Important Information -->
        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 30px 0;">
          <h3 style="color: #1e40af; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 10px;">Important Information</h3>
          <p style="color: #1e3a8a; font-size: 14px; line-height: 1.6; margin: 0;">
            Our team will reach out to you within 24-48 hours to confirm your registration and provide you with all the necessary details. 
            Please keep an eye on your email (and spam folder) for updates.
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
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, studentClass, batch, paymentMerchantOrderId, paymentStatus } = body;

    const paymentStatusForSheet =
      paymentMerchantOrderId ? "Paid" : paymentStatus === "pay_later" ? "Pay Later" : "";

    // Validate required fields
    if (!name || !email || !phone || !studentClass || !batch) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Validate batch
    if (!batchInfo[batch as keyof typeof batchInfo]) {
      return NextResponse.json(
        { error: 'Invalid batch selection' },
        { status: 400 }
      );
    }

    // Check for duplicate email (unique registration per email)
    if (process.env.GOOGLE_SHEET_ID) {
      const alreadyRegistered = await registrationEmailExists(process.env.GOOGLE_SHEET_ID, email);
      if (alreadyRegistered) {
        return NextResponse.json(
          { error: 'This email is already registered. Use a different email or contact us at info.codemasti@gmail.com if you need help.' },
          { status: 409 }
        );
      }
    }

    console.log('📝 Processing registration:', { name, email, batch });

    // Send thank-you email to user with batch-specific details
    const userEmailResult = await sendEmail({
      to: email,
      subject: `Welcome to CodeMasti ${batchInfo[batch as keyof typeof batchInfo].name} Batch! 🚀`,
      html: generateRegistrationEmail(batch, name, studentClass, paymentStatusForSheet),
    });

    if (userEmailResult.success) {
      console.log('✅ Registration confirmation email sent successfully to:', email);
      console.log('📧 Message ID:', userEmailResult.messageId);
    } else {
      console.error('❌ Failed to send registration email:', userEmailResult.error);
    }

    // Notify admin about new registration
    const adminEmailResult = await sendEmail({
      to: 'info.codemasti@gmail.com',
      subject: `New Registration: ${batchInfo[batch as keyof typeof batchInfo].name} Batch${paymentStatusForSheet ? ` [${paymentStatusForSheet}]` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3 style="color: #FCD34D;">New Registration Received</h3>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Student Class:</strong> ${studentClass}</p>
            <p><strong>Selected Batch:</strong> ${batchInfo[batch as keyof typeof batchInfo].name} (${batchInfo[batch as keyof typeof batchInfo].classes})</p>
            <p><strong>Payment Status:</strong> ${paymentStatusForSheet || '—'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      `,
    });

    if (adminEmailResult.success) {
      console.log('✅ Admin notification email sent successfully');
    } else {
      console.error('❌ Failed to send admin notification email:', adminEmailResult.error);
    }

    // Save to Google Sheets (including email notification status)
    if (process.env.GOOGLE_SHEET_ID) {
      const sheetResult = await appendRegistrationToSheet(process.env.GOOGLE_SHEET_ID, {
        name,
        email,
        phone,
        studentClass,
        batch,
        paymentMerchantOrderId: typeof paymentMerchantOrderId === 'string' ? paymentMerchantOrderId : undefined,
        paymentStatus: paymentStatusForSheet,
        emailNotificationSent: userEmailResult.success ? 'Yes' : 'No',
      });
      if (sheetResult.success) {
        console.log('✅ Registration saved to Google Sheet');
      } else {
        console.error('❌ Failed to save to Google Sheet:', sheetResult.error);
      }
    } else {
      console.warn('⚠️ GOOGLE_SHEET_ID not configured, skipping Google Sheets save');
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful! Check your email for confirmation and next steps.',
        emailSent: userEmailResult.success
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing registration:', error);
    return NextResponse.json(
      { error: 'Failed to process registration. Please try again later.' },
      { status: 500 }
    );
  }
}
