# 教你朋友 CLI

## CLI 是什麼

CLI (command line interface，命令列介面) 與 GUI (graphical user interface，圖形使用者介面) 都是用來與電腦溝通的 "**介面**" (精確來說應該叫作 "**殼層**")，其中 CLI 是透過下指令 (command) 並由電腦端回傳提示 (prompt) 來操作電腦與判斷目前狀態，整個過程都由字元組成，提供這種介面的程式就稱為 "**殼層程式**"，而在 window 與 mac 都有內建，分別稱作 cmd (命令提示字元) 與 terminal (終端機)。

GUI 則主要用滑鼠點擊畫面上的各種 "**圖形**" 來向電腦傳遞訊息，電腦再將回饋以圖形呈現，為了方便操作，使用者必須知道各個圖形所代表的意義與記憶他們的位置。

但有許多時候程式不必需要一個介面來讓使用者操作也可以運作，例如 `ping <URL or IP>` 可用來確認網路是否正常，只需顯示網址有沒有回應，這時使用 CLI 來操作電腦是更方便也更直覺的作法。

## 常用指令 (以 windows cmd 為例)

1. `<command> /?` 查詢指令功能 (cmd 沒有 man 指令)
2. `cd <path>` 移動路徑
    - `cd ..` 上移 1層
    - `cd ../..` 上移 2 層，以此類推
    - 切換硬碟只需輸入 `D:` `F:`，不需用 `cd`
3. `dir` 列出所在路徑下的所有路徑
4. `mkdir <dirName>` 建立路徑
5. `rmdir <dirName>` 移除路徑
6. `ren <fileNameA> <fileNameB>` 重新命名
7. `type <fileName>` 印出檔案內容
8. `<command> > <fileName>` redirection，將指令的結果導入檔案

    ```cmd=
    echo "something" > text.txt
    ```

9. `<command> >> <fileName>` append，加內容到檔案的最後面
10. `<commandA> | <commandB>` pipe，將指令 A 的結果導入指令 B
11. `echo <something>` 回應 something，搭配 ">" 可用於寫入內容

    ```cmd=
    echo 123 > text.txt # 建立一個內容為 "123" 的文字檔
    ```

12. `<program> <fileName>` 用該程式執行檔案
13. `ctrl+c` 停止執行中的程式
14. `cls` 清除畫面

有關 cmd 與 terminal 指令的比較可以參考 Reference。

## 實作

用 command line 建立一個叫 wifi 的資料夾，裡面有一個叫 afu.js 的檔案。

1. 建立 wifi 資料夾 (也就是路徑)

    ```cmd=
    mkdir wifi
    ```

2. 進入 wifi 資料夾

    ```cmd=
    cd wifi
    ```

3. 建立一個 afu.js，內容為 Afu
想成寫入一些內容到 afu.js 中，當 cmd 發現要寫入的檔案尚未存在時就會幫你新增一個。

    ```cmd=
    echo Afu > afu.js
    ```

## Reference

[[CMD101] Command Line 超新手入門](https://lidemy.com/courses/enrolled/386965)  
[Windows Command Line Tutorials](https://www.youtube.com/playlist?list=PL6gx4Cwl9DGDV6SnbINlVUd0o2xT4JbMu)  
[命令提示字元 00：教學目錄 - 初學者之卷](https://lnpcd.blogspot.com/2012/09/00.html)  
[Windows Command Line (CMD) vs. Mac OS Terminal](https://enexdi.sciencesconf.org/data/pages/windows_vs_mac_commands_1.pdf)
[How-to: Redirection](https://ss64.com/nt/syntax-redirection.html)
