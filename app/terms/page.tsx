"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";

export default function Terms() {
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
              Terms & <span className="text-yellow-500">Conditions</span>
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
                This document is an electronic record in terms of Information Technology Act, 2000 and rules
                there under as applicable and the amended provisions pertaining to electronic records in various
                statutes as amended by the Information Technology Act, 2000. This electronic record is generated
                by a computer system and does not require any physical or digital signatures.
              </p>

              <p className="text-gray-700 mb-6">
                This document is published in accordance with the provisions of Rule 3 (1) of the Information
                Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and
                regulations, privacy policy and Terms of Use for access or usage of domain name{' '}
                <a href="https://www.codemasti.com/" className="text-yellow-600 hover:text-yellow-700 underline">
                  https://www.codemasti.com/
                </a>
                {' '}(&apos;Website&apos;), including the related mobile site and mobile application (hereinafter
                referred to as &apos;Platform&apos;).
              </p>

              <p className="text-gray-700 mb-6">
                The Platform is owned by with its registered office at Purahara Aurangabad Bihar
                , a company incorporated under the Companies Act, 1956 8228907407
                (hereinafter referred to as &apos;Platform Owner&apos;, &apos;we&apos;, &apos;us&apos;, &apos;our&apos;).
              </p>

              <p className="text-gray-800 mb-6 font-semibold text-center bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                THIS BUSINESS IS OWNED BY MR MONU KUMAR
              </p>

              <p className="text-gray-700 mb-6">
                Your use of the Platform and services and tools are governed by the following terms and
                conditions (&quot;Terms of Use&quot;) as applicable to the Platform including the applicable policies which
                are incorporated herein by way of reference. If You transact on the Platform, You shall be subject
                to the policies that are applicable to the Platform for such transaction. By mere use of the Platform,
                You shall be contracting with the Platform Owner and these terms and conditions including the
                policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to
                your use of our website, goods (as applicable) or services (as applicable) (collectively, &apos;Services&apos;).
                Any terms and conditions proposed by You which are in addition to or which conflict with these
                Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect.
                These Terms of Use can be modified at any time without assigning any reason. It is your
                responsibility to periodically review these Terms of Use to stay informed of updates.
              </p>

              <p className="text-gray-700 mb-6">
                For the purpose of these Terms of Use, wherever the context so requires &apos;you&apos;, &apos;your&apos; or &apos;user&apos; shall
                mean any natural or legal person who has agreed to become a user/buyer on the Platform.
              </p>

              <p className="text-gray-700 mb-8 font-semibold">
                ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR
                AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE,
                SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
              </p>

              <p className="text-gray-600 text-sm mb-8 italic">
                Last Updated: January 29, 2025
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Service and Product Details</h2>
              <p className="text-gray-700 mb-6">
                CodeMasti provides online coding education programs for students in Classes 5 through 10. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li><strong>SPARK Program:</strong> Designed for students in Class 5-6, focusing on igniting curiosity and removing fear of coding through logical thinking games, visual programming, and creative problem-solving.</li>
                <li><strong>BUILDERS Program:</strong> Designed for students in Class 7-8, focusing on building strong coding foundations with Python fundamentals, conditions, loops, functions, and mini projects.</li>
                <li><strong>INNOVATORS Program:</strong> Designed for students in Class 9-10, focusing on applying coding skills to real-world problems, exploring AI tools, and career awareness.</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Each program includes live interactive classes, weekly practice challenges, guided and independent project work, and access to our learning platform. Classes are conducted online via our Platform, typically scheduled on weekends (Saturday and Sunday) with 2 live classes per week.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a user of our Platform and Services, you agree to:</p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-4">
                <li>Provide true, accurate, current, and complete information during registration and keep such information updated.</li>
                <li>Maintain the confidentiality of your account credentials and be responsible for all activities that occur under your account.</li>
                <li>Ensure that the student enrolled meets the age/class requirements for the selected program.</li>
                <li>Attend scheduled classes regularly and complete assigned practice challenges and projects.</li>
                <li>Use the Platform and Services only for educational purposes and in accordance with these Terms.</li>
                <li>Not share, distribute, copy, or reproduce any course materials, videos, or content provided through the Services without our express written permission.</li>
                <li>Not use the Platform to transmit any harmful, offensive, or inappropriate content.</li>
                <li>Respect intellectual property rights of CodeMasti and other users.</li>
                <li>Notify us immediately of any unauthorized use of your account or any breach of security.</li>
                <li>Comply with all applicable laws and regulations while using our Services.</li>
              </ol>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Payment Terms</h2>
              <p className="text-gray-700 mb-4">Payment for our Services consists of:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Registration Fee:</strong> A one-time registration fee payable at the time of enrollment (SPARK: ₹2,499, BUILDERS: ₹2,999, INNOVATORS: ₹3,499).</li>
                <li><strong>Monthly Fee:</strong> Recurring monthly fees payable in advance for each month of enrollment (SPARK: ₹1,499/month, BUILDERS: ₹1,999/month, INNOVATORS: ₹2,499/month).</li>
              </ul>
              <p className="text-gray-700 mb-4">Payment terms and conditions:</p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-4">
                <li>All fees are non-refundable except as specified in our Refund Policy (available at <Link href="/refund" className="text-yellow-600 hover:text-yellow-700 underline">/refund</Link>).</li>
                <li>Payment must be made through the payment methods accepted on our Platform (credit/debit cards, UPI, net banking, or other methods as displayed).</li>
                <li>Monthly fees are due on or before the first day of each month. Failure to pay monthly fees may result in suspension of access to Services.</li>
                <li>We reserve the right to modify our fees with 30 days&apos; prior notice. Existing enrollments will continue at the original fee structure for the duration of their current enrollment period.</li>
                <li>All fees are exclusive of applicable taxes (GST). Taxes will be added to the invoice as per applicable laws.</li>
                <li>In case of payment failure or dishonor, we reserve the right to suspend or terminate your access to Services until payment is successfully processed.</li>
                <li>Refunds, if applicable, will be processed as per our Refund Policy within 7-14 business days after approval.</li>
              </ol>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Usage Restrictions</h2>
              <p className="text-gray-700 mb-4">You agree NOT to:</p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-4">
                <li>Use the Platform or Services for any unlawful, illegal, or unauthorized purpose.</li>
                <li>Violate any applicable local, state, national, or international law or regulation.</li>
                <li>Transmit any viruses, malware, or harmful code through the Platform.</li>
                <li>Attempt to gain unauthorized access to any portion of the Platform, other accounts, or computer systems.</li>
                <li>Copy, modify, distribute, sell, or lease any part of our Services or Platform without our written permission.</li>
                <li>Reverse engineer, decompile, or disassemble any software or content provided through the Platform.</li>
                <li>Use automated systems (bots, scrapers) to access the Platform without our express written consent.</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
                <li>Harass, abuse, or harm other users, instructors, or our staff.</li>
                <li>Record, share, or distribute live class sessions or course content without authorization.</li>
              </ol>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Intellectual Property Ownership</h2>
              <p className="text-gray-700 mb-4">All content, materials, and intellectual property on the Platform and provided through our Services are owned by CodeMasti or our licensors, including but not limited to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Course curriculum, lesson plans, and educational content</li>
                <li>Video recordings, presentations, and teaching materials</li>
                <li>Software, code, and technical infrastructure</li>
                <li>Logos, trademarks, brand names, and design elements</li>
                <li>Platform interface, layout, and user experience design</li>
              </ul>
              <p className="text-gray-700 mb-4">You acknowledge that:</p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6 ml-4">
                <li>You have no right, title, or interest in any of the intellectual property rights mentioned above.</li>
                <li>You are granted a limited, non-exclusive, non-transferable license to access and use the Services for personal educational purposes only during your active enrollment period.</li>
                <li>This license terminates automatically upon termination of your enrollment or violation of these Terms.</li>
                <li>You may not copy, reproduce, distribute, modify, create derivative works, publicly display, or commercially exploit any content without our express written permission.</li>
                <li>Any projects or work created by students using our Platform may be used by CodeMasti for promotional or educational purposes, with appropriate attribution to the student.</li>
                <li>Unauthorized use of our intellectual property may result in legal action and termination of your access to Services.</li>
              </ol>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Limitations of Liability</h2>
              <p className="text-gray-700 mb-4">To the fullest extent permitted by applicable law:</p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4 ml-4">
                <li><strong>No Warranties:</strong> We provide the Platform and Services &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</li>
                <li><strong>Educational Outcomes:</strong> While we strive to provide quality education, we do not guarantee specific learning outcomes, academic performance improvements, or career results. Individual results may vary based on student effort, participation, and other factors.</li>
                <li><strong>Technical Issues:</strong> We are not liable for any interruptions, delays, errors, or failures in the Platform or Services due to technical issues, internet connectivity problems, or circumstances beyond our reasonable control.</li>
                <li><strong>Third-Party Content:</strong> We are not responsible for the accuracy, completeness, or reliability of any third-party content, links, or resources that may be accessible through our Platform.</li>
                <li><strong>Limitation of Damages:</strong> In no event shall CodeMasti, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising out of or related to your use of the Platform or Services.</li>
                <li><strong>Maximum Liability:</strong> Our total liability to you for any claims arising from or related to these Terms or the Services shall not exceed the total amount of fees paid by you to us in the twelve (12) months preceding the claim.</li>
                <li><strong>Force Majeure:</strong> We shall not be liable for any failure or delay in performance under these Terms due to circumstances beyond our reasonable control, including natural disasters, pandemics, government actions, internet failures, or other force majeure events.</li>
              </ol>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Dispute Resolution Procedures</h2>
              <p className="text-gray-700 mb-4">In the event of any dispute, controversy, or claim arising out of or relating to these Terms, the Services, or the Platform:</p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4 ml-4">
                <li><strong>Informal Resolution:</strong> The parties agree to first attempt to resolve any dispute informally by contacting us at info.codemasti@gmail.com or through the contact information provided on our website. We will make reasonable efforts to address your concerns within 30 days.</li>
                <li><strong>Governing Law:</strong> These Terms and any dispute or claim relating to them, or their enforceability, shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</li>
                <li><strong>Jurisdiction:</strong> All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Aurangabad, Bihar, India. You consent to the personal jurisdiction of such courts and waive any objection to venue in such courts.</li>
                <li><strong>Arbitration:</strong> If informal resolution is unsuccessful, any dispute, controversy, or claim shall be settled through binding arbitration in accordance with the Arbitration and Conciliation Act, 2015 of India. The arbitration shall be conducted in Aurangabad, Bihar, India, in the English language, by a single arbitrator appointed by mutual agreement or as per the provisions of the Arbitration and Conciliation Act, 2015.</li>
                <li><strong>Class Action Waiver:</strong> You agree that any disputes will be resolved individually and not as part of a class action or representative proceeding.</li>
              </ol>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Additional Terms</h2>
              <ol className="list-decimal list-inside space-y-4 text-gray-700 mb-6 ml-4">
                <li>
                  To access and use the Services, you agree to provide true, accurate and complete information
                  to us during and after registration, and you shall be responsible for all acts done through the
                  use of your registered account on the Platform.
                </li>
                <li>
                  Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
                  timeliness, performance, completeness or suitability of the information and materials offered
                  on this website or through the Services, for any specific purpose. You acknowledge that such
                  information and materials may contain inaccuracies or errors and we expressly exclude
                  liability for any such inaccuracies or errors to the fullest extent permitted by law.
                </li>
                <li>
                  Your use of our Services and the Platform is solely and entirely at your own risk and
                  discretion for which we shall not be liable to you in any manner. You are required to
                  independently assess and ensure that the Services meet your requirements.
                </li>
                <li>
                  You agree and acknowledge that website and the Services may contain links to other third
                  party websites. On accessing these links, you will be governed by the terms of use, privacy
                  policy and such other policies of such third party websites. These links are provided for your
                  convenience for provide further information.
                </li>
                <li>
                  You understand that upon initiating a transaction for availing the Services you are entering
                  into a legally binding and enforceable contract with the Platform Owner for the Services.
                </li>
                <li>
                  You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as
                  applicable) and their respective officers, directors, agents, and employees, from any claim or
                  demand, or actions including reasonable attorney&apos;s fees, made by any third party or penalty
                  imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other
                  Policies, or Your violation of any law, rules or regulations or the rights (including
                  infringement of intellectual property rights) of a third party.
                </li>
                <li>
                  Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for
                  any failure to perform an obligation under these Terms if performance is prevented or
                  delayed by a force majeure event.
                </li>
                <li>
                  We reserve the right to modify, suspend, or discontinue any part of the Platform or Services at any time with or without notice. We may also terminate or suspend your access to the Platform or Services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                </li>
                <li>
                  These Terms of Use can be modified at any time without assigning any reason. It is your
                  responsibility to periodically review these Terms of Use to stay informed of updates. Your continued use of the Platform or Services after any modifications constitutes acceptance of the updated Terms.
                </li>
                <li>
                  All concerns or communications relating to these Terms must be communicated to us using
                  the contact information provided on this website (info.codemasti@gmail.com or +91 8228907407).
                </li>
                <li>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </li>
                <li>
                  These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and CodeMasti regarding the use of the Platform and Services.
                </li>
              </ol>
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
