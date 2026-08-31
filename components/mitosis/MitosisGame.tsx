"use client";

import { useEffect, useRef, useState } from "react";
import {
  MITOSIS_CARDS,
  PHASES,
  PHASE_TOTALS,
  pointsForElapsed,
  shuffledDeck,
  type MitosisCard,
  type Phase,
} from "@/lib/mitosisCards";
import { BoxArt } from "./BoxArt";

type Status = "idle" | "playing" | "finished";

type Placed = Record<Phase, MitosisCard[]>;
type PhaseStats = Record<Phase, { total: number; firstTry: number }>;

type Flash = {
  id: number;
  wrongPhase?: Phase;
  hintPhase?: Phase;
  correctPhase?: Phase;
};

function emptyPlaced(): Placed {
  return {
    interphase: [],
    prophase: [],
    metaphase: [],
    anaphase: [],
    telophase: [],
  };
}

function emptyStats(): PhaseStats {
  return {
    interphase: { total: 0, firstTry: 0 },
    prophase: { total: 0, firstTry: 0 },
    metaphase: { total: 0, firstTry: 0 },
    anaphase: { total: 0, firstTry: 0 },
    telophase: { total: 0, firstTry: 0 },
  };
}

const RESOLVE_ANIMATION_MS = 550;
const WRONG_FLASH_MS = 650;

export function MitosisGame() {
  const [status, setStatus] = useState<Status>("idle");
  const [deck, setDeck] = useState<MitosisCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStart, setCardStart] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [resolvingPhase, setResolvingPhase] = useState<Phase | null>(null);
  const [score, setScore] = useState(0);
  const [lastGain, setLastGain] = useState<number | null>(null);
  const [placed, setPlaced] = useState<Placed>(emptyPlaced());
  const [phaseStats, setPhaseStats] = useState<PhaseStats>(emptyStats());
  const [flash, setFlash] = useState<Flash | null>(null);
  const [potential, setPotential] = useState(5);

  const flashIdRef = useRef(0);

  const currentCard = status === "playing" ? deck[currentIndex] : undefined;

  // 활성 카드가 있는 동안 지금 맞히면 받을 점수를 실시간으로 갱신한다.
  useEffect(() => {
    if (status !== "playing" || resolvingPhase || !currentCard) return;
    const tick = () => {
      const elapsed = (Date.now() - cardStart) / 1000;
      setPotential(pointsForElapsed(elapsed));
    };
    tick();
    const interval = setInterval(tick, 100);
    return () => clearInterval(interval);
  }, [status, resolvingPhase, currentCard, cardStart]);

  function startGame() {
    setDeck(shuffledDeck());
    setStatus("playing");
    setCurrentIndex(0);
    setCardStart(Date.now());
    setWrongCount(0);
    setScore(0);
    setLastGain(null);
    setPlaced(emptyPlaced());
    setPhaseStats(emptyStats());
    setResolvingPhase(null);
    setFlash(null);
  }

  function handleSlotClick(phase: Phase) {
    if (status !== "playing" || resolvingPhase || !currentCard) return;

    if (phase === currentCard.phase) {
      const elapsed = (Date.now() - cardStart) / 1000;
      const pts = pointsForElapsed(elapsed);
      setScore((s) => s + pts);
      setLastGain(pts);
      setPlaced((prev) => ({ ...prev, [phase]: [...prev[phase], currentCard] }));
      setPhaseStats((prev) => ({
        ...prev,
        [phase]: {
          total: prev[phase].total + 1,
          firstTry: prev[phase].firstTry + (wrongCount === 0 ? 1 : 0),
        },
      }));
      const id = ++flashIdRef.current;
      setFlash({ id, correctPhase: phase });
      setResolvingPhase(phase);

      const next = currentIndex + 1;
      window.setTimeout(() => {
        setResolvingPhase(null);
        setFlash((f) => (f && f.id === id ? null : f));
        if (next >= deck.length) {
          setStatus("finished");
          return;
        }
        setCurrentIndex(next);
        setCardStart(Date.now());
        setWrongCount(0);
      }, RESOLVE_ANIMATION_MS);
    } else {
      setScore((s) => Math.max(0, s - 1));
      setWrongCount((c) => c + 1);
      const id = ++flashIdRef.current;
      setFlash({ id, wrongPhase: phase, hintPhase: currentCard.phase });
      window.setTimeout(() => {
        setFlash((f) => (f && f.id === id ? null : f));
      }, WRONG_FLASH_MS);
    }
  }

  const totalCards = MITOSIS_CARDS.length;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          체세포분열 카드 매칭
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          카드를 보고 알맞은 시기 슬롯을 클릭하세요. 빠를수록 높은 점수를 받습니다.
        </p>
      </header>

      <SlotRow
        placed={placed}
        flash={flash}
        resolvingPhase={resolvingPhase}
        lastGain={lastGain}
        onSlotClick={handleSlotClick}
      />

      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
        <span className="font-mono">
          점수 <span className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{score}</span>
        </span>
        {status === "playing" && (
          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
            카드 {Math.min(currentIndex + 1, totalCards)}/{totalCards}
          </span>
        )}
      </div>

      <main className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        {status === "idle" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              그림 카드 5장과 특징 문장 카드 12장, 총 17장이 무작위 순서로 등장합니다. 시기 이름은
              가려져 있으니 염색체 모양이나 문장만 보고 판단하세요.
            </p>
            <button
              onClick={startGame}
              className="rounded-full bg-amber-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-700"
            >
              시작하기
            </button>
          </div>
        )}

        {status === "playing" && currentCard && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-44 sm:w-52">
              {currentCard.kind === "image" ? (
                <BoxArt phase={currentCard.phase} />
              ) : (
                <div className="flex aspect-[140/166] w-full items-center justify-center rounded-xl border border-zinc-300 bg-white p-4 text-center shadow-sm dark:border-zinc-600 dark:bg-zinc-900">
                  <p className="text-base font-medium text-zinc-800 dark:text-zinc-100">
                    {currentCard.text}
                  </p>
                </div>
              )}
            </div>
            <p
              className={`font-mono text-xs transition-opacity ${
                resolvingPhase ? "opacity-0" : "opacity-100"
              } text-zinc-400 dark:text-zinc-500`}
            >
              지금 맞히면 +{potential}점
            </p>
          </div>
        )}

        {status === "finished" && (
          <ResultsScreen score={score} phaseStats={phaseStats} onRestart={startGame} />
        )}
      </main>
    </div>
  );
}

