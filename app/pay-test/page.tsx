"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PayTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(typeof window !== "undefined" ? window.location.origin : null);
  }, []);

  const isLocalhost = origin?.startsWith("http://localhost") ?? false;

  async function handlePay() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/phonepe/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountInPaisa: 100,
          redirectPath: "/pay-test/result",
        }),
      });
      let data: { error?: string; redirectUrl?: string } = {};
      try {
        data = await res.json();
      } catch {
        setError(res.ok ? "Invalid response from server" : `Server error (${res.status}). Check terminal logs for details.`);
        return;
      }
      if (!res.ok) {
        setError(data.error || `Failed to create payment (${res.status})`);
        return;
      }
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      setError("No redirect URL received");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Particles count={20} />

      <nav className="bg-black text-white py-4 px-6 md:px-12 sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="CodeMasti home">
            <Image src="/logoblackbg.png" alt="CodeMasti" width={150} height={40} className="h-8 w-auto object-contain" priority />
            <span className="text-2xl font-bold text-white">CodeMasti</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">About</Link>
            <Link href="/programs" className="text-gray-300 hover:text-yellow-400 transition-colors">Programs</Link>
            <Link href="/register" className="text-gray-300 hover:text-yellow-400 transition-colors">Register</Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <main id="main-content" className="relative z-10 px-4 py-16" role="main">
        <div className="max-w-xl mx-auto space-y-4">
          {isLocalhost && (
            <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-900 text-sm">
              <strong>Localhost detected.</strong> PhonePe production may reject redirects to localhost. For a full test, use this page <strong>after deployment</strong> (HTTPS URL) or use ngrok and set <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_APP_URL</code> to your ngrok URL.
            </div>
          )}

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
              PhonePe payment test
            </h1>
            <p className="text-gray-600 mb-4">
              Use this page <strong>after deployment</strong> to verify the gateway. A <strong>₹1</strong> test payment will redirect you to PhonePe and back here with the result.
            </p>

            {origin && (
              <p className="mb-6 text-sm text-gray-500 font-mono bg-gray-100 rounded-lg px-3 py-2">
                Current URL: {origin}
              </p>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handlePay}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-lg text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
              aria-label="Test payment of 1 rupee"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Redirecting to PhonePe…
                </>
              ) : (
                "Test payment (₹1)"
              )}
            </button>

            <p className="mt-6 text-sm text-gray-500">
              Ensure <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_APP_URL</code> matches your deployed URL (or ngrok when testing locally). See <code className="bg-gray-100 px-1 rounded">PHONEPE_SETUP.md</code> for setup.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
