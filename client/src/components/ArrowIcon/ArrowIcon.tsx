import type { SVGProps } from "react";

const PATHS = {
  right:
    "M27.6925 35.2271L26.0615 33.6461L34.654 25.0541H9V22.7846H34.654L26.031 14.1616L27.6615 12.5811L39 23.9191L27.6925 35.2271Z",
  left: "M19.9037 35.3076L8.5957 24.0001L19.9342 12.6616L21.5652 14.2426L12.9417 22.8656H39.4342V25.1346H12.9417L21.5342 33.7271L19.9037 35.3076Z",
} as const;

type ArrowDirection = keyof typeof PATHS;

type ArrowIconProps = SVGProps<SVGSVGElement> & {
  direction?: ArrowDirection;
  size?: number;
};

export default function ArrowIcon({
  direction = "right",
  size = 24,
  ...rest
}: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[direction]} />
    </svg>
  );
}
