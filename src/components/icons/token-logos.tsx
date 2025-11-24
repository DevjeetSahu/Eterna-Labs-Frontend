import React from 'react';

const SvgIcon = ({ children, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

export const TokenAxiom = () => (
  <SvgIcon className="text-primary">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </SvgIcon>
);

export const TokenZenith = () => (
  <SvgIcon className="text-accent">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </SvgIcon>
);

export const TokenNova = () => (
  <SvgIcon className="text-chart-3">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.25l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </SvgIcon>
);

export const TokenOrion = () => (
  <SvgIcon className="text-chart-4">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
  </SvgIcon>
);

export const TokenPulse = () => (
  <SvgIcon className="text-destructive">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </SvgIcon>
);
