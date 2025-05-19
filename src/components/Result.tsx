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
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={window.innerWidth <= 768 ? resultBgMobile : resultBg}
              alt="Result Background"
              className="w-full h-36 md:h-44 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {result.code} - {result.alias}
              </h1>
            </div>
          </div>
          
          <div className="p-3 md:p-4">
            <div className="prose max-w-none">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-2 md:mb-3">
                {result.description}
              </p>
              <p className="text-base md:text-lg text-purple-600 font-medium mb-2 md:mb-3">
                {result.declaration}
              </p>
              <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                {result.promotion}
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={onRestart}
                className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors text-base md:text-lg font-medium"
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