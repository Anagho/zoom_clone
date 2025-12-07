import React, { ReactNode } from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "conferex",
  description: "conferex online meeting platform",
  icons: {
    icon: "/icons/icon.png",
  },
};


const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
