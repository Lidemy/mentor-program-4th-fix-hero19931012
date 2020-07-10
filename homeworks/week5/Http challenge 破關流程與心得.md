Http challenge 破關流程與心得
===

## 開始進入關卡
入口：https://lidemy-http-challenge.herokuapp.com/start

> 這裡一共有 10 道關卡，每一關的網址皆為 /lvX，X 即為關卡的數字。
> 但只知道網址是沒有用的，需要搭配正確的 token 才能順利進入關卡，傳入 token 的方式為 query string，例如 /lv1?token=xxx。
> 
> 另外，為了讓你方便辨別這是 token，token 的內容一定是用一個大括弧刮起來的字串。
> 每一關都會有提示，只要按照提示照著做，就能拿到前往下一關的 token。
> 
> 你可以用任何你擅長的工具來通關，只靠瀏覽器的話有些關卡是沒辦法通過的喔！
> 
> 準備好了嗎？
> 
> 第一關的 token 為：{GOGOGO}
> 
> 附註：所以第一關網址為 /lv1?token={GOGOGO}，不是 /lv1?token=GOGOGO，之後的關卡也是一樣
> 如果你需要提示的話，在網址最後面加上 &hint=1 就會看到提示了，例如說：/lv1?token={GOGOGO}&hint=1

網址輸入：https://lidemy-http-challenge.herokuapp.com/lv1?token={GOGOGO}
進入 Lv1。

## Lv 1 初次見面

> 啊...好久沒有看到年輕人到我這個圖書館了，我叫做 lib，是這個圖書館的管理員
> 很開心看到有年輕人願意來幫忙，最近圖書館剛換了資訊系統，我都搞不清楚怎麼用了...
> 這是他們提供給我的文件，我一個字都看不懂，但對你可能會有幫助：https://gist.github.com/aszx87410/3873b3d9cbb28cb6fcbb85bf493b63ba
> 
> 先把這文件放一旁吧，這個待會才會用到
> 你叫做什麼名字呢？用 GET 方法跟我說你的 name 叫做什麼吧！
> 除了 token 以外順便把 name 一起帶上來就可以了

把 name 一起帶上來指的是把你的名字用 query string 的方式接在網址的 token 後面，之後的關卡若有要傳資料回去就一律用這個方式。

如下：  
https://lidemy-http-challenge.herokuapp.com/lv1?token={GOGOGO}&name=huiming

<details>
  <summary>hint</summary>
  用 GET 方式傳送的資料會被附在 URL 上面當作，所以傳了 token 就會變 ?token=xxx
  現在只要多傳一個 name 就行囉
  ?token=xxx&name=xxx
</details>
<details>
  <summary>token</summary>
  啊...原來你叫 huiming 啊！下一關的 token 是 {HellOWOrld}
</details>

## Lv 2 找一本書

>我前陣子在整理書籍的時候看到了一本我很喜歡的書，可是現在卻怎麼想都想不起來是哪一本...  
我只記得那本書的 id 是兩位數，介於 54~58 之間，你可以幫幫我嗎？  
找到是哪一本之後把書的 id 用 GET 傳給我就行了。

查看 API 文件，獲取單一書籍的 path 是 /book/:id，這個 path 要接在 Base URL 後面，然後在 :id 部分要輸入查詢的數字，就可以拿到書籍的資料。

但這邊我們要把書的 id 回傳給 Lib，所以是：  
https://lidemy-http-challenge.herokuapp.com/lv?token={HellOWOrld}&id= "=" 後面接 54-58 其中一個數字。

### API 文件

Base URL: https://lidemy-http-challenge.herokuapp.com/api

POST 以及 PATCH 的 content type 為：application/x-www-form-urlencoded。

| 說明         | Method | path       | 參數                       | 範例           |
|--------------|--------|------------|----------------------------|----------------|
| 獲取所有書籍 | GET    | /books     | q: 查詢書籍                | /books?q=hello |
| 獲取單一書籍 | GET    | /books/:id | 無                         | /books/10      |
| 新增書籍     | POST   | /books     | name: 書名, ISBN: 書籍編號 | 無             |
| 刪除書籍     | DELETE | /books/:id | 無                         | 無             |
| 更改書籍資訊 | PATCH  | /books/:id | name: 書名, ISBN: 書籍編號 | 無             |

