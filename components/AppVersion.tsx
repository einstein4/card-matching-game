// 화면 맨 아래에 작게 보이는 버전 표시 (예: v0.1.0 · 2026-11-02)
//
// - 버전 번호와 날짜는 package.json 의 "version", "versionDate" 에서 읽는다.
//   버전을 올릴 때는 package.json 의 이 두 값과 README 의 "변경 기록"만 고치면 된다.
// - 서버 컴포넌트라서 package.json 내용이 학생 브라우저로 보내지지 않고,
//   완성된 글자("v0.1.0 · 2026-11-02")만 화면에 들어간다.
// - mt-auto: body 가 세로 flex 일 때 내용이 짧아도 이 줄을 화면 맨 아래로 밀어 준다.
//   (flex 가 아닌 화면에서는 아무 영향이 없다.)
import pkg from "../package.json";

export default function AppVersion() {
  return (
    <footer className="mt-auto py-3 text-center text-xs opacity-50 select-none">
      v{pkg.version} · {pkg.versionDate}
    </footer>
  );
}
