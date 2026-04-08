import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "dark" | "olive" | "outline";
}

function Badge({ className, variant = "gold", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-[0.6rem] font-body font-semibold uppercase tracking-[0.25em]",
        variant === "gold"    && "bg-[var(--gold)] text-[var(--obsidian)]",
        variant === "dark"    && "bg-[var(--obsidian)] text-[var(--gold)]",
        variant === "olive"   && "bg-[#4a5240] text-[#c8d4b0]",
        variant === "outline" && "border border-[var(--gold)] text-[var(--gold)] bg-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
