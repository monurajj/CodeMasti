import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codemasti.com";

export const metadata: Metadata = {
  title: "Register for CodeMasti Programs | Join the Waitlist",
  description: "Register for CodeMasti coding programs. Choose from SPARK, BUILDERS, or INNOVATORS batch. Start your coding journey today!",
  openGraph: {
    title: "Register for CodeMasti Programs | Join the Waitlist",
    description: "Register for CodeMasti coding programs. Choose from SPARK, BUILDERS, or INNOVATORS batch.",
    url: `${siteUrl}/register`,
    images: [`${siteUrl}/logotext.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register for CodeMasti Programs | Join the Waitlist",
    description: "Register for CodeMasti coding programs and start your coding journey today!",
    images: [`${siteUrl}/logotext.png`],
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
