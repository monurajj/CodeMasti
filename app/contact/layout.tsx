import type { Metadata } from "next";
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  ...genMeta({
    title: "Contact CodeMasti | Get in Touch | Join Waitlist",
    description: "Have questions about CodeMasti? Contact us at info.codemasti@gmail.com or call +91-8228907407. Join our waitlist, learn about programs, get pricing information, or partner with us for school programs. We're here to help!",
    keywords: [
      "contact CodeMasti",
      "CodeMasti email",
      "CodeMasti phone number",
      "join CodeMasti waitlist",
      "coding program inquiry",
      "school partnership",
      "coding course information",
      "CodeMasti support",
    ],
    path: "/contact",
  }),
};

// Generate structured data for contact page
export function generateStructuredData() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Contact", url: `${siteUrl}/contact` },
  ]);

  const faqSchema = generateFAQSchema([
    {
      question: "When will CodeMasti launch?",
      answer: "We're currently in development and will launch soon. Join our waitlist to be notified when we go live!",
    },
    {
      question: "What age groups do you serve?",
      answer: "We offer programs for students from Class 5 to Class 10 (ages 10-16).",
    },
    {
      question: "How much will it cost?",
      answer: "We're committed to cost-efficient pricing for Indian families. Details will be announced at launch.",
    },
    {
      question: "Do you offer school partnerships?",
      answer: "Yes! Contact us to discuss partnership opportunities for your school.",
    },
    {
      question: "What programming languages do you teach?",
      answer: "Our curriculum focuses on Python programming, starting with logical thinking and visual programming for younger students, and progressing to advanced Python concepts for older students.",
    },
    {
      question: "Are the classes online or offline?",
      answer: "CodeMasti offers live interactive online sessions, making quality coding education accessible to students across India.",
    },
  ]);

  return {
    breadcrumb: breadcrumbSchema,
    faq: faqSchema,
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.faq) }}
      />
      {children}
    </>
  );
}
