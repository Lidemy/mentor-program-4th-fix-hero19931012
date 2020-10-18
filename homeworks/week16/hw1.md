1. console.log(1)
    => console.log 進入 call stack，執行印出 1，call stack 清空

2. setTimeout(() => {
      console.log(2)
    }, 0)
    => setTimeout 進入 call stack，執行呼叫 WebAPI 0 ms 後把 ~~console.log(2)~~ () => { console.log(2)} 放入 callback queue，call stack 清空

3. console.log(3)
    => console.log 進入 call stack，執行印出 3，call stack 清空

4. setTimeout(() => {
    console.log(4)
    }, 0)
    => setTimeout 進入 call stack，執行呼叫 WebAPI 0 ms 後把 ~~console.log(4)~~ () => { console.log(4) } 放入 callback queue，call stack 清空

5. console.log(5)
    => console.log 進入 call stack，執行印出 5，call stack 清空

6. event loop 檢查 call stack 是否為空 & callback queue 是否有東西
    => call stack 為空，callback queue 有東西等待呼叫
    => 將 callback queue 內第一個 callback (console.log(2)) 放入 call stack

7. console.log(2) 進入 call stack, 執行印出 2，call stack 清空

8. event loop 檢查 call stack 是否為空 & callback queue 是否有東西
    => call stack 為空，callback queue 有東西等待呼叫
    => 將 callback queue 內第一個 callback (console.log(4)) 放入 call stack

9. console.log(4) 進入 call stack, 執行印出 4，call stack 清空

10. event loop 檢查 call stack 是否為空 & callback queue 是否有東西
    => call stack 為空，callback queue 沒東西等待呼叫

11. 執行完畢，console 內容如下
```
1
3
5
2
4
```