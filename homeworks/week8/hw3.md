## 什麼是 Ajax？

全名為 Asynchonous JavaScript and XML (非同步 JS 與 XML)，是透過 JS 發 request 並接收 response，讓存取 API 的過程在背景執行，拿到的資料可以由 JS 處理後即時地放到網頁上，可以大幅改善使用者體驗。

## 用 Ajax 與我們用表單送出資料的差別在哪？

使用 form 送 request 給 server 拿到 response 後，瀏覽器會直接渲染 response 的內容，也就是把整個頁面更新過，網址會改變，而內容就變成 response 裡 html 的內容。

用 AJAX 是由 JS 拿到資料後動態地放上網頁，不需要重新渲染整個頁面，網址也是同一個。

## JSONP 是什麼？

全名是 JSON with padding，由於 html 中 script 標籤不受同源政策的限制，因此可以在 html 中事先定義好處理資料的函式，再引入外部 script，裡面帶有呼叫函式的程式碼，引數即要處裡的資料，如此避開同源政策拿到資料。

### Reference
[JSONP (JSON with Padding)](https://www.fooish.com/json/jsonp.html)

## 要如何存取跨網域的 API？

1. 不透過瀏覽器就沒有跨網域的問題：node.js 或是 curl
2. 透過瀏覽器，但 response header 裡的 "Access-Control-Allow-Origin" 必需有你所在的網域或者為 "*"，表示任意網域皆可存取。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

由於同源政策 (same-origin policy) 的限制，此為瀏覽器為了使用者的安全加上的限制，之前在 node.js 執行時沒有瀏覽器這一層，發 request 與 收 response 都是最直接的，但瀏覽器會檢查 response header 裡的 Access-Control-Allow-Origin 與你現在的網域是否相符，否則不會讓你存取。