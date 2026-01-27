import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  title: "About CodeMasti - Our Mission & Vision",
  description: "Learn about CodeMasti's mission to build India's most trusted, affordable, and impact-driven coding education platform. Founded by Aditya Raj and Monu Raj.",
  openGraph: {
    title: "About CodeMasti - Our Mission & Vision",
    description: "Learn about CodeMasti's mission to build India's most trusted, affordable, and impact-driven coding education platform.",
    url: `${siteUrl}/about`,
    images: [`${siteUrl}/logotext.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CodeMasti - Our Mission & Vision",
    description: "Learn about CodeMasti's mission to build India's most trusted, affordable, and impact-driven coding education platform.",
    images: [`${siteUrl}/logotext.png`],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
