"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeSwitcherBtn() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button size="icon-sm" variant="ghost">
        <Sun size={16} />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="icon-sm"
      variant="ghost"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span className="sr-only">Chuyển đổi giao diện</span>
    </Button>
  );
}
