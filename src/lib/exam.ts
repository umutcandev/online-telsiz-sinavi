import regulationsData from '@/data/regulations.json';
import operationsData from '@/data/operations.json';
import technicalData from '@/data/technical.json';

export type ExamType = 'regulations' | 'operations' | 'technical';

export function getExamQuestions(type: ExamType) {
  // Hangi veri setini kullanacağımızı belirle
  const data = {
    regulations: regulationsData,
    operations: operationsData,
    technical: technicalData
  }[type];

  // Debug için veri setini kontrol et
  console.log(`Loading ${type} exam data:`, {
    totalQuestions: data.questions.length,
    questionsPerExam: Math.min(data.questions_per_exam, data.questions.length),
    firstQuestion: data.questions[0],
  });

  if (!data.questions || data.questions.length === 0) {
    console.error('No questions found in data set');
    return [];
  }

  // Soruları kopyala ve karıştır
  const shuffledQuestions = [...data.questions].sort(() => Math.random() - 0.5);
  
  // Mevcut soru sayısı ile istenilen soru sayısından küçük olanı seç
  const questionCount = Math.min(data.questions_per_exam, shuffledQuestions.length);
  const selectedQuestions = shuffledQuestions.slice(0, questionCount);

  // Debug için seçilen soruları kontrol et
  console.log('Selected questions:', selectedQuestions.map(q => ({
    id: q.id,
    question: q.question
  })));

  return selectedQuestions;
}

export function getExamTitle(type: ExamType) {
  return {
    regulations: 'A-B SINIFI ULUSAL VE ULUSLARARASI DÜZENLEMELER SORU TESTİ',
    operations: 'A-B SINIFI İŞLETME SORU TESTİ',
    technical: 'A-B SINIFI TEKNİK SORU TESTİ'
  }[type];
}

export function getExamQuestionCount(type: ExamType) {
  const data = {
    regulations: regulationsData,
    operations: operationsData,
    technical: technicalData
  }[type];

  // Mevcut soru sayısı ile istenilen soru sayısından küçük olanı döndür
  return Math.min(data.questions.length, {
    regulations: 15,
    operations: 20,
    technical: 15
  }[type]);
} 