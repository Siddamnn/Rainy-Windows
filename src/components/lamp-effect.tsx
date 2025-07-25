"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LampEffect() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || theme !== "dark") {
    return null;
  }

  return (
    <div
      className="fixed top-0 right-0 h-96 w-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"
      aria-hidden="true"
    />
  );
}
