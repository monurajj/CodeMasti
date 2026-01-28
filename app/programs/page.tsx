"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";

export default function Programs() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<string>("spark");
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

  const programs = [
    {
      id: "spark",
      emoji: "✨",
      name: "SPARK",
      classes: "Class 5-6",
      color: "orange",
      goal: "Ignite curiosity & remove fear of coding",
      description: "The foundation stage where we introduce students to the world of coding through fun, interactive activities that build confidence and logical thinking.",
      features: [
        "Logical thinking games",
        "Visual programming & flowcharts",
        "Creative problem solving",
        "Introduction to how computers think"
      ],
      outcome: "Students enjoy coding and feel confident exploring technology.",
      registrationFee: "₹2,499",
      monthlyFee: "₹1,499",
      timetable: "2 live classes/week (Saturday + Sunday)",
      additionalInfo: "Weekly practice challenges + Project work (guided + independent)"
    },
    {
      id: "builders",
      emoji: "🧱",
      name: "BUILDERS",
      classes: "Class 7-8",
      color: "blue",
      goal: "Build strong coding foundations",
      description: "Students dive into real programming with Python, learning core concepts through hands-on projects and challenges that make coding tangible and exciting.",
      features: [
        "Python fundamentals",
        "Conditions, loops, functions",
        "Mini projects & challenges",
        "Introduction to AI concepts (conceptual)"
      ],
      outcome: "Students can write code and build simple applications independently.",
      registrationFee: "₹2,999",
      monthlyFee: "₹1,999",
      timetable: "2 live classes/week (Saturday + Sunday)",
      additionalInfo: "Weekly practice challenges + Project work (guided + independent)"
    },
    {
      id: "innovators",
      emoji: "🚀",
      name: "INNOVATORS",
      classes: "Class 9-10",
      color: "green",
      goal: "Apply skills to real-world problems",
      description: "Advanced level where students apply their coding skills to solve real-world problems, explore AI tools, and prepare for future tech careers.",
      features: [
        "Advanced Python & logic",
        "Project-based learning",
        "AI tools & automation concepts",
        "Career awareness & tech exposure"
      ],
      outcome: "Students think like engineers and innovators.",
      registrationFee: "₹3,499",
      monthlyFee: "₹2,499",
      timetable: "2 live classes/week (Saturday + Sunday)",
      additionalInfo: "Weekly practice challenges + Project work (guided + independent)"
    }
  ];

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
            <Link href="/programs" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="View our coding programs">
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
              className="block py-3.5 px-4 text-base text-yellow-400 font-semibold hover:text-yellow-300 hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset rounded"
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
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header Section */}
          <div 
            id="header"
            data-animate
            className={`text-center transition-all duration-1000 ${mounted && isVisible.header ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black mb-4">
              Our <span className="text-yellow-500">Programs</span>
            </h1>
            <p className="text-base md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
              A structured learning journey designed specifically for Indian students from Class 5 to Class 10
            </p>
            <div className="w-32 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Learning Structure Introduction */}
          <section 
            id="intro"
            data-animate
            className={`transition-all duration-1000 delay-200 ${mounted && isVisible.intro ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border-2 border-yellow-300 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
                Learning Structure
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Our curriculum follows a clear progression: <strong className="text-black">Logic before language</strong>, <strong className="text-black">Projects before theory</strong>, and <strong className="text-black">Confidence before complexity</strong>.
              </p>
            </div>
          </section>

          {/* Tab Navigation */}
          <div 
            id="tabs"
            data-animate
            className={`transition-all duration-1000 delay-300 ${mounted && isVisible.tabs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3 md:gap-4 mb-8">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => setActiveTab(program.id)}
                  aria-label={`View ${program.name} program details for ${program.classes}`}
                  aria-selected={activeTab === program.id}
                  role="tab"
                  className={`w-full md:w-auto px-6 py-4 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                    activeTab === program.id
                      ? program.color === "orange"
                        ? "bg-orange-500 text-white shadow-xl scale-105"
                        : program.color === "blue"
                        ? "bg-blue-500 text-white shadow-xl scale-105"
                        : "bg-green-500 text-white shadow-xl scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300"
                  }`}
                >
                  <span className="text-xl md:text-2xl mr-2">{program.emoji}</span>
                  {program.name}
                </button>
              ))}
            </div>
          </div>

          {/* Program Content - Tab Panels */}
          <div className="min-h-[600px]">
            {programs.map((program) => (
              <div
                key={program.id}
                className={`transition-all duration-500 ${
                  activeTab === program.id
                    ? "opacity-100 block"
                    : "opacity-0 hidden"
                }`}
              >
                <div
                  className={`rounded-2xl p-8 md:p-12 shadow-lg border-2 transition-all duration-500 ${
                    program.color === "orange"
                      ? "bg-white border-orange-400"
                      : program.color === "blue"
                      ? "bg-white border-blue-400"
                      : program.color === "green"
                      ? "bg-white border-green-400"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Left Side - Emoji and Basic Info */}
                    <div className="flex-shrink-0 text-center md:text-left">
                      <div className="text-7xl mb-4 animate-bounce-gentle">
                        {program.emoji}
                      </div>
                      <h3 className="text-4xl font-bold mb-2 text-black">
                        <span className={
                          program.color === "orange" ? "text-orange-500" :
                          program.color === "blue" ? "text-blue-500" :
                          program.color === "green" ? "text-green-500" : "text-black"
                        }>
                          {program.name}
                        </span>
                      </h3>
                      <p className="text-xl font-semibold mb-4 text-gray-600">
                        {program.classes}
                      </p>
                    </div>

                    {/* Right Side - Details */}
                    <div className="flex-1 space-y-6">
                      <div>
                        <h4 className={`text-lg md:text-xl font-bold mb-2 ${
                          program.color === "orange" ? "text-orange-600" :
                          program.color === "blue" ? "text-blue-600" :
                          program.color === "green" ? "text-green-600" : "text-yellow-600"
                        }`}>
                          Goal
                        </h4>
                        <p className="text-base md:text-lg text-gray-700">
                          {program.goal}
                        </p>
                      </div>

                      <div>
                        <h4 className={`text-lg md:text-xl font-bold mb-2 ${
                          program.color === "orange" ? "text-orange-600" :
                          program.color === "blue" ? "text-blue-600" :
                          program.color === "green" ? "text-green-600" : "text-yellow-600"
                        }`}>
                          Description
                        </h4>
                        <p className="text-base md:text-lg leading-relaxed text-gray-700">
                          {program.description}
                        </p>
                      </div>

                      <div>
                        <h4 className={`text-lg md:text-xl font-bold mb-4 ${
                          program.color === "orange" ? "text-orange-600" :
                          program.color === "blue" ? "text-blue-600" :
                          program.color === "green" ? "text-green-600" : "text-yellow-600"
                        }`}>
                          What Students Learn
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {program.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className={`flex items-start gap-3 p-3 rounded-lg ${
                                program.color === "orange"
                                  ? "bg-orange-50"
                                  : program.color === "blue"
                                  ? "bg-blue-50"
                                  : program.color === "green"
                                  ? "bg-green-50"
                                  : "bg-gray-50"
                              }`}
                            >
                              <span className={`text-xl ${
                                program.color === "orange" ? "text-orange-500" :
                                program.color === "blue" ? "text-blue-500" :
                                program.color === "green" ? "text-green-500" : "text-yellow-500"
                              }`}>
                                ✓
                              </span>
                              <p className="text-gray-700">
                                {feature}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg border-2 ${
                        program.color === "orange"
                          ? "bg-orange-50 border-orange-300"
                          : program.color === "blue"
                          ? "bg-blue-50 border-blue-300"
                          : program.color === "green"
                          ? "bg-green-50 border-green-300"
                          : "bg-yellow-50 border-yellow-300"
                      }`}>
                        <h4 className={`text-lg font-bold mb-2 ${
                          program.color === "orange" ? "text-orange-700" :
                          program.color === "blue" ? "text-blue-700" :
                          program.color === "green" ? "text-green-700" : "text-yellow-700"
                        }`}>
                          Outcome
                        </h4>
                        <p className="font-semibold text-black">
                          {program.outcome}
                        </p>
                      </div>

                      {/* Fee Structure */}
                      <div className={`p-5 rounded-lg border-2 ${
                        program.color === "orange"
                          ? "bg-gradient-to-br from-orange-100 to-orange-50 border-orange-400"
                          : program.color === "blue"
                          ? "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-400"
                          : program.color === "green"
                          ? "bg-gradient-to-br from-green-100 to-green-50 border-green-400"
                          : "bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-400"
                      }`}>
                        <h4 className={`text-xl font-bold mb-4 ${
                          program.color === "orange" ? "text-orange-700" :
                          program.color === "blue" ? "text-blue-700" :
                          program.color === "green" ? "text-green-700" : "text-yellow-700"
                        }`}>
                          💰 Fee Structure
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-semibold">Registration Fee:</span>
                              <span className={`text-xl font-bold ${
                                program.color === "orange" ? "text-orange-600" :
                                program.color === "blue" ? "text-blue-600" :
                                program.color === "green" ? "text-green-600" : "text-yellow-600"
                              }`}>
                                {program.registrationFee}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">(includes first month)</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-semibold">Monthly Fee:</span>
                              <span className={`text-xl font-bold ${
                                program.color === "orange" ? "text-orange-600" :
                                program.color === "blue" ? "text-blue-600" :
                                program.color === "green" ? "text-green-600" : "text-yellow-600"
                              }`}>
                                {program.monthlyFee}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">(from 2nd month onwards)</p>
                          </div>
                        </div>
                      </div>

                      {/* Course Timetable */}
                      <div className={`p-5 rounded-lg border-2 ${
                        program.color === "orange"
                          ? "bg-orange-50 border-orange-300"
                          : program.color === "blue"
                          ? "bg-blue-50 border-blue-300"
                          : program.color === "green"
                          ? "bg-green-50 border-green-300"
                          : "bg-yellow-50 border-yellow-300"
                      }`}>
                        <h4 className={`text-xl font-bold mb-4 ${
                          program.color === "orange" ? "text-orange-700" :
                          program.color === "blue" ? "text-blue-700" :
                          program.color === "green" ? "text-green-700" : "text-yellow-700"
                        }`}>
                          📅 Course Timetable
                        </h4>
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                            <div className="flex items-start gap-3">
                              <span className={`text-2xl ${
                                program.color === "orange" ? "text-orange-500" :
                                program.color === "blue" ? "text-blue-500" :
                                program.color === "green" ? "text-green-500" : "text-yellow-500"
                              }`}>
                                🎓
                              </span>
                              <div>
                                <p className="font-semibold text-black mb-1">Live Class Schedule</p>
                                <p className="text-gray-700">{program.timetable}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                            <div className="flex items-start gap-3">
                              <span className={`text-2xl ${
                                program.color === "orange" ? "text-orange-500" :
                                program.color === "blue" ? "text-blue-500" :
                                program.color === "green" ? "text-green-500" : "text-yellow-500"
                              }`}>
                                ➕
                              </span>
                              <div>
                                <p className="font-semibold text-black mb-1">Additional Activities</p>
                                <p className="text-gray-700">{program.additionalInfo}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Register Button */}
                      <div className="pt-4">
                        <Link
                          href={`/register?batch=${program.id}`}
                          className={`inline-block w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 text-center ${
                            program.color === "orange"
                              ? "bg-orange-500 text-white hover:bg-orange-600"
                              : program.color === "blue"
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : program.color === "green"
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-yellow-400 text-black hover:bg-yellow-500"
                          }`}
                        >
                          Register for {program.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Teaching Approach Section */}
          <section 
            id="approach"
            data-animate
            className={`transition-all duration-1000 delay-600 ${mounted && isVisible.approach ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 md:p-12 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">
                How We Teach
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/90 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">💻</div>
                  <h3 className="font-bold text-black mb-2">Live Interactive Sessions</h3>
                  <p className="text-gray-700 text-sm">Real-time learning with expert instructors</p>
                </div>
                <div className="bg-white/90 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold text-black mb-2">Weekly Challenges</h3>
                  <p className="text-gray-700 text-sm">Regular practice to reinforce concepts</p>
                </div>
                <div className="bg-white/90 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="font-bold text-black mb-2">Project-Based Learning</h3>
                  <p className="text-gray-700 text-sm">Build real applications and solve problems</p>
                </div>
                <div className="bg-white/90 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🎮</div>
                  <h3 className="font-bold text-black mb-2">Gamified Learning</h3>
                  <p className="text-gray-700 text-sm">Earn points, badges, and recognition</p>
                </div>
                <div className="bg-white/90 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">📜</div>
                  <h3 className="font-bold text-black mb-2">Certificates & Progression</h3>
                  <p className="text-gray-700 text-sm">Track your journey and level up</p>
                </div>
                <div className="bg-white/90 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold text-black mb-2">Project Assessments</h3>
                  <p className="text-gray-700 text-sm">Showcase your skills through projects</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section 
            id="cta"
            data-animate
            className={`transition-all duration-1000 delay-700 ${mounted && isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-black text-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-yellow-400 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Coding Journey?
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Register now and secure your spot in your preferred batch!
              </p>
              <Link
                href="/register"
                className="inline-block px-8 py-4 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                aria-label="Register for CodeMasti programs"
              >
                Register Now
              </Link>
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
              <Link href="/programs" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="View our coding programs">
                Programs
              </Link>
              <Link href="/register" className="text-gray-400 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Register for CodeMasti programs">
                Register
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded" aria-label="Contact CodeMasti">
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
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
