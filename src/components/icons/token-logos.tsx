import React from 'react';

const SvgIcon = ({ children, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
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

export const PumpFunLogo = ({ className }: { className?: string }) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.99999 1.16666C3.78166 1.16666 1.16666 3.78166 1.16666 6.99999C1.16666 10.2183 3.78166 12.8333 6.99999 12.8333C10.2183 12.8333 12.8333 10.2183 12.8333 6.99999C12.8333 3.78166 10.2183 1.16666 6.99999 1.16666Z"
        fill="#FBBF24"
      ></path>
      <path
        d="M7.00001 4.08331C8.21667 4.08331 9.20417 5.07081 9.20417 6.28748C9.20417 6.94164 8.89417 7.52498 8.41167 7.92498L8.14084 8.15414L6.41667 9.87498V10.5H7.58334V8.75414L8.80834 7.52914C9.22917 7.14914 9.49584 6.63331 9.49584 6.06664C9.49584 4.90414 8.64917 4.05831 7.58334 4.05831C6.54584 4.05831 5.67084 4.88331 5.67084 5.83331H4.95834C4.95834 4.54581 5.86251 3.58331 7.00001 4.08331Z"
        fill="white"
      ></path>
    </svg>
  );
