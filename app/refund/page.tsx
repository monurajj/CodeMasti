"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";

export default function Refund() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" ref={containerRef}>
      {/* Animated Background Particles */}
      <Particles count={20} />

      {/* Navigation */}
      <nav className="bg-black text-white py-4 px-6 md:px-12 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95 overflow-visible" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 whitespace-nowrap overflow-visible" aria-label="CodeMasti home page">
            <Image 
              src="/logoblackbg.png" 
              alt="CodeMasti logo" 
              width={150} 
              height={40} 
              className="h-8 w-auto object-contain"
              priority
            />
            <span className="text-2xl font-bold text-white">CodeMasti</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Learn more about CodeMasti">
              About
            </Link>
            <Link href="/programs" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="View our coding programs">
              Programs
            </Link>
            <Link href="/register" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Register for CodeMasti programs">
              Register
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Contact CodeMasti">
              Contact
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700" role="menu" aria-label="Mobile navigation menu">
            <Link 
              href="/about"
              className="block py-3.5 px-4 text-base text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
              aria-label="Learn more about CodeMasti"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/programs"
              className="block py-3.5 px-4 text-base text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
              aria-label="View our coding programs"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Programs
            </Link>
            <Link 
              href="/register"
              className="block py-3.5 px-4 text-base text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
              aria-label="Register for CodeMasti programs"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              href="/contact"
              className="block py-3.5 px-4 text-base text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
              aria-label="Contact CodeMasti"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>

      {/* Yellow Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

      <main id="main-content" className="relative z-10 px-4 py-16 bg-white" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div 
            id="header"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              Refund and <span className="text-yellow-500">Cancellation Policy</span>
            </h1>
            <div className="w-32 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Content Section */}
          <div 
            id="content"
            data-animate
            className={`bg-white rounded-2xl p-6 md:p-10 shadow-lg border-2 border-gray-200 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                This Refund and Cancellation Policy outlines CodeMasti&apos;s guidelines and procedures for refunds and cancellations 
                of our coding education services and programs. This policy applies to all enrollments, registrations, and purchases 
                made through our Platform.
              </p>

              <p className="text-gray-600 text-sm mb-8 italic">
                Last Updated: January 29, 2025
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Refund Eligibility and Timeframes</h2>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.1 Registration Fee Refunds</h3>
              <p className="text-gray-700 mb-4">
                Registration fees are eligible for a full refund under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Before Program Start:</strong> If you cancel your enrollment at least 7 days before the program start date, you are eligible for a 100% refund of the registration fee.</li>
                <li><strong>Within 7 Days of Program Start:</strong> If you cancel your enrollment within 7 days before the program start date, you are eligible for a 50% refund of the registration fee.</li>
                <li><strong>After Program Start:</strong> Registration fees are non-refundable once the program has commenced, except in cases covered under Section 1.3 (Special Circumstances).</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.2 Monthly Fee Refunds</h3>
              <p className="text-gray-700 mb-4">
                Monthly fees are eligible for refunds under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Pro-rated Refunds:</strong> If you cancel your enrollment during a billing month, you may be eligible for a pro-rated refund for the unused portion of that month, calculated from the date of cancellation request.</li>
                <li><strong>Advance Payments:</strong> If you have paid monthly fees in advance for future months, those advance payments are fully refundable if cancellation is requested before the start of those months.</li>
                <li><strong>Current Month:</strong> Monthly fees for the current month are non-refundable once the month has started, except in cases covered under Section 1.3 (Special Circumstances).</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.3 Special Circumstances for Refunds</h3>
              <p className="text-gray-700 mb-4">
                Full or partial refunds may be considered in the following special circumstances, subject to our review and approval:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>Medical emergencies or serious health issues preventing participation (requires documentation)</li>
                <li>Technical issues on our Platform that prevent access to classes for an extended period (more than 2 consecutive weeks)</li>
                <li>Program cancellation by CodeMasti due to insufficient enrollment or other reasons</li>
                <li>Significant changes to program schedule or content that materially affect the service provided</li>
                <li>Other circumstances at our sole discretion, evaluated on a case-by-case basis</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. Non-Refundable and Non-Cancellable Services</h2>
              <p className="text-gray-700 mb-4">
                The following services and fees are explicitly <strong>non-refundable and non-cancellable</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li><strong>Completed Classes:</strong> Fees for classes that have already been conducted are non-refundable.</li>
                <li><strong>Downloaded Materials:</strong> Once course materials, videos, or resources have been accessed or downloaded, associated fees are non-refundable.</li>
                <li><strong>Certificates:</strong> Fees paid for certificates or completion documents are non-refundable once issued.</li>
                <li><strong>Special Programs or Workshops:</strong> One-time workshops, special events, or promotional programs may be non-refundable as specified at the time of enrollment.</li>
                <li><strong>Third-Party Fees:</strong> Any fees paid to third-party service providers (payment gateways, etc.) are non-refundable by CodeMasti.</li>
                <li><strong>Late Cancellations:</strong> Cancellation requests made after the program has started (except under special circumstances) are non-refundable.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Cancellation Procedures, Fees, and Requirements</h2>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.1 How to Request Cancellation</h3>
              <p className="text-gray-700 mb-4">
                To cancel your enrollment and request a refund, you must:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Send a written cancellation request via email to <strong>info.codemasti@gmail.com</strong> or contact us at <strong>+91 8228907407</strong></li>
                <li>Include the following information in your request:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Student&apos;s full name and registered email address</li>
                    <li>Program name and enrollment date</li>
                    <li>Reason for cancellation</li>
                    <li>Bank account details for refund processing (if applicable)</li>
                  </ul>
                </li>
                <li>Submit the cancellation request within the applicable timeframe as specified in Section 1</li>
              </ol>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.2 Cancellation Fees</h3>
              <p className="text-gray-700 mb-4">
                The following cancellation fees may apply:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Early Cancellation (7+ days before start):</strong> No cancellation fee - Full refund of registration fee</li>
                <li><strong>Late Cancellation (within 7 days of start):</strong> 50% cancellation fee deducted from registration fee refund</li>
                <li><strong>After Program Start:</strong> No refund available (except special circumstances)</li>
                <li><strong>Payment Processing Fees:</strong> Any payment gateway or processing fees charged by third parties will be deducted from refunds</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.3 Cancellation Requirements</h3>
              <p className="text-gray-700 mb-4">
                For your cancellation request to be processed:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>You must be the account holder or authorized representative of the enrolled student</li>
                <li>All outstanding fees must be paid before cancellation can be processed</li>
                <li>You must return or stop using any course materials, access codes, or resources provided</li>
                <li>For special circumstances, supporting documentation may be required (medical certificates, etc.)</li>
                <li>Cancellation requests must be submitted in writing; verbal requests will not be accepted</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Return and Replacement Request Process</h2>
              <p className="text-gray-700 mb-4">
                Since CodeMasti provides digital educational services (online classes and digital materials), traditional 
                &quot;returns&quot; do not apply. However, the following processes apply:
              </p>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.1 Service Issues and Complaints</h3>
              <p className="text-gray-700 mb-4">
                If you experience issues with our services, please follow this process:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Report the Issue:</strong> Contact us within 7 days of the issue occurring via email (info.codemasti@gmail.com) or phone (+91 8228907407)</li>
                <li><strong>Provide Details:</strong> Include specific details about the issue, dates, screenshots if applicable, and your account information</li>
                <li><strong>Review Period:</strong> We will review your complaint within 5-7 business days</li>
                <li><strong>Resolution:</strong> We may offer:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Access to recorded sessions if you missed live classes due to technical issues</li>
                    <li>Extension of program access</li>
                    <li>Partial refund if the issue significantly impacted your learning experience</li>
                    <li>Alternative solutions as appropriate</li>
                  </ul>
                </li>
              </ol>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.2 Program Transfer Requests</h3>
              <p className="text-gray-700 mb-4">
                Instead of cancellation, you may request to transfer to a different program or batch:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>Transfer requests must be made at least 7 days before the current program start date</li>
                <li>Transfer fees may apply if there is a price difference between programs</li>
                <li>Transfers are subject to availability in the requested program</li>
                <li>Only one transfer per enrollment is permitted</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Refund Processing</h2>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.1 Refund Processing Time</h3>
              <p className="text-gray-700 mb-4">
                Once your refund request is approved:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Refunds will be processed within <strong>7-14 business days</strong> from the date of approval</li>
                <li>Refunds will be credited to the original payment method used for the transaction</li>
                <li>For bank transfers, processing may take additional 3-5 business days depending on your bank</li>
                <li>You will receive an email confirmation once the refund has been processed</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.2 Refund Method</h3>
              <p className="text-gray-700 mb-4">
                Refunds will be processed using the same payment method used for the original transaction:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li><strong>Credit/Debit Cards:</strong> Refunded to the same card (may take 5-10 business days to appear)</li>
                <li><strong>UPI:</strong> Refunded to the same UPI ID</li>
                <li><strong>Net Banking:</strong> Refunded to the same bank account</li>
                <li><strong>Other Methods:</strong> As per the original payment method</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                If you are not satisfied with our refund decision:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>You may request a review by contacting our customer service team with additional information or documentation</li>
                <li>We will conduct a thorough review and respond within 10 business days</li>
                <li>If the dispute remains unresolved, you may refer to our Terms & Conditions for dispute resolution procedures</li>
                <li>All disputes are subject to the jurisdiction of courts in Aurangabad, Bihar, India</li>
              </ol>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For any questions, cancellation requests, or refund inquiries, please contact us:
              </p>
              <ul className="list-none space-y-2 text-gray-700 mb-6">
                <li><strong>Email:</strong> info.codemasti@gmail.com</li>
                <li><strong>Phone:</strong> +91 8228907407, +91 9523042613, +91 7541062514</li>
                <li><strong>Response Time:</strong> We aim to respond to all inquiries within 24-48 hours during business days</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
                <p className="text-gray-700 font-semibold mb-2">Important Note:</p>
                <p className="text-gray-700 text-sm">
                  This Refund Policy is clearly stated and updated on our website. A missing or incomplete refund policy 
                  may result in failure of customer payments. Please read this policy carefully before making any purchase 
                  or enrollment. By enrolling in our programs, you acknowledge that you have read, understood, and agree 
                  to be bound by this Refund and Cancellation Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6 md:px-12 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2024 CodeMasti. All rights reserved.
              </p>
              <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
                <Link href="/terms" className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Terms & Conditions">
                  Terms & Conditions
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/privacy" className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Privacy Policy">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/refund" className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Refund Policy">
                  Refund Policy
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Learn more about CodeMasti">
                About
              </Link>
              <Link href="/programs" className="text-gray-400 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="View our coding programs">
                Programs
              </Link>
              <Link href="/register" className="text-gray-400 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Register for CodeMasti programs">
                Register
              </Link>
              <Link href="/contact" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Contact CodeMasti">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
