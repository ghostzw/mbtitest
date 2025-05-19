import React from 'react';
import { MbtiType } from '../types/mbti';
import { mbtiResults } from '../data/mbtiData';
import resultBg from '../assets/images/optimized/result-bg.webp';
import resultBgMobile from '../assets/images/optimized/result-bg-mobile.webp';

interface ResultProps {
  mbtiType: MbtiType;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ mbtiType, onRestart }) => {
  const result = mbtiResults[mbtiType];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-3 md:py-6">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full mx-auto">
          <div className="relative h-36 md:h-44">
            <img
              src={window.innerWidth <= 768 ? resultBgMobile : resultBg}
              alt="Result Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2 md:p-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 md:mb-3 text-gray-800">
              {result.code} - {result.alias}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3">
              {result.description}
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3">
              {result.declaration}
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              {result.promotion}
            </p>
            <div className="flex justify-center">
              <button
                onClick={onRestart}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 text-sm md:text-base"
              >
                重新测试
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result; 