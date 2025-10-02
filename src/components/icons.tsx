import type { SVGProps } from 'react';

export function ArgoExplorerLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 20H7" />
      <path d="M17.5 4A2.5 2.5 0 0 1 20 6.5V7" />
      <path d="M4 11V7.5A2.5 2.5 0 0 1 6.5 5" />
      <path d="M11 4h2.5A2.5 2.5 0 0 1 16 6.5V10" />
      <path d="M17 11v2.5A2.5 2.5 0 0 1 14.5 16H11" />
      <path d="M8 20H7.5A2.5 2.5 0 0 1 5 17.5V14" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 14v6" />
      <path d="M12 2v6" />
      <path d="M14 12h6" />
      <path d="M2 12h6" />
    </svg>
  );
}
