import type { Metadata } from "next";
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  ...genMeta({
    title: "Register for CodeMasti Programs | Join the Waitlist | Enroll Now",
    description: "Register for CodeMasti coding programs. Choose from SPARK (Class 5-6), BUILDERS (Class 7-8), or INNOVATORS (Class 9-10) batch. Start your coding journey today with India's most affordable coding education platform!",
    keywords: [
      "register CodeMasti",
      "enroll coding program",
      "join coding waitlist",
      "SPARK program registration",
      "BUILDERS program registration",
      "INNOVATORS program registration",
      "coding course enrollment",
      "coding class registration",
      "sign up coding program",
    ],
    path: "/register",
  }),
};

// Generate structured data for register page
export function generateStructuredData() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Register", url: `${siteUrl}/register` },
  ]);

  return {
    breadcrumb: breadcrumbSchema,
  };
}

export default function RegisterLayout({
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
