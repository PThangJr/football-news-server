"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NewsModel = require('../models/NewsModel'); // const { pagination } = require('../../config/config');


var NewsController =
/*#__PURE__*/
function () {
  function NewsController() {
    _classCallCheck(this, NewsController);
  } //[GET] all news


  _createClass(NewsController, [{
    key: "index",
    value: function index(req, res) {
      var allFootballNews;
      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({}).paginate(req));

            case 3:
              allFootballNews = _context.sent;

              if (allFootballNews.length > 0) {
                res.status(200).json(allFootballNews);
              } else {
                res.json({
                  message: "Page ".concat(_page, " is not exist!!")
                });
              }

              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              res.json({
                message: _context.t0
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 7]]);
    } //[GET] new by id

  }, {
    key: "getNewsById",
    value: function getNewsById(req, res) {
      var newId, newById;
      return regeneratorRuntime.async(function getNewsById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              newId = req.params.newId;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(NewsModel.findById(newId).exec());

            case 4:
              newById = _context2.sent;
              res.status(200).json(newById);
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              res.status(500).json({
                message: 'Can not find news!!!'
              });

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 8]]);
    } //[POST] create new

  }, {
    key: "createNew",
    value: function createNew(req, res) {
      var _req$body, title, description, content, topic, views, likes, createNew, newPost;

      return regeneratorRuntime.async(function createNew$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body = req.body, title = _req$body.title, description = _req$body.description, content = _req$body.content, topic = _req$body.topic, views = _req$body.views, likes = _req$body.likes;
              createNew = new NewsModel({
                title: title,
                description: description,
                content: content,
                topic: topic,
                views: views,
                likes: likes
              });
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(createNew.save());

            case 5:
              newPost = _context3.sent;
              res.json(newPost);
              _context3.next = 12;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              res.json({
                message: _context3.t0
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[2, 9]]);
    } //[DELETE] remove new

  }, {
    key: "removeNew",
    value: function removeNew(req, res) {
      var newId, deletedNew;
      return regeneratorRuntime.async(function removeNew$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newId = req.params.newId;
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap(NewsModel.deleteOne({
                _id: newId
              }));

            case 4:
              deletedNew = _context4.sent;
              res.json(deletedNew);
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
              res.json({
                message: _context4.t0
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[1, 8]]);
    } // [PUT] Update new

  }, {
    key: "updateNew",
    value: function updateNew(req, res) {
      var newId, _req$body2, title, description, content, topic, views, likes, updatedNew;

      return regeneratorRuntime.async(function updateNew$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              newId = req.params.newId;
              _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, content = _req$body2.content, topic = _req$body2.topic, views = _req$body2.views, likes = _req$body2.likes;
              _context5.prev = 2;
              _context5.next = 5;
              return regeneratorRuntime.awrap(NewsModel.updateOne({
                _id: newId
              }, {
                title: title,
                description: description,
                content: content,
                topic: topic,
                views: views,
                likes: likes
              }));

            case 5:
              updatedNew = _context5.sent;
              res.json(updatedNew);
              _context5.next = 12;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              res.json({
                message: _context5.t0
              });

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[2, 9]]);
    } // [GET] premier League

  }, {
    key: "getPremierLeague",
    value: function getPremierLeague(req, res) {
      var premierLeague;
      return regeneratorRuntime.async(function getPremierLeague$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Premier League'
              }).paginate(req));

            case 3:
              premierLeague = _context6.sent;
              res.json(premierLeague);
              _context6.next = 10;
              break;

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              res.json({
                message: _context6.t0
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return NewsController;
}();

module.exports = new NewsController();