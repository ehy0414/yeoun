import { Sparkles, CalendarHeart, Palette } from 'lucide-react';

interface OnboardingProps {
  onStartWriting: () => void;
}

export default function Onboarding({ onStartWriting }: OnboardingProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 배경 데코레이션 (은은한 원형 그라데이션) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Hero Image with Soft Shadow */}
        <div className="mb-10 relative inline-block group">
          <div className="absolute inset-0 bg-pink-400 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <img
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop"
            alt="감성 일기장"
            className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-[2rem] shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-105 hover:rotate-2"
          />
        </div>

        {/* Main Text */}
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight tracking-tight">
            당신의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">여운</span>을<br />
            기록해보세요
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            매일의 소중한 순간들을 기록하세요.<br className="md:hidden" />
            AI가 당신의 감정을 읽고, 따뜻한 위로와 공감을 건넵니다.
          </p>
        </div>

        {/* Features Cards (Glassmorphism) */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Sparkles, title: "AI 감정 분석", desc: "당신의 마음 온도를 분석해요" },
            { icon: CalendarHeart, title: "무드 캘린더", desc: "한 달의 감정을 한눈에 봐요" },
            { icon: Palette, title: "감성 디자인", desc: "쓰고 싶어지는 예쁜 일기장" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg shadow-pink-100/50 border border-white/50 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 mb-4 mx-auto">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button (Jelly Effect) */}
        <button
          onClick={onStartWriting}
          className="cursor-pointer group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full hover:from-pink-500 hover:to-rose-600 hover:shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1 active:scale-95"
        >
          <span className="mr-2 text-lg">오늘의 일기 쓰러가기</span>
          <Sparkles className="w-5 h-5 animate-spin-slow group-hover:rotate-12" />
        </button>
      </div>
    </main>
  );
}