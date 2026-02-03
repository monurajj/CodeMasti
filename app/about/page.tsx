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
      <Particles count={10} />

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

          {/* What we do */}
          <section 
            id="overview"
            data-animate
            className={`transition-all duration-1000 delay-200 ${mounted && isVisible.overview ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border-2 border-gray-200">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
                What we do
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-black">CodeMasti</strong> is coding classes for kids in Class 5 to 10. We keep fees low, batches small, and focus on logic and problem-solving—not just typing code. No hype, no rush into AI before basics.
                </p>
                <p className="text-xl font-semibold text-black italic mt-6">
                  We believe:
                </p>
                <p className="text-2xl font-bold text-yellow-600 text-center py-4">
                  Kids should learn to make things, not just use them.
                </p>
              </div>
            </div>
          </section>

          {/* Why we started */}
          <section 
            id="problem"
            data-animate
            className={`transition-all duration-1000 delay-300 ${mounted && isVisible.problem ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-red-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Why we started
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">School teaches theory, not build</h3>
                      <p className="text-gray-700">Kids rarely get to actually code and build things in school.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">Good classes cost a lot</h3>
                      <p className="text-gray-700">Most coding courses are too expensive for many families.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">AI buzz before basics</h3>
                      <p className="text-gray-700">Kids get pushed into &quot;AI&quot; without learning logic and code first.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">😰</span>
                    <div>
                      <h3 className="font-bold text-black mb-2">Coding feels scary</h3>
                      <p className="text-gray-700">A lot of kids (and parents) think coding is only for &quot;geniuses.&quot; It&apos;s not.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How we do it */}
          <section 
            id="solution"
            data-animate
            className={`transition-all duration-1000 delay-400 ${mounted && isVisible.solution ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-yellow-300">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                How we do it
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Simple: affordable fees, small batches, and a path that fits each age. We start with logic and fun, then add real code and projects.
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

          {/* What you get */}
          <section 
            id="different"
            data-animate
            className={`transition-all duration-1000 delay-500 ${mounted && isVisible.different ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                What you get
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Pricing that doesn&apos;t break the bank</strong></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">No hype</strong>—we build fundamentals first</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Content that fits the age</strong> (Class 5–10)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Real projects</strong>, not just slides</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-xl">✅</span>
                  <p className="text-gray-700"><strong className="text-black">Clear path</strong>: Spark → Builders → Innovators</p>
                </div>
              </div>
            </div>
          </section>

          {/* Who it&apos;s for */}
          <section 
            id="audience"
            data-animate
            className={`transition-all duration-1000 delay-600 ${mounted && isVisible.audience ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Who it&apos;s for
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-black text-xl mb-4">Students</h3>
                  <p className="text-gray-700 mb-4">Class 5 to 10—any kid curious about how games and apps are made.</p>
                  <h3 className="font-bold text-black text-xl mb-4 mt-6">Parents</h3>
                  <p className="text-gray-700">Who want their child to learn real skills without spending a fortune.</p>
                </div>
                <div>
                  <h3 className="font-bold text-black text-xl mb-4">Schools</h3>
                  <p className="text-gray-700 mb-4">Looking for practical coding sessions, not just theory.</p>
                  <h3 className="font-bold text-black text-xl mb-4 mt-6">Where we reach</h3>
                  <p className="text-gray-700">Online—so anywhere in India works.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How we teach */}
          <section 
            id="approach"
            data-animate
            className={`transition-all duration-1000 delay-700 ${mounted && isVisible.approach ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-purple-200">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                How we teach
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-gray-700">• Live classes (not pre-recorded)</p>
                  <p className="text-gray-700">• Weekly challenges so they keep practising</p>
                  <p className="text-gray-700">• Projects to show what they&apos;ve built</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">• Fun, game-like progress so they stay hooked</p>
                  <p className="text-gray-700">• Certificates and a clear path to level up</p>
                </div>
              </div>
            </div>
          </section>

          {/* Where we want to go */}
          <section 
            id="vision"
            data-animate
            className={`transition-all duration-1000 delay-800 ${mounted && isVisible.vision ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-black text-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-yellow-400">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Where we want to go
              </h2>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                We want CodeMasti to be the place Indian parents think of when they want affordable, no-nonsense coding for their kids. So that more students:
              </p>
              <div className="space-y-4 text-lg">
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">🧠</span>
                  <span>Think logically</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">💪</span>
                  <span>Build stuff confidently</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-yellow-400">🚀</span>
                  <span>Use tech to create, not just consume</span>
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
                    I wanted to fix how kids learn tech—less theory, more building. We started CodeMasti so that good coding education doesn&apos;t have to cost a fortune. I handle the big picture and making sure we stay focused on what actually helps students.
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
                    I&apos;ve been into coding and electronics for years—and I love breaking hard stuff into simple steps. At CodeMasti I focus on the courses and projects so that kids actually get their hands dirty and build things, not just watch.
                  </p>
                </div>
              </div>

              {/* Mission Quote */}
              <div className="mt-10 pt-8 border-t-2 border-yellow-200 text-center">
                <p className="text-xl md:text-2xl font-semibold text-black italic mb-2">
                  &quot;We&apos;re not just teaching coding.&quot;
                </p>
                <p className="text-lg md:text-xl text-gray-700">
                  &quot;We want kids to think, solve, and create—especially when everyone&apos;s talking about AI.&quot;
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
                We&apos;re not just teaching coding.
              </p>
              <p className="text-xl md:text-2xl text-black font-semibold mb-6">
                We want kids to think, solve, and create—for real.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg font-bold text-black">
                <span>Spark curiosity.</span>
                <span>Build skills.</span>
                <span>Then go build something.</span>
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
