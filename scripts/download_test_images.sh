#!/bin/bash

# 创建图片目录
mkdir -p src/assets/images/mbti

# MBTI类型列表
mbti_types=("intj" "intp" "entj" "entp" "infj" "infp" "enfj" "enfp" "istj" "isfj" "estj" "esfj" "istp" "isfp" "estp" "esfp")

# 下载图片
for type in "${mbti_types[@]}"; do
    # 使用 Picsum 随机图片服务
    curl -L "https://picsum.photos/1200/800" -o "src/assets/images/mbti/mbti-${type}.jpg"
    echo "Downloaded image for ${type}"
    sleep 1  # 避免请求过快
done

echo "All images downloaded successfully!" 