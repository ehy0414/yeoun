import HomeHeader from "../layout/header/HomeHeader";

interface TodayWritersProps {
  onBack: () => void;
}

// Mock data for today's writers
const mockWriters = [
  {
    id: '1',
    name: '민지',
    avatar: 'https://images.unsplash.com/photo-1644945584589-c13b856ea51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYXZhdGFyJTIwcHJvZmlsZSUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTkyODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mood: '😊',
    title: '따뜻한 하루였어요',
    preview: '오늘은 오랜만에 친구들과 만나서 맛있는 걸 먹고...',
    time: '2시간 전',
    likeCount: 12
  },
  {
    id: '2',
    name: '준호',
    avatar: 'https://images.unsplash.com/photo-1644945584589-c13b856ea51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYXZhdGFyJTIwcHJvZmlsZSUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTkyODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mood: '🤔',
    title: '새로운 도전에 대한 생각',
    preview: '요즘 새로운 취미를 시작해볼까 고민이 많아요...',
    time: '4시간 전',
    likeCount: 8
  },
  {
    id: '3',
    name: '수연',
    avatar: 'https://images.unsplash.com/photo-1644945584589-c13b856ea51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYXZhdGFyJTIwcHJvZmlsZSUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTkyODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mood: '😌',
    title: '평온한 일요일',
    preview: '집에서 책 읽으며 보낸 조용한 하루. 가끔은 이런...',
    time: '6시간 전',
    likeCount: 15
  },
  {
    id: '4',
    name: '동현',
    avatar: 'https://images.unsplash.com/photo-1644945584589-c13b856ea51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYXZhdGFyJTIwcHJvZmlsZSUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTkyODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mood: '😍',
    title: '사랑스러운 하루',
    preview: '연인과 함께한 데이트. 정말 행복한 시간이었어요...',
    time: '8시간 전',
    likeCount: 23
  },
  {
    id: '5',
    name: '혜진',
    avatar: 'https://images.unsplash.com/photo-1644945584589-c13b856ea51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYXZhdGFyJTIwcHJvZmlsZSUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NTkyODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mood: '😴',
    title: '피곤했던 하루',
    preview: '일이 많아서 정말 바쁜 하루였어요. 그래도...',
    time: '10시간 전',
    likeCount: 7
  }
];

export default function TodayWriters({ onBack }: TodayWritersProps) {
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
          <div className="mx-auto text-center">
            <h2 className="text-2xl text-gray-800 mb-1">오늘 작성한 사람들</h2>
            <p className="text-sm text-gray-500">{today}</p>
          </div>
        </div>

        {/* Stats Header */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg border border-pink-100">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl text-pink-600 mb-2">{mockWriters.length}</div>
              <div className="text-sm text-gray-600">오늘 작성한 사람</div>
            </div>
            <div>
              <div className="text-3xl text-pink-600 mb-2">
                {mockWriters.reduce((sum, writer) => sum + writer.likeCount, 0)}
              </div>
              <div className="text-sm text-gray-600">오늘 좋아요를 누른 사람</div>
            </div>
            <div>
              <div className="text-3xl text-pink-600 mb-2">
                {Math.round((mockWriters.reduce((sum, writer) => sum + writer.likeCount, 0) / mockWriters.length) * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">평균 좋아요</div>
            </div>
          </div>
        </div>

        {/* Writers List */}
        {/* <div className="space-y-6">
          {mockWriters.map((writer) => (
            <div key={writer.id} className="p-6 bg-white shadow-lg border border-pink-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <img
                  src={writer.avatar}
                  alt={writer.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-800">{writer.name}</h3>
                      <span className="text-2xl">{writer.mood}</span>
                      <span className="text-sm text-gray-500">{writer.time}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-pink-600">
                      <span className="text-sm">❤️</span>
                      <span className="text-sm">{writer.likeCount}</span>
                    </div>
                  </div>

                  <h4 className="text-gray-800 mb-2">{writer.title}</h4>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {writer.preview}
                  </p>

                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 transition-colors">
                      <span>❤️</span>
                      <span>좋아요</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors">
                      <span>💬</span>
                      <span>댓글</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors">
                      <span>📤</span>
                      <span>공유</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Encouragement */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 border border-pink-200">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-gray-800 mb-2">당신도 오늘의 여운을 기록해보세요!</h3>
            <p className="text-gray-600 text-sm mb-4">
              다른 사람들의 일기를 보며 영감을 받고, 당신만의 특별한 하루를 기록해보세요.
            </p>
            <button 
              onClick={onBack}
              className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-pink-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              일기 작성하러 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}