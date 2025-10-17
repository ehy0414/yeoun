import { useState } from 'react';
import Header from '../layout/header/HomeHeader';
import HomeHeader from '../layout/header/HomeHeader';

interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
  aiAnalysis?: string;
}

interface DiaryWriteProps {
  onSave: (entry: DiaryEntry) => void;
  onBack: () => void;
}

export default function DiaryWrite({ onSave, onBack }: DiaryWriteProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moods = [
    { emoji: '😊', label: '행복' },
    { emoji: '😢', label: '슬픔' },
    { emoji: '😌', label: '평온' },
    { emoji: '😤', label: '화남' },
    { emoji: '😴', label: '피곤' },
    { emoji: '🤔', label: '생각' },
    { emoji: '😍', label: '사랑' },
    { emoji: '😰', label: '걱정' },
  ];

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    
    // Mock AI analysis (실제로는 API 호출)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis = `오늘의 일기를 분석한 결과, 전반적으로 ${mood === '😊' ? '긍정적인' : mood === '😢' ? '우울한' : '혼재된'} 감정이 느껴집니다. 
    특히 일상의 소소한 행복을 찾으려는 모습이 인상적이었습니다. 
    앞으로도 이런 긍정적인 마음가짐을 유지하시길 바랍니다.`;

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title,
      content,
      mood,
      aiAnalysis: mockAnalysis,
    };

    onSave(newEntry);
    setIsAnalyzing(false);
    
    // Reset form
    setTitle('');
    setContent('');
    setMood('😊');
  };

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center mx-auto">
            <h2 className="text-pink-600 mb-1">오늘의 일기</h2>
            <p className="text-sm text-gray-500">{today}</p>
          </div>
        </div>

        {/* Diary Book Design */}
        <div className="bg-white rounded-2xl shadow-2xl border border-pink-100 overflow-hidden">
          {/* Book Binding */}
          <div className="bg-gradient-to-r from-pink-200 to-pink-300 h-4"></div>
          
          <div className="p-8">
            {/* Date Header */}
            <div className="text-center mb-8 pb-4 border-b border-pink-100">
              <div className="inline-flex items-center space-x-4">
                <span className="text-gray-500">오늘의 기분:</span>
                <div className="flex space-x-2">
                  {moods.map((moodOption) => (
                    <button
                      key={moodOption.emoji}
                      onClick={() => setMood(moodOption.emoji)}
                      className={`p-2 rounded-lg transition-all cursor-pointer ${
                        mood === moodOption.emoji
                          ? 'bg-pink-100 scale-110'
                          : 'hover:bg-pink-50'
                      }`}
                      title={moodOption.label}
                    >
                      <span className="text-2xl">{moodOption.emoji}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="오늘의 제목을 입력해주세요..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl bg-transparent border-none outline-none placeholder-gray-400 text-gray-800 pb-2 border-b border-pink-200 focus:border-pink-400 transition-colors"
                style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
              />
            </div>

            {/* Content Area */}
            <div className="relative">
              {/* Lines like real diary */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="border-b border-pink-100 h-6"
                    style={{ marginTop: i === 0 ? '0' : '1.5rem' }}
                  ></div>
                ))}
              </div>
              
              <textarea
                placeholder="오늘 하루는 어떠셨나요? 당신의 여운을 자유롭게 적어보세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setContent(prev => prev + '\n\n');
                  }
                }}
                className="relative w-full z-10 min-h-96 bg-transparent border-none resize-none outline-none placeholder-gray-400 text-gray-700 leading-6"
                style={{ 
                  fontFamily: '"Noto Sans KR", sans-serif',
                  lineHeight: '1.5rem'
                }}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8 pt-6 border-t border-pink-100">
              <button
                onClick={handleSave}
                disabled={isAnalyzing}
                className="z-0 cursor-pointer bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>AI 분석 중...</span>
                  </span>
                ) : (
                  '일기 저장하기'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}