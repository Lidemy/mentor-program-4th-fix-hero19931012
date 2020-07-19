## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. `header`  
網頁主要標題，可能是重複出現的 logo 或標題。
2. `aside`  
側邊欄，存放與頁面主要資訊較無直接關聯、屬於額外的內容，如側邊欄欄、廣告、其他連結、推薦文章等，不一定要在側邊才能使用。
3. `section`  
段落、章節，將內容做出區隔。

## 請問什麼是盒模型（box modal）

所有元素由內至外具有寬、高、內距、框線、外距等屬性，統稱為 Box model，透過操作這些屬性來調整元素在版面中的呈現。

除了元素本身的寬高以外，padding, border, margin 都會佔有體積，為了精準地控制元素的大小並省去計算元素體積的時間，可以用 `box-sizing` 這個屬性來調整，預設為 `content-box`，也就是元素本身的寬高必須加上 padding, border, margin 才會是最後佔有的體積，用 `border-box` 的話，padding, border 就會被算入元素本身的內容，也就不會影響整體的體積了。

![box model](https://mdn.mozillademos.org/files/16558/box-model.png)  
[圖片來源](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)

### Reference
[前端基礎：CSS 盒模型（box model）](https://medium.com/@hugh_Program_learning_diary_Js/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A4%8E-css-%E7%9B%92%E6%A8%A1%E5%9E%8B-box-model-1b977df8d3d0)

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

| display      | 預設換行           | 預設寬高   | 寬高，margin，padding | 使用時機                               |
|--------------|:-------------------|------------|:----------------------|----------------------------------------|
| block        | 換行               | 左右佔滿   | 可調整                | 單個物件，不需水平排列時，例如圖或表   |
| inline-block | 不換行，於行內排列 | 依內部元素 | 可調整                | 有多個物件要排列，並希望維持一定間距時 |
| inline       | 不換行，於行內排列 | 依內部元素 | 不可調整              | 可與文字排列，如超連結                 |

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

1. position: static
    - 是瀏覽器預設的 position，套用 static 的元素會照順序自動由上往下排列。
    - 下層元素無法使用可定位的屬性 (基本上就是其他種 position)。
2. position: relative
    - 若不增加其他屬性 (top ,left etc.) 看起來跟 static 一樣。
    - 被設定 relative 的元素可藉由調整 top, left, bottom or right 使位置偏移，偏移的基準是以元素被定義為 static 時得到的位置。
    - 其他元素不會受到 relative 元素移動的影響。
    - 使用時機：微調物件位置的時候，或是下層元素需要用到 absolute 的時候
3. position: absolute
    - 以上層元素為錨點偏移位置的屬性。
    - 若上層元素為 static (除 static 不可被定位，其他屬性皆可定位)，則 absolute 會根據整個頁面調整位置，且滾動或平移也會跟著移動。
    - 使用時機：facebook 個人頁的大頭貼
4. position: fixed
    - 固定在頁面上的固定位置，即使滾動或平移也不會移動。
    - 使用時機：討人厭的蓋版廣告(？)

### Reference:
[學習 CSS 版面配置-關於 position 屬性](https://zh-tw.learnlayout.com/position.html)