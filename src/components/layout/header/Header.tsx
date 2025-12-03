import { BookHeart, Calendar, PenLine } from "lucide-react"; // 아이콘 추가

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const navItems = [
    { id: 'write', label: '작성하기', icon: PenLine },
    { id: 'calendar', label: '캘린더', icon: Calendar },
  ];

  return (
    // 배경: 스크롤 시 뒤가 비치는 Glassmorphism 효과 + 하단에 부드러운 핑크 라인
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-pink-100/50 px-6 py-4 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo: 그라디언트 아이콘 */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onPageChange('onboarding')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-pink-200 shadow-lg group-hover:scale-105 transition-transform">
            <BookHeart className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-pink-500 transition-colors">
            여운일기
          </h1>
        </div>

        {/* Navigation: 알약(Pill) 형태의 메뉴 */}
        <nav className="hidden md:flex items-center bg-white/50 px-2 py-1.5 rounded-full border border-white/50 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`
                cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                ${currentPage === item.id
                  ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md shadow-pink-200 scale-105'
                  : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'}
              `}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

      </div>
    </header>
  );
}