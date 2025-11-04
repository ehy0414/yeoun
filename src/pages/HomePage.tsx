import { useState, useEffect } from 'react';
import Header from '../components/layout/header/Header';
import DiaryWrite from '../components/diary/DiaryWrite';
import Calendar from '../components/calendar/Calendar';
import Onboarding from '../components/onboarding/Onboarding';

interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  aiAnalysis?: string;
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<string>('onboarding');
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    const hasVisited = localStorage.getItem('hasVisited');

    if (savedEntries) {
      setDiaryEntries(JSON.parse(savedEntries));
    }

    if (hasVisited) {
      setIsFirstTime(true);
      setCurrentPage('write');
    }
  }, []);

  // Save entries to localStorage whenever diaryEntries changes
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const handleStartWriting = () => {
    setIsFirstTime(false);
    setCurrentPage('write');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleSaveDiary = (entry: DiaryEntry) => {
    setDiaryEntries((prev) => [...prev, entry]);
    alert('일기가 성공적으로 저장되었습니다! 🎉');
  };

  // Onboarding (최초 방문 시)
  if (isFirstTime) {
    return (
      <main role="main">
        <Onboarding onStartWriting={handleStartWriting} />
      </main>
    );
  }

  // Main App Layout
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header role="banner" aria-label="메인 헤더">
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
      </header>

      <main role="main" className="p-4" aria-live="polite">
        {currentPage === 'write' && (
          <section aria-labelledby="write-section">
            <h1 id="write-section" className="sr-only">
              일기 작성 페이지
            </h1>
            <DiaryWrite onSave={handleSaveDiary} />
          </section>
        )}

        {currentPage === 'calendar' && (
          <section aria-labelledby="calendar-section">
            <h1 id="calendar-section" className="sr-only">
              캘린더 보기 페이지
            </h1>
            <Calendar entries={diaryEntries} />
          </section>
        )}
      </main>

      <footer role="contentinfo" className="text-center py-4 text-sm text-gray-500">
        © 2025 Yeoun App. All rights reserved.
      </footer>
    </div>
  );
}
