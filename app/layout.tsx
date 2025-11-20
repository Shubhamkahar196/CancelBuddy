import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Cancel Buddy",
  description: "CancelBuddy — Remind users to cancel unused subscriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <body>
        {children}
      </body>
    </html>
  );
}
