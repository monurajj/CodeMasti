import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  title: "Contact CodeMasti | Get in Touch",
  description: "Have questions about CodeMasti? Contact us at info.codemasti@gmail.com. Join our waitlist, learn about programs, or partner with us for school programs.",
  openGraph: {
    title: "Contact CodeMasti | Get in Touch",
    description: "Have questions about CodeMasti? Contact us and join our waitlist for early access.",
    url: `${siteUrl}/contact`,
    images: [`${siteUrl}/logotext.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact CodeMasti | Get in Touch",
    description: "Have questions about CodeMasti? Contact us and join our waitlist for early access.",
    images: [`${siteUrl}/logotext.png`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
