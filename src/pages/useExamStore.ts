import { create } from "zustand";

interface ExamState {
  answers: Record<number, number>; // 질문ID → 옵션 index
  setAnswer: (questionId: number, optionIndex: number) => void;
  resetAnswers: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  answers: {},

  setAnswer: (questionId, optionIndex) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: optionIndex,
      },
    })),

  resetAnswers: () => set({ answers: {} }),
}));
