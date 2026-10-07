import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  children?: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  type = "button",
  ...props
}: Props) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
    size === "sm" && "h-9 px-3.5 text-sm rounded-[10px]",
    size === "md" && "h-11 px-5 text-sm rounded-[10px]",
    size === "lg" && "h-12 px-6 text-[15px] rounded-[10px]",
    variant === "primary" && "bg-accent text-white hover:bg-accent-2",
    variant === "secondary" &&
      "border border-line-strong bg-card text-accent hover:bg-canvas-2",
    variant === "ghost" && "text-ink hover:bg-canvas-2",
    variant === "dark" && "bg-white text-navy hover:bg-slate-100",
    className,
  );

  if (href) {
    const onClick = props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement> | undefined;
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