<details>
  <summary>hint</summary>
  還記得之前第一關給的文件嗎？要從文件裡面選到適當的 API 並找出書籍
  不確定是哪本書的話可以多試幾次看看
  「把書的 id 用 GET 傳給我」跟上一關的「用 GET 方法跟我說你的 name 叫什麼」是一樣的
  除了 token 以外，要多帶一個 id 上來
</details>
<details>
  <summary>token</summary>
  啊！就是這本書，太謝謝你了。下一關的 token 為：{5566NO1}  
  註：這本書是《5566－認真》。
</details>

## Lv 3 上架書籍

> 真是太感謝你幫我找到這本書了！
> 
> 剛剛在你找書的時候有一批新的書籍送來了，是這次圖書館根據讀者的推薦買的新書，其中有一本我特別喜歡，想要優先上架。
> 書名是《大腦喜歡這樣學》，ISBN 為 9789863594475。
> 
> 就拜託你了。
> 新增完之後幫我把書籍的 id 用 GET 告訴我。

這邊就要開始用 node.js 寫 request 了。

這一題的觀念是要如何在 API 上新增檔案，文件上寫得很清楚，用 post method 發到 /books 這個 path，另外，當使用 post 或 patch 的時候，要如何帶資訊進去，因為這裡用的是 node.js 的 repuest 模組，就去看看文件 > https://github.com/request/request#forms

文件裡說明 request 提供 3 種帶入參數的方法，首先要把參數寫成 {key: value} 的形式，並放在 form 這個屬性裡面。
```js
request.post('http://service.com/upload', {form:{key:'value'}})
// or
request.post('http://service.com/upload').form({key:'value'})
// or
request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
```

這邊採用第三種，因為我們會想要印出 body 看看，因此寫法如下：

```js
const request = require('request');

const option = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/books',
  form: {
    name: '《大腦喜歡這樣學》',
    ISBN: 9789863594475,
  },
};

function callback(err, res, body) {
  console.log(body);
}

request.post(option, callback);
```

新增成功後會得到以下資訊  
{"message":"新增成功","id":"1989"}  
這時再把 id 回傳給 Lib 就行。

<details>
  <summary>hint</summary>
  還記得之前第一關給的文件嗎？要從文件裡面選到適當的 API 並新增書籍  

  「把書籍的 id 用 GET 告訴我」跟上一關的「把書的 id 用 GET 傳給我」是一樣的喔  

  除了 token 以外，要多帶一個 id 上來
</details>
<details>
  <summary>token</summary>
  這樣子讀者就能趕快看到這本新書了，謝謝！下一關的 token 為 {LEarnHOWtoLeArn}
</details>

## Lv 4 搜尋書籍

> 我翻了一下你之前幫我找的那本書，發現我記錯了...這不是我朝思暮想的那一本。
> 我之前跟你講的線索好像都是錯的，我記到別本書去了，真是抱歉啊。
> 我記得我想找的那本書，書名有：「世界」兩字，而且是村上春樹寫的，可以幫我找到書的 id 並傳給我嗎？

看 API，搜尋關鍵字的方法是在 /books 後面接一個 q=關鍵字的參數，直接帶入 "世界"。
https://lidemy-http-challenge.herokuapp.com/api/books?q=世界

<details>
  <summary>或是用 node.js 發 request</summary>
  
  但這邊因為要搜尋的字串是中文，需先經過編碼，在 js 裡面用 encodeURIComponent() 轉換成程式可讀的形式。

  ```js
  const request = require('request');
  const search = encodeURIComponent('世界')

  const option = {
    url: `https://lidemy-http-challenge.herokuapp.com/api/books?q=${search}`,
  };

  function callback(err, res, body) {
    console.log(body);
  }

  request(option, callback);
  ```
</details>
<br>

收到了下列回應  
`[{"id":2,"name":"當我想你時，全世界都救不了我","author":"肆一","ISBN":"5549173495"},{"id":27,"name":"從你的全世界路過","author":"張嘉佳","ISBN":"8426216529"},{"id":79,"name":"世界末日與冷酷異境","author":"村上春樹","ISBN":"9571313408"},{"id":90,"name":"文學的40堂公開課：從神話到當代暢銷書，文學如何影響我們、帶領我們理解這個世界","author":"約翰．薩德蘭","ISBN":"7978376866"}`

從裡面找到村上春樹寫的書《世界末日與冷酷異境》並回傳 id。

<details>
  <summary>hint</summary>
  還記得之前第一關給的文件嗎？要從文件裡面選到適當的 API 並找到書籍  

  「找到書的 id 並傳給我」跟上一關的「把書籍的 id 用 GET 告訴我」是一樣的喔  

  除了 token 以外，要多帶一個 id 上來
</details>
<details>
  <summary>token</summary>
  沒錯！這次我很確定了，就是這本！下一關的 token 為 {HarukiMurakami}
</details>

## Lv 5 刪除書籍

> 昨天有個人匆匆忙忙跑過來說他不小心捐錯書了，想要來問可不可以把書拿回去。
> 跟他溝通過後，我就把他捐過來的書還他了，所以現在要把這本書從系統裡面刪掉才行。
> 
> 那本書的 id 是 23，你可以幫我刪掉嗎？

用 request.delete
```js
const request = require('request');

const option = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/books/23',
};

