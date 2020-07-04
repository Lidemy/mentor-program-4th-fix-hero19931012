## 請以自己的話解釋 API 是什麼

API 是交換資訊的服務，舉例來說，有一個資料庫想要開放權限給外部應用程式或網頁，使其能夠有限制地讀取資料庫裡的資料，就可以提供一組 API。  

這個 API 有一個最主要的窗口 (baseUrl)，他可以接收帶有不同參數的 request，要開放什麼參數、這些參數有什麼功能都是由提供 API 的一方所制定，並寫在 API 的文件裡，任何獲得授權的使用者皆可根據這份文件撰寫與發送 request，獲得他們想要的資訊。

常見的功能可依據 http method 分成四種，post, get, update and delete，可分別對資料庫進行 Create (建立), Read (讀取), Update (更新) and Delete (刪除) (簡稱 CRUD) 等功能。  

實際的應用場景以訂房網站為例，它可能有很多不同來源的房間資訊，當旅客想要訂房時，輸入日期、房型等條件，訂房網站就會發 request，裡面帶有旅客輸入的條件，到各個房源的資料庫取得資料，最後將取得的資料經過解析並整理，顯示給旅客。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. 400 Bad Request：明顯的 request 錯誤讓伺服器無法處理，可能是語法寫錯、格式不對之類的錯誤，名符其實的 "You fxcked up." (真心覺得這個梗圖簡潔有力)。  
  ![how to remember http statusCodes](https://drtomcrick.files.wordpress.com/2017/04/http-status-code-cheat-sheet1.png)
2. 502 Bad Gateway：通常是伺服器的某個服務沒有正確執行，有可能是中繼的服務，或者是上游。  
3. 503 Service Unavailable：伺服器正在維護或是過載，如果網站受到 DDoS 攻擊會導致伺服器資源被佔用，造成無法服務的結果。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

參考作業給的表格修改，看起來非常相似🤦。

API 網址: baseUrl
| 功能         | HTTP method | path            |       參數        | 範例                                |
|--------------|:-----------:|:----------------|:-----------------:|-------------------------------------|
| 列出所有餐廳 |     get     | /restaurant     | ?_limit: 顯示筆數 | /restaurant?_limit=10 僅顯示 10 筆  |
| 查看單一餐廳 |     get     | /restaurant/:id |       none        | /restaurant/10 顯示 id 為 10 的餐廳 |
| 新增餐廳     |    post     | /restaurant     |  name: 餐廳名稱   | none                                |
| 更改餐廳     |    patch    | /restaurant/:id |  name: 餐廳名稱   | none                                |
| 刪除餐廳     |   delete    | /restaurant/:id |       none        | none                                |

### Reference

1. API  
  [什麼是 API？](https://www.youtube.com/watch?v=zvKadd9Cflc) (註：好多人引用這部影片！)  
  [API 到底是什麼？ 用白話文帶你認識](https://medium.com/codingbar/api-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E7%94%A8%E7%99%BD%E8%A9%B1%E6%96%87%E5%B8%B6%E4%BD%A0%E8%AA%8D%E8%AD%98-95f65a9cfc33)  
  [API 是什麼？認識 Web API、HTTP 和 JSON 資料交換格式](https://tw.alphacamp.co/blog/api-introduction-understand-web-api-http-json)  

2. http status codes  
  [HTTP 狀態碼](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)  
  [常見與不常見的 HTTP Status Code](https://noob.tw/http-status-code/)