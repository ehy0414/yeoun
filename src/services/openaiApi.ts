import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);

export const getGeminiResponse = async (userMessage: string) => {
   try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `당신은 일기 심리 분석 전문가입니다. 사용자가 작성한 일기를 분석하여 감정 요약과 따뜻한 피드백을 제공해주세요
    다음은 사용자의 일기 내용입니다:\n\n${userMessage}
    ❗ 출력 형식에 대한 세부 지침:
    - 출력은 순수 text만 출력해주세요. (예: ##, **) 없이 출력하세요.
    - 너비가 300px입니다. 그 안에 들어갈 수 있도록 작성해주세요.
    - 각 문장마다 끝나면 줄바꿈 해주세요.
    - 줄바꿈은 <br> 태그로 해주세요.
    - 마치 따뜻한 사람이 작성하듯, 공감과 위로의 톤으로 작성해주세요.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("Generated Recipe:", text);
    // const cleanedText = text;
    return text;
   } catch (error) {
    console.error("Gemini API 호출 오류:", error);
    throw error;
  }
};