function SlotRow({
  placed,
  flash,
  resolvingPhase,
  lastGain,
  onSlotClick,
}: {
  placed: Placed;
  flash: Flash | null;
  resolvingPhase: Phase | null;
  lastGain: number | null;
  onSlotClick: (phase: Phase) => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {PHASES.map(({ id, label, labelEn }) => {
        const count = placed[id].length;
        const totalForPhase = PHASE_TOTALS[id];
        const isWrong = flash?.wrongPhase === id;
        const isHint = flash?.hintPhase === id;
        const isResolving = resolvingPhase === id;

        const ring = isWrong
          ? "ring-2 ring-rose-500"
          : isHint
            ? "ring-2 ring-amber-400"
            : isResolving
              ? "ring-2 ring-emerald-500"
              : "ring-1 ring-black/10 dark:ring-white/10";

        return (
          <button
            key={id}
            onClick={() => onSlotClick(id)}
            className={`flex flex-col items-center gap-1.5 rounded-xl bg-white/70 px-1 py-3 text-center transition dark:bg-white/5 ${ring}`}
          >
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{label}</span>
            <span className="hidden text-[10px] uppercase tracking-wide text-zinc-400 sm:block dark:text-zinc-500">
              {labelEn}
            </span>

            <div className="relative mt-1 flex h-6 items-end justify-center">
              {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
                <span
                  key={i}
                  style={{ marginLeft: i === 0 ? 0 : -10, zIndex: i }}
                  className="h-5 w-3.5 rounded-sm border border-amber-300 bg-amber-100 shadow-sm dark:border-amber-700 dark:bg-amber-900/60"
                />
              ))}
            </div>

            <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
              {count}/{totalForPhase}
            </span>

            {isWrong && <span className="text-[10px] font-medium text-rose-500">-1</span>}
            {isResolving && lastGain !== null && (
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                +{lastGain}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ResultsScreen({
  score,
  phaseStats,
  onRestart,
}: {
  score: number;
  phaseStats: PhaseStats;
  onRestart: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">최종 점수</p>
        <p className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50">{score}</p>
      </div>

      <div className="w-full max-w-xs">
        <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">시기별 정답률</p>
        <ul className="flex flex-col gap-1.5">
          {PHASES.map(({ id, label }) => {
            const stat = phaseStats[id];
            const pct = stat.total === 0 ? 0 : Math.round((stat.firstTry / stat.total) * 100);
            return (
              <li key={id} className="flex items-center gap-2 text-sm">
                <span className="w-10 shrink-0 text-zinc-700 dark:text-zinc-200">{label}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <span
                    className="block h-full rounded-full bg-emerald-500"
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="w-9 shrink-0 text-right font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {pct}%
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
          정답률은 시도 없이 한 번에 맞힌 카드의 비율입니다.
        </p>
      </div>

      <button
        onClick={onRestart}
        className="rounded-full bg-amber-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-700"
      >
        다시하기
      </button>
    </div>
  );
}
