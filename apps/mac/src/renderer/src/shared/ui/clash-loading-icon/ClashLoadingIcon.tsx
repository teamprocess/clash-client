import { useId, type SVGProps } from "react";

export const ClashLoadingIcon = (props: SVGProps<SVGSVGElement>) => {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 159 175" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient
          id={gradientId}
          x1="-72"
          y1="228"
          x2="140"
          y2="8"
          gradientTransform="translate(-160 160)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.32" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="0.56" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="0.68" stopColor="#FFFFFF" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-160 160; 160 -160"
            keyTimes="0; 1"
            calcMode="linear"
            dur="3s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <path
        d="M49.9535 113.023C52.3585 129.533 60.0555 135.24 79.5341 136.201H150.606V175H81.1276C44.336 171.472 23.5483 163.815 12.0673 145.804L49.9535 113.023ZM159 0L131.414 38.313H79.5341C57.6744 40.6218 50.4451 47.8714 49.0658 74.4417V85.8032L3.67339 125.074C1.93727 117.991 0.759982 109.938 0 100.781V70.705C6.45837 21.1398 23.188 5.09413 79.5341 0H159Z"
        fill="#4D4F51"
      />
      <path
        d="M49.9535 113.023C52.3585 129.533 60.0555 135.24 79.5341 136.201H150.606V175H81.1276C44.336 171.472 23.5483 163.815 12.0673 145.804L49.9535 113.023ZM159 0L131.414 38.313H79.5341C57.6744 40.6218 50.4451 47.8714 49.0658 74.4417V85.8032L3.67339 125.074C1.93727 117.991 0.759982 109.938 0 100.781V70.705C6.45837 21.1398 23.188 5.09413 79.5341 0H159Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};
