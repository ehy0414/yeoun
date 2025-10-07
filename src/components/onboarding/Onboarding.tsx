interface OnboardingProps {
  onStartWriting: () => void;
}

export default function Onboarding({ onStartWriting }: OnboardingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Hero Image */}
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1727195077442-6373fe9e67d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFyeSUyMGpvdXJuYWwlMjB3cml0aW5nJTIwdmludGFnZSUyMHBpbmt8ZW58MXx8fHwxNzU5Mjg3NzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="일기장"
            className="w-80 h-64 mx-auto object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Main Text */}
        <div className="mb-12">
          <h1 className="text-4xl text-gray-800 mb-4">
            당신의 여운을 기록해보세요
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            AI가 도와주는 특별한 일기 작성 경험
          </p>
          <p className="text-gray-500">
            매일의 소중한 순간들을 기록하고, AI가 당신의 감정을 분석해드립니다.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-pink-100">
            <div className="text-2xl mb-3">✨</div>
            <h3 className="text-gray-800 mb-2">AI 감정 분석</h3>
            <p className="text-sm text-gray-600">
              작성한 일기를 통해 감정 상태를 분석해드립니다
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-pink-100">
            <div className="text-2xl mb-3">📅</div>
            <h3 className="text-gray-800 mb-2">캘린더 보기</h3>
            <p className="text-sm text-gray-600">
              월별로 작성한 일기들을 한눈에 확인하세요
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-pink-100">
            <div className="text-2xl mb-3">🌸</div>
            <h3 className="text-gray-800 mb-2">아름다운 디자인</h3>
            <p className="text-sm text-gray-600">
              실제 일기장처럼 아름다운 인터페이스
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartWriting}
          className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-pink-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          오늘의 일기 작성하기
        </button>
      </div>
    </div>
  );
}