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
            className={`text-center mb-12 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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
            className={`bg-white rounded-2xl p-6 md:p-10 shadow-lg border-2 border-gray-200 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                This Privacy Policy outlines CodeMasti policies for collecting, using, and sharing personal information 
                about our customers and users. This policy is clearly stated and updated on our website to ensure transparency 
                and compliance with data protection regulations.
              </p>

              <p className="text-gray-600 text-sm mb-8 italic">
                Last Updated: January 29, 2025
              </p>

              <p className="text-gray-700 mb-6">
                This Privacy Policy describes how CodeMasti (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, stores, protects, 
                and shares your personal information when you use our website located at{' '}
                <a href="https://www.codemasti.com/" className="text-yellow-600 hover:text-yellow-700 underline">
                  https://www.codemasti.com/
                </a>
                {' '}(the &quot;Platform&quot;). By using our Platform, you agree to the collection and use of information in accordance 
                with this Privacy Policy. A missing or incomplete privacy policy may result in failure of customer payments.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. Types of User Data We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect the following types of user data to provide and improve our services:
              </p>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.1 Personal Identification Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Name:</strong> Full name of the student and/or parent/guardian</li>
                <li><strong>Email Address:</strong> Primary email address for account communication and course updates</li>
                <li><strong>Phone Number:</strong> Contact phone number(s) for account verification and important notifications</li>
                <li><strong>Student Information:</strong> Student&apos;s class/grade level (Class 5-10), age, and academic information</li>
                <li><strong>Address:</strong> Billing address and location information (if provided)</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.2 Account and Registration Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Username and password (encrypted)</li>
                <li>Account preferences and settings</li>
                <li>Program enrollment details and course selections</li>
                <li>Payment information (processed securely through third-party payment gateways - we do not store full credit card details)</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.3 Communication Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>Messages, inquiries, and feedback sent through our contact forms</li>
                <li>Email correspondence between you and CodeMasti</li>
                <li>Support tickets and customer service interactions</li>
                <li>Survey responses and feedback (if you choose to participate)</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.4 Usage and Technical Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Device Information:</strong> Device type, operating system, browser type and version</li>
                <li><strong>IP Address:</strong> Internet Protocol address used to connect to our Platform</li>
                <li><strong>Log Data:</strong> Pages visited, time spent on pages, click patterns, and navigation paths</li>
                <li><strong>Session Information:</strong> Login times, session duration, and activity logs</li>
                <li><strong>Performance Data:</strong> Platform performance metrics and error reports</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">1.5 Educational and Learning Data</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>Class attendance records</li>
                <li>Assignment submissions and project work</li>
                <li>Progress tracking and performance metrics</li>
                <li>Course completion status</li>
                <li>Certificates and achievements earned</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li><strong>Service Delivery:</strong> Provide, maintain, and improve our educational services and Platform, including course access, live classes, and learning materials</li>
                <li><strong>Account Management:</strong> Process your registrations, manage your account, and maintain your enrollment records</li>
                <li><strong>Communication:</strong> Send you updates, newsletters, course announcements, and information about our services (you can opt-out of marketing communications)</li>
                <li><strong>Customer Support:</strong> Respond to your inquiries, comments, requests, and provide technical support</li>
                <li><strong>Payment Processing:</strong> Process payments, manage billing, and handle refund requests</li>
                <li><strong>Personalization:</strong> Customize your learning experience and provide personalized content and recommendations</li>
                <li><strong>Analytics and Improvement:</strong> Monitor and analyze usage patterns, trends, and Platform performance to improve user experience</li>
                <li><strong>Security:</strong> Detect, prevent, and address technical issues, security threats, fraud, and unauthorized access</li>
                <li><strong>Legal Compliance:</strong> Comply with legal obligations, enforce our Terms of Use, and respond to legal requests</li>
                <li><strong>Research and Development:</strong> Conduct research and analysis to improve our educational programs and services (using anonymized data where possible)</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">3. How User Data is Protected and Stored</h2>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.1 Data Protection Measures</h3>
              <p className="text-gray-700 mb-4">
                We implement comprehensive security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using SSL/TLS protocols</li>
                <li><strong>Secure Storage:</strong> Personal data is stored on secure servers with restricted access</li>
                <li><strong>Access Controls:</strong> Only authorized personnel have access to personal information, and access is logged and monitored</li>
                <li><strong>Password Security:</strong> Passwords are hashed using industry-standard algorithms (we never store plain-text passwords)</li>
                <li><strong>Regular Security Audits:</strong> We conduct regular security assessments and vulnerability testing</li>
                <li><strong>Firewall Protection:</strong> Our servers are protected by firewalls and intrusion detection systems</li>
                <li><strong>Data Backup:</strong> Regular encrypted backups are maintained to prevent data loss</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.2 Data Storage</h3>
              <p className="text-gray-700 mb-4">
                Your data is stored in the following manner:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Location:</strong> Data is primarily stored on secure cloud servers located in India and/or other jurisdictions as required for service delivery</li>
                <li><strong>Retention Period:</strong> We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements (typically 3-5 years after account closure, unless longer retention is required by law)</li>
                <li><strong>Deletion:</strong> When data is no longer needed, it is securely deleted or anonymized in accordance with our data retention policy</li>
                <li><strong>Backup Storage:</strong> Backups may retain data for additional periods but are also subject to secure deletion procedures</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">3.3 Limitations</h3>
              <p className="text-gray-700 mb-6">
                While we implement industry-standard security measures, no method of transmission over the Internet or 
                electronic storage is 100% secure. We cannot guarantee absolute security, but we continuously work to 
                improve our security practices and respond promptly to any security incidents.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">4. Third-Party Data Sharing</h2>
              <p className="text-gray-700 mb-4">
                <strong>We do not sell, trade, or rent your personal information to third parties for their marketing purposes.</strong> 
                However, we may share your information with third parties in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.1 Service Providers and Business Partners</h3>
              <p className="text-gray-700 mb-4">
                We share information with trusted third-party service providers who assist us in operating our Platform and providing services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Payment Processors:</strong> We share payment information with secure payment gateway providers (such as Razorpay, Stripe, or similar) to process transactions. These providers are PCI-DSS compliant and handle payment data according to their own privacy policies.</li>
                <li><strong>Cloud Hosting Services:</strong> Data may be stored on cloud infrastructure provided by third-party hosting services (such as AWS, Google Cloud, or similar) that maintain strict security standards.</li>
                <li><strong>Email Service Providers:</strong> We use email service providers to send transactional and marketing emails (if you opt-in).</li>
                <li><strong>Analytics Providers:</strong> We may use analytics services (such as Google Analytics) to understand Platform usage patterns. These services may collect anonymized usage data.</li>
                <li><strong>Customer Support Tools:</strong> We may use third-party customer support platforms to manage inquiries and support requests.</li>
                <li><strong>Learning Management Systems:</strong> If we use third-party LMS platforms, student progress and course data may be shared with these platforms.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                All third-party service providers are contractually obligated to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>Use your information only for the purposes we specify</li>
                <li>Maintain appropriate security measures to protect your data</li>
                <li>Comply with applicable data protection laws</li>
                <li>Not use your information for their own marketing purposes without your consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.2 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information if required by law or in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>To comply with legal obligations, court orders, or government requests</li>
                <li>To enforce our Terms of Use or other agreements</li>
                <li>To protect the rights, property, or safety of CodeMasti, our users, or others</li>
                <li>To investigate fraud, security threats, or other illegal activities</li>
                <li>In connection with legal proceedings or regulatory investigations</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.3 Business Transfers</h3>
              <p className="text-gray-700 mb-6">
                In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred 
                as part of that transaction. We will notify you via email and/or a prominent notice on our Platform of any such 
                change in ownership or control of your personal information.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">4.4 With Your Consent</h3>
              <p className="text-gray-700 mb-6">
                We may share your information with third parties when you explicitly consent to such sharing, such as when 
                you opt-in to receive communications from partner organizations or participate in promotional programs.
              </p>


              <h2 className="text-2xl font-bold text-black mt-8 mb-4">5. Use of Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our Platform, analyze usage 
                patterns, and provide personalized content. This section details our cookie practices and how you can manage them.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.1 What Are Cookies?</h3>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit 
                a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.2 Types of Cookies We Use</h3>
              
              <h4 className="text-lg font-semibold text-black mt-4 mb-2">5.2.1 Essential Cookies (Strictly Necessary)</h4>
              <p className="text-gray-700 mb-4">
                These cookies are necessary for the Platform to function properly and cannot be disabled:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Session Cookies:</strong> Maintain your login session and remember your preferences during your visit</li>
                <li><strong>Security Cookies:</strong> Help detect and prevent security threats and fraudulent activity</li>
                <li><strong>Authentication Cookies:</strong> Verify your identity and keep you logged in securely</li>
                <li><strong>Functionality Cookies:</strong> Remember your settings and preferences (language, region, etc.)</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Intended Function:</strong> These cookies enable core functionality and security features. 
                <strong>Handling:</strong> Automatically deleted when you close your browser (session cookies) or after a set period (persistent cookies).
              </p>

              <h4 className="text-lg font-semibold text-black mt-4 mb-2">5.2.2 Performance and Analytics Cookies</h4>
              <p className="text-gray-700 mb-4">
                These cookies help us understand how visitors interact with our Platform:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Analytics Cookies:</strong> Collect anonymous information about how you use our Platform (pages visited, time spent, etc.)</li>
                <li><strong>Performance Cookies:</strong> Monitor Platform performance and identify areas for improvement</li>
                <li><strong>Error Tracking Cookies:</strong> Help us identify and fix technical issues</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Intended Function:</strong> To improve Platform performance, user experience, and identify technical issues. 
                <strong>Handling:</strong> These cookies typically expire after 1-2 years. You can opt-out through your browser settings or our cookie preferences.
              </p>

              <h4 className="text-lg font-semibold text-black mt-4 mb-2">5.2.3 Functionality Cookies</h4>
              <p className="text-gray-700 mb-4">
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Preference Cookies:</strong> Remember your choices and preferences (theme, language, etc.)</li>
                <li><strong>Localization Cookies:</strong> Provide content in your preferred language and region</li>
                <li><strong>Video Player Cookies:</strong> Remember your video playback preferences and progress</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Intended Function:</strong> To provide a personalized experience and remember your preferences. 
                <strong>Handling:</strong> These cookies persist for varying periods (typically 30 days to 1 year) depending on the preference.
              </p>

              <h4 className="text-lg font-semibold text-black mt-4 mb-2">5.2.4 Marketing and Advertising Cookies (Optional)</h4>
              <p className="text-gray-700 mb-4">
                These cookies are used to deliver relevant advertisements and track campaign effectiveness:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li><strong>Advertising Cookies:</strong> Track your browsing habits to show you relevant ads (if applicable)</li>
                <li><strong>Social Media Cookies:</strong> Enable social media sharing and integration features</li>
                <li><strong>Retargeting Cookies:</strong> Help us show you relevant content based on your previous visits</li>
              </ul>
              <p className="text-gray-700 mb-6">
                <strong>Intended Function:</strong> To provide relevant content and measure advertising effectiveness. 
                <strong>Handling:</strong> These cookies typically expire after 90 days to 1 year. You can opt-out at any time through cookie preferences.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.3 Third-Party Cookies</h3>
              <p className="text-gray-700 mb-4">
                Some cookies are placed by third-party services that appear on our Platform:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li><strong>Google Analytics:</strong> Helps us analyze Platform usage (you can opt-out via Google&apos;s opt-out tool)</li>
                <li><strong>Payment Processors:</strong> May set cookies to process payments securely</li>
                <li><strong>Social Media Platforms:</strong> If you use social media features, these platforms may set cookies</li>
                <li><strong>Video Platforms:</strong> If we embed videos, video platforms may set cookies</li>
              </ul>
              <p className="text-gray-700 mb-6">
                These third parties have their own privacy policies and cookie practices. We encourage you to review their policies.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.4 How to Manage Cookies</h3>
              <p className="text-gray-700 mb-4">
                You have control over cookies. Here&apos;s how to manage them:
              </p>
              
              <h4 className="text-lg font-semibold text-black mt-4 mb-2">Browser Settings</h4>
              <p className="text-gray-700 mb-4">
                Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                <li>View and delete cookies stored on your device</li>
                <li>Block all cookies or only third-party cookies</li>
                <li>Set preferences to be notified before cookies are set</li>
                <li>Delete cookies automatically when you close your browser</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Instructions for common browsers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
              </ul>

              <h4 className="text-lg font-semibold text-black mt-4 mb-2">Cookie Preferences on Our Platform</h4>
              <p className="text-gray-700 mb-6">
                We provide a cookie preferences tool (if implemented) where you can choose which types of cookies to accept. 
                You can access this through a link in our footer or cookie banner. Note that disabling certain cookies may 
                affect Platform functionality and your user experience.
              </p>

              <h4 className="text-lg font-semibold text-black mt-4 mb-2">Opt-Out Tools</h4>
              <p className="text-gray-700 mb-6">
                You can opt-out of certain third-party cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-yellow-600 hover:text-yellow-700 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                <li><strong>Network Advertising Initiative:</strong> <a href="http://www.networkadvertising.org/choices/" className="text-yellow-600 hover:text-yellow-700 underline" target="_blank" rel="noopener noreferrer">NAI Opt-out</a></li>
                <li><strong>Digital Advertising Alliance:</strong> <a href="http://www.aboutads.info/choices/" className="text-yellow-600 hover:text-yellow-700 underline" target="_blank" rel="noopener noreferrer">DAA Opt-out</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-3">5.5 Impact of Disabling Cookies</h3>
              <p className="text-gray-700 mb-6">
                If you choose to disable cookies, some features of our Platform may not function properly:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>You may need to re-enter information repeatedly</li>
                <li>Your preferences may not be saved</li>
                <li>Some features may be unavailable</li>
                <li>Your user experience may be less personalized</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Essential cookies are required for the Platform to function, so disabling all cookies may prevent you from 
                accessing certain features or the Platform entirely.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">6. Your Rights and Choices Regarding Your Data</h2>
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
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, 
                legal requirements, or other factors. When we make changes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                <li>We will update the &quot;Last Updated&quot; date at the top of this policy</li>
                <li>We will post the updated Privacy Policy on this page</li>
                <li>For material changes, we will notify you via email (to the address associated with your account) or through a prominent notice on our Platform</li>
                <li>Your continued use of our Platform after changes become effective constitutes acceptance of the updated policy</li>
              </ul>
              <p className="text-gray-700 mb-6">
                You are advised to review this Privacy Policy periodically to stay informed about how we collect, use, 
                and protect your information. This privacy policy is clearly stated and updated on our website to ensure 
                transparency and compliance.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy, your personal information, 
                or our data practices, please contact us:
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
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> Purahara Aurangabad Bihar, India
                </p>
                <p className="text-gray-700 text-sm mt-3">
                  <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 48 hours during business days.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
                <p className="text-gray-700 font-semibold mb-2">Important Reminder:</p>
                <p className="text-gray-700 text-sm">
                  This Privacy Policy is clearly stated and updated on our website. A missing or incomplete privacy policy 
                  may result in failure of customer payments. By using our Platform, you acknowledge that you have read, 
                  understood, and agree to this Privacy Policy. If you do not agree with any part of this policy, please 
                  do not use our Platform.
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
