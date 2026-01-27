import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  title: "Our Programs - SPARK, BUILDERS & INNOVATORS | CodeMasti",
  description: "Explore CodeMasti's structured learning programs: SPARK (Class 5-6), BUILDERS (Class 7-8), and INNOVATORS (Class 9-10). Age-appropriate coding curriculum for Indian students.",
  keywords: [
    "SPARK program",
    "BUILDERS program",
    "INNOVATORS program",
    "coding curriculum",
    "Python programming course",
    "coding classes for kids",
  ],
  openGraph: {
    title: "Our Programs - SPARK, BUILDERS & INNOVATORS | CodeMasti",
    description: "Explore CodeMasti's structured learning programs: SPARK (Class 5-6), BUILDERS (Class 7-8), and INNOVATORS (Class 9-10).",
    url: `${siteUrl}/programs`,
    images: [`${siteUrl}/logotext.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Programs - SPARK, BUILDERS & INNOVATORS | CodeMasti",
    description: "Explore CodeMasti's structured learning programs for students from Class 5 to Class 10.",
    images: [`${siteUrl}/logotext.png`],
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
