import type { Metadata } from "next";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  ...genMeta({
    title: "Privacy Policy | CodeMasti",
    description: "Read CodeMasti's Privacy Policy. Learn how we collect, use, and protect your personal information when you use our coding education platform.",
    keywords: [
      "CodeMasti privacy policy",
      "data protection",
      "privacy policy",
      "student data privacy",
      "coding education privacy",
    ],
    path: "/privacy",
  }),
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Privacy Policy", url: `${siteUrl}/privacy` },
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
