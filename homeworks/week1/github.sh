#!/bin/bash

# 建立一個 .txt 暫時存取內容，用 grep 抓關鍵字的那一行，再用 awk 切
curl -s https://api.github.com/users/$1 > $1.txt 
# -s silent mode 不顯示進度

# 用 for 針對我們要的關鍵字進行遞迴
for loop in name bio location blog; do
    temp=$(grep $loop $1.txt)
    # 從 $1.txt 裡搜尋關鍵字，抓出有關鍵字的那一行，用變數存起來
    echo $temp | awk -F'\"' '{print $4}' 
    # 將整行文字用 awk 切割，-F 指取出片段，以 " 作為分割點，然後取出第 4 個片段，最後印出結果
done

rm $1.txt # 移除 .txt