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

export default function Register() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentClass: "",
    batch: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState<{ title: string; message: string; suggestion?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const STORAGE_KEY = "codemasti_register_form_data";

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone) {
      return "Phone number is required";
    }
    // Remove spaces, dashes, and plus signs for validation
    const cleanedPhone = phone.replace(/[\s\-+]/g, "");
    // Indian phone number: 10 digits, starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      return "Please enter a valid 10-digit Indian phone number (starting with 6-9)";
    }
    return "";
  };

  const validateName = (name: string): string => {
    if (!name) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    return "";
  };

  const validateStudentClass = (studentClass: string): string => {
    if (!studentClass) {
      return "Student class is required";
    }
    return "";
  };

  const validateBatch = (batch: string): string => {
    if (!batch) {
      return "Please select a batch";
    }
    return "";
  };

  // Real-time validation on field change
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "name":
        error = validateName(value);
        break;
      case "studentClass":
        error = validateStudentClass(value);
        break;
      case "batch":
        error = validateBatch(value);
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const batches = [
    {
      id: "spark",
      emoji: "✨",
      name: "SPARK",
      classes: "Class 5-6",
      color: "orange",
      description: "Ignite curiosity & remove fear of coding",
    },
    {
      id: "builders",
      emoji: "🧱",
      name: "BUILDERS",
      classes: "Class 7-8",
      color: "blue",
      description: "Build strong coding foundations",
    },
    {
      id: "innovators",
      emoji: "🚀",
      name: "INNOVATORS",
      classes: "Class 9-10",
      color: "green",
      description: "Apply skills to real-world problems",
    },
  ];

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
    
    // Check for batch parameter in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const batchParam = urlParams.get('batch');
      if (batchParam && ['spark', 'builders', 'innovators'].includes(batchParam)) {
        setFormData((prev) => ({
          ...prev,
          batch: batchParam,
        }));
      }
    }
    
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format phone number: only allow digits, max 10 digits
    let processedValue = value;
    if (name === "phone") {
      // Remove all non-digit characters
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    
    // Real-time validation if field has been touched
    if (touched[name]) {
      validateField(name, processedValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  const handleBatchSelect = (batchId: string) => {
    setFormData((prev) => ({
      ...prev,
      batch: batchId,
    }));
    // Validate batch selection
    setTouched((prev) => ({
      ...prev,
      batch: true,
    }));
    validateField("batch", batchId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = ["name", "email", "phone", "studentClass", "batch"];
    const newTouched: { [key: string]: boolean } = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    allFields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      let error = "";
      switch (field) {
        case "email":
          error = validateEmail(value);
          break;
        case "phone":
          error = validatePhone(value);
          break;
        case "name":
          error = validateName(value);
          break;
        case "studentClass":
          error = validateStudentClass(value);
          break;
        case "batch":
          error = validateBatch(value);
          break;
      }
      if (error) {
        newErrors[field] = error;
      }
    });

    // Set errors
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus("error");
      setApiError({
        title: "Validation Error",
        message: "Please fix the errors above and try again.",
        suggestion: "Check all fields and ensure they are filled correctly.",
      });
      return;
    }

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
    const result = await postRequest('/api/register', formData, {
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
        batch: "",
      });
      setErrors({});
      setTouched({});
      setApiError(null);
    } else {
      setSubmitStatus("error");
      // Get user-friendly error message
      const errorMsg = result.error
        ? getErrorMessage(result.error, "register")
        : getApiErrorMessage(result.data || {}, "register");
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
      <nav className="bg-black text-white py-4 px-6 md:px-12 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 whitespace-nowrap" aria-label="CodeMasti home page">
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
            <Link href="/register" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Register for CodeMasti programs">
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
              className="block py-3.5 px-4 text-base text-yellow-400 font-semibold hover:text-yellow-300 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
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
            className={`text-center transition-all duration-1000 mb-12 ${mounted && isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black mb-4">
              Register for <span className="text-yellow-500">CodeMasti</span>
            </h1>
            <p className="text-base md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
              Join our coding journey and transform how you learn programming. Select your batch and get started today!
            </p>
            <div className="w-32 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Registration Form */}
          <div 
            id="form"
            data-animate
            className={`transition-all duration-1000 delay-200 ${mounted && isVisible.form ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-yellow-300">
              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-black mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      aria-label="Enter your full name as it appears on official documents"
                      aria-required="true"
                      aria-invalid={touched.name && errors.name ? "true" : "false"}
                      aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-3 text-base md:text-lg rounded-lg border-2 transition-all ${
                        touched.name && errors.name
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="Enter your full name"
                    />
                    {touched.name && errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      aria-label="Enter your email address for registration confirmation and updates"
                      aria-required="true"
                      aria-invalid={touched.email && errors.email ? "true" : "false"}
                      aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-3 text-base md:text-lg rounded-lg border-2 transition-all ${
                        touched.email && errors.email
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="Enter your email"
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      maxLength={10}
                      aria-label="Enter your 10-digit Indian phone number (starting with 6-9)"
                      aria-required="true"
                      aria-invalid={touched.phone && errors.phone ? "true" : "false"}
                      aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
                      className={`w-full px-4 py-3 text-base md:text-lg rounded-lg border-2 transition-all ${
                        touched.phone && errors.phone
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                      } focus:outline-none focus:ring-2`}
                      placeholder="10-digit number (e.g., 8228907407)"
                    />
                    {touched.phone && errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="studentClass" className="block text-sm font-semibold text-gray-700 mb-2">
                      Student Class <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <select
                      id="studentClass"
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      aria-label="Select your current class level (Class 5 to Class 10)"
                      aria-required="true"
                      aria-invalid={touched.studentClass && errors.studentClass ? "true" : "false"}
                      aria-describedby={touched.studentClass && errors.studentClass ? "studentClass-error" : undefined}
                      className={`w-full px-4 py-3 text-base md:text-lg rounded-lg border-2 transition-all text-black ${
                        touched.studentClass && errors.studentClass
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
                      } focus:outline-none focus:ring-2`}
                      style={{ color: formData.studentClass ? '#000000' : '#9ca3af' }}
                    >
                      <option value="" className="text-gray-400">Select your class</option>
                      <option value="5" className="text-black">Class 5</option>
                      <option value="6" className="text-black">Class 6</option>
                      <option value="7" className="text-black">Class 7</option>
                      <option value="8" className="text-black">Class 8</option>
                      <option value="9" className="text-black">Class 9</option>
                      <option value="10" className="text-black">Class 10</option>
                    </select>
                    {touched.studentClass && errors.studentClass && (
                      <p id="studentClass-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.studentClass}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Batch Selection */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-black mb-6">Select Your Batch <span className="text-red-500">*</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {batches.map((batch) => (
                    <button
                      key={batch.id}
                      type="button"
                      onClick={() => handleBatchSelect(batch.id)}
                      aria-label={`Select ${batch.name} batch for ${batch.classes}`}
                      aria-pressed={formData.batch === batch.id}
                      className={`p-5 md:p-6 rounded-xl border-2 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                        formData.batch === batch.id
                          ? batch.color === "orange"
                            ? "border-orange-500 bg-orange-50 shadow-lg scale-105"
                            : batch.color === "blue"
                            ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                            : "border-green-500 bg-green-50 shadow-lg scale-105"
                          : "border-gray-300 bg-white hover:border-yellow-400 hover:shadow-md"
                      }`}
                    >
                      <div className="text-3xl md:text-4xl mb-2">{batch.emoji}</div>
                      <h3 className={`text-lg md:text-xl font-bold mb-1 ${
                        batch.color === "orange" ? "text-orange-600" :
                        batch.color === "blue" ? "text-blue-600" :
                        "text-green-600"
                      }`}>
                        {batch.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-2">{batch.classes}</p>
                      <p className="text-xs md:text-sm text-gray-500">{batch.description}</p>
                      {formData.batch === batch.id && (
                        <div className="mt-3 text-yellow-600 font-semibold text-sm md:text-base">✓ Selected</div>
                      )}
                    </button>
                  ))}
                </div>
                {touched.batch && errors.batch && (
                  <p className="text-red-600 text-sm md:text-base mt-2" role="alert">{errors.batch}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.batch || pendingSubmit}
                  aria-label={isSubmitting ? "Submitting registration form" : "Submit registration form"}
                  aria-disabled={isSubmitting || !formData.batch || pendingSubmit}
                  className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 flex items-center justify-center gap-2 ${
                    isSubmitting || !formData.batch || pendingSubmit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-400 text-black hover:bg-yellow-500 hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Register Now"
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <SuccessMessage
                    title="Registration Successful!"
                    message="Check your email for confirmation and next steps."
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
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div 
            id="info"
            data-animate
            className={`mt-12 transition-all duration-1000 delay-400 ${mounted && isVisible.info ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg text-center">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4">What Happens Next?</h3>
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
                <div className="bg-white/90 rounded-xl p-5 md:p-6">
                  <div className="text-3xl md:text-4xl mb-3">📧</div>
                  <h4 className="font-bold text-black mb-2 text-base md:text-lg">Confirmation Email</h4>
                  <p className="text-gray-700 text-sm md:text-base">You&apos;ll receive a detailed email with all the information about your selected batch</p>
                </div>
                <div className="bg-white/90 rounded-xl p-5 md:p-6">
                  <div className="text-3xl md:text-4xl mb-3">📅</div>
                  <h4 className="font-bold text-black mb-2 text-base md:text-lg">Next Steps</h4>
                  <p className="text-gray-700 text-sm md:text-base">We&apos;ll guide you through the onboarding process and course details</p>
                </div>
                <div className="bg-white/90 rounded-xl p-5 md:p-6">
                  <div className="text-3xl md:text-4xl mb-3">🚀</div>
                  <h4 className="font-bold text-black mb-2 text-base md:text-lg">Get Started</h4>
                  <p className="text-gray-700 text-sm md:text-base">Start your coding journey with CodeMasti and transform your skills</p>
                </div>
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
              <Link href="/register" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Register for CodeMasti programs">
                Register
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Contact CodeMasti">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        title="Confirm Registration"
        message="Are you sure you want to submit your registration? Please review your information before confirming."
        confirmText="Yes, Submit"
        cancelText="Cancel"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />

    </div>
  );
}
