import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('로그인 실패 😢 이메일 또는 비밀번호를 확인해주세요.');
      console.error(error);
    } else {
      alert('로그인 성공');
      navigate('/home'); // 메인 페이지로 이동
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-pink-50">
      <section className="bg-white shadow-lg rounded-2xl p-10 w-96 text-center border border-pink-100">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-pink-500">로그인</h1>
          <p className="text-sm text-pink-400 mt-2">여운에 오신 것을 환영합니다!</p>
        </header>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="text-left">
            <label htmlFor="email" className="block text-pink-500 font-semibold mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block text-pink-500 font-semibold mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-pink-400 text-white py-2 rounded-xl mt-4 font-semibold hover:bg-pink-500 transition"
          >
            로그인
          </button>
        </form>

        <footer className="mt-6 text-sm text-pink-400">
          계정이 없으신가요?{" "}
          <a href="/signup" className="underline hover:text-pink-500">
            회원가입
          </a>
        </footer>
      </section>
    </main>
  );
}
