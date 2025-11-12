import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

interface UserEntry {
  email: string;
  password: string;
  nickName: string;
}

export default function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UserEntry>({
        email: '',
        password: '',
        nickName: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
            data: { name: formData.nickName }, // 프로필 데이터로 저장됨
            },
        });

        if (error) {
            alert('회원가입 중 오류가 발생했습니다');
            console.error(error);
        } else {
            alert('회원가입이 완료되었습니다! 🎉');
            navigate('/login');
        }
    };


    return (
        <main className="flex justify-center items-center min-h-screen bg-pink-50">
            <section className="bg-white shadow-lg rounded-2xl p-10 w-96 text-center border border-pink-100">
                <header className="mb-8">
                <h1 className="text-3xl font-bold text-pink-500">회원 가입</h1>
                <p className="text-sm text-pink-400 mt-2">여운에 오신 것을 환영합니다!</p>
                </header>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="text-left">
                        <label htmlFor="nickName" className="block text-pink-500 font-semibold mb-1">
                        사용자 이름
                        </label>
                        <input
                            type="text"
                            id="nickName"
                            name="nickName"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                        />
                    </div>

                    <div className="text-left">
                        <label htmlFor="email" className="block text-pink-500 font-semibold mb-1">
                        이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
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
                            name="password"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-pink-400 text-white py-2 rounded-xl mt-4 font-semibold hover:bg-pink-500 transition"
                    >
                        가입하기
                    </button>
                </form>

                <footer className="mt-6 text-sm text-pink-400">
                이미 계정이 있으신가요?{" "}
                <a href="/" className="underline hover:text-pink-500">
                    로그인
                </a>
                </footer>
            </section>
        </main>
    );
}
