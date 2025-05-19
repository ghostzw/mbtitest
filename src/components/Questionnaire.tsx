import React, { useState, useEffect } from 'react';
import { questions } from '../data/mbtiData';
import { Question } from '../types/mbti';
import question1Image from '../assets/images/optimized/question1.webp';
import question2Image from '../assets/images/optimized/question2.webp';
import question3Image from '../assets/images/optimized/question3.webp';
import question4Image from '../assets/images/optimized/question4.webp';
import question5Image from '../assets/images/optimized/question5.webp';
import question6Image from '../assets/images/optimized/question6.webp';
import question7Image from '../assets/images/optimized/question7.webp';
import question8Image from '../assets/images/optimized/question8.webp';
import question9Image from '../assets/images/optimized/question9.webp';
import question10Image from '../assets/images/optimized/question10.webp';

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
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    setIsTransitioning(true);
    setHoveredOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setHoveredOption(null);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleOptionHover = (index: number) => {
    if (!isMobile && !isTransitioning) {
      setHoveredOption(index);
    }
  };

  const handleOptionLeave = () => {
    if (!isMobile && !isTransitioning) {
      setHoveredOption(null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="mb-3 md:mb-4">
        <div className="w-full bg-[#23213a] rounded-full h-2 md:h-2.5">
          <div
            className="bg-blue-600 h-2 md:h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs md:text-sm text-gray-300 mt-1 md:mt-2">
          第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题
        </p>
      </div>

      <div className="bg-black/70 rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8">
        <div className="relative w-full h-48 mb-4">
          <img
            src={questionImages[currentQuestionIndex]}
            alt={`问题 ${currentQuestionIndex + 1} 配图`}
            className="w-full h-full object-contain rounded-lg transition-opacity duration-300"
            loading="lazy"
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.opacity = '1';
            }}
            style={{ opacity: 0 }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white drop-shadow">{currentQuestion.text}</h2>
        <div className="space-y-3 md:space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 md:p-4 rounded-xl md:rounded-2xl border text-base md:text-lg font-medium transition-all duration-300
                ${answers[currentQuestionIndex] === index
                  ? 'bg-[#23213a] border-blue-400 text-white shadow-lg'
                  : hoveredOption === index && !isMobile
                    ? 'bg-[#23213a]/80 border-blue-300 text-white'
                    : 'bg-[#181726] border-[#35334a] text-gray-200'
                }
              `}
              onClick={() => handleAnswer(index)}
              onMouseEnter={() => handleOptionHover(index)}
              onMouseLeave={handleOptionLeave}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 md:mt-8 flex justify-between">
          <button
            className="px-4 md:px-6 py-2 bg-white text-[#23213a] rounded-full shadow hover:shadow-lg font-bold text-sm md:text-base transition-all disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
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
            disabled={answers[currentQuestionIndex] === undefined}
          >
            {currentQuestionIndex === questions.length - 1 ? '提交答卷' : '下一题'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire; 