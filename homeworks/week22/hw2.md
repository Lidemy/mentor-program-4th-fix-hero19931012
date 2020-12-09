## 請列出 React 內建的所有 hook，並大概講解功能是什麼

1. useState: 回傳一個儲存狀態的變數與用來更新此狀態的函式，state 的更新一定要經由這個函式來執行。
2. useEffect: 在 react render 及 browser paint (把內容畫到畫面上) 之後觸發，第一個參數接收一個要執行的 callback function，第二個參數為 useEffect 的 dependency array，useEffect 根據這個陣列的內容是否有更新來呼叫 callback function，若沒有傳任何內容，每次 render 後都會呼叫 callback function，若為空陣列 ([]) 則只會最開始呼叫一次，若有值則是在第一次 render 及陣列內的值更新時呼叫 callback function。
3. useRef: 用於綁定一個 DOM 元素，例如首先用 `useRef()` 宣告一個 `inputRef`，透過 `ref` 這個 prop 放到一個 input 的 DOM element，之後就可以利用 `inputRef.current` 存取這個 DOM。
4. useContext: 用於讓下層元素方便取得父層元素提供的 porps，不需再經過中間多層 component 的傳遞。


## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

1. componentDidMount
	- component mount 到畫面上時呼叫
	- mount => react 把 component 放到畫面上的操作
	
2. componentWillUnmount
	- component 被 unmount 時呼叫

3. componentDidUpdate(prevProps, prevState)
	- 提供前一次的 props & state
	- state 更新時呼叫

4. shouldComponentUpdate(nextProps, nextState)
	- react 進行 update 之前呼叫
	- 根據 return 的 true or false 來決定要不要 update
	- ex: 
		```javascript=
		shouldComponentUpdate(nextProps, nextState) {
			if(nextState.counter > 5) {
				return false
			}
			return true
		}
		// 當 counter 的 state > 5 之後 component 就不會繼續更新
		```

## 請問 class component 與 function component 的差別是什麼？

1. state: class component 在 constructor 中定義 this.state，再透過 this.setState 來更新 state；function component 利用 useState 定義一個新的 state 與 setState function。
2. lifecycle: class component 藉由定義 lifecycle 中各階段的 methods 來對 component 進行操作；function component 每次 render 時都等於重新呼叫一次 function，只剩下 render 前後的區別，但可以用 useEffect 來模擬 componentDidMount，componentDidUpdate 和 componentWillUnmount。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

controlled component 根據 react state 顯示其內容，以一個 input 為例，透過綁定 onChange 事件並指定 input 的 value 為 inputState，每次輸入時都會同步更新 inputState 並且 re-render，代表 react 能掌握這一個 component 的狀態。

反之，uncontrolled component 內部的 state 並不在 react 的掌控中，也就是他顯示的內容並不是透過 react 產生，但還是能夠利用 useRef 只在有需要的時候取得他的值，方法如下：

  ```javascript=
  function App() {
    const inputRed = useRef(); // 定義一個 ref
    
    useEffect(() => {
      console.log('inputRef')
      console.log(inputRef.current.value); // 用 .current 取出 dom 元素
    }, [])
    
    // 綁定 ref 到 dom 元素上	
    return <input type="text" ref={inputRef}></input>
  }
  ```