import type { Metadata } from "next";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  ...genMeta({
    title: "Refund and Cancellation Policy | CodeMasti",
    description: "Read CodeMasti's Refund and Cancellation Policy. Learn about our refund process, cancellation terms, and how to request a refund for our coding courses.",
    keywords: [
      "CodeMasti refund policy",
      "cancellation policy",
      "refund process",
      "course refund",
      "coding course cancellation",
    ],
    path: "/refund",
  }),
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Refund and Cancellation Policy", url: `${siteUrl}/refund` },
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
