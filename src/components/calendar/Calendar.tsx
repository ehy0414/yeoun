import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MessageCircleHeart } from 'lucide-react';

interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  ai_analysis?: string;
}

interface CalendarProps {
  entries: DiaryEntry[];
}

export default function Calendar({ entries }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const getEntry = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.find(entry => entry.date === dateStr);
  };

  const previousMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="grid lg:grid-cols-3 gap-8">

        {/* 1. Left: Calendar Grid */}
        <section className="lg:col-span-2 bg-white/60 backdrop-blur-xl rounded-[40px] shadow-[0_20px_50px_-12px_rgba(255,182,193,0.3)] border border-white/60 p-8">

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button onClick={previousMonth} className="p-2 rounded-full hover:bg-pink-100 text-pink-400 transition-colors">
              <ChevronLeft />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {year}년 <span className="text-pink-500">{monthNames[month]}</span>
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-pink-100 text-pink-400 transition-colors">
              <ChevronRight />
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 mb-4">
            {dayNames.map((day, i) => (
              <div key={day} className={`text-center text-sm font-bold ${i === 0 ? 'text-rose-400' : 'text-gray-400'}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-3 md:gap-4">
            {calendarDays.map((day, index) => {
              const entry = day ? getEntry(day) : null;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              return (
                <div key={index} className="aspect-square relative">
                  {day && (
                    <button
                      onClick={() => entry && setSelectedEntry(entry)}
                      className={`
                        w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border
                        ${isToday ? 'border-pink-400 bg-pink-50' : 'border-transparent hover:bg-white hover:shadow-md'}
                        ${entry ? 'bg-white shadow-sm border-pink-100 cursor-pointer hover:-translate-y-1' : 'bg-transparent cursor-default'}
                      `}
                    >
                      <span className={`text-sm font-medium ${isToday ? 'text-pink-600 font-bold' : 'text-gray-600'}`}>
                        {day}
                      </span>

                      {/* Mood Emoji Indicator */}
                      {entry && (
                        <span className="mt-1 text-2xl animate-fade-in drop-shadow-sm">
                          {entry.mood}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Right: Detail View */}
        <aside className="lg:col-span-1">
          {selectedEntry ? (
            <article className="h-full bg-white rounded-[40px] shadow-xl border border-pink-100 p-8 flex flex-col relative overflow-hidden">
              {/* 배경 데코레이션 */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 to-rose-400"></div>

              <header className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-pink-500 font-bold tracking-wider uppercase bg-pink-50 px-2 py-1 rounded-lg">
                    Diary Detail
                  </span>
                  <span className="text-4xl filter drop-shadow-md">{selectedEntry.mood}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 leading-tight">{selectedEntry.title}</h3>
                <time className="text-sm text-gray-400 mt-2 block">
                  {new Date(selectedEntry.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                </time>
              </header>

              {/* Content Area (Lined Paper Effect) */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-6">
                <p className="text-gray-700 text-lg leading-loose" style={{
                  backgroundImage: "linear-gradient(transparent 1.9rem, #f3f4f6 1.9rem)",
                  backgroundSize: "100% 2rem",
                  lineHeight: "2rem"
                }}>
                  {selectedEntry.content}
                </p>
              </div>

              {/* AI Analysis Box */}
              {selectedEntry.ai_analysis && (
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 border border-pink-100/50">
                  <h4 className="text-sm font-bold text-purple-500 mb-2 flex items-center gap-2">
                    <MessageCircleHeart size={16} />
                    AI 마음 분석
                  </h4>
                  <p
                    className="text-sm text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedEntry.ai_analysis }}
                  />
                </div>
              )}

              <button
                onClick={() => setSelectedEntry(null)}
                className="mt-6 w-full py-3 rounded-xl text-gray-500 hover:bg-gray-100 font-medium transition-colors"
              >
                닫기
              </button>
            </article>
          ) : (
            // Empty State
            <div className="h-full min-h-[400px] bg-white/40 backdrop-blur-sm rounded-[40px] border border-white/60 flex flex-col items-center justify-center text-center p-8 text-gray-400 border-dashed border-2 border-pink-100">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4 text-pink-300">
                <CalendarIcon size={32} />
              </div>
              <p className="text-lg font-medium text-gray-500 mb-1">일기를 선택해주세요</p>
              <p className="text-sm">날짜를 클릭하면<br />상세 내용을 볼 수 있어요 🌸</p>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}