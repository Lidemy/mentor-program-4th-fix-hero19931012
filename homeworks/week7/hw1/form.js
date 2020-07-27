const form = document.querySelector('form.wrapper');
form.addEventListener('submit', (e) => {
  // 針對整個表單添加 'submit' 事件的監聽

  e.preventDefault();
  // 防止預設行為，除了還不需送出資料外，console 也不會被洗掉

  let completed = true;
  // 用來判斷表單是否完成

  const checkList = document.querySelectorAll('.required');
  // 找出所有 required 的題目，這個 class 加在每個題目最大的 div 上

  const result = [];
  // 先用陣列存字串

  for (let i = 0; i < checkList.length; i++) {
    const input = checkList[i].querySelector('input.text');
    const radio = checkList[i].querySelectorAll('input[type=radio]');
    // 針對 checkList 下面的元素找出該題的 input

    if (input !== null) {
      // checkList 包含所有 required 的題目，也包含 radio 那題，用 querySelector('input.text') 會選出 null，
      // 故用 !== null 來判別目前的 input 是不是 text

      const { value } = input;
      // 取得輸入值
      const question = checkList[i].querySelector('h3').innerText;
      // 取得該題的題目

      if (value !== '') {
        result.push(`${question}: ${value}\n`);
        // 檢查輸入是否為空，如果有值，用字串型式存到陣列裡

        checkList[i].querySelector('h4.error').classList.add('error__hide');
        // 若上一次提交沒有填值，這次有填的話，就加回隱藏 class
      } else {
        completed = false;
        // 將表單設定為未完成

        checkList[i].querySelector('h4.error').classList.remove('error__hide');
        // 取消讓 error 文字隱藏的 class
      }
    }

    if (radio.length !== 0) {
      // 若 querySelector('input.text') 選出 null 代表這個 input type 不是 text
      // 用 radio.length !== 0 判斷是不是 radio

      let checked = false;
      // 記錄這個 radio 是否有被點選

      for (let j = 0; j < radio.length; j++) {
        // 檢查每個選項

        if (radio[j].checked) {
          // .checked 確認這個 radio 是不是被選取的狀態
          checked = true;

          const question = checkList[i].querySelector('h3').innerText;
          const value = radio[j].closest('label').innerText;
          result.push(`${question}: ${value}\n`);

          checkList[i].querySelector('h4.error').classList.add('error__hide');
        }
      }

      if (checked === false) {
        completed = false;
        checkList[i].querySelector('h4.error').classList.remove('error__hide');
      }
    }
  }

  // 下面設定選填的題目
  const optionalList = document.querySelectorAll('.optional');
  // 選出選填的題目

  for (let i = 0; i < optionalList.length; i++) {
    const input = optionalList[i].querySelector('input.text');
    // 先只考慮 input text 的情況

    if (input.value !== '') {
      const question = optionalList[i].querySelector('h3:first-child').innerText;
      const { value } = input;
      // 取得題目與輸入值

      result.push(`${question}: ${value}\n`);
    }
  }

  if (completed === true) {
    // 如果表單有完成才出現 alert
    // eslint-disable-next-line no-alert
    alert(result.join(''));
  }
});
