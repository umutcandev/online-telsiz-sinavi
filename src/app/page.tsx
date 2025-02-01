'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Circle, RefreshCw, Github } from "lucide-react";
import { ExamSection } from '@/components/exam/ExamSection';
import { getExamQuestions, getExamTitle, ExamType } from '@/lib/exam';

export default function Home() {
  const [activeExam, setActiveExam] = useState<ExamType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const handleStartExam = (examType: ExamType) => {
    const examQuestions = getExamQuestions(examType);
    if (examQuestions.length === 0) {
      alert('Sınav soruları yüklenemedi. Lütfen daha sonra tekrar deneyin.');
      return;
    }
    setQuestions(examQuestions);
    setActiveExam(examType);
    setCurrentQuestion(1);
    setSelectedOption(null);
    setAnswers(new Array(examQuestions.length).fill(null));
    setShowResults(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length) {
      setShowResults(true);
      return;
    }

    // Mevcut cevabı kaydet
    const newAnswers = [...answers];
    newAnswers[currentQuestion - 1] = selectedOption;
    setAnswers(newAnswers);

    // Sonraki soruya geç
    setCurrentQuestion(currentQuestion + 1);
    // Sonraki sorunun cevabını göster (eğer varsa)
    setSelectedOption(newAnswers[currentQuestion]);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      // Mevcut cevabı kaydet
      const newAnswers = [...answers];
      newAnswers[currentQuestion - 1] = selectedOption;
      setAnswers(newAnswers);

      // Önceki soruya dön
      setCurrentQuestion(currentQuestion - 1);
      // Önceki sorunun cevabını göster
      setSelectedOption(newAnswers[currentQuestion - 2]);
    }
  };

  const handleExitExam = () => {
    if (confirm('Sınavdan çıkmak istediğinize emin misiniz? Tüm ilerlemeniz silinecektir.')) {
      setActiveExam(null);
      setCurrentQuestion(1);
      setSelectedOption(null);
      setQuestions([]);
      setAnswers([]);
      setShowResults(false);
    }
  };

  const handleRestartExam = () => {
    if (activeExam) {
      handleStartExam(activeExam);
    }
  };

  // Sonuçları hesapla
  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    answers.forEach((answer, index) => {
      if (answer === null) {
        empty++;
      } else if (answer === questions[index].answer) {
        correct++;
      } else {
        wrong++;
      }
    });

    return { correct, wrong, empty };
  };

  // Eğer soru verisi yoksa veya geçersizse varsayılan değerler kullan
  const currentQuestionData = questions[currentQuestion - 1] || null;

  // Eğer soru verisi yoksa sınavdan çık
  if (activeExam && !currentQuestionData && !showResults) {
    handleExitExam();
    return null;
  }

  return (
    <main className="min-h-screen bg-black p-1.5 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto max-w-4xl">
        {!activeExam ? (
          <>
            {/* Başlık ve Açıklama */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 mt-3 sm:mt-0">
              <h2 className="text-2xl sm:text-3xl text-white">
                Online Amatör Telsizcilik Sınavı
              </h2>
              <a
                href="https://github.com/umutcandev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800 text-sm text-zinc-400 hover:text-white w-fit"
              >
                <Github className="w-4 h-4" />
                umutcandev
              </a>
            </div>
            
            <p className="text-sm sm:text-base text-zinc-400 mb-3 sm:mb-4">
              Amatör telsizcilik sınavına hazırlananlar için kapsamlı online test sayfası. 
              Teknik içerik, işletim kuralları ve prosedürler ile ulusal ve uluslararası 
              düzenlemeler konularında bilgi seviyenizi ölçün ve eksiklerinizi belirleyin. 
              Gerçek sınav formatına uygun sorularla kendinizi test edin!
            </p>

            <p className="text-zinc-400 mb-8 sm:mb-12 text-sm sm:text-base">
              Daha fazla bilgi için ilgili bağlantıdan{" "}
              <a 
                href="https://izciforum.com/konular/meb-amator-telsizcilik-e-sinav-kilavuzu.49/"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white underline hover:text-zinc-300"
              >
                MEB e-Sınav Kılavuzuna
              </a>
              {" "}göz gezdirebilirsiniz.
            </p>

            {/* Sınav Kategorileri */}
            <div className="space-y-4 sm:space-y-6">
              {/* Düzenlemeler Sınavı */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between p-4 sm:p-6 rounded-lg bg-black border-2 border-zinc-950">
                <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                  <h3 className="text-sm sm:text-base text-white">
                    A-B Sınıfı Ulusal ve Uluslararası Düzenlemeler Soru Testi
                  </h3>
                  <span className="inline-block text-xs sm:text-sm px-3 py-0.5 rounded-full bg-zinc-950 text-zinc-600">15 SORU</span>
                </div>
                <button 
                  onClick={() => handleStartExam('regulations')}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-[15px]"
                >
                  Sınava Başla
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* İşletme Sınavı */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between p-4 sm:p-6 rounded-lg bg-black border-2 border-zinc-950">
                <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                  <h3 className="text-sm sm:text-base text-white">
                    A-B Sınıfı İşletme Soru Testi
                  </h3>
                  <span className="inline-block text-xs sm:text-sm px-3 py-0.5 rounded-full bg-zinc-950 text-zinc-600">20 SORU</span>
                </div>
                <button 
                  onClick={() => handleStartExam('operations')}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-[15px]"
                >
                  Sınava Başla
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Teknik Sınavı */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between p-4 sm:p-6 rounded-lg bg-black border-2 border-zinc-950">
                <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                  <h3 className="text-sm sm:text-base text-white">
                    A-B Sınıfı Teknik Soru Testi
                  </h3>
                  <span className="inline-block text-xs sm:text-sm px-3 py-0.5 rounded-full bg-zinc-950 text-zinc-600">15 SORU</span>
                </div>
                <button 
                  onClick={() => handleStartExam('technical')}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-[15px]"
                >
                  Sınava Başla
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : showResults ? (
          // Sonuç Ekranı
          <div className="space-y-8">
            <div className="flex items-center justify-between p-6 rounded-lg bg-black border-2 border-zinc-950">
              <h2 className="text-base text-white">{getExamTitle(activeExam)}</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm px-3 py-0.5 rounded-full bg-zinc-950 text-zinc-600">
                  Sınav Sonucu
                </span>
              </div>
            </div>

            {/* Sonuç Detayları */}
            <div className="p-6 rounded-lg bg-black border-2 border-zinc-950">
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">
                        {calculateResults().correct}/{questions.length}
                      </div>
                      <div className="text-sm text-zinc-400">Sonuç</div>
                    </div>
                  </div>
                  {/* Progress Ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      className="stroke-zinc-800 fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      className={`stroke-green-500 fill-none transition-all duration-1000 ease-out`}
                      strokeWidth="8"
                      strokeDasharray={`${(calculateResults().correct / questions.length) * 377} 377`}
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border-2 border-zinc-800">
                  <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-white">Doğru</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{calculateResults().correct}</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border-2 border-zinc-800">
                  <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-white">Yanlış</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{calculateResults().wrong}</div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border-2 border-zinc-800">
                  <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Circle className="w-5 h-5 text-zinc-500" />
                      <span className="text-white">Boş</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{calculateResults().empty}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:justify-between">
              <button
                onClick={handleExitExam}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors inline-flex items-center justify-center gap-2 text-[13px] sm:text-[15px]"
              >
                Ana Sayfaya Dön
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => {
                    setReviewMode(true);
                    setShowResults(false);
                    setCurrentQuestion(1);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border-2 border-zinc-800 text-white hover:border-zinc-700 transition-colors inline-flex items-center justify-center gap-2 text-[13px] sm:text-[15px]"
                >
                  Sorulara Verdiğin Cevabı Gör
                </button>

                <button
                  onClick={handleRestartExam}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors inline-flex items-center justify-center gap-2 text-[13px] sm:text-[15px]"
                >
                  Sınavı Tekrarla
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <ExamSection
            title={getExamTitle(activeExam)}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            question={currentQuestionData?.question || ""}
            options={[
              currentQuestionData?.options.A || "",
              currentQuestionData?.options.B || "",
              currentQuestionData?.options.C || "",
              currentQuestionData?.options.D || ""
            ]}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            onSelect={(option) => {
              if (selectedOption === option) {
                setSelectedOption(null);
                const newAnswers = [...answers];
                newAnswers[currentQuestion - 1] = null;
                setAnswers(newAnswers);
              } else {
                setSelectedOption(option);
                const newAnswers = [...answers];
                newAnswers[currentQuestion - 1] = option;
                setAnswers(newAnswers);
              }
            }}
            selectedOption={answers[currentQuestion - 1]}
            onExit={handleExitExam}
            onReturnToResults={() => {
              setShowResults(true);
              setReviewMode(false);
            }}
            canGoPrevious={currentQuestion > 1}
            canGoNext={currentQuestion < questions.length || currentQuestion === questions.length}
            showAnswers={reviewMode}
            correctAnswer={currentQuestionData?.answer}
            isReviewMode={reviewMode}
          />
        )}
      </div>
    </main>
  );
}