function callback(err, res, body) {
  console.log(body);
}

request.delete(option, callback);
```

<details>
  <summary>hint</summary>
  還記得之前第一關給的文件嗎？要從文件裡面選到適當的 API 並刪除書籍  

  若是有做對的話，就會拿到下一關的 token 囉
</details>
<details>
  <summary>token</summary>
  {"message":"\n咦...是刪掉了沒錯，但總覺得哪裡怪怪的，算了，先這樣吧！下一關的 token 為 {CHICKENCUTLET}\n"}
</details>

## Lv 6 HTTP 認證

> 我終於知道上次哪裡怪怪的了！
> 
> 照理來說要進入系統應該要先登入才對，怎麼沒有登入就可以新增刪除...
> 這太奇怪了，我已經回報給那邊的工程師了，他們給了我一份新的文件：https://gist.github.com/aszx87410/1e5e5105c1c35197f55c485a88b0328a 。
> 
> 這邊是帳號密碼，你先登入試試看吧，可以呼叫一個 /me 的 endpoint，裡面會給你一個 email。
> 把 email 放在 query string 上面帶過來，我看看是不是對的。
> 
> 帳號：admin
> 密碼：admin123

首先找一個 [Base64 encoder](https://www.base64encode.org/) 把 admin:admin123 進行轉換，轉完長這樣 `YWRtaW46YWRtaW4xMjM=`，把這串放進 headers 裡再發 request 給 /me 這個 path。

```js
const request = require('request');

const option = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/me',
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM=',
  },
}

function callback(err, res, body) {
  console.log(body);
}

request(option, callback);
```

就會得到：  
`{"username":"admin","email":"lib@lidemy.com"}`

把 email 帶進網址的 query string 就可以拿到 token。  
https://lidemy-http-challenge.herokuapp.com/lv6?token={CHICKENCUTLET}&email=lib@lidemy.com

<details>
  <summary>hint</summary>
  從這關以後要開始用這份新的文件了  
  關於驗證方式請 Google：http basic authorization
</details>
<details>
  <summary>token</summary>
  對對對，就是這個，這樣才對嘛！下一關的 token 為 {SECurityIsImPORTant}
</details>

## Lv 7 偷書賊

> 那邊的工程師說系統整個修復完成了，剛好昨天我們發現有一本書被偷走了...
> 這本書我們已經買第五次了，每次都被偷走，看來這本書很熱門啊。
> 我們要把這本書從系統裡面刪掉，就拜託你了。
> 
> 對了！記得要用新的系統喔，舊的已經完全廢棄不用了。
> 
> 書的 id 是 89。

發一個帶有帳密資訊的 request.delete 就可以拿 token。

```js
const request = require('request');

const option = {
  url: `https://lidemy-http-challenge.herokuapp.com/api/v2/books/89`,
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM=',
  },
};

function callback(err, res, body) {
  console.log(body);
}

