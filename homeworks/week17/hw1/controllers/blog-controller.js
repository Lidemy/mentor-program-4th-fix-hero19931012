/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
const saltRounds = 10;
const bcrypt = require('bcrypt');
const db = require('../models');

const User = db;
const Post = db;

const blogController = {
  index: (req, res) => {
    Post.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })
      .then((posts) => {
        res.render('index', {
          posts,
        });
      })
      .catch = (err) => {
        return console.log(err);
      };
  },

  register: (req, res) => {
    res.render('register');
  },
  handleRegister: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMsg', '請輸入帳號與密碼');
      return next();
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMsg', err.toString());
        res.redirect('/register');
        return;
      }

      User.create({
        username,
        password: hash,
      }).then(() => {
        req.session.username = username;
        res.redirect('/');
      }).catch(() => {
        req.flash('errorMsg', '使用者名稱已被註冊');
      });
    });
  },

  login: (req, res) => {
    res.render('login');
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMsg', '請輸入帳號與密碼');
      return next();
    }

    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      bcrypt.compare(password, user.password, (err, pwIsValid) => {
        if (err || !pwIsValid) {
          req.flash('errorMsg', '帳號或密碼不正確');
          return next();
        }
        req.session.username = user.username;
        res.redirect('/');
      });
    }).catch(() => {
      req.flash('errorMsg', '帳號或密碼不正確');
      return next();
    });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },

  list: (req, res) => {
    Post.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })
      .then((posts) => {
        res.render('list', {
          posts,
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/');
      });
  },

  post: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then((post) => {
      res.render('post', {
        post,
      });
    }).catch((err) => {
      console.log(err);
      res.redirect('/');
    });
  },

  edit: (req, res) => {
    if (!req.session.username) return res.redirect('/');
    Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then((post) => {
      res.render('edit', {
        post,
      });
    }).catch((err) => {
      console.log(err);
      res.redirect('/');
    });
  },

  update: (req, res, next) => {
    const { title, content } = req.body;
    if (!req.session.username) return res.redirect('/');
    if (!title || !content) {
      req.flash('errorMsg', '內容不得為空');
      return next();
    }

    Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then((post) => {
      post.update({
        title,
        content,
      });
    }).then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.toString());
      res.redirect('/');
    });
  },

  add: (req, res) => {
    if (!req.session.username) return res.redirect('/');
    res.render('add');
  },

  handleAdd: (req, res, next) => {
    const { title, content } = req.body;
    if (!req.session.username) return res.redirect('/');
    if (!title || !content) {
      req.flash('errorMsg', '內容不得為空');
      return next();
    }
    Post.create({
      title,
      content,
    }).then(() => {
      res.redirect('/list');
    }).catch((err) => {
      console.log(err.toString());
      res.redirect('/');
    });
  },

  delete: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/');
    }
    Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then((post) => {
      console.log(JSON.stringify(post, null, 4));
      post.update({
        is_deleted: 1,
      });
    }).then(() => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.toString());
      res.redirect('/');
    });
  },
};

module.exports = blogController;
