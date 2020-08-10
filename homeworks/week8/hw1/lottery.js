const request = new XMLHttpRequest();

const sectionLottery = document.querySelector('section[class=lottery]');
const bgFilter = document.querySelector('.bg__filter');
const lotteryBody = document.querySelector('.lottery__body');
const innerSection = document.querySelectorAll('.lottery__body *:not(:last-child)');
const prizeResult = document.querySelector('.prize__result');
const button = document.querySelector('.try__again');

button.addEventListener('click', () => {
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.send();
  request.onerror = () => {
    console.log('error');
  };
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      const json = JSON.parse(response);

      if (json.error) {
        alert('系統不穩定，請再試一次');
        return;
      }

      let content = '';

      for (let i = 0; i < innerSection.length; i++) {
        innerSection[i].classList.add('hide');
      }

      bgFilter.classList.add('bg__filter__after');
      lotteryBody.classList.add('lottery__body__after');
      button.classList.add('try__again__after');

      switch (json.prize) {
        default: break;
        case 'FIRST':
          content = '恭喜你中頭獎了！日本東京來回雙人遊！';

          sectionLottery.classList = 'lottery first__prize';
          break;
        case 'SECOND':
          content = '二獎！90 吋電視一台！';
          sectionLottery.classList = 'lottery second__prize';
          break;
        case 'THIRD':
          content = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
          sectionLottery.classList = 'lottery third__prize';
          break;
        case 'NONE':
          content = '銘謝惠顧';
          sectionLottery.classList = 'lottery none';
          break;
      }

      prizeResult.classList.remove('hide');
      prizeResult.innerText = content;
    } else {
      alert('系統不穩定，請再試一次');
      console.log('err_500');
    }
  };
});
