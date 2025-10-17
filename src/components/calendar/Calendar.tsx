import { useState } from 'react';
import HomeHeader from '../layout/header/HomeHeader';

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
  onBack: () => void;
}

export default function Calendar({ entries, onBack }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  // Get current month details
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Check if a day has an entry
  const hasEntry = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.some(entry => entry.date === dateStr);
  };

  // Get entry for a specific day
  const getEntry = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return entries.find(entry => entry.date === dateStr);
  };

  // Navigation functions
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl mx-auto text-gray-800">일기 캘린더</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-white shadow-lg border border-pink-100">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={previousMonth}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 cursor-pointer"
                >
                  ←
                </button>
                <h3 className="text-xl text-gray-800">
                  {year}년 {monthNames[month]}
                </h3>
                <button
                  onClick={nextMonth}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 cursor-pointer"
                >
                  →
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div
                    key={day}
                    className="text-center py-2 text-sm text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
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
                        <span className={`text-sm ${hasEntry(day) ? 'text-pink-700' : 'text-gray-700'}`}>
                          {day}
                        </span>
                        {hasEntry(day) && (
                          <div className="absolute bottom-1">
                            <span className="text-lg">{getEntry(day)?.mood}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-pink-500 rounded"></div>
                  <span>오늘</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-pink-100 border border-pink-300 rounded"></div>
                  <span>일기 작성됨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Entry Details */}
          <div className="lg:col-span-1">
            {selectedEntry ? (
              <div className="p-6 bg-white shadow-lg border border-pink-100">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg text-gray-800">{selectedEntry.title}</h4>
                    <span className="text-2xl">{selectedEntry.mood}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedEntry.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}
                  </p>
                </div>

                <div className="mb-6">
                  <h5 className="text-sm text-gray-600 mb-2">내용</h5>
                  <p className="text-gray-700 text-sm leading-relaxed bg-pink-50 p-3 rounded-lg">
                    {selectedEntry.content.substring(0, 200)}
                    {selectedEntry.content.length > 200 && '...'}
                  </p>
                </div>

                {selectedEntry.aiAnalysis && (
                  <div>
                    <h5 className="text-sm text-gray-600 mb-2 flex items-center">
                      <span className="mr-2">🤖</span>
                      AI 분석
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed bg-gradient-to-br from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200">
                      {selectedEntry.aiAnalysis}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedEntry(null)}
                  className="mt-4 w-full text-sm text-pink-600 hover:text-pink-700 transition-colors"
                >
                  닫기
                </button>
              </div>
            ) : (
              <div className="p-6 bg-white shadow-lg border border-pink-100">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📅</div>
                  <p className="text-sm">
                    일기가 작성된 날짜를 클릭하면<br />
                    자세한 내용을 볼 수 있어요
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow-lg border border-pink-100 text-center">
            <div className="text-2xl text-pink-600 mb-2">{entries.length}</div>
            <div className="text-sm text-gray-600">총 작성한 일기</div>
          </div>
          <div className="p-4 bg-white shadow-lg border border-pink-100 text-center">
            <div className="text-2xl text-pink-600 mb-2">
              {entries.filter(entry => 
                new Date(entry.date).getMonth() === month && 
                new Date(entry.date).getFullYear() === year
              ).length}
            </div>
            <div className="text-sm text-gray-600">이번 달 작성</div>
          </div>
          <div className="p-4 bg-white shadow-lg border border-pink-100 text-center">
            <div className="text-2xl text-pink-600 mb-2">
              {entries.filter(entry => entry.date === today.toISOString().split('T')[0]).length > 0 ? '✓' : '○'}
            </div>
            <div className="text-sm text-gray-600">오늘 작성 여부</div>
          </div>
        </div>
      </div>
    </div>
  );
}