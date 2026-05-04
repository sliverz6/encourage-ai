"use client";

import { useState, useEffect } from "react";

const SETS = [
  {
    situation: "오늘 발표를 완전히 망쳤어요. 열심히 준비했는데 너무 실망스러워요.",
    message: "완벽하지 않아도 괜찮아요. 무대에 서기까지 한 것 자체가 이미 용감한 거예요. 오늘의 경험이 쌓여 다음엔 분명 더 단단해진 당신이 있을 거예요.",
  },
  {
    situation: "취업 준비 7개월째인데 계속 면접에서 떨어져요. 너무 지쳐가고 있어요.",
    message: "7개월을 포기하지 않고 버텨온 당신은 이미 충분히 강한 사람이에요. 거절은 당신의 가치가 아닌 타이밍의 문제예요. 딱 맞는 기회가 반드시 찾아올 거예요.",
  },
  {
    situation: "다이어트 3주째인데 오늘 또 폭식했어요. 의지가 없는 것 같아요.",
    message: "한 번 무너졌다고 처음부터 시작할 필요 없어요. 3주를 이어온 것 자체가 대단한 거예요. 오늘은 내일을 위한 잠깐의 쉬어가기로 생각해요.",
  },
  {
    situation: "이직하고 싶은데 지금 직장을 떠나는 게 너무 무서워요.",
    message: "변화가 두려운 건 지금 가진 것을 소중히 여기기 때문이에요. 용기를 모으고 있는 지금도 충분히 잘 하고 있어요. 원하는 방향으로 한 걸음씩이면 돼요.",
  },
];

export default function TypingDemo() {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [visible, setVisible] = useState(true);

  const set = SETS[idx];
  const done = chars >= set.message.length;

  // 카드 등장 후 900ms 뒤에 타이핑 시작
  useEffect(() => {
    if (!visible || chars > 0) return;
    const t = setTimeout(() => setChars(1), 900);
    return () => clearTimeout(t);
  }, [visible, chars]);

  // 타이핑 진행
  useEffect(() => {
    if (chars === 0 || done) return;
    const t = setTimeout(() => setChars((c) => c + 1), 28);
    return () => clearTimeout(t);
  }, [chars, done]);

  // 완료 후 2초 대기 → 페이드아웃
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, [done]);

  // 페이드아웃 완료 후 다음 세트로
  useEffect(() => {
    if (visible) return;
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % SETS.length);
      setChars(0);
      setVisible(true);
    }, 500);
    return () => clearTimeout(t);
  }, [visible]);

  const displayedMsg = set.message.slice(0, chars);
  const isTyping = chars > 0 && !done;

  return (
    <div
      className={`w-full max-w-lg transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
        {/* 헤더 */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="text-base font-semibold text-stone-500">Encourage AI</span>
          <div className="ml-auto flex gap-2">
            {SETS.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === idx ? "bg-amber-500" : "bg-stone-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 채팅 영역 */}
        <div className="p-5 space-y-4 min-h-[220px]">
          {/* 사용자 상황 */}
          <div className="flex justify-end">
            <div className="bg-amber-50 border border-amber-100 text-amber-900 text-base rounded-2xl rounded-tr-sm px-4 py-3 max-w-[88%] leading-relaxed">
              {set.situation}
            </div>
          </div>

          {/* AI 답변 */}
          {chars > 0 && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <div className="bg-stone-50 border border-stone-100 text-stone-700 text-base rounded-2xl rounded-tl-sm px-4 py-3 max-w-[88%] leading-relaxed">
                {displayedMsg}
                {isTyping && (
                  <span className="inline-block w-[2px] h-[1em] bg-amber-500 ml-0.5 align-text-bottom animate-pulse" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
