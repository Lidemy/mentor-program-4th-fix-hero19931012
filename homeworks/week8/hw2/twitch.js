const curretGame = document.querySelector('.current__game__name');
const streams = document.querySelector('.game__streams');

const request = new XMLHttpRequest();

function loadStreams(gameName) {
  // 根據目前已載入的實況數量設定 offset
  const offset = streams.querySelectorAll('.stream').length;

  // 為了最下排能置左對齊加入的空白，在載入新的實況後移除，不然會留空
  const streamBlanks = streams.querySelectorAll('.stream__blank');

  // 設定 request
  request.open('GET', `https://api.twitch.tv/kraken/streams?offset=${offset}&limit=20&game=${gameName}`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'l9aklykson3vg3n7r4zg72qb68bj8h');
  request.send();
  request.onerror = () => { alert('系統不穩定，請再試一次。'); };
  request.onload = () => {
    const response = request.responseText;

    // JSON格式錯誤處理
    let gameList;
    try {
      gameList = JSON.parse(response);
    } catch (err) {
      alert('系統不穩定，請再試一次。');
      return;
    }

    if (gameList.streams.length === 0) {
      alert('已無更多實況！');
      return;
    }

    for (let i = 0; i < gameList.streams.length + 3; i++) {
      if (i < 20) {
        const currentStream = gameList.streams[i];
        const { status } = currentStream.channel;
        const previewImg = currentStream.preview.medium;
        const avatar = currentStream.channel.logo;
        const { url } = currentStream.channel;
        const streamID = currentStream.channel.display_name;

        // 建立實況的預覽
        const streamPreview = document.createElement('div');
        streamPreview.classList.add('stream');

        streamPreview.innerHTML = `
        <a href="${url}" alt="" class="stream__link" target="blank">
          <div class="stream__top">
            <img src="${previewImg}" alt="" class="stream__preview__img">
          </div>
              <div class="stream__bottom">
                <img class="stream__avatar" src="${avatar}" alt="">
                <div class="stream__title">${status}</div>
                <div class="stream__id">${streamID}</div>
              </div>
        </a>`;

        streams.appendChild(streamPreview);
      } else {
        // 在最尾端插入 3 個空白元素，讓最後一排可以置左對齊
        const streamPreview = document.createElement('div');
        streamPreview.classList.add('stream__blank');
        streams.appendChild(streamPreview);
      }
    }
    // 載入更多實況的時候，中間會留下空白元素，一開始就先用 querySelectorAll 選出來，最後再刪除
    // 如果先刪除，畫面會看到最下排因為空白元素不見而排版亂掉的情況
    for (let i = 0; i < streamBlanks.length; i++) {
      streams.removeChild(streamBlanks[i]);
    }
  };
}

function loadTopFiveGames() {
  request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'l9aklykson3vg3n7r4zg72qb68bj8h');
  request.send();
  request.onerror = () => { alert('系統不穩定，請再試一次。'); };
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;

      let gameList;
      try {
        gameList = JSON.parse(response).top;
      } catch (err) {
        alert('系統不穩定，請再試一次。');
        return;
      }

      // 設定目前頁面的 game name
      const defaultGame = gameList[0].game.name;
      curretGame.innerText = defaultGame;

      // 將目前 top 5 games 的 name 一一寫入
      const topFiveGamesList = document.querySelectorAll('.top__five__games .game');
      for (let i = 0; i < 5; i++) {
        const gameName = gameList[i].game.name;
        topFiveGamesList[i].innerText = gameName;
      }

      // 直接呼叫，載入 top 5 games 裡面的第一個
      loadStreams(defaultGame);
    } else {
      alert('系統不穩定，請再試一次。');
    }
  };
}

// 點選 top 5 games 時更新下面的實況
function refreshStreams(gameName) {
  // 直接清空內容再呼叫 loadStreams 載入實況
  streams.innerHTML = '';
  loadStreams(gameName);
}

// 先取得 top 5 games，然後載入 top 1 的實況
loadTopFiveGames();

// 對 top 5 games 加 eventListener，點選時呼叫更新內容
const topFiveGames = document.querySelector('.top__five__games');
topFiveGames.addEventListener('click', (e) => {
  const gameName = e.target.innerText;
  curretGame.innerText = gameName;
  refreshStreams(gameName);
});

// 載入更多，在現有實況下方再多加 20 個實況
const button = document.querySelector('.load__more');
button.addEventListener('click', () => {
  const gameName = curretGame.innerText;
  loadStreams(gameName);
});
