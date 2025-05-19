import React, { useState, useEffect } from 'react';
import Questionnaire from './components/Questionnaire';
import ResultCard from './components/ResultCard';
import { mbtiResults } from './data/mbtiData';
import './index.css';
import Player from 'lottie-react';
import loadingLottie from './assets/lottie/loading.json';
import question1Image from './assets/questions/question1.png';
import question2Image from './assets/questions/question2.png';
import question3Image from './assets/questions/question3.png';
import question4Image from './assets/questions/question4.png';
import question5Image from './assets/questions/question5.png';
import question6Image from './assets/questions/question6.png';
import question7Image from './assets/questions/question7.png';
import question8Image from './assets/questions/question8.png';
import question9Image from './assets/questions/question9.png';
import question10Image from './assets/questions/question10.png';

function App() {
  const [answers, setAnswers] = useState<number[] | null>(null);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(false);

  // 预加载问题图片
  useEffect(() => {
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

    questionImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const calculateMbtiType = (answers: number[]): string => {
    // 根据 10 个问题计算 MBTI 类型
    // 问题 1-3: E/I
    // 问题 4-6: S/N
    // 问题 7-8: T/F
    // 问题 9-10: J/P
    const eCount = answers.slice(0, 3).filter(a => a === 0 || a === 1).length;
    const iCount = answers.slice(0, 3).filter(a => a === 2 || a === 3).length;
    
    const sCount = answers.slice(3, 6).filter(a => a === 0 || a === 1).length;
    const nCount = answers.slice(3, 6).filter(a => a === 2 || a === 3).length;
    
    const tCount = answers.slice(6, 8).filter(a => a === 0 || a === 1).length;
    const fCount = answers.slice(6, 8).filter(a => a === 2 || a === 3).length;
    
    const jCount = answers.slice(8, 10).filter(a => a === 0 || a === 1).length;
    const pCount = answers.slice(8, 10).filter(a => a === 2 || a === 3).length;

    const type = [
      eCount > iCount ? 'E' : 'I',
      sCount > nCount ? 'S' : 'N',
      tCount > fCount ? 'T' : 'F',
      jCount > pCount ? 'J' : 'P'
    ].join('');

    return type;
  };

  const findMbtiResult = (type: string) => {
    // 返回 { key, result }
    const entry = Object.entries(mbtiResults).find(([key, result]) => result.code === type);
    if (!entry) return null;
    return { key: entry[0], result: entry[1] };
  };

  const handleComplete = (userAnswers: number[]) => {
    setAnswers(userAnswers);
    setLoading(true);
    setTimeout(() => {
      const type = calculateMbtiType(userAnswers);
      setMbtiType(type);
      setLoading(false);
    }, 2200); // 2.2秒loading
  };

  const handleRestart = () => {
    setAnswers(null);
    setMbtiType(null);
    setShowIntro(true);
  };

  const IntroPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-main-gradient relative overflow-hidden">
      {/* 背景底纹 */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-pattern opacity-10"></div>
      <div className="max-w-3xl w-full mx-auto p-4 md:p-8 rounded-3xl shadow-2xl bg-black/60 backdrop-blur-lg relative z-10 flex flex-col items-center justify-between min-h-[90vh]">
        {/* 封面图片区域 */}
        <div className="w-full flex justify-center mb-2 md:mb-4">
          <img
            src="./cover.png"
            alt="封面"
            className="rounded-2xl shadow"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(80,80,160,0.10)'
            }}
          />
        </div>
        <div className="text-center mb-6 md:mb-8">
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 tracking-wide drop-shadow-lg animate-fadein"
            style={{
              background: 'linear-gradient(90deg, #a18fff 0%, #f3e7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'fadein 1.2s ease'
            }}
          >
            你的职场人格是哪一型？
          </h1>
          <p className="text-base md:text-2xl text-purple-200 mb-4 md:mb-6 font-medium">
            解锁你的职场隐藏属性，看看你是哪种"办公室搭子"！
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mb-4 md:mb-8 w-full">
          <div className="bg-gradient-to-br from-[#23213a]/80 to-[#2d2a4f]/80 p-3 md:p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#3a3757]/80 flex items-center justify-center mb-2 md:mb-4 text-xl md:text-3xl">🎯</div>
            <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2 text-white">真实场景体验</h3>
            <p className="text-xs md:text-base text-purple-100 text-center">10道贴近职场生活的趣味题，轻松带入你的日常</p>
          </div>
          <div className="bg-gradient-to-br from-[#23213a]/80 to-[#2d2a4f]/80 p-3 md:p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#3a3757]/80 flex items-center justify-center mb-2 md:mb-4 text-xl md:text-3xl">💡</div>
            <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2 text-white">专属性格解析</h3>
            <p className="text-xs md:text-base text-blue-100 text-center">一句话看懂你的职场风格，附送成长小建议</p>
          </div>
          <div className="bg-gradient-to-br from-[#23213a]/80 to-[#2d2a4f]/80 p-3 md:p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#3a3757]/80 flex items-center justify-center mb-2 md:mb-4 text-xl md:text-3xl">🤝</div>
            <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2 text-white">智能搭档推荐</h3>
            <p className="text-xs md:text-base text-yellow-100 text-center">匹配最适合你的职场拍档，助你高效协作</p>
          </div>
        </div>
        <div className="text-center w-full mt-2 md:mt-4">
          <button
            onClick={() => setShowIntro(false)}
            className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-white via-[#f3f3f3] to-[#e0e6f7] text-[#23213a] text-lg md:text-2xl rounded-full shadow-xl hover:shadow-2xl hover:border hover:border-[#bfc6e6] transition-all font-bold tracking-wide relative overflow-hidden shine-btn"
          >
            <span className="relative z-10">开始测试 →</span>
          </button>
        </div>
      </div>
    </div>
  );

  const LoadingScreen = () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-main-gradient bg-pattern animate-fadein">
      <div className="mb-6 md:mb-8 text-xl md:text-3xl font-bold text-white drop-shadow-lg animate-pulse">
        正在计算你的办公室MBTI人格...
      </div>
      <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
        <Player
          autoplay
          loop
          animationData={loadingLottie}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-main-gradient">
      {loading && <LoadingScreen />}
      {showIntro ? (
        <IntroPage />
      ) : !answers ? (
        <div className="py-8">
          <Questionnaire onComplete={handleComplete} />
        </div>
      ) : mbtiType ? (
        (() => {
          const found = findMbtiResult(mbtiType);
          console.log('answers:', answers);
          console.log('mbtiType:', mbtiType);
          console.log('mbtiResult:', found);
          return found ? (
            <ResultCard
              result={found.result}
              mbtiType={found.key}
              onRestart={handleRestart}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">无法确定您的 MBTI 类型，请重试。</p>
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                重新测试
              </button>
            </div>
          );
        })()
      ) : null}
    </div>
  );
}

export default App;
