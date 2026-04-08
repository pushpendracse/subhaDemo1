"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-body font-medium tracking-widest uppercase transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
          // variants
          variant === "gold" && [
            "bg-[var(--gold)] text-[var(--obsidian)] hover:bg-[var(--gold-dark)] hover:text-white",
            "before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-110%] hover:before:translate-x-[110%] before:transition-transform before:duration-500 before:skew-x-[-12deg]",
          ],
          variant === "outline" && "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)]",
          variant === "dark"    && "bg-[var(--obsidian)] text-[var(--gold)] border border-[var(--charcoal)] hover:border-[var(--gold)]",
          variant === "ghost"   && "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
          // sizes
          size === "sm" && "text-[0.6rem] px-5 py-2.5 letter-spacing-widest",
          size === "md" && "text-[0.65rem] px-8 py-3.5",
          size === "lg" && "text-[0.7rem] px-12 py-4",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
