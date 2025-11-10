import { useState, useEffect } from 'react';
import Header from '../components/layout/header/Header';
import DiaryWrite from '../components/diary/DiaryWrite';
import Calendar from '../components/calendar/Calendar';
import Onboarding from '../components/onboarding/Onboarding';
import { supabase } from '../services/supabaseClient';

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

  // Supabase에서 데이터 불러오기
  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase.from('diary_entries').select('*').order('date', { ascending: false });
      if (error) console.error('Error fetching entries:', error);
      else setDiaryEntries(data);
    };
    fetchEntries();
  }, []);

  const handleStartWriting = () => {
    setIsFirstTime(false);
    setCurrentPage('write');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  // Supabase에 저장
  const handleSaveDiary = async (entry: DiaryEntry) => {
    const { error } = await supabase.from('diary_entries').insert([
      {
        date: entry.date,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        ai_analysis: entry.aiAnalysis || null,
      },
    ]);

    if (error) {
      alert('저장 중 오류가 발생했습니다');
      console.error(error);
    } else {
      setDiaryEntries((prev) => [...prev, entry]);
      alert('일기가 성공적으로 저장되었습니다! 🎉');
      // ai 분석 바로 반영하도록 페이지 새로고침
      window.location.reload();
      currentPage === 'calendar' && setCurrentPage('calendar');
    }
  };

  if (isFirstTime) {
    return (
      <main role="main">
        <Onboarding onStartWriting={handleStartWriting} />
      </main>
    );
  }

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

        {currentPage === 'search' && (
          <section aria-labelledby="search-section">
            <h1 id="search-section" className="sr-only">
              검색 페이지
            </h1>
            
          </section>
        )}
      </main>

      <footer role="contentinfo" className="text-center py-4 text-sm text-gray-500">
        © 2025 Yeoun App. All rights reserved.
      </footer>
    </div>
  );
}
