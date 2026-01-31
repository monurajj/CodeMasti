"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Particles from "@/components/Particles";
import LoadingSpinner from "@/components/LoadingSpinner";

const PENDING_STORAGE_PREFIX = "pending_register_";

function ResultContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"checking" | "payment_status" | "completing" | "done">("checking");
  const [paymentState, setPaymentState] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [merchantOrderId, setMerchantOrderId] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams.get("merchantOrderId");
    if (!orderId) {
      setPaymentError("Missing order ID. Please complete registration from the Register page.");
      setStep("done");
      return;
    }
    setMerchantOrderId(orderId);

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/phonepe/status?merchantOrderId=${encodeURIComponent(orderId)}`);
        const data = await res.json();
        if (cancelled) return;

        if (!res.ok) {
          setPaymentError(data.error || "Could not verify payment.");
          setStep("done");
          return;
        }

        setPaymentState(data.state ?? "UNKNOWN");

        if (data.state === "COMPLETED") {
          setStep("completing");
          const raw = typeof window !== "undefined" ? sessionStorage.getItem(`${PENDING_STORAGE_PREFIX}${orderId}`) : null;
          const formData = raw ? (() => {
            try {
              return JSON.parse(raw) as { name?: string; email?: string; phone?: string; studentClass?: string; batch?: string };
            } catch {
              return null;
            }
          })() : null;

          if (!formData?.name || !formData?.email || !formData?.phone || !formData?.studentClass || !formData?.batch) {
            setRegisterError("Registration data was not found. Please contact us with your payment reference.");
            setStep("done");
            return;
          }

          const registerRes = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, paymentMerchantOrderId: orderId }),
          });
          const registerData = await registerRes.json();
          if (cancelled) return;

          try {
            sessionStorage.removeItem(`${PENDING_STORAGE_PREFIX}${orderId}`);
          } catch {
            // ignore
          }

          if (registerRes.ok && registerData.success !== false) {
            setRegisterSuccess(true);
            try {
              localStorage.removeItem("codemasti_register_form_data");
            } catch {
              // ignore
            }
          } else {
            setRegisterError(registerData.error || "Registration could not be completed. We have recorded your payment; we will contact you.");
          }
          setStep("done");
          return;
        }

        if (data.state === "FAILED" || data.state === "PENDING") {
          setStep("done");
          return;
        }

        setStep("done");
      } catch (e) {
        if (!cancelled) {
          setPaymentError(e instanceof Error ? e.message : "Something went wrong");
          setStep("done");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  const isPaymentSuccess = paymentState === "COMPLETED";
  const isPaymentFailed = paymentState === "FAILED" || paymentError;
  const isPaymentPending = paymentState === "PENDING";

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
            <Link href="/register" className="text-yellow-400 font-semibold">Register</Link>
            <Link href="/programs" className="text-gray-300 hover:text-yellow-400 transition-colors">Programs</Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <main id="main-content" className="relative z-10 px-4 py-16" role="main">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
              {step === "checking" || step === "completing" ? "Please wait…" : "Registration result"}
            </h1>

            {(step === "checking" || step === "completing") && (
              <div className="flex items-center justify-center gap-2 py-8 text-gray-600">
                <LoadingSpinner size="sm" />
                <span>{step === "checking" ? "Verifying payment…" : "Confirming your slot…"}</span>
              </div>
            )}

            {step === "done" && (
              <>
                {paymentError && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 mb-6">
                    {paymentError}
                  </div>
                )}

                {!paymentError && isPaymentFailed && (
                  <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 mb-6">
                    <p className="font-semibold text-black">Payment failed or was cancelled</p>
                    <p className="text-sm text-gray-600 mt-1">Your slot was not booked. You can try again from the Register page.</p>
                  </div>
                )}

                {!paymentError && isPaymentPending && (
                  <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200 mb-6">
                    <p className="font-semibold text-black">Payment pending</p>
                    <p className="text-sm text-gray-600 mt-1">We will confirm your slot once the payment is successful. You can also try again from the Register page.</p>
                  </div>
                )}

                {!paymentError && isPaymentSuccess && (
                  <div className="space-y-4 mb-6">
                    {registerError ? (
                      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
                        <p className="font-semibold text-black">Payment successful</p>
                        <p className="text-sm text-gray-600 mt-1">{registerError}</p>
                        {merchantOrderId && (
                          <p className="text-xs text-gray-500 mt-2">Payment reference: {merchantOrderId}</p>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200">
                        <p className="font-semibold text-black">Slot booked successfully</p>
                        <p className="text-sm text-gray-600 mt-1">Check your email for confirmation and next steps. We will be in touch soon.</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-black bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
                  >
                    {isPaymentSuccess && !registerError ? "Back to Register" : "Try again"}
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                  >
                    Home
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function RegisterResultPage() {
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
