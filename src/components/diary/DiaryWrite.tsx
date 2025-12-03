import { useState } from "react";
import { getGeminiResponse } from "../../services/openaiApi";
import { supabase } from "../../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Send, PenLine, Sparkles } from "lucide-react";

interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  aiAnalysis?: string;
  user_id: string;
}

interface DiaryWriteProps {
  onSave: (entry: DiaryEntry) => void;
}

export default function DiaryWrite({ onSave }: DiaryWriteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😊");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const moods = [
    { emoji: "😊", label: "행복" },
    { emoji: "😢", label: "슬픔" },
    { emoji: "😌", label: "평온" },
    { emoji: "😤", label: "화남" },
    { emoji: "😴", label: "피곤" },
    { emoji: "🤔", label: "생각" },
    { emoji: "😍", label: "설렘" },
    { emoji: "😰", label: "걱정" },
  ];

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다.");
        navigate("/");
        return;
      }

      const userId = user.id;

      const aiResponse = await getGeminiResponse(
        `오늘의 기분은 ${mood}이고, 일기 내용은 다음과 같습니다:\n\n${content}`
      );

      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        title,
        content,
        mood,
        aiAnalysis: aiResponse,
        user_id: userId,
      };

      onSave(newEntry);

      // 폼 초기화
      setTitle("");
      setContent("");
      setMood("😊");
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    // 1. 배경: 투명하게 처리 (상위 HomePage 배경이 보이도록) 하거나 통일된 그라디언트 사용
    <section className="max-w-3xl mx-auto px-4 py-8 font-sans">

      {/* 2. 메인 카드: 유리 질감 (Glassmorphism) + 부드러운 그림자 */}
      <div className="w-full bg-white/80 backdrop-blur-xl rounded-[40px] shadow-[0_20px_50px_-12px_rgba(255,182,193,0.4)] border border-white/50 overflow-hidden relative">

        {/* 상단 데코레이션 바 */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-rose-400"></div>

        <div className="p-8 md:p-10">

          {/* Header */}
          <header className="flex flex-col items-center mb-10">
            <span className="text-pink-500 text-xs font-bold tracking-widest uppercase mb-2 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              Today's Diary
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              오늘 하루는 어땠나요?
            </h1>
            <p className="text-gray-400 font-medium">{today}</p>
          </header>

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">

            {/* 3. Mood Section: 핑크빛 선택 효과 */}
            <div className="bg-white/50 rounded-3xl p-6 border border-pink-100/50 shadow-sm">
              <label className="block text-center text-gray-600 mb-4 font-medium">
                오늘의 기분 조각을 선택해주세요
              </label>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {moods.map((m) => (
                  <button
                    key={m.emoji}
                    type="button"
                    onClick={() => setMood(m.emoji)}
                    className={`
                      cursor-pointer flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl text-2xl transition-all duration-300
                      ${mood === m.emoji
                        ? "bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg shadow-pink-200 scale-110 rotate-3"
                        : "bg-white text-gray-400 hover:bg-pink-50 hover:text-pink-400 border border-transparent hover:border-pink-100"}
                    `}
                  >
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Input Area: 깔끔한 화이트/핑크 박스 */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-300 group-focus-within:text-pink-500 transition-colors">
                  <PenLine size={20} />
                </div>
                <input
                  type="text"
                  placeholder="제목을 입력하세요..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 bg-pink-50/50 hover:bg-pink-50 rounded-2xl text-gray-700 placeholder-gray-400 text-lg font-bold border border-transparent focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                />
              </div>

              <textarea
                placeholder="당신의 이야기를 들려주세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-80 p-6 bg-pink-50/30 hover:bg-pink-50/50 rounded-3xl text-gray-700 placeholder-gray-400 text-lg leading-relaxed border border-transparent focus:border-pink-200 focus:bg-white focus:ring-4 focus:ring-pink-100 outline-none resize-none transition-all custom-scrollbar"
              />
            </div>

            {/* 5. Button: 그라디언트 젤리 버튼 */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className={`
                w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all transform active:scale-95
                ${isAnalyzing
                  ? "bg-pink-200 cursor-wait"
                  : "bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 hover:shadow-pink-300/50 hover:-translate-y-1"}
              `}
            >
              <div className="cursor-pointer flex items-center justify-center gap-2">
                {isAnalyzing ? (
                  <>
                    <Sparkles className="animate-spin" />
                    <span>AI가 마음을 읽고 있어요...</span>
                  </>
                ) : (
                  <>
                    <span>일기 저장하기</span>
                    <Send size={18} />
                  </>
                )}
              </div>
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}