request.delete(option, callback);
```

註：這本書是...
`{"id":89,"name":"跟著月亮走：韓國瑜的夜襲精神與奮進人生","author":"韓國瑜","ISBN":"9789571376882"}`
<details>
  <summary>hint</summary>
  這關記得要用上一關給的新的系統，API v2，不是原本的 API 喔  

  找到正確的書籍並刪除即可
</details>
<details>
  <summary>token</summary>
  `{"message":"\n希望下一次進這本書的時候不會再被偷走了。下一關的 token 為 {HsifnAerok}\n"}`
</details>

## Lv 8 更新書目

> 我昨天在整理書籍的時候發現有一本書的 ISBN 編號跟系統內的對不上，仔細看了一下發現我
> 當時輸入系統時 key 錯了。
> 哎呀，人老了就是這樣，老是會看錯。
> 
> 那本書的名字裡面有個「我」，作者的名字是四個字，key 錯的 ISBN 最後一碼為 7，只要把
> 最後一碼改成 3 就行了。
> 對了！記得要用新的系統喔，舊的已經完全廢棄不用了。

先把有 “我“ 的書名找出來吧  
https://lidemy-http-challenge.herokuapp.com/api/v2/books?q=我  

得到下面一串  
`[{"id":2,"name":"當我想你時，全世界都救不了我","author":"肆一","ISBN":"5549173495"},{"id":3,"name":"我殺的人與殺我的人","author":"東山彰良","ISBN":"9262228645"},{"id":7,"name":"你已走遠，我還在練習道別","author":"渺渺","ISBN":"3722233689"},{"id":9,"name":"你是我最熟悉的陌生人","author":"Middle","ISBN":"9765734253"},{"id":22,"name":"我輩中人：寫給中年人的情書","author":"張曼娟","ISBN":"7241428897"},{"id":38,"name":"我和我追逐的垃圾車","author":"謝子凡","ISBN":"7797349452"},{"id":57,"name":"我的櫻花戀人","author":"宇山佳佑","ISBN":"2947749939"},{"id":60,"name":"你走慢了我的時間","author":"張西","ISBN":"8811544334"},{"id":66,"name":"我是許涼涼","author":"李維菁","ISBN":"8389193464"},{"id":72,"name":"日日好日：茶道教我的幸福15味【電影書腰版】","author":"森下典子","ISBN":"9981835427"},{"id":90,"name":"文學的40堂公開課：從神話到當代暢銷書，文學如何影響我們、帶領我們理解這個世界","author":"約翰．薩德蘭","ISBN":"7978376866"},{"id":95,"name":"我想吃掉你的胰臟【電影珍藏版】","author":"住野夜","ISBN":"2615985356"},{"id":100,"name":"慢情書：我們會在更好的地方相遇嗎？","author":"林達陽","ISBN":"7418527246"}]`

找到是這一本  
`{"id":72,"name":"日日好日：茶道教我的幸福15味【電影書腰版】","author":"森下典子","ISBN":"9981835427"}`

發 request.patch 把 ISBN 改成 `9981835423`，post 或 patch 用 form 帶入參數。

```js
const request = require('request');

const option = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/72',
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM=',
  },
  form: {
    ISBN: 9981835423,
  },
};

function callback(err, res, body) {
  console.log(body);
}

request.patch(option, callback);
```
<details>
  <summary>hint</summary>
  這關記得要用之前給的新的系統，API v2，不是原本的 API 喔  

  找到正確的書籍並更新即可
</details>
<details>
  <summary>token</summary>
  {"message":"\n希望之後他們能引進語音輸入系統，我就只要講講話就好。下一關的 token 為 {NeuN}\n"}
</details>

## Lv 9 你看見的我不是真正的我

> API 文件裡面有個獲取系統資訊的 endpoint 你記得嗎？
> 工程師跟我說這個網址不太一樣，用一般的方法是沒辦法成功拿到回傳值的。
> 
> 想要存取的話要符合兩個條件：
> 1. 帶上一個 X-Library-Number 的 header，我們圖書館的編號是 20
> 2. 伺服器會用 user agent 檢查是否是從 IE6 送出的 Request，不是的話會擋掉
> 
> 順利拿到系統資訊之後應該會有個叫做 version 的欄位，把裡面的值放在 query string 給我吧。

這題的關鍵就是 user-agent，想成 server 會檢查你用的瀏覽器，這邊的話如果不是 IE6 不給過，當然不是要逼人下載 IE6 XD

這邊要做的是在 header 裡面帶一個假的 user-agent，既然要求是 IE6，就 “假裝“ 成我們是用 IE6 發的 request。

那要怎麼假裝？用 chrome 的話可以裝一個插件叫作 [User-Agent Switcher for Chrome](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg)，可以模擬不同瀏覽器，也可以模擬行動裝置。

安裝後找到 Internet Explorer > Internet Explorer 6 按下去，接著用 [What is my User Agent?
](https://www.whatismybrowser.com/detect/what-is-my-user-agent) 查看自己的 user-agent，我的是長這樣：`Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; WOW64; Trident/4.0; SLCC1)`，[看這裡](https://ithelp.ithome.com.tw/articles/10209356) 了解這一串代表什麼意思，把整段複製到 header 裡面，就可以發 request 了，前面有說還要帶一個 X-Library-Number 的 header，這邊也一起加進來，就變下面這樣：

```js
const request = require('request');

