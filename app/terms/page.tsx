"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";

export default function Terms() {
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
              Terms & <span className="text-yellow-500">Conditions</span>
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
                This document is an electronic record in terms of Information Technology Act, 2000 and rules
                there under as applicable and the amended provisions pertaining to electronic records in various
                statutes as amended by the Information Technology Act, 2000. This electronic record is generated
                by a computer system and does not require any physical or digital signatures.
              </p>

              <p className="text-gray-700 mb-6">
                This document is published in accordance with the provisions of Rule 3 (1) of the Information
                Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and
                regulations, privacy policy and Terms of Use for access or usage of domain name{' '}
                <a href="https://www.codemasti.com/" className="text-yellow-600 hover:text-yellow-700 underline">
                  https://www.codemasti.com/
                </a>
                {' '}(&apos;Website&apos;), including the related mobile site and mobile application (hereinafter
                referred to as &apos;Platform&apos;).
              </p>

              <p className="text-gray-700 mb-6">
                The Platform is owned by with its registered office at Purahara Aurangabad Bihar
                , a company incorporated under the Companies Act, 1956 8228907407
                (hereinafter referred to as &apos;Platform Owner&apos;, &apos;we&apos;, &apos;us&apos;, &apos;our&apos;).
              </p>

              <p className="text-gray-700 mb-6">
                Your use of the Platform and services and tools are governed by the following terms and
                conditions (&quot;Terms of Use&quot;) as applicable to the Platform including the applicable policies which
                are incorporated herein by way of reference. If You transact on the Platform, You shall be subject
                to the policies that are applicable to the Platform for such transaction. By mere use of the Platform,
                You shall be contracting with the Platform Owner and these terms and conditions including the
                policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to
                your use of our website, goods (as applicable) or services (as applicable) (collectively, &apos;Services&apos;).
                Any terms and conditions proposed by You which are in addition to or which conflict with these
                Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect.
                These Terms of Use can be modified at any time without assigning any reason. It is your
                responsibility to periodically review these Terms of Use to stay informed of updates.
              </p>

              <p className="text-gray-700 mb-6">
                For the purpose of these Terms of Use, wherever the context so requires &apos;you&apos;, &apos;your&apos; or &apos;user&apos; shall
                mean any natural or legal person who has agreed to become a user/buyer on the Platform.
              </p>

              <p className="text-gray-700 mb-8 font-semibold">
                ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR
                AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE,
                SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
              </p>

              <h2 className="text-2xl font-bold text-black mt-8 mb-4">The use of Platform and/or availing of our Services is subject to the following Terms of Use:</h2>

              <ol className="list-decimal list-inside space-y-4 text-gray-700 mb-6">
                <li>
                  To access and use the Services, you agree to provide true, accurate and complete information
                  to us during and after registration, and you shall be responsible for all acts done through the
                  use of your registered account on the Platform.
                </li>
                <li>
                  Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
                  timeliness, performance, completeness or suitability of the information and materials offered
                  on this website or through the Services, for any specific purpose. You acknowledge that such
                  information and materials may contain inaccuracies or errors and we expressly exclude
                  liability for any such inaccuracies or errors to the fullest extent permitted by law.
                </li>
                <li>
                  Your use of our Services and the Platform is solely and entirely at your own risk and
                  discretion for which we shall not be liable to you in any manner. You are required to
                  independently assess and ensure that the Services meet your requirements.
                </li>
                <li>
                  The contents of the Platform and the Services are proprietary to us and are licensed to us.
                  You will not have any authority to claim any intellectual property rights, title, or interest in
                  its contents. The contents includes and is not limited to the design, layout, look and graphics.
                </li>
                <li>
                  You acknowledge that unauthorized use of the Platform and/or the Services may lead to
                  action against you as per these Terms of Use and/or applicable laws.
                </li>
                <li>
                  You agree to pay us the charges associated with availing the Services.
                </li>
                <li>
                  You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or
                  forbidden by these Terms, or Indian or local laws that might apply to you.
                </li>
                <li>
                  You agree and acknowledge that website and the Services may contain links to other third
                  party websites. On accessing these links, you will be governed by the terms of use, privacy
                  policy and such other policies of such third party websites. These links are provided for your
                  convenience for provide further information.
                </li>
                <li>
                  You understand that upon initiating a transaction for availing the Services you are entering
                  into a legally binding and enforceable contract with the Platform Owner for the Services.
                </li>
                <li>
                  You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as
                  applicable) and their respective officers, directors, agents, and employees, from any claim or
                  demand, or actions including reasonable attorney&apos;s fees, made by any third party or penalty
                  imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other
                  Policies, or Your violation of any law, rules or regulations or the rights (including
                  infringement of intellectual property rights) of a third party.
                </li>
                <li>
                  Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for
                  any failure to perform an obligation under these Terms if performance is prevented or
                  delayed by a force majeure event.
                </li>
                <li>
                  These Terms and any dispute or claim relating to it, or its enforceability, shall be governed
                  by and construed in accordance with the laws of India.
                </li>
                <li>
                  All disputes arising out of or in connection with these Terms shall be subject to the exclusive
                  jurisdiction of the courts in and .
                </li>
                <li>
                  All concerns or communications relating to these Terms must be communicated to us using
                  the contact information provided on this website.
                </li>
              </ol>
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
