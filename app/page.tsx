"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";
import ImageSkeleton from "@/components/ImageSkeleton";
import { postRequest } from "@/lib/api-client";
import { getErrorMessage, getApiErrorMessage } from "@/lib/error-messages";
import ErrorMessage from "@/components/ErrorMessage";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState<{ title: string; message: string; suggestion?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Launch date: May 2, 2026
  const launchDate = new Date('2026-05-02T00:00:00').getTime();

  useEffect(() => {
    setMounted(true);
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

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
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const taglines = [
    "Think. Solve. Create.",
    "Don't just play the game. Build it.",
    "From Screen-Time to Code-Time.",
    "Stop Scrolling. Start Creating.",
    "Become the Boss of your Computer.",
    "Your Ideas, Your Code, Your World.",
    "Code. Create. Masti.",
    "Coding seekhega India, tabhi toh badhega India.",
  ];

  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden overflow-y-auto" ref={containerRef}>
      {/* Animated Background Particles */}
      <Particles count={20} />

      {/* Animated Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      />

      {/* Black Navigation/Header Bar - Structural Element (10%) */}
      <nav className="bg-black text-white py-4 px-6 md:px-12 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95 animate-slide-down overflow-visible" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 animate-bounce-in whitespace-nowrap overflow-visible" aria-label="CodeMasti home page">
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
            <Link 
              href="/about"
              className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label="Learn more about CodeMasti"
            >
              About
            </Link>
            <Link 
              href="/programs"
              className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label="View our coding programs"
            >
              Programs
            </Link>
            <Link 
              href="/register"
              className="text-yellow-400 font-semibold hover:text-yellow-300 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label="Register for CodeMasti programs"
            >
              Register
            </Link>
            <Link 
              href="/contact"
              className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label="Contact CodeMasti"
            >
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

      {/* Animated Yellow Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-expand-width"></div>

      <main id="main-content" className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-16 bg-white" role="main">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Logo/Brand Name - Black for Authority */}
          <div 
            id="logo"
            data-animate
            className={`transition-all duration-1000 ${mounted && isVisible.logo ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95"}`}
          >
            <div className="flex flex-col items-center mb-4">
              <Image 
                src="/logotext.png" 
                alt="CodeMasti - Think. Solve. Create." 
                width={400} 
                height={200} 
                className="w-auto h-32 md:h-48 object-contain animate-fade-in-up"
                priority
              />
            </div>
            <div className="w-32 h-1.5 bg-yellow-400 mx-auto rounded-full animate-expand-width"></div>
          </div>

          {/* Launching Soon Badge - Yellow CTA */}
          <div 
            id="badge"
            data-animate
            className={`transition-all duration-1000 delay-200 ${mounted && isVisible.badge ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
          >
            <div className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-500 animate-bounce-gentle hover:scale-110 transition-transform duration-300 cursor-pointer overflow-visible">
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-black animate-pulse"></span>
              </span>
              <span className="text-lg font-bold text-black animate-text-glow whitespace-nowrap">
                Launching Soon
              </span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div 
            id="countdown"
            data-animate
            className={`transition-all duration-1000 delay-300 ${mounted && isVisible.countdown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mt-8">
              <p className="text-lg md:text-xl text-gray-700 font-semibold mb-4 text-center">
                Launching on <span className="text-yellow-600 font-bold">May 2, 2026</span>
              </p>
              <div className="flex items-center justify-center gap-3 md:gap-4">
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 md:p-6 w-20 md:w-24 shadow-lg border-2 border-yellow-600 flex items-center justify-center">
                    <div className="text-3xl md:text-4xl font-bold text-black font-mono tabular-nums text-center">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">Days</p>
                </div>

                <span className="text-2xl md:text-3xl font-bold text-yellow-500 animate-pulse-slow">:</span>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 md:p-6 w-20 md:w-24 shadow-lg border-2 border-yellow-600 flex items-center justify-center">
                    <div className="text-3xl md:text-4xl font-bold text-black font-mono tabular-nums text-center">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">Hours</p>
                </div>

                <span className="text-2xl md:text-3xl font-bold text-yellow-500 animate-pulse-slow">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 md:p-6 w-20 md:w-24 shadow-lg border-2 border-yellow-600 flex items-center justify-center">
                    <div className="text-3xl md:text-4xl font-bold text-black font-mono tabular-nums text-center">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">Minutes</p>
                </div>

                <span className="text-2xl md:text-3xl font-bold text-yellow-500 animate-pulse-slow">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-4 md:p-6 w-20 md:w-24 shadow-lg border-2 border-yellow-600 flex items-center justify-center animate-pulse-slow">
                    <div className="text-3xl md:text-4xl font-bold text-black font-mono tabular-nums text-center">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 font-semibold mt-2 uppercase tracking-wide">Seconds</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6 text-center font-medium">
                Get ready to <span className="text-yellow-600 font-bold">Code. Create. Masti!</span> 🚀
              </p>
            </div>
          </div>

          {/* Tagline Rotator - Black Text for Readability */}
          <div 
            id="tagline"
            data-animate
            className={`transition-all duration-1000 delay-300 ${mounted && isVisible.tagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="h-20 flex items-center justify-center px-4">
              <p className="text-xl md:text-2xl lg:text-4xl font-bold text-black transition-all duration-500 animate-fade-in leading-relaxed">
                {taglines[currentTagline].split(' ').map((word, i, arr) => {
                  const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '');
                  const isLast = i === arr.length - 1;
                  const punctuationMatch = word.match(/[.,!?]/);
                  if (cleanWord.includes('masti') || cleanWord.includes('code') || cleanWord.includes('coding')) {
                    return (
                      <React.Fragment key={i}>
                        <span className="inline animate-bounce-word">
                          <span className="text-yellow-500 animate-pulse-slow">{word.replace(/[.,!?]/g, '')}</span>
                          {punctuationMatch && punctuationMatch[0]}
                        </span>
                        {!isLast && ' '}
                      </React.Fragment>
                    );
                  }
                  return (
                    <React.Fragment key={i}>
                      <span className="inline animate-fade-in-word" style={{ animationDelay: `${i * 0.05}s` }}>
                        {word}
                      </span>
                      {!isLast && ' '}
                    </React.Fragment>
                  );
                })}
              </p>
            </div>
          </div>

          {/* Mission Statement - White Background (60%) */}
          <div 
            id="mission"
            data-animate
            className={`transition-all duration-1000 delay-400 ${mounted && isVisible.mission ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-yellow-300 transition-all duration-500 animate-card-float">
              <p className="text-base md:text-xl lg:text-2xl text-black font-medium leading-relaxed animate-fade-in-up">
                We are building a <span className="font-bold text-yellow-600 animate-pulse-slow">cost-efficient, future-ready</span> coding education platform for school students from Class 5 to Class 10.
              </p>
              <p className="text-sm md:text-lg lg:text-xl text-gray-700 mt-4 italic animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Every student should learn how to think like a creator, not just consume technology.
              </p>
            </div>
          </div>

          {/* Learning Paths Preview - White Background Cards */}
          <div 
            id="paths"
            data-animate
            className={`transition-all duration-1000 delay-500 ${mounted && isVisible.paths ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12">
              {/* SPARK - Orange Theme (Energy, Optimism) */}
              <div 
                className="bg-white rounded-xl p-5 md:p-6 border-2 border-orange-400 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden group animate-card-float"
                style={{ animationDelay: '0s' }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-full -mr-8 -mt-8 opacity-50 animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-3xl md:text-4xl mb-3 relative z-10 animate-bounce-gentle">✨</div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-2 relative z-10">
                  <span className="text-orange-500 animate-pulse-slow">SPARK</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-semibold relative z-10">Class 5-6</p>
                <p className="text-sm md:text-base text-black mt-2 relative z-10">Ignite curiosity & remove fear of coding</p>
                <Link href="/programs" className="mt-4 inline-block px-4 py-2 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 hover:scale-110 transition-all duration-300 text-sm md:text-base relative z-10 animate-button-pulse focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" aria-label="Learn more about SPARK program for Class 5-6">
                  Learn More
                </Link>
              </div>

              {/* BUILDERS - Blue Theme */}
              <div 
                className="bg-white rounded-xl p-5 md:p-6 border-2 border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden group animate-card-float"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-3xl md:text-4xl mb-3 animate-bounce-gentle" style={{ animationDelay: '0.1s' }}>🧱</div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                  <span className="text-blue-500">BUILDERS</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-semibold">Class 7-8</p>
                <p className="text-sm md:text-base text-black mt-2">Build strong coding foundations</p>
                <Link href="/programs" className="mt-4 inline-block px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 hover:scale-110 transition-all duration-300 text-sm md:text-base animate-button-pulse focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-label="Learn more about BUILDERS program for Class 7-8">
                  Learn More
                </Link>
              </div>

              {/* INNOVATORS - Green Theme */}
              <div 
                className="bg-white rounded-xl p-5 md:p-6 border-2 border-green-400 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative overflow-hidden group animate-card-float"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -mr-10 -mt-10 opacity-50 animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-3xl md:text-4xl mb-3 relative z-10 animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🚀</div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-2 relative z-10">
                  <span className="text-green-500 animate-pulse-slow">INNOVATORS</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-semibold relative z-10">Class 9-10</p>
                <p className="text-sm md:text-base text-black mt-2 relative z-10">Apply skills to real-world problems</p>
                
                <Link href="/programs" className="mt-4 inline-block px-4 py-2 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-500 hover:scale-110 transition-all duration-300 text-sm md:text-base relative z-10 animate-button-pulse focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" aria-label="Learn more about INNOVATORS program for Class 9-10">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Founders - Enhanced Design */}
          <div 
            id="founders"
            data-animate
            className={`transition-all duration-1000 delay-600 ${mounted && isVisible.founders ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-50 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-500">
                {/* Section Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
                    <span className="text-yellow-600">Founded by</span>
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"></div>
                </div>

                {/* Founders Photo and Info */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Founders Photo */}
                  <div className="flex-shrink-0">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden border-4 border-yellow-400 shadow-xl ring-4 ring-yellow-100">
                      <Image
                        src="/founderimage.png"
                        alt="Aditya Raj and Monu Raj - Founders of CodeMasti"
                        width={384}
                        height={384}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        onError={(e) => {
                          // Fallback if image doesn't exist yet
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `
                              <div class="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                                <div class="text-white text-6xl font-bold">AR + MR</div>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Founders Names and Titles */}
                  <div className="flex-1 text-center md:text-left space-y-6">
                    <div className="space-y-4">
                      <div className="group">
                        <h4 className="text-2xl md:text-3xl font-bold text-black mb-1 group-hover:text-yellow-600 transition-colors duration-300">
                          Aditya Raj
                        </h4>
                        <p className="text-lg font-semibold text-yellow-600">Founder</p>
                        <p className="text-gray-600 text-sm mt-2">Visionary leader transforming coding education</p>
                      </div>
                      
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-16"></div>
                        <span className="text-yellow-500 text-xl">+</span>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-16"></div>
                      </div>

                      <div className="group">
                        <h4 className="text-2xl md:text-3xl font-bold text-black mb-1 group-hover:text-yellow-600 transition-colors duration-300">
                          Monu Raj
                        </h4>
                        <p className="text-lg font-semibold text-yellow-600">Co-Founder</p>
                        <p className="text-gray-600 text-sm mt-2">Tech enthusiast making coding accessible</p>
                      </div>
                    </div>

                    {/* Mission Statement */}
                    <div className="pt-4 border-t border-yellow-200">
                      <p className="text-gray-700 italic text-sm md:text-base">
                        &quot;Building India&apos;s most trusted, affordable, and impact-driven coding education platform&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Yellow CTA Button (30%) */}
          <div 
            id="cta"
            data-animate
            className={`transition-all duration-1000 delay-700 ${mounted && isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mt-12">
              <p className="text-lg text-black font-medium mb-6 animate-fade-in-up">
                Be the first to know when we launch!
              </p>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email || isSubmittingEmail) return;
                  
                  setIsSubmittingEmail(true);
                  setEmailStatus("idle");
                  setEmailError(null);

                  // Make API request with retry logic
                  const result = await postRequest('/api/newsletter', { email }, {
                    maxRetries: 3,
                    retryDelay: 1000,
                  });

                  if (result.success) {
                    setEmailStatus("success");
                    setEmail("");
                    setEmailError(null);
                    setTimeout(() => {
                      setEmailStatus("idle");
                    }, 5000);
                  } else {
                    setEmailStatus("error");
                    // Get user-friendly error message
                    const errorMsg = result.error
                      ? getErrorMessage(result.error, "newsletter")
                      : getApiErrorMessage(result.data || {}, "newsletter");
                    setEmailError(errorMsg);
                    setTimeout(() => {
                      setEmailStatus("idle");
                      setEmailError(null);
                    }, 8000); // Show error longer for better visibility
                  }
                  
                  setIsSubmittingEmail(false);
                }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter subscription</label>
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmittingEmail}
                  aria-label="Enter your email address to join the waitlist"
                  aria-required="true"
                  className="px-6 py-3 rounded-full border-2 border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full sm:w-auto min-w-[280px] transition-all hover:border-yellow-400 animate-input-glow disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit"
                  disabled={isSubmittingEmail}
                  aria-label={isSubmittingEmail ? "Submitting your email address" : "Subscribe to newsletter and join waitlist"}
                  className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 relative overflow-hidden group animate-button-pulse disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-0 bg-yellow-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-50"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmittingEmail ? "Adding..." : "Notify Me"}
                    <span className="text-sm animate-bounce-gentle">🚀</span>
                  </span>
                </button>
              </form>
              {emailStatus === "success" && (
                <p className="text-sm text-green-600 mt-2 text-center font-medium" role="alert">
                  ✓ Successfully added to waitlist!
                </p>
              )}
              {emailStatus === "error" && emailError && (
                <div className="mt-2">
                  <ErrorMessage
                    title={emailError.title}
                    message={emailError.message}
                    suggestion={emailError.suggestion}
                    onDismiss={() => {
                      setEmailStatus("idle");
                      setEmailError(null);
                    }}
                    className="text-sm"
                  />
                </div>
              )}
              <p className="text-sm text-gray-600 mt-4 font-medium flex items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="text-yellow-500 animate-pulse-slow">✨</span> Join the waitlist and get early access!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Black Footer - Structural Element (10%) */}
      <footer className="bg-black text-white py-8 px-6 md:px-12 mt-16 animate-fade-in-up">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 animate-fade-in">
                © 2024 CodeMasti. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link 
                href="/about"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="Learn more about CodeMasti"
              >
                About
              </Link>
              <Link 
                href="/programs"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="View our coding programs"
              >
                Programs
              </Link>
              <Link 
                href="/register"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="Register for CodeMasti programs"
              >
                Register
              </Link>
              <Link 
                href="/contact"
                className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="Contact CodeMasti"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes expand-width {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-word {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-word {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.6);
          }
        }
        @keyframes card-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes button-pulse {
          0%, 100% {
            box-shadow: 0 4px 6px rgba(251, 191, 36, 0.3);
          }
          50% {
            box-shadow: 0 8px 15px rgba(251, 191, 36, 0.6);
          }
        }
        @keyframes input-glow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(251, 191, 36, 0);
          }
          50% {
            box-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        .animate-expand-width {
          animation: expand-width 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-word {
          animation: fade-in-word 0.5s ease-out forwards;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-bounce-word {
          animation: bounce-word 1s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-text-shimmer {
          background: linear-gradient(90deg, #000 0%, #FCD34D 50%, #000 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 3s linear infinite;
        }
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        .animate-card-float {
          animation: card-float 3s ease-in-out infinite;
        }
        .animate-button-pulse {
          animation: button-pulse 2s ease-in-out infinite;
        }
        .animate-input-glow {
          animation: input-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
