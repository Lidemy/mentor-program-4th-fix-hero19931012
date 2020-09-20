/* eslint-disable */
import $ from 'jquery';
import normalize from './normalize.css';
import css from './style.scss';
import bg from './bg-default.jpg';

const getTopGamesApiUrl = 'https://api.twitch.tv/kraken/games/top?limit=5';
let loadStreamApiUrl = '';
let offset = 0;

// setting request headers
const option = {
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'l9aklykson3vg3n7r4zg72qb68bj8h',
  },
};

function loadStreams(streams, offset, currentGame) {
  loadStreamApiUrl = `https://api.twitch.tv/kraken/streams?offset=${offset}&limit=21&game=${currentGame}`;
  fetch(loadStreamApiUrl, option)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // remove loading animation
      $('.lds-facebook').remove();
      
      const streamList = data.streams;
      $(streamList).each((i) => {
        const currentStream = streamList[i];
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

        streams.append(streamPreview);
      });
    });
}

$(document).ready(() => {
  const topFiveGamesList = $('.top__five__games .game');
  const currentGame = $('.current__game__name');
  const streams = $('.game__streams');
  const button = $('.load__more');

  fetch(getTopGamesApiUrl, option)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const topFiveGameList = data.top;

      // setting current game
      const defaultGame = topFiveGameList[0].game.name;
      currentGame.text(defaultGame);

      // write top five games
      topFiveGamesList.each((index, element) => {
        const gameName = topFiveGameList[index].game.name;
        $(element).text(gameName);
      });

      return defaultGame;
    })
    .then((defaultGame) => {
      // load default game streams
      const currentGameName = encodeURIComponent(defaultGame)
      loadStreams(streams, 0, currentGameName);
    })
    .catch((err) => {
      alert(err);
    });

  // refresh streams
  topFiveGamesList.click((e) => {
    const gameName = $(e.target).text();
    currentGame.text(gameName);

    // css loading animation
    streams.html('<div class="lds-facebook"><div></div><div></div><div></div></div>');

    offset = 0;
    loadStreams(streams, 0, gameName);
  });

  // load more
  button.click(() => {
    console.log(currentGame.text());
    offset = streams.children().length;
    console.log(offset);
    loadStreams(streams, offset, currentGame.text());
  });
});
