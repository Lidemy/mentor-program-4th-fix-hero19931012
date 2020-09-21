## 部署心得

首先一開始註冊完 AWS 後，就卡關了，因為不知道要用什麼服務，試著看官方文件，滿滿的服務，挑了一個全端 Web 應用的來看，居然是在教你建立一個有 hello world 的 html，也沒提到主機，應該不是我要找的。

迷惘之際，想到看過很多地方提到通常都用 linux 當作業系統穩定性比較好，就往這個方向找，找到了這個教學 [Install ubuntu on AWS](https://www.youtube.com/watch?v=4iC1qSHLRss&ab_channel=AEMandDevopsTutorial)，照著做，順勢啟動了主機 + 安裝 ubuntu，也能透過 SSH 連線。

後面又陸續看了幾篇文章，通常都是先更新系統、安裝 apache, php, mySQL 等等，但總會遇到找不到應用程式的錯誤，不知道是不是安裝的版本太舊。

漸漸地開始知道下什麼關鍵字去 google，終於用 AWS + LAMP + phpMyadmin 找到這一篇教學 [部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin + CloudFlare](https://medium.com/@hugh_Program_learning_diary_Js/%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-lamp-server-phpmyadmin-cloudflare-43871cd5dd01)，發現原來是學長寫的啊 XD 內容非常之仔細，跟著一步一步做就完成了，真是太神啦！

專案我是照著教學用 git clone，開一個新的 repo，把之前寫好的專案複製進去 (要注意把 conn.php 加到 .gitignore)，push 到 github，接著進入 AWS 主機把專案 clone 下來，還疑惑了一下剛剛明明沒裝 git，怎麼用？為了確認所以輸入了 `git --version`，哇真的有版本號，原來在之前的安裝中就有順便安裝 git 了，覺得好厲害！

然後，因為剛剛 clone 下來的資料裡面沒有包含 conn.php，所以要手動新增。
再來，瀏器覽網址輸入 IP + index.php 的路徑，登愣！個人網站部署完成！謝天謝地。

剩下的，就是到 gandi 買網域，也是照著學長的教學，進入 域名 > 選擇域名 > 區域檔紀錄 > 把類型 A 的值改成我們的主機 IP 就行。這樣就會顯示我們註冊的域名了，但是目前還有幾個問題待解決：

1. SSL 憑證 > 沒有 https，安全性較差
2. 域名後面還要接路徑才能正常顯示

這部分想留之後再來解決。

最後，透過這次練習，大致了解了買主機、買網域、架網站大概是怎麼一回事，也非常感謝前人寫的如此詳盡的教學文，受益良多，往後若要再做類似的事，也知道從哪裡開始了！
