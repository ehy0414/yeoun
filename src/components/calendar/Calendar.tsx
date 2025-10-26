import { useState } from 'react';

interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  aiAnalysis?: string;
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

  const hasEntry = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.some(entry => entry.date === dateStr);
  };

  const getEntry = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.find(entry => entry.date === dateStr);
  };

  const previousMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white" role="main">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8" role="banner">
          <h1 className="text-2xl mx-auto text-gray-800">일기 캘린더</h1>
        </header>

        <section className="grid lg:grid-cols-3 gap-8" aria-label="달력과 일기 상세보기">
          {/* Calendar */}
          <section className="lg:col-span-2" aria-label="달력">
            <div className="p-6 bg-white shadow-lg border border-pink-100">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={previousMonth}
                  aria-label="이전 달 보기"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 cursor-pointer"
                >
                  ←
                </button>
                <h2 className="text-xl text-gray-800" id="calendar-title">
                  <time dateTime={`${year}-${month + 1}`}>{year}년 {monthNames[month]}</time>
                </h2>
                <button
                  onClick={nextMonth}
                  aria-label="다음 달 보기"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 cursor-pointer"
                >
                  →
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2" role="rowgroup">
                {dayNames.map(day => (
                  <div
                    key={day}
                    role="columnheader"
                    className="text-center py-2 text-sm text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1" role="rowgroup" aria-labelledby="calendar-title">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    role="gridcell"
                    aria-label={
                      day
                        ? `${year}년 ${month + 1}월 ${day}일 ${hasEntry(day) ? '일기 있음' : '일기 없음'}`
                        : undefined
                    }
                    disabled={!day}
                    className={`
                      relative aspect-square border border-pink-100 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                      ${day ? 'hover:bg-pink-50' : ''}
                      ${day && hasEntry(day) ? 'bg-pink-100 border-pink-300' : ''}
                      ${day && day === today.getDate() && month === today.getMonth() && year === today.getFullYear() 
                        ? 'border-pink-500 border-2' : ''}
                    `}
                    onClick={() => {
                      if (day && hasEntry(day)) {
                        setSelectedEntry(getEntry(day) || null);
                      }
                    }}
                  >
                    {day && (
                      <>
                        <time
                          dateTime={`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
                          className={`text-sm ${hasEntry(day) ? 'text-pink-700' : 'text-gray-700'}`}
                        >
                          {day}
                        </time>
                        {hasEntry(day) && (
                          <div className="absolute bottom-1" aria-hidden="true">
                            <span className="text-lg">{getEntry(day)?.mood}</span>
                          </div>
                        )}
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <footer className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600" role="contentinfo">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-pink-500 rounded" aria-hidden="true"></div>
                  <span>오늘</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-pink-100 border border-pink-300 rounded" aria-hidden="true"></div>
                  <span>일기 작성됨</span>
                </div>
              </footer>
            </div>
          </section>

          {/* Entry Details */}
          <aside className="lg:col-span-1" aria-live="polite">
            {selectedEntry ? (
              <article className="p-6 bg-white shadow-lg border border-pink-100" aria-label="선택된 일기 내용">
                <header className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg text-gray-800">{selectedEntry.title}</h3>
                    <span className="text-2xl" aria-hidden="true">{selectedEntry.mood}</span>
                  </div>
                  <time
                    dateTime={selectedEntry.date}
                    className="text-sm text-gray-500"
                  >
                    {new Date(selectedEntry.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}
                  </time>
                </header>

                <section className="mb-6">
                  <h4 className="text-sm text-gray-600 mb-2">내용</h4>
                  <p className="text-gray-700 text-sm leading-relaxed bg-pink-50 p-3 rounded-lg">
                    {selectedEntry.content.substring(0, 200)}
                    {selectedEntry.content.length > 200 && '...'}
                  </p>
                </section>

                {selectedEntry.aiAnalysis && (
                  <section>
                    <h4 className="text-sm text-gray-600 mb-2 flex items-center">
                      <span className="mr-2" aria-hidden="true">🤖</span>
                      AI 분석
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200">
                      {selectedEntry.aiAnalysis}
                    </p>
                  </section>
                )}

                <button
                  onClick={() => setSelectedEntry(null)}
                  className="mt-4 cursor-pointer w-full text-sm text-pink-600 hover:text-pink-700 hover:bg-pink-100 h-10 rounded-2xl transition-colors"
                  aria-label="일기 상세보기 닫기"
                >
                  닫기
                </button>
              </article>
            ) : (
              <div className="p-6 bg-white shadow-lg border border-pink-100" role="note">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4" aria-hidden="true">📅</div>
                  <p className="text-sm">
                    일기가 작성된 날짜를 클릭하면<br />
                    자세한 내용을 볼 수 있어요
                  </p>
                </div>
              </div>
            )}
          </aside>
        </section>

        {/* Stats */}
        <section className="mt-8 grid md:grid-cols-3 gap-6" aria-label="통계 정보">
          <div className="p-4 bg-white shadow-lg border border-pink-100 text-center" role="status">
            <div className="text-2xl text-pink-600 mb-2">{entries.length}</div>
            <div className="text-sm text-gray-600">총 작성한 일기</div>
          </div>
          <div className="p-4 bg-white shadow-lg border border-pink-100 text-center" role="status">
            <div className="text-2xl text-pink-600 mb-2">
              {entries.filter(entry => 
                new Date(entry.date).getMonth() === month && 
                new Date(entry.date).getFullYear() === year
              ).length}
            </div>
            <div className="text-sm text-gray-600">이번 달 작성</div>
          </div>
          <div className="p-4 bg-white shadow-lg border border-pink-100 text-center" role="status">
            <div className="text-2xl text-pink-600 mb-2">
              {entries.some(entry => entry.date === today.toISOString().split('T')[0]) ? '✓' : 'X'}
            </div>
            <div className="text-sm text-gray-600">오늘 작성 여부</div>
          </div>
        </section>
      </div>
    </main>
  );
}
