import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./Container.module.scss";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

export default function Container({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={`${styles.container} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
