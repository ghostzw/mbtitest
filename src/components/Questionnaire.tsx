import React, { useState, useCallback } from 'react';
import { questions } from '../data/mbtiData';
import { Question } from '../types/mbti';
import question1Image from '../assets/questions/question1.png';
import question2Image from '../assets/questions/question2.png';
import question3Image from '../assets/questions/question3.png';
import question4Image from '../assets/questions/question4.png';
import question5Image from '../assets/questions/question5.png';
import question6Image from '../assets/questions/question6.png';
import question7Image from '../assets/questions/question7.png';
import question8Image from '../assets/questions/question8.png';
import question9Image from '../assets/questions/question9.png';
import question10Image from '../assets/questions/question10.png';

// 防抖函数
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const questionImages = [
  question1Image,
  question2Image,
  question3Image,
  question4Image,
  question5Image,
  question6Image,
  question7Image,
  question8Image,
  question9Image,
  question10Image,
];

const Questionnaire: React.FC<{
  onComplete: (answers: number[]) => void;
}> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }

    // 300ms 后重置处理状态
    setTimeout(() => {
      setIsProcessing(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="mb-3 md:mb-4">
        <div className="w-full bg-[#23213a] rounded-full h-2 md:h-2.5">
          <div
            className="bg-blue-600 h-2 md:h-2.5 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs md:text-sm text-gray-300 mt-1 md:mt-2">
          第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题
        </p>
      </div>

      <div className="bg-black/70 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8">
        <img
          src={questionImages[currentQuestionIndex]}
          alt={`问题 ${currentQuestionIndex + 1} 配图`}
          className="w-full h-48 object-contain rounded-lg mb-4"
        />
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white drop-shadow">{currentQuestion.text}</h2>
        <div className="space-y-3 md:space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 md:p-4 rounded-xl md:rounded-2xl border text-base md:text-lg font-medium transition-all
                ${answers[currentQuestionIndex] === index
                  ? 'bg-[#23213a] border-blue-400 text-white shadow-lg'
                  : 'bg-[#181726] border-[#35334a] text-gray-200 hover:bg-[#23213a]/80 hover:border-blue-300'}
              `}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleAnswer(index);
              }}
              onClick={() => handleAnswer(index)}
              disabled={isProcessing}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 md:mt-8 flex justify-between">
          <button
            className="px-4 md:px-6 py-2 bg-white text-[#23213a] rounded-full shadow hover:shadow-lg font-bold text-sm md:text-base transition-all disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || isProcessing}
          >
            上一题
          </button>
          <button
            className="px-4 md:px-6 py-2 bg-white text-[#23213a] rounded-full shadow hover:shadow-lg font-bold text-sm md:text-base transition-all disabled:opacity-50"
            onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                onComplete(answers);
              }
            }}
            disabled={answers[currentQuestionIndex] === undefined || isProcessing}
          >
            {currentQuestionIndex === questions.length - 1 ? '提交答卷' : '下一题'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire; 