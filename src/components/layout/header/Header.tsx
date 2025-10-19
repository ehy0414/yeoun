interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-pink-100 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-white">📖</span>
          </div>
          <h1 className="text-pink-600 font-medium">여운일기</h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <button
            onClick={() => onPageChange('write')}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'write'
                ? 'bg-pink-100 text-pink-600'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            작성하기
          </button>
          <button
            onClick={() => onPageChange('calendar')}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'calendar'
                ? 'bg-pink-100 text-pink-600'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            캘린더
          </button>
          {/* <button
            onClick={() => onPageChange('today-writers')}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'today-writers'
                ? 'bg-pink-100 text-pink-600'
                : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            오늘 작성한 사람
          </button> */}
        </nav>

        {/* Profile */}
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1644945584589-c13b856ea51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYXZhdGFyJTIwcHJvZmlsZSUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTkyODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="프로필"
            className="w-10 h-10 rounded-full object-cover border-2 border-pink-200 hover:border-pink-300 transition-colors cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}