import React from 'react';
import { MbtiResult } from '../types/mbti';

interface ResultCardProps {
  result: MbtiResult;
  mbtiType: string;
  onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, mbtiType, onRestart }) => {
  // 处理搭档信息，去掉括号内的 MBTI 类型
  const formatPartner = (partner: string) => {
    return partner.replace(/（[A-Z]+）/, '');
  };

  const partnerKey = result.partner.split('-')[0].toLowerCase();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-black/70 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg">
        {/* 内容区域 */}
        <div className="p-8 space-y-4">
          <div className="flex items-center justify-between p-3">
            <div>
              <h1 className="text-5xl font-bold text-white mb-1 drop-shadow-lg">{mbtiType}</h1>
              <p className="text-2xl text-purple-300 font-semibold drop-shadow">{result.alias}</p>
            </div>
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                marginLeft: 20,
              }}
            >
              <img
                src={`./avatars/${mbtiType.toLowerCase()}.png`}
                alt={`${mbtiType} 形象`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain', 
                  background: 'none' 
                }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-purple-200 mb-2">💭 个性宣言</h2>
            <p className="text-gray-100 text-base">{result.declaration}</p>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-blue-200 mb-2">👀 性格解析</h2>
            <p className="text-gray-100 text-base">{result.description}</p>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-pink-200 mb-2">📈 升职秘籍</h2>
            <p className="text-gray-100 text-base">{result.promotion}</p>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-yellow-200 mb-2">🖥️ 办公桌灵感</h2>
            <p className="text-gray-100 text-base">{result.desk}</p>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-cyan-200 mb-2">🤝 最佳搭档</h2>
            <div className="flex items-center">
              <img
                src={`./avatars/${partnerKey}.png`}
                alt={`${partnerKey} 形象`}
                style={{
                  width: '2.5em',
                  height: '2.5em',
                  objectFit: 'contain',
                  background: 'none',
                  marginRight: '0.75em',
                  verticalAlign: 'middle',
                  display: 'inline-block',
                }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <p className="text-gray-100 text-base inline-block align-middle m-0">{formatPartner(result.partner)}</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={onRestart}
              className="px-10 py-3 bg-gradient-to-r from-white via-[#f3f3f3] to-[#e0e6f7] text-[#23213a] text-xl rounded-full shadow-xl hover:shadow-2xl hover:border hover:border-[#bfc6e6] transition-all font-bold tracking-wide"
            >
              重新测试
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard; 