/* eslint-disable no-alert */
const request = new XMLHttpRequest();

const sectionLottery = document.querySelector('section[class=lottery]');
const bgFilter = document.querySelector('.bg__filter');
const lotteryBody = document.querySelector('.lottery__body');
const innerSection = document.querySelectorAll('.lottery__body *:not(:last-child)');
const prizeResult = document.querySelector('.prize__result');
const button = document.querySelector('.try__again');

button.addEventListener('click', () => {
  request.open('GET', '../lottery', true);
  request.send();
  request.onerror = () => {
    console.log('error');
  };
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      const json = JSON.parse(response);

      let content = '';

      for (let i = 0; i < innerSection.length; i++) {
        innerSection[i].classList.add('hide');
      }

      bgFilter.classList.add('bg__filter__after');
      lotteryBody.classList.add('lottery__body__after');
      button.classList.add('try__again__after');

      console.log(json);
      if (json.imageUrl) {
        sectionLottery.style['background-image'] = `url(${json.imageUrl})`;
        sectionLottery.style['background-repeat'] = 'no-repeat';
        sectionLottery.style['background-position'] = 'center';
        sectionLottery.style['background-size'] = 'cover';
        sectionLottery.style.height = '100%';
      } else {
        sectionLottery.style.background = 'black';
      }
      content = json;
      prizeResult.classList.remove('hide');
      prizeResult.innerText = content;
    } else {
      alert('系統不穩定，請再試一次');
      console.log('err_500');
    }
  };
});
