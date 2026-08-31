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
          <circle cx="88" cy="140" r="54" fill="none" stroke={GUIDE} strokeWidth="1.4" />
          <g fill={CHROMATIN}>
            <circle cx="66" cy="111" r="2.6" />
            <circle cx="58" cy="133" r="2.3" />
            <circle cx="70" cy="157" r="2.5" />
            <circle cx="92" cy="163" r="2.3" />
            <circle cx="112" cy="151" r="2.6" />
            <circle cx="116" cy="127" r="2.3" />
            <circle cx="100" cy="109" r="2.5" />
            <circle cx="80" cy="99" r="2.2" />
            <circle cx="106" cy="175" r="2.2" />
            <circle cx="60" cy="161" r="2.1" />
          </g>
          <circle cx="100" cy="137" r="8.5" fill={NUCLEOLUS} />
        </>
      );
    case "prophase":
      return (
        <>
          <circle
            cx="88"
            cy="140"
            r="48"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M64,115 L52,127 L64,131" />
            <path d="M108,107 L96,95 L114,91" />
            <path d="M110,151 L124,161 L112,167" />
            <path d="M68,161 L58,173 L72,177" />
            <path d="M92,121 L102,133 L90,141" />
          </g>
        </>
      );
    case "metaphase":
      return (
        <>
          <ellipse
            cx="88"
            cy="140"
            rx="30"
            ry="62"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="4.5" strokeLinecap="round">
            <g transform="translate(64,140)">
              <line x1="-8" y1="-8" x2="8" y2="8" />
              <line x1="-8" y1="8" x2="8" y2="-8" />
            </g>
            <g transform="translate(88,140)">
              <line x1="-8" y1="-8" x2="8" y2="8" />
              <line x1="-8" y1="8" x2="8" y2="-8" />
            </g>
            <g transform="translate(112,140)">
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
            cy="101"
            rx="34"
            ry="20"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <ellipse
            cx="88"
            cy="179"
            rx="34"
            ry="20"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M66,107 L74,91 L82,107" />
            <path d="M86,109 L94,93 L102,109" />
            <path d="M106,107 L114,93 L120,109" />
            <path d="M66,173 L74,189 L82,173" />
            <path d="M86,171 L94,187 L102,171" />
            <path d="M106,173 L114,189 L120,173" />
          </g>
        </>
      );
    case "telophase":
      return (
        <>
          <ellipse
            cx="88"
            cy="97"
            rx="32"
            ry="19"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <ellipse
            cx="88"
            cy="183"
            rx="32"
            ry="19"
            fill="none"
            stroke={GUIDE}
            strokeWidth="1.4"
            strokeDasharray="5 5"
          />
          <g stroke={CHROMOSOME} strokeWidth="3.6" strokeLinecap="round" fill="none">
            <path d="M70,101 q6,-10 16,-2" />
            <path d="M92,93 q8,-8 18,0" />
            <path d="M70,187 q6,10 16,2" />
            <path d="M92,191 q8,8 18,0" />
          </g>
          <line
            x1="60"
            y1="140"
            x2="116"
            y2="140"
            stroke={CHROMOSOME}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <g stroke={GUIDE} strokeWidth="1.2" strokeDasharray="3 4">
            <line x1="72" y1="116" x2="72" y2="140" />
            <line x1="88" y1="116" x2="88" y2="140" />
            <line x1="104" y1="116" x2="104" y2="140" />
            <line x1="72" y1="140" x2="72" y2="164" />
            <line x1="88" y1="140" x2="88" y2="164" />
            <line x1="104" y1="140" x2="104" y2="164" />
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

// 실제 카드(포커 카드 5:7 비율) 크기에 맞춘 200x280 뷰박스.
export function BoxArt({ phase }: { phase: Phase }) {
  const uid = useId();
  const clipId = `clip-${uid}`;

  return (
    <svg
      viewBox="0 0 200 280"
      role="img"
      aria-label={`${PHASE_LABEL_KO[phase]} 시기의 세포 관찰 그림`}
      className="block w-full h-auto"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="32" y="71" width="112" height="138" rx="4" />
        </clipPath>
      </defs>
      <rect x="8" y="8" width="184" height="264" rx="16" fill="#ffffff" stroke="#a9a9b1" strokeWidth="1.5" />
      <rect x="32" y="71" width="112" height="138" rx="4" fill="#fafafb" stroke="#dcdce0" />
      <g clipPath={`url(#${clipId})`}>
        <PhaseMarks phase={phase} />
      </g>
    </svg>
  );
}
