import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]":
            variant === "primary",

          "bg-slate-100 text-slate-900 hover:bg-slate-200":
            variant === "secondary",

          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50":
            variant === "outline",
        },
        className,
      )}
      {...props}
    />
  );
}