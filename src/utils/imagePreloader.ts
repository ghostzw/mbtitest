// 预加载单个图片
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};

// 预加载多个图片
export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  try {
    await Promise.all(imageUrls.map(url => preloadImage(url)));
    console.log('All images preloaded successfully');
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};

// 获取所有需要预加载的图片URL
export const getAllImageUrls = (): string[] => {
  const urls: string[] = [];
  
  // 添加封面图片
  urls.push('./cover.png');
  
  // 添加所有MBTI类型头像
  const mbtiTypes = ['intj', 'intp', 'entj', 'entp', 'infj', 'infp', 'enfj', 'enfp', 
                     'istj', 'isfj', 'estj', 'esfj', 'istp', 'isfp', 'estp', 'esfp'];
  mbtiTypes.forEach(type => {
    urls.push(`./avatars/${type}.png`);
  });
  
  // 添加问题图片
  for (let i = 1; i <= 10; i++) {
    urls.push(`./questions/question${i}.png`);
  }
  
  return urls;
}; 