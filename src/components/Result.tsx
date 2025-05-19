import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MbtiType } from '../types/mbti';
import { mbtiResults } from '../data/mbtiData';
import resultBg from '../assets/images/optimized/result-bg.webp';
import resultBgMobile from '../assets/images/optimized/result-bg-mobile.webp';

interface ResultProps {
  mbtiType: MbtiType;
}

const Result: React.FC<ResultProps> = ({ mbtiType }) => {
  const navigate = useNavigate();
  const result = mbtiResults[mbtiType];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={window.innerWidth <= 768 ? resultBgMobile : resultBg}
              alt="Result Background"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {result.code} - {result.alias}
              </h1>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                {result.description}
              </p>
              <p className="mt-4 text-purple-600 font-medium">
                {result.declaration}
              </p>
              <p className="mt-4 text-gray-600">
                {result.promotion}
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
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