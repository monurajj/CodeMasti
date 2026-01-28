import type { Metadata } from "next";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  ...genMeta({
    title: "Terms & Conditions | CodeMasti",
    description: "Read CodeMasti's Terms & Conditions. Understand the terms of use, user obligations, and policies governing the use of our coding education platform.",
    keywords: [
      "CodeMasti terms and conditions",
      "terms of use",
      "user agreement",
      "platform terms",
      "coding education terms",
    ],
    path: "/terms",
  }),
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Terms & Conditions", url: `${siteUrl}/terms` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