const option = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/sys_info',
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM=',
    'X-Library-Number': 20,
    'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; WOW64; Trident/4.0; SLCC1)',
  },
};

function callback(err, res, body) {
  console.log(body);
}

request(option, callback);
```

得到：  
`{"message":"success","version":"1A4938Jl7","owner":"lib","createdAt":"121290329301"}`  
把 version 的值放在 query string 回傳：  
https://lidemy-http-challenge.herokuapp.com/lv9?token={NeuN}&version=1A4938Jl7

<details>
  <summary>hint</summary>
  試著去想想看，伺服器是怎麼知道 request 是什麼版本的瀏覽器？  

  只要能知道伺服器是怎麼檢查的，就有方法可以騙過它，原本的敘述裡面也有給關鍵字了
</details>
<details>
  <summary>token</summary>
  限制這麼多都被你突破了，真有你的。要不要考慮以後來我們圖書館當工程師啊？下一關的 token 為 {duZDsG3tvoA}
</details>

## Lv 10 猜數字

> 時間過得真快啊，今天是你在這邊幫忙的最後一天了。
> 
> 我們來玩個遊戲吧？你有玩過猜數字嗎？
> 
> 出題者會出一個四位數不重複的數字，例如說 9487。
> 你如果猜 9876，我會跟你說 1A2B，1A 代表 9 位置對數字也對，2B 代表 8 跟 7 你猜對了但位置錯了。
> 
> 開始吧，把你要猜的數字放在 query string 用 num 當作 key 傳給我。

這邊就把要猜的數字用 num 放在 query string 回傳，照規則猜就可以了。  
範例：  
https://lidemy-http-challenge.herokuapp.com/lv10?token={duZDsG3tvoA}&num=9413

<details>
  <summary>hint</summary>
「把你要猜的數字放在 query string 用 num 當作 key 傳給我」就是在 URL 加上 &num=1234
就可以開始玩猜數字囉！不會玩猜數字的可以先去找猜數字怎麼玩

</details>
<details>
  <summary>token</summary>
  很開心在這裡的時光能有你一起陪伴，讓我的生活不再那麼一成不變，很開心認識你，下次有機會再一起玩吧！

  The End，恭喜破關！

  author: huli@lidemy.com  
  https://www.facebook.com/lidemytw/

  附註：
  原本遊戲只規劃到這邊，第十關就是最後一關。
後來我有加了一些新關卡但難度較高，如果你還想挑戰看看，下一關的 token 為 {IhateCORS}
</details>

## Lv 11 你從哪邊來的？好像沒見過？

> 嘿！很開心看到你願意回來繼續幫忙，這次我們接到一個新的任務，要跟在菲律賓的一個中文圖書館資訊系統做串連
> 這邊是他們的 API 文件，你之後一定會用到：https://gist.github.com/aszx87410/0b0d3cabf32c4e44084fadf5180d0cf4。
> 
> 現在就讓我們先跟他們打個招呼吧，只是我記得他們的 API 好像會限制一些東西就是了..

先打個招呼：  
https://lidemy-http-challenge.herokuapp.com/api/v3/hello

會得到：  
`您的 origin 不被允許存取此資源，請確認您是從 lidemy.com 送出 request。`

關鍵字：CORS  
伺服器會檢查你是從哪裡發的 request。

解法：加一個 origin 的 header
```js
const request = require('request');

const option = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v3/hello',
  headers:
  {
    Origin: 'lidemy.com',
  },
};

function callback(err, res, body) {
  console.log(body);
}

