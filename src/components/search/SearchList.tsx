export  default function SearchList() {
    return (
        <div className="mx-96 border border-gray-300 rounded-md p-4 m-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between h-80">
            <h2 className="text-lg font-semibold mb-2 text-center">일기 제목 예시</h2>
            <p className="text-gray-600 text-center flex-grow flex items-center justify-center">
                일기 내용의 일부가 여기에 표시됩니다...
            </p>
            <span className="text-sm text-gray-400 mt-2 block text-right">2024-06-01</span>
        </div>
    );
}