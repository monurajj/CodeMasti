"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";
import ImageSkeleton from "@/components/ImageSkeleton";
import { postRequest } from "@/lib/api-client";
import { getErrorMessage, getApiErrorMessage } from "@/lib/error-messages";
import ErrorMessage from "@/components/ErrorMessage";
import { BROCHURE_URL } from "@/lib/constants";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");
  const [emailError, setEmailError] = useState<{ title: string; message: string; suggestion?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [timeLeftPlatform, setTimeLeftPlatform] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [registrationStarted, setRegistrationStarted] = useState(false);
  const [heroPreview, setHeroPreview] = useState<"actual" | "pre-launch" | "registration-open">("actual");
  const [launchSequence, setLaunchSequence] = useState<null | "3" | "2" | "1" | "party" | "done">(null);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const heroSlides = [
    { src: "/hero-75-off-scholarship.png", alt: "Enjoy an exclusive 75% off on the registration fee - CodeMasti Early Bird Scholarship. Think. Solve. Create." },
    { src: "/hero-slide-2.png", alt: "CodeMasti - 75% Early Bird Scholarship. Think. Solve. Create." },
    { src: "/codemastiheropage.png", alt: "CodeMasti - Think. Solve. Create. Coding for Class 5 to 10." },
  ];

  // Midnight IST (5 Feb 2026) — same moment for all users globally
  const platformLaunchDate = new Date("2026-02-05T00:00:00+05:30").getTime();
  const showRegistrationOpenHero = heroPreview === "actual" ? registrationStarted : heroPreview === "registration-open";
  const prevDiffPositiveRef = useRef(true);

  const totalSecondsRemaining =
    timeLeftPlatform.days * 86400 +
    timeLeftPlatform.hours * 3600 +
    timeLeftPlatform.minutes * 60 +
    timeLeftPlatform.seconds;
  const isFinal10Seconds = totalSecondsRemaining <= 10 && totalSecondsRemaining > 0 && !launchSequence;

  useEffect(() => {
    if (Date.now() >= platformLaunchDate) prevDiffPositiveRef.current = false;
    const tick = () => {
      const now = Date.now();
      const diff = platformLaunchDate - now;
      if (diff > 0) {
        prevDiffPositiveRef.current = true;
        setTimeLeftPlatform({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeftPlatform({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (prevDiffPositiveRef.current && launchSequence === null) {
          prevDiffPositiveRef.current = false;
          setLaunchSequence("3");
        }
      }
    };
    tick();
    if (Date.now() >= platformLaunchDate) setRegistrationStarted(true);
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [platformLaunchDate, launchSequence]);

  useEffect(() => {
    if (launchSequence === "3") {
      const t = setTimeout(() => setLaunchSequence("2"), 1000);
      return () => clearTimeout(t);
    }
    if (launchSequence === "2") {
      const t = setTimeout(() => setLaunchSequence("1"), 1000);
      return () => clearTimeout(t);
    }
    if (launchSequence === "1") {
      const t = setTimeout(() => setLaunchSequence("party"), 1000);
      return () => clearTimeout(t);
    }
    if (launchSequence === "party") {
      const t = setTimeout(() => {
        setLaunchSequence("done");
        setRegistrationStarted(true);
      }, 3500);
      return () => clearTimeout(t);
    }
    if (launchSequence === "done") {
      setLaunchSequence(null);
    }
    return undefined;
  }, [launchSequence]);

  useEffect(() => {
    const slideshow = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideshow);
  }, [heroSlides.length]);

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
    "Don't just play the game—build it.",
    "Less scrolling, more making.",
    "Your kid can build that game they're glued to.",
    "We teach logic first, code second.",
    "Code. Create. Masti.",
    "Coding seekhega India, tabhi toh badhega India.",
    "Small batches. Real projects. No fluff.",
  ];

  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden overflow-y-auto" ref={containerRef}>
      {/* Animated Background Particles */}
      <Particles count={10} />

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

      {/* Launch sequence overlay: 3, 2, 1 then party + Go live */}
      {(launchSequence === "3" || launchSequence === "2" || launchSequence === "1") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300" aria-live="polite" aria-label={`Launch in ${launchSequence}`}>
          <span className="text-[min(40vw,280px)] font-black text-amber-400 drop-shadow-2xl tabular-nums animate-pulse" style={{ animationDuration: "0.5s", textShadow: "0 0 40px rgba(251,191,36,0.8)" }}>
            {launchSequence}
          </span>
        </div>
      )}
      {launchSequence === "party" && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm overflow-hidden" aria-live="polite" aria-label="We are live">
          {/* Pop flash at both corners */}
          <div className="popper-flash" style={{ left: "2%", bottom: "18%", marginLeft: -12, marginBottom: -12 }} aria-hidden />
          <div className="popper-flash" style={{ right: "2%", bottom: "18%", marginRight: -12, marginBottom: -12 }} aria-hidden />
          {/* Pop crackers from both corners */}
          {[
            ...Array.from({ length: 28 }, (_, i) => ({
              x: 40 + (i % 7) * 35,
              y: -30 - (i % 5) * 45,
              rotate: -55 + (i % 7) * 18,
              delay: (i % 5) * 0.04,
              color: ["#fbbf24", "#f59e0b", "#fcd34d", "#eab308", "#f97316", "#ef4444", "#22c55e"][i % 7],
            })),
          ].map((p, i) => (
            <div
              key={`left-${i}`}
              className="popper-streamer-left"
              style={{
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                ["--popper-x" as string]: `${p.x}px`,
                ["--popper-y" as string]: `${p.y}px`,
                ["--popper-rotate" as string]: `${p.rotate}deg`,
              }}
            />
          ))}
          {[
            ...Array.from({ length: 28 }, (_, i) => ({
              x: -40 - (i % 7) * 35,
              y: -30 - (i % 5) * 45,
              rotate: 55 - (i % 7) * 18,
              delay: (i % 5) * 0.04,
              color: ["#fbbf24", "#f59e0b", "#fcd34d", "#eab308", "#f97316", "#a855f7", "#22c55e"][i % 7],
            })),
          ].map((p, i) => (
            <div
              key={`right-${i}`}
              className="popper-streamer-right"
              style={{
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                ["--popper-x" as string]: `${p.x}px`,
                ["--popper-y" as string]: `${p.y}px`,
                ["--popper-rotate" as string]: `${p.rotate}deg`,
              }}
            />
          ))}
          {/* Confetti burst - fixed positions to avoid hydration mismatch */}
          {[
            ...Array.from({ length: 60 }, (_, i) => ({
              delay: (i % 10) * 0.06,
              color: ["#fbbf24", "#f59e0b", "#fcd34d", "#22c55e", "#eab308", "#f97316", "#ef4444", "#a855f7"][i % 8],
              x: (i % 2 === 0 ? 1 : -1) * (50 + (i % 5) * 40),
            })),
          ].map((p, i) => (
            <div
              key={i}
              className="launch-confetti-piece"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -5,
                marginTop: -5,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                ["--confetti-x" as string]: `${p.x}px`,
              }}
            />
          ))}
          <p className="text-4xl md:text-6xl font-black text-amber-400 mt-8 z-[102] relative animate-pulse drop-shadow-2xl" style={{ textShadow: "0 0 30px rgba(251,191,36,0.9)" }}>
            We&apos;re live! 🚀
          </p>
          <p className="text-xl md:text-2xl text-white/90 mt-4 z-[102] relative font-semibold">
            CodeMasti is now open for registration
          </p>
        </div>
      )}

      {/* Black Navigation/Header Bar - Structural Element (10%) */}
      <nav className="bg-black text-white py-4 px-6 md:px-12 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95 animate-slide-down overflow-visible" role="navigation" aria-label="Main navigation">
        <div className="w-full flex items-center justify-between">
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
              className="text-gray-300 hover:text-yellow-400 cursor-pointer transition-all duration-300 hover:scale-110 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
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

      {/* Animated Yellow Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-expand-width"></div>

      <main id="main-content" className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 md:px-8 lg:px-12 py-16 bg-gradient-to-b from-amber-50/40 via-white to-white" role="main">
        <div className="w-full max-w-[1600px] text-center space-y-8">
          {/* Hero - Image Left, Text Right */}
          <div 
            id="hero-banner"
            data-animate
            className={`transition-all duration-1000 delay-150 ${mounted && isVisible["hero-banner"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="w-full max-w-[1600px] mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-12">
                {/* Left: Hero image slideshow */}
                <div className="flex-shrink-0 w-full md:w-[45%] lg:w-[42%] max-w-md">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-200/30 ring-4 ring-amber-100/80 hover:shadow-amber-300/40 transition-shadow duration-500 aspect-square max-h-[520px]">
                    {heroSlides.map((slide, i) => (
                      <div
                        key={slide.src}
                        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${i === heroSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                        aria-hidden={i !== heroSlideIndex}
                        style={{ willChange: "opacity" }}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          width={500}
                          height={500}
                          className="w-full h-full max-h-[520px] object-contain object-top"
                          priority={i === 0}
                          sizes="(max-width: 768px) 100vw, 42vw"
                        />
                      </div>
                    ))}
                    {/* Slide indicators */}
                    <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
                      {heroSlides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setHeroSlideIndex(i)}
                          className={`h-2 rounded-full transition-all duration-500 ease-out ${i === heroSlideIndex ? "w-6 bg-amber-500" : "w-2 bg-white/60 hover:bg-white/80"}`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2 font-medium md:text-left">
                    75% Early Bird Scholarship · Limited period
                  </p>
                </div>

                {/* Right: Logo image on first row, then text content */}
                <div className="flex-1 flex flex-col gap-6 text-center md:text-left min-w-0">
                  {/* First row: Logo text image */}
                  <div className="flex justify-center md:justify-start">
                    <Image
                      src="/logotext.png"
                      alt="CodeMasti - Think. Solve. Create."
                      width={640}
                      height={270}
                      className="w-full max-w-[480px] md:max-w-[640px] lg:max-w-[720px] h-auto object-contain"
                      priority
                      sizes="(max-width: 768px) 95vw, (max-width: 1024px) 55vw, 45vw"
                    />
                  </div>
                  {/* Second row onwards: Text content - changes when registration has started */}
                  {showRegistrationOpenHero ? (
                    <>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
                        Registration is open
                      </h2>
                      <p className="text-base text-gray-600 mb-4">
                        Pick SPARK, BUILDERS, or INNOVATORS—whichever fits your child&apos;s class. We still have scholarship slots open.
                      </p>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200/80 text-left max-w-md inline-block">
                        <p className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden />
                          We&apos;re live. Come join us.
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-4 font-medium">
                        Choose a batch and register—we&apos;ll save a seat.
                      </p>
                      <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 w-fit mt-4 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold rounded-full shadow-lg shadow-amber-300/40 hover:shadow-xl hover:shadow-amber-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-white border border-amber-400/30"
                        aria-label="Register for CodeMasti"
                      >
                        Register Now
                        <span className="text-lg" aria-hidden>→</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
                        Save the dates
                      </h2>
                      <p className="text-base text-gray-600 mb-4">
                        We go live soon. Classes start in May. Register now and we&apos;ll hold a spot for you.
                      </p>
                      <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-4 items-stretch">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200/80 text-left min-w-0 flex-1 flex flex-col sm:min-h-[180px] max-w-md">
                          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-0.5">🚀 Platform launches</p>
                          <p className="text-xl md:text-2xl font-bold text-amber-700">5 February 2026</p>
                          <p className="text-sm text-gray-600">Wednesday</p>
                          <div className="mt-auto pt-3 border-t border-amber-200/60">
                            {isFinal10Seconds ? (
                              <>
                                <p className="text-[10px] uppercase tracking-wider text-amber-800/70 font-semibold mb-2">Launch in</p>
                                <div className="flex items-center justify-center gap-1">
                                  <span className="text-4xl md:text-5xl font-black text-amber-600 tabular-nums animate-pulse drop-shadow-sm" style={{ animationDuration: "1s" }}>
                                    {String(totalSecondsRemaining).padStart(2, "0")}
                                  </span>
                                  <span className="text-xl font-bold text-amber-600">sec</span>
                                </div>
                                <p className="text-xs text-amber-700/80 mt-1 font-medium">Get ready!</p>
                              </>
                            ) : (
                              <>
                                <p className="text-[10px] uppercase tracking-wider text-amber-800/70 font-semibold mb-1.5">Countdown</p>
                                <div className="flex items-center gap-1 font-mono text-sm flex-nowrap">
                                  <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold tabular-nums">{String(timeLeftPlatform.days).padStart(2, "0")}</span>
                                  <span className="text-amber-600">d</span>
                                  <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold tabular-nums">{String(timeLeftPlatform.hours).padStart(2, "0")}</span>
                                  <span className="text-amber-600">h</span>
                                  <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold tabular-nums">{String(timeLeftPlatform.minutes).padStart(2, "0")}</span>
                                  <span className="text-amber-600">m</span>
                                  <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold tabular-nums">{String(timeLeftPlatform.seconds).padStart(2, "0")}</span>
                                  <span className="text-amber-600">s</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-4 font-medium">
                        Earlier you register, more you save on the fee.
                      </p>
                      <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 w-fit mt-4 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold rounded-full shadow-lg shadow-amber-300/40 hover:shadow-xl hover:shadow-amber-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-white border border-amber-400/30"
                        aria-label="Register for CodeMasti"
                      >
                        Register Now
                        <span className="text-lg" aria-hidden>→</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Key Milestones & Timeline */}
          <div 
            id="timeline"
            data-animate
            className={`transition-all duration-1000 delay-400 ${mounted && isVisible.timeline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mt-12 w-full max-w-[1600px] mx-auto">
              <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-50 rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-200/30 border-2 border-yellow-200/80">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
                  <span className="text-yellow-600">Key Milestones & Timeline</span>
                </h2>
                
                <div className="space-y-6">
                  {/* Launch Timeline */}
                  <div className="bg-white/90 rounded-xl p-5 md:p-6 border-2 border-yellow-200/60 shadow-md">
                    <h3 className="text-xl font-bold text-black mb-4">Launch Timeline</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-500 font-bold mt-1">•</span>
                        <span><strong>Counselling & Admission Start:</strong> February 2026</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-500 font-bold mt-1">•</span>
                        <span><strong>Platform Launch:</strong> <span className="text-yellow-600 font-bold">5 February 2026 (Wednesday)</span></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-500 font-bold mt-1">•</span>
                        <span><strong>Courses Begin (First Batch):</strong> <span className="text-yellow-600 font-bold">2 May 2026 (Saturday)</span></span>
                      </li>
                    </ul>
                  </div>

                  {/* Scholarship Timeline */}
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl p-5 md:p-6 border-2 border-yellow-600 shadow-lg shadow-amber-200/40">
                    <h3 className="text-xl font-bold text-black mb-4">🎓 Early Bird Scholarship (on Registration Fee)</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">75%</div>
                        <div className="text-sm font-semibold text-black mb-1">Scholarship</div>
                        <div className="text-xs text-gray-600">1 Feb - 28 Feb 2026</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">50%</div>
                        <div className="text-sm font-semibold text-black mb-1">Scholarship</div>
                        <div className="text-xs text-gray-600">1 Mar - 30 Mar 2026</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600 mb-2">25%</div>
                        <div className="text-sm font-semibold text-black mb-1">Scholarship</div>
                        <div className="text-xs text-gray-600">1 Apr - 30 Apr 2026</div>
                      </div>
                    </div>
                    <p className="text-sm text-black mt-4 text-center font-medium">
                      Register early to save more! 🎉
                    </p>
                  </div>

                  {/* Brochure Download */}
                  <div className="bg-white/90 rounded-xl p-5 md:p-6 border-2 border-yellow-200/60 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">📄 Download Our Brochure</h3>
                      <p className="text-gray-700 text-sm md:text-base">
                        Read about CodeMasti programs, batches, and offerings in one place.
                      </p>
                    </div>
                    <a
                      href={BROCHURE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 shrink-0 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold rounded-full shadow-lg shadow-amber-300/40 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                      aria-label="View or download CodeMasti brochure (opens in new tab)"
                    >
                      View / Download Brochure
                      <span className="text-lg" aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </div>
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

          {/* Mission Statement */}
          <div 
            id="mission"
            data-animate
            className={`transition-all duration-1000 delay-400 ${mounted && isVisible.mission ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-200/40 border-2 border-yellow-100 hover:shadow-2xl hover:border-yellow-300 hover:shadow-amber-100/30 transition-all duration-500">
              <p className="text-base md:text-xl lg:text-2xl text-black font-medium leading-relaxed">
                We&apos;re building coding classes that don&apos;t cost a fortune—for kids in Class 5 to 10. Logic first, then code. Small batches, real projects.
              </p>
              <p className="text-sm md:text-lg lg:text-xl text-gray-700 mt-4 italic">
                Kids should learn to make things, not just use them.
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
              {/* SPARK - Amber theme */}
              <div 
                className="bg-white rounded-xl p-5 md:p-6 border-2 border-amber-400 shadow-lg shadow-amber-100/30 hover:shadow-xl hover:shadow-amber-200/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-full -mr-8 -mt-8 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-3xl md:text-4xl mb-3 relative z-10">✨</div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-2 relative z-10">
                  <span className="text-amber-600">SPARK</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-semibold relative z-10">Class 5-6</p>
                <p className="text-sm md:text-base text-black mt-2 relative z-10">Get curious, lose the fear—coding&apos;s fun</p>
                <Link href="/programs?batch=spark" className="mt-4 inline-block px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 text-sm md:text-base relative z-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" aria-label="Learn more about SPARK program for Class 5-6">
                  See SPARK
                </Link>
              </div>

              {/* BUILDERS - Amber theme */}
              <div 
                className="bg-white rounded-xl p-5 md:p-6 border-2 border-amber-400 shadow-lg shadow-amber-100/30 hover:shadow-xl hover:shadow-amber-200/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="text-3xl md:text-4xl mb-3 relative z-10">🧱</div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-2 relative z-10">
                  <span className="text-amber-600">BUILDERS</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-semibold relative z-10">Class 7-8</p>
                <p className="text-sm md:text-base text-black mt-2 relative z-10">Python, logic, and your first real projects</p>
                <Link href="/programs?batch=builders" className="mt-4 inline-block px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 text-sm md:text-base relative z-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" aria-label="Learn more about BUILDERS program for Class 7-8">
                  See BUILDERS
                </Link>
              </div>

              {/* INNOVATORS - Amber theme */}
              <div 
                className="bg-white rounded-xl p-5 md:p-6 border-2 border-amber-400 shadow-lg shadow-amber-100/30 hover:shadow-xl hover:shadow-amber-200/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-full -mr-10 -mt-10 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-3xl md:text-4xl mb-3 relative z-10">🚀</div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-2 relative z-10">
                  <span className="text-amber-600">INNOVATORS</span>
                </h3>
                <p className="text-sm md:text-base text-gray-600 font-semibold relative z-10">Class 9-10</p>
                <p className="text-sm md:text-base text-black mt-2 relative z-10">Real problems, real code—and a peek at what&apos;s next</p>
                <Link href="/programs?batch=innovators" className="mt-4 inline-block px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 text-sm md:text-base relative z-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" aria-label="Learn more about INNOVATORS program for Class 9-10">
                  See INNOVATORS
                </Link>
              </div>
            </div>
          </div>

          {/* Instructors Section - Who teaches at CodeMasti */}
          <div 
            id="instructors"
            data-animate
            className={`transition-all duration-1000 delay-600 ${mounted && isVisible.instructors ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mt-12 w-full max-w-[1600px] mx-auto">
              <div className="bg-gradient-to-br from-amber-50/80 via-white to-yellow-50/50 rounded-2xl p-6 md:p-10 shadow-xl shadow-gray-200/30 border-2 border-amber-200/80 overflow-hidden relative">
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full -mr-32 -mt-32" aria-hidden />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-100/50 rounded-full -ml-24 -mb-24" aria-hidden />
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold uppercase tracking-wide mb-4">
                      Who teaches at CodeMasti
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
                      <span className="text-amber-700">Our Amazing Instructors</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                      Our instructors are practising engineers and founders with real industry experience—from top institutes and companies. They bring hands-on coding, problem-solving, and mentorship into every class so your child learns from people who build products for a living.
                    </p>
                  </div>
                  {/* Instructor profile cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[
                      { name: "Aditya Raj", tag: "10+ Global Scale | AI pre-sales investors | Finance Expert", bio: "Instructor at CodeMasti", image: "/instructors/aditya.jpeg" },
                      { name: "Monu Raj", tag: "Ex-SDE Intern @IIT Roorkee, @Psytech | 4X-Founder", bio: "Instructor at CodeMasti", image: "/instructors/monu.jpeg" },
                      { name: "Dibya Jyoti", tag: "Specialist @codeforces |  3 star @codechef", bio: "Instructor at CodeMasti", image: "/instructors/dibya.jpeg" },
                      { name: "Anant", tag: "Winner @Hacked 3.0 | Superteam solana grant 1000$", bio: "Instructor at CodeMasti", image: "/instructors/anant.jpeg" },
                    ].map((instructor) => (
                      <div
                        key={instructor.name}
                        className="bg-white rounded-xl p-5 md:p-6 border-2 border-amber-200/60 shadow-md hover:shadow-lg hover:border-amber-300/80 transition-all duration-300 flex flex-col items-center text-center"
                      >
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 mt-3 mb-4 flex-shrink-0">
                          <Image
                            src={instructor.image}
                            alt={`${instructor.name}, ${instructor.tag}`}
                            fill
                            className="object-cover object-[center_18%]"
                            sizes="(max-width: 768px) 112px, 128px"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-black mb-2">{instructor.name}</h3>
                        <span className="inline-block px-3 py-1.5 rounded-lg bg-amber-600 text-white text-sm font-bold mb-3">
                          {instructor.tag}
                        </span>
                        <p className="text-sm text-gray-600">{instructor.bio}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mentor Section - Monthly sessions with top engineers */}
          <div 
            id="mentor"
            data-animate
            className={`transition-all duration-1000 delay-600 ${mounted && isVisible.mentor ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="mt-12 w-full max-w-[1600px] mx-auto">
              <div className="bg-gradient-to-br from-amber-50/80 via-white to-yellow-50/50 rounded-2xl p-6 md:p-10 shadow-xl shadow-gray-200/30 border-2 border-amber-200/80 overflow-hidden relative">
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full -mr-32 -mt-32" aria-hidden />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-100/50 rounded-full -ml-24 -mb-24" aria-hidden />
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold uppercase tracking-wide mb-4">
                      Included for every student
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3">
                      <span className="text-amber-700">Monthly Mentor Sessions</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                      Every student gets a dedicated monthly 1:1 session with industry experts—our top engineers from leading tech companies.
                    </p>
                  </div>
                  {/* Mentor profile cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
                    {[
                      { name: "Amod Ranjan", tag: "3x ICPC Regionalist", bio: "Mentor at CodeMasti", image: "/mentors/amod.jpeg" },
                      { name: "Ritik Raj", tag: "Ex-SDE Intern @Physics Wallah · Founder @seedite", bio: "Mentor at CodeMasti", image: "/mentors/ritik.jpeg" },
                      { name: "Prince Sahoo", tag: "Ex-SDE Intern @Makeflow", bio: "Mentor at CodeMasti", image: "/mentors/prince.jpeg" },
                      { name: "Aryan Jangde", tag: "Ex-SDE Intern @Allen Institute", bio: "Mentor at CodeMasti", image: "/mentors/aryanJ.jpeg" },
                    ].map((mentor) => (
                      <div
                        key={mentor.name}
                        className="bg-white rounded-xl p-5 md:p-6 border-2 border-amber-200/60 shadow-md hover:shadow-lg hover:border-amber-300/80 transition-all duration-300 flex flex-col items-center text-center"
                      >
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 mb-4 flex-shrink-0">
                          <Image
                            src={mentor.image}
                            alt={`${mentor.name}, ${mentor.tag}`}
                            fill
                            className="object-cover object-[center_18%]"
                            sizes="(max-width: 768px) 112px, 128px"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-black mb-2">{mentor.name}</h3>
                        <span className="inline-block px-3 py-1.5 rounded-lg bg-amber-600 text-white text-sm font-bold mb-3">
                          {mentor.tag}
                        </span>
                        <p className="text-sm text-gray-600">{mentor.bio}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 md:p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-2 border-amber-200/60 text-center">
                    <p className="text-sm md:text-base font-semibold text-black">
                      <span className="text-amber-600">✓</span> Monthly mentor session is included in your program—no extra cost. Think. Solve. Create—with expert guidance.
                    </p>
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
            <div className="mt-14 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-yellow-50/80 to-amber-50/50 border-2 border-yellow-200/60 shadow-lg">
              <p className="text-lg md:text-xl text-black font-semibold mb-2">
                Want a heads-up when we go live?
              </p>
              <p className="text-sm text-gray-600 mb-6">We launch 5 Feb · First classes 2 May</p>
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
                  className="px-6 py-3 rounded-full border-2 border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full sm:w-auto min-w-[280px] transition-all hover:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button 
                  type="submit"
                  disabled={isSubmittingEmail}
                  aria-label={isSubmittingEmail ? "Submitting your email address" : "Subscribe to newsletter and join waitlist"}
                  className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-0 bg-yellow-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-50"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmittingEmail ? "Adding you..." : "Yes, notify me"}
                    <span className="text-sm">🚀</span>
                  </span>
                </button>
              </form>
              {emailStatus === "success" && (
                <p className="text-sm text-amber-700 mt-2 text-center font-medium" role="alert">
                  Done. We&apos;ll email you when we&apos;re live.
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
              <p className="text-sm text-gray-600 mt-4 font-medium flex items-center justify-center gap-2">
                <span className="text-yellow-500">✨</span> No spam—just one email when we open up.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Black Footer - Structural Element (10%) */}
      <footer className="bg-black text-white py-8 px-6 md:px-12 mt-16 animate-fade-in-up">
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 animate-fade-in">
                © 2024 CodeMasti. All rights reserved.
              </p>
              <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
                <Link 
                  href="/terms"
                  className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                  aria-label="Terms & Conditions"
                >
                  Terms & Conditions
                </Link>
                <span className="text-gray-600">|</span>
                <Link 
                  href="/privacy"
                  className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-600">|</span>
                <Link 
                  href="/refund"
                  className="text-xs text-gray-500 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                  aria-label="Refund Policy"
                >
                  Refund Policy
                </Link>
              </div>
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