request(option, callback);
```

<details>
  <summary>hint</summary>
  伺服器會檢查 origin 這個 header，只要騙過伺服器就行了
</details>
<details>
  <summary>token</summary>
  Hello! 下一關的 token 為 {r3d1r3c7}
</details>

## Lv 12 我轉啊轉啊轉...

> 打完招呼之後我們要開始送一些書過去了，不過其實運送沒有你想像中的簡單，不是單純的 A 到 B 而已  
> 而是像轉機那樣，A 到 C，C 才到 B，中間會經過一些轉運點才會到達目的地...算了，我跟你說那麼多幹嘛
> 
> 現在請你幫我把運送要用的 token 給拿回來吧，要有這個 token 我們才能繼續往下一步走

到 `/deliver_token` 拿 token：  
https://lidemy-http-challenge.herokuapp.com/api/v3/deliver_token  

發現除了下面訊息之外就沒東西了。  
`我已經把運送要用的 token 給你囉，請你仔細找找`  

題目敘述就有給提示，運輸會經過不同地方，就表示中間有經過 “轉址“，NET101 課程中有提到 http statusCodes，可以快速看出 response 的狀態，如果是 2XX 代表成功，若是 3XX 代表轉址...等等。

要如何看 response 呢？以 chrome 為例，先打開 DevTool，找到 Network 頁面，接著在網址輸入 https://lidemy-http-challenge.herokuapp.com/api/v3/deliver_token 並按 enter，這時會發現網址不是 `/deliver_token` 這個 path，而是 `/deliver_token_result`，證明有經過轉址，再看到 Network 這邊，會有一串東西跑出來，就是瀏覽器收到的 response，去找找有沒有 3XX 的 response，看看裡面的內容，就會有答案了。

<details>
  <summary>hint</summary>
  你會發現你呼叫 API 以後它並沒有直接回傳結果，而是轉址到其他地方（或許中間還經歷不只一個地方）  
  仔細研究這些地方吧！
</details>
<details>
  <summary>token</summary>
  
  ![](https://i.imgur.com/Vu6LJZv.png)
</details>

## Lv 13 假他人之手

> 太好了！自從你上次把運送用的 token 拿回來以後，我們就密切地與菲律賓在交換書籍
> 可是最近碰到了一些小問題，不知道為什麼有時候會傳送失敗
> 我跟他們反映過後，他們叫我們自己去拿 log 來看，你可以幫我去看看嗎？
> 從系統日誌裡面應該可以找到一些端倪

先到 /logs 看看怎麼回事：  
https://lidemy-http-challenge.herokuapp.com/api/v3/logs  
回應：  
`此 request 不是來自菲律賓，禁止存取系統資訊。`

啥？  
直接看提示：  
`你有聽過代理伺服器 proxy 嗎？`

什麼是 proxy？
先看張圖：  
![](https://briian.com/wp-content/uploads/2008/Proxy_10B32/Proxy.png)  

> 如果某個網站不讓某些 IP 的電腦連上來的話，則可以很簡單的用「封鎖 IP」的方式來將對方電腦擋掉。如果你的 IP 被擋掉了，其實也可以改掛各種 Proxy 來改變連線途徑，透過這些中介電腦來突破封鎖。
[來源](https://briian.com/5661/)


簡單來說，就是透過一個 **中繼** 的伺服器來替你的瀏覽器發 request，收到 response 以後再發回你的瀏覽器，藉此躲避一些 IP 的封鎖。

那要如何用代理伺服器？
Chrome > 設定 > 系統 > 開啟電腦的 Proxy 設定  
在這邊設定要用的 proxy 位址與 port (例如 proxy IP: 122.54.227.188, port:8080)，失敗就 [多試幾個 IP](https://www.proxynova.com/proxy-server-list/country-ph/)，順利的話就可以拿到 token。

<details>
  <summary>token</summary>

  [  
   { logType: 'token', value: '{SEOisHard}' }  
  ]
</details>

## Lv 14 你看見的我不是真正的我 Part 2

>跟那邊的溝通差不多都搞定了，真是太謝謝你了，關於這方面沒什麼問題了！
不過我老大昨天給了我一個任務，他希望我去研究那邊的首頁內容到底是怎麼做的
為什麼用 Google 一搜尋關鍵字就可以排在第一頁，真是太不合理了
>
>他們的網站明明就什麼都沒有，怎麼會排在那麼前面？
難道說他們偷偷動了一些手腳？讓 Google 搜尋引擎看到的內容跟我們看到的不一樣？
>
>算了，還是不要瞎猜好了，你幫我們研究一下吧！

提示：  
`伺服器是怎麼辨識是不是 Google 搜尋引擎的？仔細想想之前我們怎麼偽裝自己是 IE6 的？`

這個真的不查不會知道，看了[別人的文章](https://dylan237.github.io/http-game.html#%E7%AC%AC-14-%E9%97%9C-User-agent%E5%AE%9A%E7%BE%A9%E6%90%9C%E5%B0%8B%E5%BC%95%E6%93%8E)才認識到這件事。

簡易來說，user agent 不只可以放瀏覽器資訊，也可以放入一些資訊，讓伺服器把你認為 Google 的搜尋引擊，而 google 主要用來檢索頁面的程式就叫 [Googlebot](https://support.google.com/webmasters/answer/1061943?hl=zh-Hant)，並且有提供完整的代理 **使用者程式字串**，讓你可以放到 user agent 裡面，這個就會被認成是 google 來拜訪了！

所以，把 user agent 換成 Googlebot 的字串然後發 request 給 /index，就會得到最後的 token。
```js
const request = require('request');

