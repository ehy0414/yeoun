import { useNavigate } from "react-router-dom"

export default function HomeHeader() {
    const navigate = useNavigate();
    const onBack = () => {
        navigate(-1);
    }
    return (
        <button
            onClick={onBack}
            className="cursor-pointer text-gray-600 hover:text-pink-600 transition-colors"
          >
            ← 돌아가기
          </button>
    )
}