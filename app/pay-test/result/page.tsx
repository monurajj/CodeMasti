"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";
import LoadingSpinner from "@/components/LoadingSpinner";

function ResultContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<{
    state?: string;
    orderId?: string;
    amount?: number;
    message?: string;
    error?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const merchantOrderId = searchParams.get("merchantOrderId");
    if (!merchantOrderId) {
      setStatus({ error: "Missing order ID. Did you come from the test payment page?" });
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/phonepe/status?merchantOrderId=${encodeURIComponent(merchantOrderId)}`);
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setStatus({ error: data.error || "Failed to fetch status" });
          setLoading(false);
          return;
        }
        setStatus({
          state: data.state,
          orderId: data.orderId,
          amount: data.amount ?? data.payableAmount,
          message: data.message,
        });
      } catch (e) {
        if (!cancelled) setStatus({ error: e instanceof Error ? e.message : "Something went wrong" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const isSuccess = status?.state === "COMPLETED";
  const isFailed = status?.state === "FAILED" || status?.error;
  const isPending = status?.state === "PENDING";

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
            <Link href="/pay-test" className="text-yellow-400 font-semibold">Pay test</Link>
            <Link href="/register" className="text-gray-300 hover:text-yellow-400 transition-colors">Register</Link>
          </div>
        </div>
      </nav>

      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <main id="main-content" className="relative z-10 px-4 py-16" role="main">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
              Payment result
            </h1>

            {loading && (
              <div className="flex items-center justify-center gap-2 py-8 text-gray-600">
                <LoadingSpinner size="sm" />
                Checking status…
              </div>
            )}

            {!loading && status && (
              <>
                {status.error && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 mb-6">
                    {status.error}
                  </div>
                )}

                {!status.error && (
                  <div className="space-y-4 mb-6">
                    <div className={`p-4 rounded-xl border-2 ${isSuccess ? "bg-green-50 border-green-200" : isFailed ? "bg-red-50 border-red-200" : isPending ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
                      <p className="font-semibold text-black">
                        {isSuccess && "Payment successful"}
                        {isFailed && "Payment failed or error"}
                        {isPending && "Payment pending"}
                        {!isSuccess && !isFailed && !isPending && `Status: ${status.state}`}
                      </p>
                      {status.state && <p className="text-sm text-gray-600 mt-1">State: {status.state}</p>}
                      {status.amount != null && <p className="text-sm text-gray-600">Amount: ₹{(status.amount / 100).toFixed(2)}</p>}
                      {status.message && <p className="text-sm text-gray-600 mt-1">{status.message}</p>}
                    </div>
                  </div>
                )}

                <Link
                  href="/pay-test"
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
                >
                  Try another test payment
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PayTestResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