const option = {
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v3/index',
  headers:
  {
    'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    // 偽裝成 google
  },
};

function callback(err, res, body) {
  console.log(body);
}

request(option, callback);
```

<details>
  <summary>token</summary>

  ```html  
  <html>
      <h1>I Love Google</h1>
      <p>Google please rank our website higher, PLEASE!</p>
      <!-- token for lv15：{ILOVELIdemy!!!}  -->
    </html>
  ```

</details>

## Lv 15 結局

>還真的是我猜的那樣...不過還是要謝謝你幫我們完成這麼多任務！
今天是我在這職位的最後一天啦，之後我要升官了，應該就不用處理這麼多小事情了
這段期間感謝你的幫忙，我們以後有緣再相見啦！
>
>The End，恭喜破關！
這次是真的破關了，這是最後一關，感謝你願意參與這個遊戲
也希望這遊戲是有趣的，希望你在玩的時候有學到東西
也歡迎把這個遊戲分享給親朋好友們
感謝！
>
>我開了一個 gist，大家可以在這邊隨意留言，或是講一下破關感言
https://gist.github.com/aszx87410/1dbde92876ba253a45654988ca829ebb
>
>最後，感謝所有幫我測試的朋友們
>
>Author: huli@lidemy.com
>https://www.facebook.com/lidemytw/

破關！灑花！

## 心得
透過遊戲來讓學習變得生動有趣，也讓原本只是文字的對白開始有了靈魂。

剛開始學習第四週課程的我原本對 API 或網路非常陌生，什麼 http, TCP/IP 等等通訊協定，都是一些偶爾會看到聽到，但壓根說不出是什麼的名詞，雖然以前大學通識課上過，不過都還給老師了QQ

然後寫作業時一直都有種...東西是出來了但很不踏實的感覺 😂  
我必須重複確認好多次才會放心一些並認為自己做的沒錯，至少答案都沒問題。

不過啊在玩 http challenge 時就沒這種自己給自己的壓力，前面 10 題解得都蠻順的，都大概了解這題問想問什麼，該用什麼方式來解，看不懂的查一下也都可以解決，而且解完一題會想趕快解下一題，非常魔性！

這邊給我最大的感觸就是我能感受到我是真的有吸收課程的內容了，認知道自己花了時間學習，而且可以感覺到成效時，帶給我蠻大的滿足感。

另外一點感到很有趣的是這遊戲可以用不同的工具來解，有的瀏覽器網址打一打就可以了，有的就要靠 node 發 request，後來也試著用 postman 來玩，也順便熟悉一下操作，就像是又開了新的技能樹一樣令人興奮 😆 所以之後也會打算用 curl 來玩玩看，光是想像只用 CLI 就破關根本帥啊！(還是其實根本很普通 😅)

總之玩完後又學到了不少，看到破關後的畫面腦中就自動響起 GameBoy 風格 RPG 的破關音樂，看著 Huli 放的彩蛋也蠻有趣的，印象最深的是跟著月亮走，這本書常被偷是在暗示什麼嗎...

最後感謝 Huli 做了這個有趣的遊戲，讓我對網路運作有了更多的認識。
