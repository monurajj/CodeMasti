"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";

export default function Privacy() {
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
            className={`text-center mb-12 transition-all duration-1000 ${mounted && isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
              Privacy <span className="text-yellow-500">Policy</span>
            </h1>
            <div className="w-32 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Content Section */}
          <div 
            id="content"
            data-animate
            className={`bg-white rounded-2xl p-6 md:p-10 shadow-lg border-2 border-gray-200 transition-all duration-1000 delay-200 ${mounted && isVisible.content ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <p className="text-gray-700 mb-6">
                This Privacy Policy describes how CodeMasti (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects your personal information when you use our website located at{' '}
                <a href="https://www.codemasti.com/" className="text-yellow-600 hover:text-yellow-700 underline">
                  https://www.codemasti.com/
                </a>
                {' '}(the &quot;Platform&quot;). By using our Platform, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and student class information when you register for our courses or contact us.</li>
                <li><strong>Account Information:</strong> Information you provide when creating an account or profile on our Platform.</li>
                <li><strong>Communication Data:</strong> Messages, inquiries, and other communications you send to us.</li>
                <li><strong>Usage Data:</strong> Information about how you access and use our Platform, including your IP address, browser type, device information, and pages visited.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Provide, maintain, and improve our educational services and Platform.</li>
                <li>Process your registrations and manage your account.</li>
                <li>Send you updates, newsletters, and information about our courses and services.</li>
                <li>Respond to your inquiries, comments, and requests.</li>
                <li>Monitor and analyze usage patterns and trends to improve user experience.</li>
                <li>Detect, prevent, and address technical issues and security threats.</li>
                <li>Comply with legal obligations and enforce our Terms of Use.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as email delivery, data storage, and analytics.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent:</strong> We may share your information with your explicit consent or at your direction.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-6">
                We use cookies and similar tracking technologies to track activity on our Platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Platform.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>Access and receive a copy of your personal information.</li>
                <li>Correct inaccurate or incomplete information.</li>
                <li>Request deletion of your personal information.</li>
                <li>Object to or restrict the processing of your information.</li>
                <li>Opt-out of marketing communications by following the unsubscribe instructions in our emails.</li>
                <li>Withdraw consent where we rely on consent as the legal basis for processing.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our Platform is designed for students from Class 5 to Class 10. We take the privacy of children seriously. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to delete such information from our records.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">8. Data Retention</h2>
              <p className="text-gray-700 mb-6">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 mb-6">
                Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party websites you visit.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info.codemasti@gmail.com" className="text-yellow-600 hover:text-yellow-700 underline">
                    info.codemasti@gmail.com
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +91 8228907407, +91 9523042613, +91 7541062514
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> Purahara Aurangabad Bihar, India
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
