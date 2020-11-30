## 為什麼我們需要 React？可以不用嗎？

React 透過自定義的 component 搭配 state 來操作畫面、以 JSX 減少重複撰寫 html，我們不需直接操作 DOM，畫面皆根據 state 渲染，在規模比較大的專案中，提供較為模組化開發方式，相對於較小規模的專案即使不使用，直接寫原生 JS 也不會怎樣，反而有點多此一舉。

## React 的思考模式跟以前的思考模式有什麼不一樣？

>畫面永遠根據 state 產生。

以往操作 DOM 元素時往往需要一邊改動 DOM 一邊更新 data，但如果東西一多，可能會發生 data 更新了但是畫面沒有更新，反之亦然。畫面始終由 state 產生確保資料的單一性，也就是 state 是畫面的唯一根據，也就不會有 data 與畫面不同步的情況。

## state 跟 props 的差別在哪裡？

>props 是被傳遞進 component（類似於 function 的參數），而 state 是在 component 內部被管理（類似於在 function 中宣告中的變數）。

Components 利用類似於 html attribute 的方式接收參數，這些參數被放在 props 這個物件裡面，而 state 是 Conponent 可以自主管理的物件，透過 useState 來更新自己的 state，例如一個 todo list 最主要的 component 'Todo' 建立了 'todos' 這個 state，並且宣告一些 handler function 來處理 UI 的操作，然後 Todo 透過 props 把 todos 與 handler 傳遞給底下的 component 'TodoItem'，要他根據 todos 的狀態渲染畫面上的任務，且監聽事件更新 todos，對於 Todo 來說是在管理自己的 state，TodoItem 則必須透過接收 props 才能夠處理 todos 的 state。