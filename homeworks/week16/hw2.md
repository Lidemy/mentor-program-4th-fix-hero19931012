1. for loop 進入 call stack，宣告 var i = 0
2. for loop 判斷 i (0) < 5 => true
    - console.log 加入 call stack 並執行，印出 i: 0
    - console.log 自 call stack 移除
    - setTimeout 加入 call stack，呼叫 WebAPI 計時 i * 1000 (0) ms 後將 ~~console.log(i)~~ () => {console.log(i) } 放入 callback queue
    - setTimeout 自 call stack 移除
3. for loop 判斷 i (1) < 5 => true
    - console.log 加入 call stack 並執行，印出 i: 1
    - console.log 自 call stack 移除
    - setTimeout 加入 call stack，呼叫 WebAPI 計時 i * 1000 (1000) ms 後將 ~~console.log(i)~~ () => {console.log(i) } 放入 callback queue
    - setTimeout 自 call stack 移除
4. for loop 判斷 i (2) < 5 => true
    - console.log 加入 call stack 並執行，印出 i: 2
    - console.log 自 call stack 移除
    - setTimeout 加入 call stack，呼叫 WebAPI 計時 i * 1000 (2000) ms 後將 ~~console.log(i)~~ () => {console.log(i) } 放入 callback queue
    - setTimeout 自 call stack 移除
6. for loop 判斷 i (3) < 5 => true
    - console.log 加入 call stack 並執行，印出 i: 3
    - console.log 自 call stack 移除
    - setTimeout 加入 call stack，呼叫 WebAPI 計時 i * 1000 (3000) ms 後將 ~~console.log(i)~~ () => {console.log(i) } 放入 callback queue
    - setTimeout 自 call stack 移除
8. for loop 判斷 i (4) < 5 => true
    - console.log 加入 call stack 並執行，印出 i: 4
    - console.log 自 call stack 移除
    - setTimeout 加入 call stack，呼叫 WebAPI 計時 i * 1000 (4000) ms 後將 ~~console.log(i)~~ () => {console.log(i) } 放入 callback queue
    - setTimeout 自 call stack 移除
10. for loop 判斷 i (5) < 5 => false，for loop 自 call stack 移除，call stack 清空
11. WebAPI 計時完畢，把 console.log(i) 加入 callback queue
12. event loop 檢查 call stack & callback queue，將 callback queue 第一個 callback (~~console.log(i)~~ () => { console.log(i) }) 放入 call stack
13. ~~console.log(i)~~ () => { console.log(i) } 加入 call stack，並執行，印出 5，call stack 清空
14. 11-13 步重複 4 次 (共執行 5 次)
15. event loop 檢查 call stack & callback queue => 兩者為空，執行完畢

執行結果
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```
