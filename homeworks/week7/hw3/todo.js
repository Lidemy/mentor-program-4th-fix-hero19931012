/* eslint-disable operator-assignment */

const input = document.querySelector('input');
const itemList = document.querySelector('.item__list');
const addButton = document.querySelector('.add__item');

let idNumber = 2;
// 設定一個 id，讓每個新增的 label 跟 checkbox 都有自己的 id

function addItem(e) {
  if (input.value !== '' && (e.keyCode === 13 || e.button === 0)) {
    const newItem = document.createElement('div');
    newItem.innerHTML = `
        <div class="item">
          <label for="${idNumber = idNumber + 1}" class="check">
            <input id="${idNumber}" type="checkbox">
            <span class="checkbox"></span>
            <span class="checkbox__checked"></span>
          </label>
          <h2 class="item__content">
            ${input.value}
          </h2>
          <span class="delete">X</sapn>
        </div>`;

    itemList.appendChild(newItem);
    input.value = '';
  }
}

input.addEventListener('keydown', addItem);
addButton.addEventListener('click', addItem);

itemList.addEventListener('click', (e) => {
  // 刪除事項
  if (e.target.getAttribute('class') === 'delete') {
    const target = e.target.closest('div');
    target.remove();
    // 移除元素
  }

  // 完成事項
  if (e.target.getAttribute('type') === 'checkbox') {
    const item = e.target.closest('div');
    item.classList.toggle('completed');
  }
});
