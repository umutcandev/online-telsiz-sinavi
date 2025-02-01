'use client';

import { ArrowRight, Circle, CircleDot, ArrowLeft, LogOut } from 'lucide-react';

interface ExamSectionProps {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  question: string;
  options: string[];
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (option: string | null) => void;
  selectedOption: string | null;
  onExit: () => void;
  onReturnToResults: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  showAnswers?: boolean;
  correctAnswer?: string;
  isReviewMode?: boolean;
}

export function ExamSection({
  title,
  currentQuestion,
  totalQuestions,
  question,
  options,
  onNext,
  onPrevious,
  onSelect,
  selectedOption,
  onExit,
  onReturnToResults,
  canGoPrevious,
  canGoNext,
  showAnswers = false,
  correctAnswer,
  isReviewMode
}: ExamSectionProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 rounded-lg bg-black border-2 border-zinc-950">
        <h2 className="text-sm sm:text-base text-white">{title}</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm px-3 py-0.5 rounded-full bg-zinc-950 text-zinc-600">
            {currentQuestion} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="p-4 sm:p-6 rounded-lg bg-black border-2 border-zinc-950">
        <p className="text-sm sm:text-base text-white mb-6 sm:mb-8">{question}</p>

        {/* Options */}
        <div className="space-y-3 sm:space-y-4">
          {options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index);
            const isSelected = selectedOption === optionLetter;
            const isCorrect = showAnswers && correctAnswer === optionLetter;

            return (
              <button
                key={index}
                onClick={() => onSelect(optionLetter)}
                className={`group w-full p-3 sm:p-4 rounded-lg text-left transition-all bg-black border-2 
                  ${showAnswers
                    ? isSelected
                      ? correctAnswer === optionLetter
                        ? "border-green-500 bg-green-500/10"
                        : "border-red-500 bg-red-500/10"
                      : correctAnswer === optionLetter
                        ? "border-green-500 bg-green-500/10"
                        : "border-zinc-950"
                    : isSelected
                      ? "border-white"
                      : "border-zinc-950 hover:border-zinc-800"
                  }`}
                disabled={showAnswers}
              >
                <div className="flex items-center gap-3">
                  {showAnswers ? (
                    isSelected ? (
                      isCorrect ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <CircleDot className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span className="text-[10px] sm:text-xs font-medium">(Doğru Cevap)</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-500">
                          <CircleDot className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span className="text-[10px] sm:text-xs font-medium">(Yanlış Cevap)</span>
                        </div>
                      )
                    ) : isCorrect ? (
                      <div className="flex items-center gap-2 text-green-500">
                        <Circle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      </div>
                    ) : (
                      <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 flex-shrink-0" />
                    )
                  ) : (
                    isSelected ? (
                      <CircleDot className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 flex-shrink-0" />
                    )
                  )}
                  <span className={`text-sm sm:text-base ${
                    showAnswers 
                      ? isCorrect
                        ? "text-green-500"
                        : isSelected
                          ? "text-red-500"
                          : "text-zinc-400"
                      : isSelected
                        ? "text-white"
                        : "text-zinc-400"
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
        {isReviewMode ? (
          <button
            onClick={onReturnToResults}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-zinc-800 text-white hover:border-zinc-700 transition-colors inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-[15px]"
          >
            <LogOut className="w-4 h-4" />
            Sonuçlara Dön
          </button>
        ) : (
          <button
            onClick={onExit}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-[15px]"
          >
            <LogOut className="w-4 h-4" />
            Sınavdan Çık
          </button>
        )}

        <div className="flex items-center w-full sm:w-auto gap-4">
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-zinc-800 text-white hover:border-zinc-700 transition-colors inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Önceki Soru
          </button>

          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-[15px] disabled:opacity-50 disabled:cursor-not-allowed ${
              isReviewMode 
                ? "border-2 border-zinc-800 text-white hover:border-zinc-700"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {!isReviewMode && currentQuestion === totalQuestions 
              ? "Sınavı Bitir" 
              : "Sonraki Soru"
            }
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 