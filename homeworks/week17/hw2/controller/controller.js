/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable arrow-parens */
const db = require('../models');

const Price = db;

function weightedRandom(items, itemsWeight) {
  const totalWeight = 100;
  const randomArray = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < itemsWeight[i]; j++) {
      randomArray.push(i);
      // items index
    }
  }
  const randomNumber = Math.floor(Math.random() * totalWeight);
  // console.log(randomArray);
  console.log('price:', items[randomArray[randomNumber]]);
  return items[randomArray[randomNumber]];
}

const priceController = {
  index: (req, res) => {
    Price.findAll()
      .then((prices) => {
        // console.log('prices', JSON.stringify(prices, null, 4));
        res.render('index', {
          prices,
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  add: (req, res) => {
    res.render('add');
  },

  handleAdd: (req, res, next) => {
    const { number, content, probability, imageUrl } = req.body;
    if (!number || !content || !probability || !imageUrl) {
      req.flash('errorMsg', '欄位不得為空');
      return next();
    }
    Price.create({
      number,
      content,
      probability,
      imageUrl,
    }).then(() => {
      console.log('Price added!');
      res.redirect('/');
    }).catch(err => {
      console.log(err);
    });
  },

  edit: (req, res) => {
    Price.findOne({
      where: {
        id: req.params.id,
      },
    }).then((price) => {
      res.render('edit', {
        price,
      });
    });
  },

  update: (req, res, next) => {
    const { number, content, probability, imageUrl } = req.body;
    if (!number || !content || !probability || !imageUrl) {
      req.flash('errorMsg', '欄位不得為空');
      return next();
    }
    Price.findOne({
      where: {
        id: req.params.id,
      },
    }).then((price) => {
      price.update({
        number,
        content,
        probability,
        imageUrl,
      });
    }).then(() => {
      res.redirect('/');
    }).catch(err => {
      console.log(err);
    });
  },

  lotteryPage: (req, res) => {
    res.render('lotteryPage');
  },

  lottery: (req, res) => {
    Price.findAll({
      where: {
        is_deleted: null,
      },
    }).then((prices) => {
      const items = [];
      const itemsWeight = [];
      let thanks = 100;
      for (price of prices) {
        items.push(price.number);
        itemsWeight.push(Number(price.probability));
        thanks -= Number(price.probability);
      }
      items.push(0);
      itemsWeight.push(thanks);
      const result = weightedRandom(items, itemsWeight);
      if (result === 0) {
        res.json({
          price: 0,
          content: '銘謝惠顧',
        });
      } else {
        Price.findOne({
          where: {
            number: result,
          },
        }).then((price) => {
          res.status(200).json(price);
        }).catch(() => {
          res.status(400).json({
            err: 'something wrong',
          });
        });
      }
    }).catch(err => {
      console.log(err);
      res.redirect('/');
    });
  },

  delete: (req, res) => {
    Price.findOne({
      where: {
        id: req.params.id,
      },
    }).then((price) => {
      price.update({
        is_deleted: 1,
      });
    }).then(() => {
      res.redirect('/');
    }).catch(err => {
      console.log(err);
    });
  },
};

module.exports = priceController;
