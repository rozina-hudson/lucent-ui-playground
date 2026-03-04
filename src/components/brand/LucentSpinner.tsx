"use client";

import React, { useId } from "react";

const SIZE_MAP = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 72,
} as const;

export type SpinnerSize = keyof typeof SIZE_MAP;

interface LucentSpinnerProps {
  size?: SpinnerSize | number;
  done?: boolean;
  /** Color for the blocks. Defaults to #e9c96b (gold). */
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SPINNER_STYLES = `
@keyframes lucent-sp1 {
  0%, 100% { left: 6%;  top: 6%;  width: 36%; height: 88%; opacity: 0.92; }
  25%       { left: 6%;  top: 6%;  width: 88%; height: 36%; opacity: 0.85; }
  50%       { left: 58%; top: 6%;  width: 36%; height: 88%; opacity: 0.92; }
  75%       { left: 6%;  top: 58%; width: 88%; height: 36%; opacity: 0.85; }
}
@keyframes lucent-sp2 {
  0%, 100% { left: 58%; top: 58%; width: 36%; height: 36%; opacity: 0.5; }
  25%       { left: 6%;  top: 58%; width: 36%; height: 36%; opacity: 0.5; }
  50%       { left: 6%;  top: 6%;  width: 36%; height: 36%; opacity: 0.5; }
  75%       { left: 58%; top: 6%;  width: 36%; height: 36%; opacity: 0.5; }
}
@keyframes lucent-halo {
  0%   { opacity: 0;   transform: scale(0.8); }
  40%  { opacity: 1;   transform: scale(1.1); }
  100% { opacity: 0.5; transform: scale(1.0); }
}
`;

let stylesInjected = false;
function ensureStyles() {
  if (typeof document === "undefined" || stylesInjected) return;
  const el = document.createElement("style");
  el.textContent = SPINNER_STYLES;
  document.head.appendChild(el);
  stylesInjected = true;
}

export function LucentSpinner({
  size = "md",
  done = false,
  color = "#e9c96b",
  className,
  style,
}: LucentSpinnerProps) {
  const sz = typeof size === "number" ? size : SIZE_MAP[size];
  const doneColor = "#fde99a";
  const glowColor = "#e9c96b66";

  // Inject global keyframes once
  React.useEffect(() => {
    ensureStyles();
  }, []);

  const blockBase: React.CSSProperties = {
    position: "absolute",
    borderRadius: 2,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  // Done state: logo-like form (tall left block + wide bottom bar)
  const sp1Done: React.CSSProperties = {
    ...blockBase,
    left: "6%", top: "6%", width: "36%", height: "52%",
    background: doneColor,
    boxShadow: `0 0 8px 2px ${glowColor}`,
    animation: "none",
    opacity: 1,
  };
  const sp2Done: React.CSSProperties = {
    ...blockBase,
    left: "6%", top: "62%", width: "88%", height: "32%",
    background: doneColor,
    boxShadow: `0 0 8px 2px ${glowColor}`,
    animation: "none",
    opacity: 0.92,
  };

  const sp1Anim: React.CSSProperties = {
    ...blockBase,
    background: color,
    animation: "lucent-sp1 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
  };
  const sp2Anim: React.CSSProperties = {
    ...blockBase,
    background: color,
    animation: "lucent-sp2 1.2s cubic-bezier(0.4,0,0.2,1) infinite",
  };

  const haloStyle: React.CSSProperties | undefined = done ? {
    content: "''",
    position: "absolute",
    inset: -sz * 0.22,
    borderRadius: "50%",
    background: "radial-gradient(circle, #e9c96b22 0%, transparent 70%)",
    animation: "lucent-halo 1.4s ease-in-out 1 forwards",
    pointerEvents: "none",
  } : undefined;

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        flexShrink: 0,
        width: sz,
        height: sz,
        ...style,
      }}
    >
      {done && (
        <span style={haloStyle} aria-hidden />
      )}
      <span style={done ? sp1Done : sp1Anim} aria-hidden />
      <span style={done ? sp2Done : sp2Anim} aria-hidden />
    </span>
  );
}
