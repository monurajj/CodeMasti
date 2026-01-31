import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PhonePe Test",
  description: "Test PhonePe payment gateway (₹1) after deployment. CodeMasti.",
  robots: "noindex, nofollow",
};

export default function PayTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
