import type { Metadata } from "next";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  ...genMeta({
    title: "About CodeMasti - Our Mission & Vision | Coding Education Platform",
    description: "Learn about CodeMasti's mission to build India's most trusted, affordable, and impact-driven coding education platform. Founded by Aditya Raj and Monu Raj. Discover our teaching approach, vision, and commitment to transforming coding education for students from Class 5 to Class 10.",
    keywords: [
      "about CodeMasti",
      "coding education mission",
      "coding platform India",
      "coding education founders",
      "coding curriculum",
      "coding teaching approach",
      "edtech India",
      "coding education vision",
    ],
    path: "/about",
  }),
};

// Generate structured data for about page
export function generateStructuredData() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "About", url: `${siteUrl}/about` },
  ]);

  return {
    breadcrumb: breadcrumbSchema,
  };
}

export default function AboutLayout({
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
      {children}
    </>
  );
}
