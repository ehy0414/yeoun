import { useState, useEffect } from 'react';
import Header from '../components/layout/header/Header';
import DiaryWrite from '../components/diary/DiaryWrite';
import Calendar from '../components/calendar/Calendar';
import Onboarding from '../components/onboarding/Onboarding';
import { supabase } from '../services/supabaseClient';
import MainPage from '../components/home/MainPage';

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

  const handleSaveDiary = async (entry: DiaryEntry) => {
    const { data, error } = await supabase.from('diary_entries').insert([
      {
        date: entry.date,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        ai_analysis: entry.aiAnalysis || null,
      },
    ])
      .select();;

    if (error) {
      alert('저장 중 오류가 발생했습니다 😢');
      console.error(error);
    } else {
      setDiaryEntries((prev) => [...prev, data[0]]);
      setCurrentPage('calendar');
      alert('일기가 예쁘게 저장되었어요! 🌸');
    }
  };

  if (isFirstTime) {
    // 온보딩 페이지는 자체적인 배경을 가짐
    return <Onboarding onStartWriting={handleStartWriting} />;
  }

  return (
    // 전체 앱 배경: 화이트 -> 핑크 그라디언트
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBFB] via-[#FFF0F5] to-[#FDEFF4] font-sans text-gray-800 transition-colors duration-500">

      <Header currentPage={currentPage} onPageChange={setCurrentPage} />

      <main className="animate-fade-in pb-20">
        {currentPage === 'write' && (
          <DiaryWrite onSave={handleSaveDiary} />
        )}

        {currentPage === 'onboarding' && (
          <MainPage />
        )}

        {currentPage === 'calendar' && (
          <Calendar entries={diaryEntries} />
        )}
      </main>

      <footer className="text-center py-8 text-sm text-gray-400 font-medium">
        © 2025 Yeoun Diary. All rights reserved.
      </footer>
    </div>
  );
}