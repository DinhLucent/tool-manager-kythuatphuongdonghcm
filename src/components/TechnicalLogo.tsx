import React from 'react';

interface TechnicalLogoProps {
  className?: string;
}

/**
 * Authentic medical equipment engineering mark.
 * Combines an orthogonal calibration reticle with a diagnostic pulse trace,
 * representing biomedical instrumentation, precision optics, and field diagnostics.
 */
export function TechnicalLogo({ className = 'w-4 h-4' }: TechnicalLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Precision reticle marks */}
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      {/* Calibration gauge boundary */}
      <circle cx="12" cy="12" r="7" />
      {/* Diagnostic signal waveform */}
      <path d="M8.5 12h1.5l1-2.5 1.5 5 1-2.5h2" />
    </svg>
  );
}
