## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

加密與雜湊都是用演算法將原本的密碼轉換成不易判讀的字串，然而加密的輸入與輸出是一對一的關係，被解開演算法就完蛋了，而雜湊的輸入與出是多對一的關係，也就是多個輸入可能會輸出相同的結果，如此一來就算知道演算法，要解開正確的密碼也是很困難的。

為什麼密碼必需經過雜湊才能存進資料庫？原因是就算資料庫被有心人士駭入，拿到使用者的帳號與雜湊過的密碼，透過雜湊的保護，駭客也無法簡單地得到原本的密碼。

## `include`、`require`、`include_once`、`require_once` 的差別

### include & require 的差別

include & require 用於引入外部文件，差別在於若程式執行產生錯誤，include 產生的是 warning 而 require 產生的是 error，error 會阻止執式繼續執行但 warning 不會，因此要避免程式執行後儘管沒跳出錯誤但結果與預期不同，建議使用 require。

### 有 _once 與沒有 _once 的差別

include_once  與 require_once 會檢查目前引入的文件是否已經引入過，若有則不會再次引入，include & require 則不會執行檢查，因此可能造成重複引入，導致變數、函式有重複宣告的錯誤。

## 請說明 SQL Injection 的攻擊原理以及防範方法

若輸入的資料被刻意寫成 SQL 可執行的語法，就可能被拿到其他使用者的資料或假冒身分。

例如：
```sql
SELECT FROM users WHERE username = '$username' password = '$password'
```
若 username 被刻意輸入 "' or 1=1 --"，SQL 在帶入變數後會變成
```sql
SELECT FROM users WHERE username = '$username' or 1=1 -- password = $password
```
後面檢查 password 的部分就被改成註解，且 1=1 永遠是 true，如此可以不需要密碼就假冒別人身分登入。

會有這樣的風險是由於後端在呼叫執行 SQL 語法時，將使用者傳入的資料不做處理就送給 SQL 執行，防範的方法是將所有來自使用者輸入的內容用 prepare statement 處理，所有輸入的內容都會被當作參數來處理，而不會是 SQL 語法的一部分。

##  請說明 XSS 的攻擊原理以及防範方法
顯示的資料被瀏覽器解析成執行語法，例如 `<script>alert('hi')</script>` 或是 `<h1>this is h1</h1>`，當這樣的內容直接被後端放到 html 上，瀏覽器解析時就會看成是 html 語法，因而呼叫執行 JavaScript 或把文字渲染成大標題，要避免這樣的情況，就是把所有內容在放入 html 之前，把特殊字元全部 escape 掉，意思是把這些會被 browser 認為有特殊含意的字元都換成沒有功能的純文字，例如 `<` 換成 `&lt;`，`>` 換成 `&gt;`，經過渲染後這些內容就會完整呈現。

## 請說明 CSRF 的攻擊原理以及防範方法
CSRF (Cross Site Request Forgery，跨站請求偽造) 是在不同 domain 下製造出是使用者本人發出的 request，如果使用者是在登入狀態，由於瀏很智慧，在訪問相關網頁時會把關連的 cookie 給帶上，所以即使使用者不是自己發送這個 request，也會被 server 認為是本人進行的操作。

防護方法有幾個面向
1. 使用者端
用完就登出，避免 browser 存放 Cookie。

2. server 端：Double Submit Cookie
由 server 產生一組 token，寫入 form 裡面並在 brower 設定有相同值的 Cookie，當使用者在正當情況下操作，應該會發送與 Cookie 裡面相同的 token，只要檢查兩者是否相同，就可以辨別是不是本人發的 request。

3. browser 本身的防禦：Set-Cookie
當使用者登入時傳回的 response 裡面的 Set-Cookie，後面加一個 SameSite，這會讓 browser 不幫這個 domain 以外的 site 發的 request 加上 Cookie，也就防止了在使用者不知情的狀況下進行某些操作。
