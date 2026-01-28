import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo-utils";
import { generateCourseSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  ...genMeta({
    title: "Our Programs - SPARK, BUILDERS & INNOVATORS | CodeMasti Coding Courses",
    description: "Explore CodeMasti's structured learning programs: SPARK (Class 5-6), BUILDERS (Class 7-8), and INNOVATORS (Class 9-10). Age-appropriate coding curriculum with Python programming, logical thinking, and AI readiness for Indian students.",
    keywords: [
      "SPARK program",
      "BUILDERS program",
      "INNOVATORS program",
      "coding curriculum",
      "Python programming course",
      "coding classes for kids",
      "coding programs Class 5-10",
      "Python for beginners",
      "coding course structure",
      "coding learning path",
      "age-appropriate coding",
      "coding curriculum India",
    ],
    path: "/programs",
  }),
};

// Generate structured data for programs
export function generateStructuredData() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Programs", url: `${siteUrl}/programs` },
  ]);

  const sparkCourseSchema = generateCourseSchema({
    name: "SPARK Program - Coding for Class 5-6",
    description: "Ignite curiosity & remove fear of coding. Foundation stage introducing students to coding through fun, interactive activities.",
    courseCode: "SPARK",
    educationalLevel: "Elementary",
    teaches: [
      "Logical thinking",
      "Visual programming",
      "Flowcharts",
      "Creative problem solving",
      "How computers think",
    ],
    url: "/programs?batch=spark",
  });

  const buildersCourseSchema = generateCourseSchema({
    name: "BUILDERS Program - Coding for Class 7-8",
    description: "Build strong coding foundations with Python. Learn core concepts through hands-on projects and challenges.",
    courseCode: "BUILDERS",
    educationalLevel: "Middle School",
    teaches: [
      "Python fundamentals",
      "Conditions and loops",
      "Functions",
      "Mini projects",
      "AI concepts (conceptual)",
    ],
    url: "/programs?batch=builders",
  });

  const innovatorsCourseSchema = generateCourseSchema({
    name: "INNOVATORS Program - Coding for Class 9-10",
    description: "Apply coding skills to solve real-world problems. Explore AI tools and prepare for future tech careers.",
    courseCode: "INNOVATORS",
    educationalLevel: "High School",
    teaches: [
      "Advanced Python",
      "Project-based learning",
      "AI tools and automation",
      "Career awareness",
      "Tech exposure",
    ],
    url: "/programs?batch=innovators",
  });

  return {
    breadcrumb: breadcrumbSchema,
    courses: [sparkCourseSchema, buildersCourseSchema, innovatorsCourseSchema],
  };
}

export default function ProgramsLayout({
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
      {structuredData.courses.map((course, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }}
        />
      ))}
      {children}
    </>
  );
}
