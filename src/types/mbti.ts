export type MbtiResult = {
  code: string;
  alias: string;
  declaration: string;
  description: string;
  promotion: string;
  desk: string;
  partner: string;
};

export type Question = {
  id: number;
  text: string;
  options: string[];
};

export type MbtiType = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 
                      'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 
                      'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 
                      'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'; 