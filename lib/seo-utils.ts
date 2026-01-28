/**
 * SEO Utility Functions
 * Provides reusable functions for generating SEO metadata and structured data
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: "website" | "article";
}

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = "/logotext.png",
  type = "website",
}: PageMetadata) {
  const url = path ? `${siteUrl}${path}` : siteUrl;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      type,
      locale: "en_IN",
      url,
      siteName: "CodeMasti",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@codemasti",
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate Course structured data
 */
export function generateCourseSchema({
  name,
  description,
  provider = "CodeMasti",
  courseCode,
  educationalLevel,
  teaches,
  url,
}: {
  name: string;
  description: string;
  provider?: string;
  courseCode: string;
  educationalLevel: string;
  teaches: string[];
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: siteUrl,
    },
    courseCode,
    educationalLevel: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: educationalLevel,
    },
    teaches: teaches,
    url: `${siteUrl}${url}`,
    inLanguage: "en-IN",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/PreOrder",
    },
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate LocalBusiness structured data
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}#organization`,
    name: "CodeMasti",
    image: `${siteUrl}/logotext.png`,
    logo: `${siteUrl}/logotext.png`,
    url: siteUrl,
    telephone: "+91-8228907407",
    email: "info.codemasti@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

/**
 * Generate WebSite structured data with search action
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CodeMasti",
    url: siteUrl,
    description: "A cost-efficient, future-ready coding education platform for school students from Class 5 to Class 10",
    publisher: {
      "@type": "Organization",
      name: "CodeMasti",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logotext.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
