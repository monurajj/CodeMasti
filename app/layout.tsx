import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CodeMasti - Launching Soon | Coding Education for School Students",
    template: "%s | CodeMasti",
  },
  description: "A cost-efficient, future-ready coding education platform for school students from Class 5 to Class 10. Learn to think like a creator, not just consume technology.",
  keywords: [
    "coding education",
    "programming for kids",
    "coding classes for students",
    "Python programming",
    "coding courses India",
    "school coding programs",
    "coding education platform",
    "learn coding online",
    "coding for class 5 to 10",
    "affordable coding courses",
    "coding bootcamp for students",
    "AI readiness",
    "logical thinking",
    "problem solving",
  ],
  authors: [{ name: "CodeMasti Team" }],
  creator: "CodeMasti",
  publisher: "CodeMasti",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "CodeMasti",
    title: "CodeMasti - Launching Soon | Coding Education for School Students",
    description: "A cost-efficient, future-ready coding education platform for school students from Class 5 to Class 10. Learn to think like a creator, not just consume technology.",
    images: [
      {
        url: `${siteUrl}/logotext.png`,
        width: 1200,
        height: 630,
        alt: "CodeMasti - Coding Education Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeMasti - Launching Soon | Coding Education for School Students",
    description: "A cost-efficient, future-ready coding education platform for school students from Class 5 to Class 10.",
    images: [`${siteUrl}/logotext.png`],
    creator: "@codemasti",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
};

// Structured Data (JSON-LD) for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "CodeMasti",
  description: "A cost-efficient, future-ready coding education platform for school students from Class 5 to Class 10",
  url: siteUrl,
  logo: `${siteUrl}/logotext.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "info.codemasti@gmail.com",
    contactType: "Customer Service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    // Add your social media profiles here when available
    // "https://www.facebook.com/codemasti",
    // "https://www.twitter.com/codemasti",
    // "https://www.instagram.com/codemasti",
  ],
  offers: {
    "@type": "Offer",
    description: "Cost-efficient coding education programs for students",
    priceCurrency: "INR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ErrorBoundaryWrapper>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          {children}
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
