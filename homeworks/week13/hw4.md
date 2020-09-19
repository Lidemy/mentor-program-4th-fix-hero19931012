## Webpack 是做什麼用的？可以不用它嗎？

Webpack 是一個將資源打包的工具，
並且使打包後的資料可以相容於瀏覽器環境，
例如瀏覽器原本不支援 Node 上的各種套件，透過 webpack 的打包，
就可以引入各種套件，並且在瀏覽器上執行，
或者利用 preprocessor，將 ES6 語法轉換成瀏覽器支援的版本、
將 scss 撰寫的 style 轉成 css 然後引入專案的入口檔案，
html 內只要引入這一支打包好的入口檔，就能使用專案內寫好的各種功能。

可以不用 webpack 嗎？
當然可以，webpack 只是增加方便性的工具，要引入模組，還是可以用 `<script type=module></script>` 的方式引入，但會有諸多問題，
像是瀏覽器支援度各家不一，還有沒辦法只透過一支 js 就把所有套件都引入進來，必須手動，不僅可維護性差也很煩人。

## gulp 跟 webpack 有什麼不一樣？

gulp 是任務管理工具 (task manager)，透過一個一個 task 來執行自定義的任務，
相較於 webpack 針對瀏覽器將資源打包在一起，這是 gulp 做不到的，
但 gulp 能做的也不只限於 babel 或 scss compiler，
只要是能夠自定義出來執行的 task 都在 gulp 的範圍，比起 webpack 來說要廣泛得多。

## CSS Selector 權重的計算方式為何？

CSS selector 權重計算可視作下表：
| !important | inline-style | id  | class | tag |
| ---------- | ------------ | --- | ----- | --- |
| 0          | 0            | 0   | 0     | 0   |

下面的數字是 selector 使用的 id, class or tag 的數量，排在前面的有絕對高的權重，也就是 `!important > inline-style > id > class > tag`，只要不是 0 ，後面即便數字再大權重也不會比較高，例如 `1, 0, 0, 0, 0` 絕對比 `0, 10, 0, 0, 0` 還要大。

數字的多寡以用了多少個 class 或 tag 來指定元素，例如

`.main .title` =>  `0, 0, 0, 2, 0`
`#content`     =>  `0, 0, 1, 0, 0`

也可以混用

`.main h1.title` => `0, 0, 0, 2, 1`

!important 只能是 0 或 1，同時有 !important 就會再去比 id, class and tag，但實際上應該避免使用，以保持專案的可維護性。
