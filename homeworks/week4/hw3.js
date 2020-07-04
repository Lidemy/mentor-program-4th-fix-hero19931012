const request = require('request');
const process = require('process');

const search = process.argv[2];

function searchCountry(searchInfo) {
  request(
    {
      url: `https://restcountries.eu/rest/v2/name/${searchInfo}`,
    },
    (error, response, body) => {
      // if (response.statusCode === 404) {
      if (response.statusCode >= 400 && response.statusCode < 500) {
      // 根據自我檢討修改，判斷 statusCode 不要寫死，因為 4XX 都代表錯誤
        console.log('找不到國家資訊');
        return;
      }
      const json = JSON.parse(body);
      for (let i = 0; i < json.length; i++) {
        console.log('============');
        console.log(`國家: ${json[i].name}`);
        console.log(`首都: ${json[i].capital}`);
        console.log(`貨幣: ${json[i].currencies[0].code}`);
        console.log('國碼:', Number(json[i].callingCodes));
      }
    },
  );
}

searchCountry(search);
