## this 根據 function 如何被呼叫來定義

1. obj.inner.hello()
可以看成 obj.inner.hello.call(obj.inner) 的形式，call() 的第一個參數就是 hello 中拿到的 this 的對象，就是 obj.inner，因此 console.log(this.value) 就等於 obj.inner.value，印出 2 。

2. obj2.hello()
同上，把 obj2 換成 obj.inner 而已，所以也是 console.log(obj.inner.value)，印出 2。

3. hello()
由於是在 global 環境下呼叫 hello，就會是 hello.call()，由於 hello 不在任何物件底下，call 就會傳預設值，在瀏覽器環境下是 window，在 Node.js 是 global，在嚴格模式下是 undefined。