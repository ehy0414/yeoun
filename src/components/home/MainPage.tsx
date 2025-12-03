import { Sparkles, BookHeart, CalendarHeart } from "lucide-react";
import { useState, useEffect } from "react";

export default function MainPage() {
    const [isVisible, setIsVisible] = useState(false);

    // 컴포넌트 마운트 시 페이드인 효과 트리거
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDFBFB] via-[#FFF0F5] to-[#FDEFF4]">

            {/* 1. 배경 장식 요소 (움직이는 핑크빛 오브제들) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
                <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse delay-700"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse delay-1000"></div>
            </div>

            {/* 2. 메인 컨텐츠 영역 */}
            <div
                className={`
          relative z-10 max-w-md w-full mx-4 p-8 md:p-12
          bg-white/40 backdrop-blur-2xl rounded-[40px] 
          border border-white/60 shadow-[0_20px_60px_-15px_rgba(255,192,203,0.5)]
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
            >
                {/* 로고 및 타이틀 */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl shadow-lg shadow-pink-200 rotate-3">
                        <BookHeart className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
                        여운 <span className="text-pink-500">.</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        당신의 하루 끝에 남은<br />
                        소중한 감정의 여운을 기록하세요.
                    </p>
                </div>

                {/* 3. 특징 소개 (아이콘 그리드) */}
                <div className="grid gap-4 mb-10">
                    <FeatureItem
                        icon={<Sparkles className="w-5 h-5 text-pink-500" />}
                        title="AI 감정 분석"
                        desc="작성된 일기에서 감정을 분석해드려요"
                        delay="delay-[200ms]"
                    />
                    <FeatureItem
                        icon={<CalendarHeart className="w-5 h-5 text-rose-500" />}
                        title="감정 캘린더"
                        desc="한 달 동안의 기분 흐름을 한눈에"
                        delay="delay-[400ms]"
                    />
                </div>

            </div>

            <footer className="absolute bottom-8 text-center text-gray-400 text-sm font-medium">
                © 2025 Yeoun Diary
            </footer>
        </div>
    );
}

// 작은 특징 아이템 컴포넌트
function FeatureItem({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: string }) {
    return (
        <div className={`flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-white/50 animate-fade-in-up ${delay}`}>
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-pink-50 rounded-xl">
                {icon}
            </div>
            <div className="text-left">
                <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
            </div>
        </div>
    );
}