import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./Button.module.scss";

type CommonProps = {
  variant?: "light" | "dark" | "outline" | "outlineLight";
  size?: "md" | "sm";
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ as?: "a" } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as: "button" } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

/** Link (padrão) ou <button> nativo (as="button") com o mesmo visual. */
export default function Button({
  as = "a",
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

  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowIcon size={26} className={styles.arrow} />}
    </>
  );

  if (as === "button") {
    return (
      <button
        type="button"
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  const { href = "#", ...anchorRest } =
    rest as AnchorHTMLAttributes<HTMLAnchorElement>;

  return (
    <a href={href} className={classes} {...anchorRest}>
      {content}
    </a>
  );
}
