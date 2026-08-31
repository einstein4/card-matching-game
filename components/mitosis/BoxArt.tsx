"use client";

import { useId } from "react";
import type { Phase } from "@/lib/mitosisCards";

const CHROMOSOME = "#33333c";
const GUIDE = "#9a9aa2";
const CHROMATIN = "#54545e";
const NUCLEOLUS = "#2c2c33";

function PhaseMarks({ phase }: { phase: Phase }) {
  switch (phase) {
    case "interphase":
      return (
        <>
          <circle cx="88" cy="129" r="54" fill="none" stroke={GUIDE} strokeWidth="1.4" />
          <g fill={CHROMATIN}>
            <circle cx="66" cy="100" r="2.6" />
            <circle cx="58" cy="122" r="2.3" />
            <circle cx="70" cy="146" r="2.5" />
            <circle cx="92" cy="152" r="2.3" />
            <circle cx="112" cy="140" r="2.6" />
            <circle cx="116" cy="116" r="2.3" />
            <circle cx="100" cy="98" r="2.5" />
            <circle cx="80" cy="88" r="2.2" />
            <circle cx="106" cy="164" r="2.2" />
            <circle cx="60" cy="150" r="2.1" />
          </g>
          <circle cx="100" cy="126" r="8.5" fill={NUCLEOLUS} />
        </>
      );
    case "prophase":
      return (
        <>
          <circle
            cx="88"
            cy="129"
            r="48"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M64,104 L52,116 L64,120" />
            <path d="M108,96 L96,84 L114,80" />
            <path d="M110,140 L124,150 L112,156" />
            <path d="M68,150 L58,162 L72,166" />
            <path d="M92,110 L102,122 L90,130" />
          </g>
        </>
      );
    case "metaphase":
      return (
        <>
          <ellipse
            cx="88"
            cy="129"
            rx="30"
            ry="62"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="4.5" strokeLinecap="round">
            <g transform="translate(64,129)">
              <line x1="-8" y1="-8" x2="8" y2="8" />
              <line x1="-8" y1="8" x2="8" y2="-8" />
            </g>
            <g transform="translate(88,129)">
              <line x1="-8" y1="-8" x2="8" y2="8" />
              <line x1="-8" y1="8" x2="8" y2="-8" />
            </g>
            <g transform="translate(112,129)">
              <line x1="-8" y1="-8" x2="8" y2="8" />
              <line x1="-8" y1="8" x2="8" y2="-8" />
            </g>
          </g>
        </>
      );
    case "anaphase":
      return (
        <>
          <ellipse
            cx="88"
            cy="90"
            rx="34"
            ry="20"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <ellipse
            cx="88"
            cy="168"
            rx="34"
            ry="20"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M66,96 L74,80 L82,96" />
            <path d="M86,98 L94,82 L102,98" />
            <path d="M106,96 L114,82 L120,98" />
            <path d="M66,162 L74,178 L82,162" />
            <path d="M86,160 L94,176 L102,160" />
            <path d="M106,162 L114,178 L120,162" />
          </g>
        </>
      );
    case "telophase":
      return (
        <>
          <ellipse
            cx="88"
            cy="86"
            rx="32"
            ry="19"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <ellipse
            cx="88"
            cy="172"
            rx="32"
            ry="19"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="3.6" strokeLinecap="round" fill="none">
            <path d="M70,90 q6,-10 16,-2" />
            <path d="M92,82 q8,-8 18,0" />
            <path d="M70,176 q6,10 16,2" />
            <path d="M92,180 q8,8 18,0" />
          </g>
          <line
            x1="60"
            y1="129"
            x2="116"
            y2="129"
            stroke={CHROMOSOME}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <g stroke={GUIDE} strokeWidth="1.2" strokeDasharray="3 4">
            <line x1="72" y1="105" x2="72" y2="129" />
            <line x1="88" y1="105" x2="88" y2="129" />
            <line x1="104" y1="105" x2="104" y2="129" />
            <line x1="72" y1="129" x2="72" y2="153" />
            <line x1="88" y1="129" x2="88" y2="153" />
            <line x1="104" y1="129" x2="104" y2="153" />
          </g>
        </>
      );
  }
}

const PHASE_LABEL_KO: Record<Phase, string> = {
  interphase: "간기",
  prophase: "전기",
  metaphase: "중기",
  anaphase: "후기",
  telophase: "말기",
};

export function BoxArt({ phase, compact = false }: { phase: Phase; compact?: boolean }) {
  const uid = useId();
  const topId = `top-${uid}`;
  const sideId = `side-${uid}`;
  const clipId = `clip-${uid}`;

  return (
    <svg
      viewBox="0 0 200 230"
      role="img"
      aria-label={`${PHASE_LABEL_KO[phase]} 시기의 세포 관찰 그림`}
      className="block w-full h-auto"
    >
      <defs>
        <linearGradient id={topId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2f2f5" />
          <stop offset="1" stopColor="#cfcfd6" />
        </linearGradient>
        <linearGradient id={sideId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c7c7ce" />
          <stop offset="1" stopColor="#9b9ba5" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="32" y="60" width="112" height="138" rx="4" />
        </clipPath>
      </defs>
      {!compact && (
        <>
          <polygon points="18,46 40,20 182,20 160,46" fill={`url(#${topId})`} stroke="#a9a9b1" />
          <polygon
            points="158,46 182,20 182,186 158,212"
            fill={`url(#${sideId})`}
            stroke="#96969f"
          />
        </>
      )}
      <rect x="18" y="46" width="140" height="166" rx="10" fill="#ffffff" stroke="#a9a9b1" strokeWidth="1.5" />
      <rect x="32" y="60" width="112" height="138" rx="4" fill="#fafafb" stroke="#dcdce0" />
      <g clipPath={`url(#${clipId})`}>
        <PhaseMarks phase={phase} />
      </g>
    </svg>
  );
}
