"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";
import { postRequest } from "@/lib/api-client";
import { getErrorMessage, getApiErrorMessage } from "@/lib/error-messages";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentClass: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState<{ title: string; message: string; suggestion?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const STORAGE_KEY = "codemasti_contact_form_data";

  // Load form data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
        }
      } catch (error) {
        console.error("Error loading form data from localStorage:", error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch (error) {
        console.error("Error saving form data to localStorage:", error);
      }
    }
  }, [formData, mounted]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show confirmation dialog
    setShowConfirmation(true);
    setPendingSubmit(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setApiError(null);
    setPendingSubmit(false);

    // Make API request with retry logic
    const result = await postRequest('/api/contact', formData, {
      maxRetries: 3,
      retryDelay: 1000,
    });

    if (result.success) {
      setSubmitStatus("success");
      // Clear localStorage on successful submission
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
          console.error("Error clearing localStorage:", error);
        }
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        studentClass: "",
        message: "",
      });
      setApiError(null);
    } else {
      setSubmitStatus("error");
      // Get user-friendly error message
      const errorMsg = result.error
        ? getErrorMessage(result.error, "contact")
        : getApiErrorMessage(result.data || {}, "contact");
      setApiError(errorMsg);
    }
    
    setIsSubmitting(false);
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
    setPendingSubmit(false);
  };

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
            <Link href="/contact" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Contact CodeMasti">
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
              className="block py-3.5 px-4 text-base text-yellow-400 font-semibold hover:text-yellow-300 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
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
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header Section */}
          <div 
            id="header"
            data-animate
            className={`text-center transition-all duration-1000 ${mounted && isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black mb-4">
              Get in <span className="text-yellow-500">Touch</span>
            </h1>
            <p className="text-base md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
              Have questions? Want to join the waitlist? We&apos;d love to hear from you!
            </p>
            <div className="w-32 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div 
              id="info"
              data-animate
              className={`space-y-8 transition-all duration-1000 delay-200 ${mounted && isVisible.info ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-yellow-300">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📧</div>
                    <div>
                      <h3 className="font-bold text-black mb-1">Email</h3>
                      <p className="text-gray-700">info.codemasti@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📱</div>
                    <div>
                      <h3 className="font-bold text-black mb-1">Phone</h3>
                      <div className="space-y-2">
                        <div>
                          <a href="tel:+918228907407" className="text-gray-700 hover:text-yellow-500 transition-colors block">
                            +91 8228907407
                          </a>
                        </div>
                        <div>
                          <a href="tel:+919523042613" className="text-gray-700 hover:text-yellow-500 transition-colors block">
                            +91 9523042613
                          </a>
                        </div>
                        <div>
                          <a href="tel:+917541062514" className="text-gray-700 hover:text-yellow-500 transition-colors block">
                            +91 7541062514
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-3xl">📍</div>
                    <div>
                      <h3 className="font-bold text-black mb-1">Location</h3>
                      <p className="text-gray-700">India</p>
                      <p className="text-sm text-gray-600 mt-1">Serving Tier-1, Tier-2, and Tier-3 cities</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white rounded-2xl p-8 shadow-lg border-2 border-yellow-400">
                <h2 className="text-2xl font-bold mb-4">
                  Why Contact Us?
                </h2>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Join our waitlist for early access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Learn about our programs and curriculum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Get pricing and enrollment information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Partner with us for school programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">✓</span>
                    <span>Ask questions about coding education</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-black mb-3">
                  Follow Our Journey
                </h3>
                <p className="text-black mb-4">
                  Stay updated with our latest news and launch updates
                </p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/codemasti_official/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/30 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2" 
                    aria-label="Follow us on Instagram"
                  >
                    <span className="text-2xl" aria-hidden="true">📷</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div 
              id="form"
              data-animate
              className={`transition-all duration-1000 delay-300 ${mounted && isVisible.form ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                      Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      aria-label="Enter your full name"
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                      Email <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-label="Enter your email address for us to respond to your inquiry"
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-label="Enter your phone number with country code (optional)"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                      placeholder="+91 1234567890"
                    />
                  </div>

                  <div>
                    <label htmlFor="studentClass" className="block text-sm font-semibold text-black mb-2">
                      Student&apos;s Class (if applicable)
                    </label>
                    <select
                      id="studentClass"
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleInputChange}
                      aria-label="Select student's class if you are a student, parent, or school representative"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                    >
                      <option value="">Select Class</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="parent">Parent/Guardian</option>
                      <option value="school">School Representative</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                      Message <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      aria-label="Enter your message or inquiry about CodeMasti"
                      aria-required="true"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <SuccessMessage
                      title="Thank you! Your message has been sent."
                      message="We'll get back to you soon."
                      onDismiss={() => {
                        setSubmitStatus("idle");
                      }}
                      autoDismiss={false}
                    />
                  )}

                  {submitStatus === "error" && apiError && (
                    <ErrorMessage
                      title={apiError.title}
                      message={apiError.message}
                      suggestion={apiError.suggestion}
                      onDismiss={() => {
                        setSubmitStatus("idle");
                        setApiError(null);
                      }}
                    />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || pendingSubmit}
                    aria-label={isSubmitting ? "Sending your message" : "Submit contact form"}
                    aria-disabled={isSubmitting || pendingSubmit}
                    className="w-full px-8 py-4 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span>🚀</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section 
            id="additional"
            data-animate
            className={`transition-all duration-1000 delay-400 ${mounted && isVisible.additional ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-black mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-black mb-2">When will CodeMasti launch?</h3>
                  <p className="text-gray-700 text-sm">We&apos;re currently in development and will launch soon. Join our waitlist to be notified!</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">What age groups do you serve?</h3>
                  <p className="text-gray-700 text-sm">We offer programs for students from Class 5 to Class 10 (ages 10-16).</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">How much will it cost?</h3>
                  <p className="text-gray-700 text-sm">We&apos;re committed to cost-efficient pricing for Indian families. Details will be announced at launch.</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Do you offer school partnerships?</h3>
                  <p className="text-gray-700 text-sm">Yes! Contact us to discuss partnership opportunities for your school.</p>
                </div>
              </div>
            </div>
          </section>
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

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        title="Confirm Message Submission"
        message="Are you sure you want to send this message? Please review your information before confirming."
        confirmText="Yes, Send"
        cancelText="Cancel"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />

    </div>
  );
}
