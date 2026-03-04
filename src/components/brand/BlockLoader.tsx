"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── State machine ─────────────────────────────────────────────────────────────

interface BlockDef {
  l: number; t: number; w: number; h: number; o: number;
}

const GRID = 64;

const STATES: { blocks: BlockDef[] }[] = [
  { blocks: [{ l:8,  t:6,  w:20, h:24, o:0.92 }, { l:8,  t:42, w:46, h:14, o:0.92 }, { l:36, t:6,  w:20, h:32, o:0.12 }] },
  { blocks: [{ l:4,  t:6,  w:16, h:52, o:0.9  }, { l:24, t:6,  w:16, h:52, o:0.9  }, { l:44, t:6,  w:16, h:52, o:0.9  }] },
  { blocks: [{ l:4,  t:6,  w:56, h:14, o:0.9  }, { l:4,  t:24, w:26, h:34, o:0.9  }, { l:34, t:24, w:26, h:34, o:0.9  }] },
  { blocks: [{ l:4,  t:6,  w:26, h:34, o:0.9  }, { l:34, t:6,  w:26, h:34, o:0.9  }, { l:4,  t:44, w:56, h:14, o:0.9  }] },
  { blocks: [{ l:4,  t:6,  w:28, h:52, o:0.9  }, { l:36, t:6,  w:24, h:24, o:0.9  }, { l:36, t:34, w:24, h:24, o:0.9  }] },
];

function blockStyles(b: BlockDef, scale: number, done: boolean): React.CSSProperties {
  const r = scale / GRID;
  return {
    position: "absolute",
    borderRadius: Math.max(2, scale * 0.035),
    background: done ? "#fde99a" : "#e9c96b",
    boxShadow: done ? "0 0 12px 2px #e9c96b55" : undefined,
    left:   b.l * r,
    top:    b.t * r,
    width:  b.w * r,
    height: b.h * r,
    opacity: b.o,
    transition: [
      "left 0.72s cubic-bezier(0.4,0,0.2,1)",
      "top 0.72s cubic-bezier(0.4,0,0.2,1)",
      "width 0.72s cubic-bezier(0.4,0,0.2,1)",
      "height 0.72s cubic-bezier(0.4,0,0.2,1)",
      "opacity 0.72s cubic-bezier(0.4,0,0.2,1)",
      "background 0.5s ease",
      "box-shadow 0.5s ease",
    ].join(", "),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

interface BlockLoaderProps {
  /** Pixel size of the square stage. Default 96. */
  size?: number;
  /** When true, snaps to the logo form and shows a gold glow. */
  done?: boolean;
  /** Interval between state transitions in ms. Default 1800. */
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function BlockLoader({
  size = 96,
  done = false,
  interval = 1800,
  className,
  style,
}: BlockLoaderProps) {
  const [stateIdx, setStateIdx] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Advance state when not done
  useEffect(() => {
    if (done) {
      if (timerRef.current) clearInterval(timerRef.current);
      // Snap to state 0 first, then show glow
      setStateIdx(0);
      const t = setTimeout(() => setShowGlow(true), 750);
      return () => clearTimeout(t);
    }

    setShowGlow(false);
    setStateIdx(0);
    timerRef.current = setInterval(() => {
      setStateIdx(i => (i + 1) % STATES.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [done, interval]);

  const blocks = STATES[stateIdx].blocks;

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        flexShrink: 0,
        width: size,
        height: size,
        ...style,
      }}
    >
      {/* Glow halo */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: -24,
          borderRadius: "50%",
          background: "radial-gradient(circle, #e9c96b22 0%, transparent 70%)",
          opacity: showGlow ? 0.5 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}
      />
      {blocks.map((b, i) => (
        <span key={i} aria-hidden style={blockStyles(b, size, done && showGlow)} />
      ))}
    </span>
  );
}
