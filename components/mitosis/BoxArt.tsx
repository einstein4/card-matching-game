import type { Phase } from "@/lib/mitosisCards";

const PHASE_IMAGE: Record<Phase, string> = {
  interphase: "/간기.png",
  prophase: "/전기.png",
  metaphase: "/중기.png",
  anaphase: "/후기.png",
  telophase: "/말기.png",
};

export function BoxArt({ phase }: { phase: Phase }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PHASE_IMAGE[phase]}
      alt="세포 분열 단계를 나타내는 염색체 관찰 그림"
      className="block w-full h-auto rounded-xl"
    />
  );
}
