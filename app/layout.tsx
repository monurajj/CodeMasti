import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ErrorBoundaryWrapper from "@/components/ErrorBoundaryWrapper";
import WhatsAppButton from "@/components/WhatsAppButton";
import { generateWebSiteSchema, generateLocalBusinessSchema } from "@/lib/seo-utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CodeMasti | Coding Education for School Students",
    template: "%s | CodeMasti",
  },
  description: "Coding classes for kids in Class 5 to 10. Affordable, small batches, real projects. Logic first—then code. Think. Solve. Create.",
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
    "coding classes for children",
    "online coding courses",
    "coding for beginners",
    "programming classes India",
    "coding school",
    "edtech India",
    "coding curriculum",
    "Python for kids",
    "coding training",
    "computer programming classes",
    "coding academy",
    "learn programming online",
    "coding tutor",
    "programming education",
    "coding skills",
    "tech education",
    "future-ready education",
    "coding foundation",
    "programming fundamentals",
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
    title: "CodeMasti | Coding Education for School Students",
    description: "Coding classes for kids in Class 5 to 10. Affordable, small batches, real projects. Logic first—then code.",
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
    title: "CodeMasti | Coding Education for School Students",
    description: "Coding classes for kids in Class 5 to 10. Affordable, small batches, real projects.",
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
    icon: [
      { url: "/logoimage.png", sizes: "32x32", type: "image/png" },
      { url: "/logoimage.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logoimage.png",
    apple: "/logoimage.png",
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
  alternateName: "CodeMasti - Coding Education Platform",
  description: "Coding classes for kids in Class 5 to 10. Affordable, small batches, real projects. Logic first—then code.",
  url: siteUrl,
  logo: `${siteUrl}/logotext.png`,
  image: `${siteUrl}/logotext.png`,
  foundingDate: "2024",
  founder: [
    {
      "@type": "Person",
      name: "Aditya Raj",
    },
    {
      "@type": "Person",
      name: "Monu Raj",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "info.codemasti@gmail.com",
    telephone: "+91-8228907407",
    contactType: "Customer Service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "403, Amrapali Dream Valley, Techzone IV",
    addressLocality: "Greater Noida",
    addressRegion: "Gautam Buddha Nagar",
    postalCode: "201318",
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
    description: "Cost-efficient coding education programs for students from Class 5 to Class 10",
    priceCurrency: "INR",
    availability: "https://schema.org/PreOrder",
  },
  educationalCredentialAwarded: "Certificate",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "CodeMasti Programs",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "SPARK Program",
        description: "Coding program for Class 5-6 students",
      },
      {
        "@type": "OfferCatalog",
        name: "BUILDERS Program",
        description: "Coding program for Class 7-8 students",
      },
      {
        "@type": "OfferCatalog",
        name: "INNOVATORS Program",
        description: "Coding program for Class 9-10 students",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ErrorBoundaryWrapper>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          {children}
          <WhatsAppButton />
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
