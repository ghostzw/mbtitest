#!/bin/bash

# 检查是否安装了必要的工具
if ! command -v convert &> /dev/null; then
    echo "请先安装 ImageMagick: brew install imagemagick"
    exit 1
fi

# 创建优化后的图片目录
mkdir -p src/assets/images/optimized

# 优化问题图片
for i in {1..10}; do
    if [ -f "src/assets/questions/question$i.png" ]; then
        convert "src/assets/questions/question$i.png" \
            -strip \
            -quality 85 \
            -resize "800x600>" \
            "src/assets/images/optimized/question$i.webp"
        echo "优化完成: question$i.png -> question$i.webp"
    fi
done

# 优化 MBTI 头像图片
for type in intj intp entj entp infj infp enfj enfp istj isfj estj esfj istp isfp estp esfp; do
    if [ -f "public/avatars/$type.png" ]; then
        convert "public/avatars/$type.png" \
            -strip \
            -quality 85 \
            -resize "400x400>" \
            "public/avatars/optimized/$type.webp"
        echo "优化完成: $type.png -> $type.webp"
    fi
done

echo "所有图片优化完成！" 