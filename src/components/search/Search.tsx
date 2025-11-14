import SearchList from "./SearchList";

export default function Search() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white" role="main">
            <header className="px-0 py-10 text-center" 
                    aria-label="검색창">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-10">검색을 통해 내 일기를 찾아보세요</h1>
                </div>
                <input  type="text" 
                        aria-label="검색어 입력" 
                        placeholder="검색어를 입력하세요" 
                        className="border border-gray-300 rounded-md px-60 py-4 text-lg shadow" />
            </header>
            <section>
                <div className="grid-cols-4 ">
                    {/* 검색 결과 */}
                    <SearchList />
                </div>
            </section>
        </main>
    );
}