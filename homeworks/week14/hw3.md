## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS (Domain Name System) 是將 IP 位置與域名 進行連結的伺服器，如此就不需要記下難以記憶的 IP 位置。

對於 Google 的好處是可以藉此收集使用者使用搜尋引擊的資訊，了解目前趨勢，可用於調整廣告的投放等。

對於大眾的好處是，Google 可以幫忙擋下某些惡意網站，或者藉由隱藏某些違反著作權的內容，保護創作者的權利。

## 什麼是資料庫的 lock？為什麼我們需要 lock？

為了避免短時間有大量 request 進來產生 race condition，可能造成商品超賣的情況，此時用 lock 確保資料在目前的 query 執行完成之前都是被鎖定的狀態，無法被其他指令更改，也因為限制只能動 1 筆資料，也犧牲了部分效能。

## NoSQL 跟 SQL 的差別在哪裡？
SQL (關連式資料庫) 必需事先建立欄位，後續要調整結構會相當困難，NoSQL (not only SQL) 指的是 **不只是 SQL**，是利用 key-value 的方式存取資料，可以想像成把資料以 json 格式存起來，擴充性勝於 SQL，但由於天生沒有所謂的 column 可供查詢，也就無法支援可用於 SQL 的 query 語法。

## 資料庫的 ACID 是什麼？
ACID 是資料庫為了確保 Transaction 正確性的而具備的 4 個特性：
原子性 Atomicity: 全部成功或全部失敗
一致性 Consistency: 保持資料的完整性，可以想像成總數相同
隔離性 Isolation: 多筆交易不互相干擾
持久性 Durability: 對資料的修改對永久保存不會丟失
