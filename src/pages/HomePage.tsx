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
    if (diaryEntries.length > 0) {
      localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
    }
  }, [diaryEntries]);

  const handleStartWriting = () => {
    localStorage.setItem('hasVisited', 'true');
    setIsFirstTime(false);
    setCurrentPage('write');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleSaveDiary = (entry: DiaryEntry) => {
    setDiaryEntries(prev => [...prev, entry]);
    // Show success message or redirect
    alert('일기가 성공적으로 저장되었습니다! 🎉');
  };

  // If first time, show onboarding
  if (isFirstTime) {
    return <Onboarding onStartWriting={handleStartWriting} />;
  }

  // Main app with header
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      
      {currentPage === 'write' && (
        <DiaryWrite
          onSave={handleSaveDiary} 
        />
      )}
      
      {currentPage === 'calendar' && (
        <Calendar
          entries={diaryEntries} 
        />
      )}
    </div>
  );
}