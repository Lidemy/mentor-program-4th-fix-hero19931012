## 什麼是 DOM？
DOM 是瀏覽器將 html 文件轉換成物件模型，可以提供 JavaScript 尋找、修改其中的元素，是 JavaScript 與瀏覽器溝通的橋樑，其中 document 是 DOM 架構裡面最項層的元素。

### 如何找到要操作的 DOM 元素
要如何告訴瀏覽器現在要操作的 DOM 上面的哪個元素，有幾個方法：

1. getElementsByTagName
2. getElementsByClassName('class')
3. getElementById
4. querySelector('CSS selector') > 只會選到第一個
5. querySelectorAll('CSS selector') > 回傳 NodeList (類陣列)

經由 querySelectorAll() 產生的 NodeList 與 array 長得有點像，但是是完全不同的物件，array 是 JS 內建的物件，用來存放資料的集合，然而 querySelectorAll() 是瀏覽器提供的功能，它讓程式語言可以透過 NodeList 存取到 DOM 裡面的元素，而程式語言就不只限於 JS，也可能是 Python 或其他。

NodeList 是可以轉換成 array 的，方法放在參考資料裡，之後需要再回頭來看。

### Reference
[NodeList 與 Array 差異](https://ithelp.ithome.com.tw/articles/10211876)  
[NodeLists vs. Arrays](https://gomakethings.com/nodelists-vs-arrays/)  
[Converting a NodeList to an array with vanilla JavaScript](https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
當 DOM 裡面某個元素的監聽事觸發時，事件會由項層一路往下傳遞，直到目標元素，再一路回傳到項層，往下傳遞的過程稱為捕獲，往上回傳的過程稱為冒泡，中間經過的元素就會處於 CAPTURING_PHASE (捕獲階段) 或 BUBBLING_PHASE (冒泡階段)，然而目標元素的狀態既不是捕獲也不是冒泡，而是 AT_TARGET。既然事件的發生一定是從根節點開炲，也就一定是遵循 **先捕獲，後冒泡** 的規則。

### Reference
[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)  
[[第七週] DOM - 事件傳遞機制：捕獲與冒泡、事件代理](https://yakimhsu.com/project/project_w7_eventListener.html)

## 什麼是 event delegation，為什麼我們需要它？

當我們有很多個元素，彼此相當相似，並想要為每個元素加上事件監聽，考量到為每個元素都加上監聽相當沒效率，因此可以把監聽設在父元素上，並用 event.target 拿到互動的那個元素，透過自訂 data-value 屬性、用 getAttribute 或 classList 判斷等方法取得特定的元素，就可以省去為每個元素加監聽的操作。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

#### event.preventDefault()
event.preventDefault() 可以阻止元素的預設行為，例如 \<a> 的重新導向，表單的送出，或是鎖定特定按鍵，此時雖然元素的預設行為被取消，但事件確實有發生。

#### stopPropagation()
stopPropagation() 用來阻止事件的傳遞，當一個被加上監聽事件的元素包含了另一個帶有監聽事件的元素，觸發內部元素的事件會因為冒泡，也會觸發外部元素的事件，此時對內部元素的事件加上 stopPropagation() 可以阻止事件繼續往上冒泡，如此便不會觸發到外部元素的事件。或是利用 stopPropagation() 阻止下層元素進入捕獲階段，例如：

```js
window.addEventListener('click', (e) => {
  e.stopPropagation();
})
```
會阻止頁面上所有元素與滑鼠的點擊互動，因為該視窗下的點擊事件傳遞到 window 就會終止。

#### stopImmediatePropagation()
如果一個元素被添加多個事件監聽，則每個事件會依順序執行，只有被加上 stopPropagation() 的事件會被阻止傳遞，如果要同時阻止其他事件的發生，就可以用 stopImmediatePropagation() 來停止後面監聽事件的執行。

### Reference
[[筆記][JavaScript] 所謂的「停止事件」到底是怎麼一回事？](https://ithelp.ithome.com.tw/articles/10198999)