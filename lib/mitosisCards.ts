export type Phase = "interphase" | "prophase" | "metaphase" | "anaphase" | "telophase";

export const PHASES: { id: Phase; label: string; labelEn: string }[] = [
  { id: "interphase", label: "간기", labelEn: "Interphase" },
  { id: "prophase", label: "전기", labelEn: "Prophase" },
  { id: "metaphase", label: "중기", labelEn: "Metaphase" },
  { id: "anaphase", label: "후기", labelEn: "Anaphase" },
  { id: "telophase", label: "말기", labelEn: "Telophase" },
];

export type MitosisCard =
  | { id: string; phase: Phase; kind: "image" }
  | { id: string; phase: Phase; kind: "content"; text: string };

export const MITOSIS_CARDS: MitosisCard[] = [
  { id: "img-interphase", phase: "interphase", kind: "image" },
  { id: "img-prophase", phase: "prophase", kind: "image" },
  { id: "img-metaphase", phase: "metaphase", kind: "image" },
  { id: "img-anaphase", phase: "anaphase", kind: "image" },
  { id: "img-telophase", phase: "telophase", kind: "image" },

  { id: "txt-interphase-1", phase: "interphase", kind: "content", text: "핵막이 뚜렷함" },
  { id: "txt-interphase-2", phase: "interphase", kind: "content", text: "DNA 복제" },

  { id: "txt-prophase-1", phase: "prophase", kind: "content", text: "핵막이 사라짐" },
  { id: "txt-prophase-2", phase: "prophase", kind: "content", text: "막대 모양 염색체 나타남" },
  { id: "txt-prophase-3", phase: "prophase", kind: "content", text: "방추사가 형성됨" },

  { id: "txt-metaphase-1", phase: "metaphase", kind: "content", text: "염색체가 세포의 중앙에 배열됨" },
  { id: "txt-metaphase-2", phase: "metaphase", kind: "content", text: "염색체 관찰하기 좋은 시기" },
  { id: "txt-metaphase-3", phase: "metaphase", kind: "content", text: "세포주기 중 가장 짧음" },

  { id: "txt-anaphase-1", phase: "anaphase", kind: "content", text: "염색 분체 분리" },

  { id: "txt-telophase-1", phase: "telophase", kind: "content", text: "핵막 나타남" },
  { id: "txt-telophase-2", phase: "telophase", kind: "content", text: "염색사의 형태로" },
  { id: "txt-telophase-3", phase: "telophase", kind: "content", text: "세포질 분열 시작" },
];

export const PHASE_TOTALS: Record<Phase, number> = MITOSIS_CARDS.reduce(
  (acc, card) => {
    acc[card.phase] += 1;
    return acc;
  },
  { interphase: 0, prophase: 0, metaphase: 0, anaphase: 0, telophase: 0 } as Record<Phase, number>,
);

export function shuffledDeck(): MitosisCard[] {
  const deck = [...MITOSIS_CARDS];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// 0초=5점 → 3초=1점 선형 감소, 3초 이후 최소 1점 유지.
export function pointsForElapsed(elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) return 5;
  if (elapsedSeconds >= 3) return 1;
  return Math.round(5 - (4 / 3) * elapsedSeconds);
}
