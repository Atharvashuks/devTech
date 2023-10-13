import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "devTech",
  description:
    "DevTech is the ultimate platform for developers to shine! Showcase your skills, create your personalized profiles, and unlock exciting career opportunities. Whether you're a coding genius or on the lookout for top talent, DevTech connects the tech world like never before.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
