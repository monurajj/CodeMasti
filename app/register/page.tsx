"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";
import { postRequest } from "@/lib/api-client";
import { getErrorMessage, getApiErrorMessage } from "@/lib/error-messages";
import ErrorMessage from "@/components/ErrorMessage";
import { BROCHURE_URL } from "@/lib/constants";
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
  const [submittingMode, setSubmittingMode] = useState<"pay" | "pay_later" | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState<{ title: string; message: string; suggestion?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayLaterDialog, setShowPayLaterDialog] = useState(false);
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
      registrationFeeOriginal: "₹2,499",
      registrationFee: "₹625",
      registrationFeePaisa: 62500,
      monthlyFee: "₹1,499",
      timetable: "2 live classes/week (Saturday + Sunday)",
    },
    {
      id: "builders",
      emoji: "🧱",
      name: "BUILDERS",
      classes: "Class 7-8",
      color: "blue",
      description: "Build strong coding foundations",
      registrationFeeOriginal: "₹2,999",
      registrationFee: "₹750",
      registrationFeePaisa: 75000,
      monthlyFee: "₹1,999",
      timetable: "2 live classes/week (Saturday + Sunday)",
    },
    {
      id: "innovators",
      emoji: "🚀",
      name: "INNOVATORS",
      classes: "Class 9-10",
      color: "green",
      description: "Apply skills to real-world problems",
      registrationFeeOriginal: "₹3,499",
      registrationFee: "₹875",
      registrationFeePaisa: 87500,
      monthlyFee: "₹2,499",
      timetable: "2 live classes/week (Saturday + Sunday)",
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
    setSubmittingMode("pay");
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setApiError(null);
    setPendingSubmit(false);

    const selectedBatch = batches.find((b) => b.id === formData.batch);
    if (!selectedBatch) {
      setSubmitStatus("error");
      setApiError({ title: "Error", message: "Please select a batch.", suggestion: undefined });
      setSubmittingMode(null);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/phonepe/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountInPaisa: selectedBatch.registrationFeePaisa,
          redirectPath: "/register/result",
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
          orderIdPrefix: "CODEMASTI",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitStatus("error");
        setApiError({
          title: "Payment initiation failed",
          message: data.error || "Could not start payment. Please try again.",
          suggestion: "Check your connection and try again.",
        });
        setSubmittingMode(null);
        setIsSubmitting(false);
        return;
      }

      if (data.redirectUrl && data.merchantOrderId) {
        try {
          sessionStorage.setItem(
            `pending_register_${data.merchantOrderId}`,
            JSON.stringify(formData)
          );
        } catch (e) {
          console.error("Failed to store form data:", e);
        }
        window.location.href = data.redirectUrl;
        return;
      }

      setSubmitStatus("error");
      setApiError({
        title: "Payment error",
        message: "No redirect URL received. Please try again.",
        suggestion: undefined,
      });
    } catch (e) {
      setSubmitStatus("error");
      setApiError({
        title: "Something went wrong",
        message: e instanceof Error ? e.message : "Could not start payment. Please try again.",
        suggestion: undefined,
      });
    }

    setSubmittingMode(null);
    setIsSubmitting(false);
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
    setPendingSubmit(false);
  };

  const handlePayLaterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const allFields = ["name", "email", "phone", "studentClass", "batch"];
    const newTouched: { [key: string]: boolean } = {};
    allFields.forEach((f) => { newTouched[f] = true; });
    setTouched(newTouched);
    const newErrors: { [key: string]: string } = {};
    allFields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      let error = "";
      switch (field) {
        case "email": error = validateEmail(value); break;
        case "phone": error = validatePhone(value); break;
        case "name": error = validateName(value); break;
        case "studentClass": error = validateStudentClass(value); break;
        case "batch": error = validateBatch(value); break;
      }
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus("error");
      setApiError({
        title: "Validation Error",
        message: "Please fix the errors above and try again.",
        suggestion: "Check all fields and ensure they are filled correctly.",
      });
      return;
    }
    setShowPayLaterDialog(true);
  };

  const handlePayLaterContinue = async () => {
    setShowPayLaterDialog(false);
    setSubmittingMode("pay_later");
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setApiError(null);
    const result = await postRequest("/api/register", { ...formData, paymentStatus: "pay_later" }, { maxRetries: 3, retryDelay: 1000 });
    if (result.success) {
      setSubmitStatus("success");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setFormData({ name: "", email: "", phone: "", studentClass: "", batch: "" });
      setErrors({});
      setTouched({});
      setApiError(null);
    } else {
      setSubmitStatus("error");
      const errorMsg = result.error ? getErrorMessage(result.error, "register") : getApiErrorMessage(result.data || {}, "register");
      setApiError(errorMsg);
    }
    setSubmittingMode(null);
    setIsSubmitting(false);
  };

  const handlePayLaterMakePayment = () => {
    setShowPayLaterDialog(false);
    setShowConfirmation(true);
    setPendingSubmit(true);
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
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 mb-6"
              aria-label="View or download CodeMasti brochure (opens in new tab)"
            >
              📄 Download Brochure
              <span aria-hidden>→</span>
            </a>
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
                      className={`w-full px-4 py-3 text-base md:text-lg rounded-lg border-2 transition-all text-black placeholder:text-gray-500 ${
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
                      className={`w-full px-4 py-3 text-base md:text-lg rounded-lg border-2 transition-all text-black placeholder:text-gray-500 ${
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
                      className={`w-full px-4 py-3 text-base md:text-lg rounded-lg border-2 transition-all text-black placeholder:text-gray-500 ${
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
                      <p className="text-xs md:text-sm text-gray-500 mb-3">{batch.description}</p>
                      {formData.batch === batch.id && (
                        <div className="mt-3 space-y-2">
                          <div className="text-yellow-600 font-semibold text-sm md:text-base mb-3">✓ Selected</div>
                          <div className={`p-3 rounded-lg border-2 ${
                            batch.color === "orange" ? "bg-orange-50 border-orange-200" :
                            batch.color === "blue" ? "bg-blue-50 border-blue-200" :
                            "bg-green-50 border-green-200"
                          }`}>
                            <div className="text-xs font-semibold text-gray-700 mb-2">Fee Structure:</div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between items-center gap-2">
                                <span className="text-gray-600">Registration:</span>
                                <span className="flex items-center gap-1.5 flex-wrap justify-end">
                                  <span className="line-through text-gray-500">{batch.registrationFeeOriginal}</span>
                                  <span className={`font-bold ${
                                    batch.color === "orange" ? "text-orange-600" :
                                    batch.color === "blue" ? "text-blue-600" :
                                    "text-green-600"
                                  }`}>
                                    {batch.registrationFee}
                                  </span>
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Monthly:</span>
                                <span className={`font-bold ${
                                  batch.color === "orange" ? "text-orange-600" :
                                  batch.color === "blue" ? "text-blue-600" :
                                  "text-green-600"
                                }`}>
                                  {batch.monthlyFee}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1.5 italic">1 month fee included in registration</p>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <div className="text-xs text-gray-600">{batch.timetable}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {touched.batch && errors.batch && (
                  <p className="text-red-600 text-sm md:text-base mt-2" role="alert">{errors.batch}</p>
                )}
              </div>

              <div className="flex flex-col items-center gap-4">
                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.batch || pendingSubmit}
                    aria-label={isSubmitting ? "Redirecting to payment" : "Pay and book your seat"}
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
                        <span>{submittingMode === "pay_later" ? "Submitting…" : "Redirecting to payment…"}</span>
                      </>
                    ) : (
                      "Pay & Book Your Seat"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handlePayLaterClick}
                    disabled={isSubmitting || !formData.batch || pendingSubmit}
                    aria-label="Pay later"
                    className="w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Pay Later
                  </button>
                </div>

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
                <Link href="/privacy" className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Privacy Policy">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/refund" className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Refund Policy">
                  Refund Policy
                </Link>
              </div>
            </div>
            {/* Social Media Links - Center */}
            <div className="flex items-center justify-center gap-6">
            <Link
              href="https://www.instagram.com/codemasti_official?igsh=MnZhZXl6aGlremhn&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link
              href="https://facebook.com/share/1E1KUc7LJg/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
            <Link
              href="https://youtube.com/@codemasti-l1o?si=kGvdIaCdmnsA6kCB"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label="Subscribe to our YouTube channel"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
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
        title="Pay & Book Your Slot"
        message={
          formData.batch
            ? `You will be redirected to PhonePe to pay ${batches.find((b) => b.id === formData.batch)?.registrationFee ?? "the registration fee"}. Your slot will be confirmed after successful payment.`
            : "You will be redirected to PhonePe to complete payment. Your slot will be confirmed after successful payment."
        }
        confirmText="Proceed to Pay"
        cancelText="Cancel"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />

      <ConfirmationDialog
        isOpen={showPayLaterDialog}
        title="Pay Later?"
        message="There is a high chance you could miss the scholarship and the current discounted rate. Paying now secures your seat at the offer price. You can still continue with Pay Later if you prefer."
        confirmText="Continue with Pay Later"
        cancelText="Make Payment"
        onConfirm={handlePayLaterContinue}
        onCancel={handlePayLaterMakePayment}
      />

    </div>
  );
}
