import type { AnchorHTMLAttributes, ReactNode } from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./Button.module.scss";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  variant?: "light" | "outline" | "outlineLight";
  size?: "md" | "sm";
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Button({
  href = "#",
  variant = "light",
  size = "md",
  withArrow = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes} {...rest}>
      <span>{children}</span>
      {withArrow && <ArrowIcon size={26} className={styles.arrow} />}
    </a>
  );
}
