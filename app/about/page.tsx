"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";

export default function About() {
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
            <Link href="/about" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Learn more about CodeMasti">
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
              className="block py-3.5 px-4 text-base text-yellow-400 font-semibold hover:text-yellow-300 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
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
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header Section */}
          <div 
            id="header"
            data-animate
            className={`text-center transition-all duration-1000 ${mounted && isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-4">
              About <span className="text-yellow-500">CodeMasti</span>
            </h1>
            <div className="w-32 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Platform Overview */}
          <section 
            id="overview"
            data-animate
            className={`transition-all duration-1000 delay-200 ${mounted && isVisible.overview ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border-2 border-gray-200">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
                Platform Overview
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-black">CodeMasti</strong> is a cost-efficient, future-ready coding education platform for school students from Class 5 to Class 10, focused on building problem-solving ability, logical thinking, and AI readiness — not just teaching syntax.
                </p>
                <p className="text-xl font-semibold text-black italic mt-6">
                  Our belief is simple:
                </p>
                <p className="text-2xl font-bold text-yellow-600 text-center py-4">
                  Every student should learn how to think like a creator, not just consume technology.
                </p>
              </div>
            </div>
          </section>

          {/* The Problem We Are Solving */}
          <section 
            id="problem"
            data-animate
            className={`transition-all duration-1000 delay-300 ${mounted && isVisible.problem ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-red-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                The Problem We Are Solving
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">Huge Skill Gap</h3>
                      <p className="text-gray-700">Schools focus on theory, while the world demands practical tech skills.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">High Cost of Existing Platforms</h3>
                      <p className="text-gray-700">Most edtech platforms are expensive and inaccessible to a large portion of Indian families.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">Overhyped & Age-Inappropriate AI Education</h3>
                      <p className="text-gray-700">Students are pushed into advanced topics without strong foundations.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">😰</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">Fear of Coding</h3>
                      <p className="text-gray-700">Many students believe coding is difficult or only for "smart" kids.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Solution */}
          <section 
            id="solution"
            data-animate
            className={`transition-all duration-1000 delay-400 ${mounted && isVisible.solution ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-yellow-300">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Our Solution
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                A structured, age-appropriate, and affordable coding journey designed specifically for Indian students.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <div className="text-4xl mb-3">🧠</div>
                  <h3 className="font-bold text-black mb-2">Logic before language</h3>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold text-black mb-2">Projects before theory</h3>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <div className="text-4xl mb-3">💪</div>
                  <h3 className="font-bold text-black mb-2">Confidence before complexity</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Why We Are Different */}
          <section 
            id="different"
            data-animate
            className={`transition-all duration-1000 delay-500 ${mounted && isVisible.different ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Why We Are Different
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Cost-efficient pricing</strong> for Indian families</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">No hype, no shortcuts</strong> — strong fundamentals first</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Age-appropriate curriculum</strong></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Hands-on projects</strong> & challenges</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Clear learning progression</strong> (Spark → Build → Innovate)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Target Audience */}
          <section 
            id="audience"
            data-animate
            className={`transition-all duration-1000 delay-600 ${mounted && isVisible.audience ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Target Audience
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-black text-xl mb-4">Students</h3>
                  <p className="text-gray-700 mb-4">Class 5 to Class 10</p>
                  <h3 className="font-bold text-black text-xl mb-4 mt-6">Parents</h3>
                  <p className="text-gray-700">Looking for future-proof skills</p>
                </div>
                <div>
                  <h3 className="font-bold text-black text-xl mb-4">Schools</h3>
                  <p className="text-gray-700 mb-4">Seeking practical coding exposure</p>
                  <h3 className="font-bold text-black text-xl mb-4 mt-6">Geographic Reach</h3>
                  <p className="text-gray-700">Tier-1, Tier-2, and Tier-3 cities</p>
                </div>
              </div>
            </div>
          </section>

          {/* Teaching Approach */}
          <section 
            id="approach"
            data-animate
            className={`transition-all duration-1000 delay-700 ${mounted && isVisible.approach ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-purple-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Teaching Approach
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-gray-700">• Live interactive sessions</p>
                  <p className="text-gray-700">• Weekly challenges</p>
                  <p className="text-gray-700">• Project-based assessments</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">• Gamified learning & recognition</p>
                  <p className="text-gray-700">• Certificates & level progression</p>
                </div>
              </div>
            </div>
          </section>

          {/* Vision */}
          <section 
            id="vision"
            data-animate
            className={`transition-all duration-1000 delay-800 ${mounted && isVisible.vision ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-black text-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-yellow-400">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                To build India's most trusted, affordable, and impact-driven coding education platform, creating a generation of students who:
              </p>
              <div className="space-y-4 text-lg">
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">🧠</span>
                  <span>Think logically</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">💪</span>
                  <span>Build confidently</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">🚀</span>
                  <span>Innovate responsibly</span>
                </p>
              </div>
            </div>
          </section>

          {/* Founders */}
          <section 
            id="founders"
            data-animate
            className={`transition-all duration-1000 delay-900 ${mounted && isVisible.founders ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-50 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
                <span className="text-yellow-600">Meet Our Founders</span>
              </h2>
              
              {/* Founders Photo Section */}
              <div className="flex justify-center mb-10">
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-lg overflow-hidden border-4 border-yellow-400 shadow-xl ring-4 ring-yellow-100">
                  <Image
                    src="/founderimage.png"
                    alt="Aditya Raj and Monu Raj - Founders of CodeMasti"
                    width={448}
                    height={448}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist yet
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                            <div class="text-white text-6xl md:text-7xl font-bold">AR + MR</div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>

              {/* Founders Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center p-8 bg-white rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300 group">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-black mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                      Aditya Raj
                    </h3>
                    <p className="text-xl font-semibold text-yellow-600">Founder</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    A driven founder with a strong vision for transforming school-level education through practical, future-ready coding. Focused on building an affordable, scalable, and impact-driven learning ecosystem that empowers young minds across India.
                  </p>
                </div>
                <div className="text-center p-8 bg-white rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300 group">
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-black mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                      Monu Raj
                    </h3>
                    <p className="text-xl font-semibold text-yellow-600">Co-Founder</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">
                    A technology enthusiast with hands-on experience in coding, electronics, and project-based learning. Passionate about making complex technology simple, practical, and accessible for students through real-world projects and innovation-led teaching.
                  </p>
                </div>
              </div>

              {/* Mission Quote */}
              <div className="mt-10 pt-8 border-t-2 border-yellow-200 text-center">
                <p className="text-xl md:text-2xl font-semibold text-black italic mb-2">
                  "We are not just teaching coding."
                </p>
                <p className="text-lg md:text-xl text-gray-700">
                  "We are shaping how students think, solve, and create in an AI-driven world."
                </p>
              </div>
            </div>
          </section>

          {/* Closing Statement */}
          <section 
            id="closing"
            data-animate
            className={`transition-all duration-1000 delay-1000 ${mounted && isVisible.closing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 md:p-12 shadow-lg text-center">
              <p className="text-2xl md:text-3xl font-bold text-black mb-4">
                We are not just teaching coding.
              </p>
              <p className="text-xl md:text-2xl text-black font-semibold mb-6">
                We are shaping how students think, solve, and create in an AI-driven world.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg font-bold text-black">
                <span>Spark curiosity.</span>
                <span>Build skills.</span>
                <span>Innovate the future.</span>
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
