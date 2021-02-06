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
    value: function index(req, res, next) {
      var allFootballNews, total, error;
      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({}).paginate(req));

            case 3:
              allFootballNews = _context.sent;
              _context.next = 6;
              return regeneratorRuntime.awrap(NewsModel.find({}).countDocuments());

            case 6:
              total = _context.sent;

              if (!(allFootballNews.length > 0)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(200).json({
                data: allFootballNews,
                total: total
              }));

            case 11:
              error = new Error('Không có dữ liệu');
              error.statusCode = 404;
              throw error;

            case 14:
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 16]]);
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

              if (!newById) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(200).json({
                data: newById
              }));

            case 9:
              return _context2.abrupt("return", res.status(400).json({
                message: 'Dữ liệu không tồn tại!'
              }));

            case 10:
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              res.status(500).json({
                message: 'Can not find news!!!'
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 12]]);
    } //[GET] new by slug

  }, {
    key: "getNewBySlug",
    value: function getNewBySlug(req, res, next) {
      var slug, newBySlug, error;
      return regeneratorRuntime.async(function getNewBySlug$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              slug = req.params.slug;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(NewsModel.findOne({
                slug: slug
              }).exec());

            case 4:
              newBySlug = _context3.sent;

              if (!newBySlug) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(200).json({
                data: newBySlug
              }));

            case 9:
              error = new Error('Bài viết không tồn tại');
              error.statusCode = 404;
              throw error;

            case 12:
              _context3.next = 17;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](1);
              next(_context3.t0); // res.status(500).json({ message: 'Can not find news!!!' });

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 14]]);
    } //[POST] create new

  }, {
    key: "createNew",
    value: function createNew(req, res, next) {
      var _req$body, title, description, content, thumbnail, topic, views, likes, tournament, createNew, newPost, error;

      return regeneratorRuntime.async(function createNew$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body = req.body, title = _req$body.title, description = _req$body.description, content = _req$body.content, thumbnail = _req$body.thumbnail, topic = _req$body.topic, views = _req$body.views, likes = _req$body.likes, tournament = _req$body.tournament; // console.log(req.body);

              createNew = new NewsModel({
                title: title,
                description: description,
                thumbnail: thumbnail,
                content: content,
                topic: topic,
                views: views,
                likes: likes,
                tournament: tournament
              });
              _context4.next = 5;
              return regeneratorRuntime.awrap(createNew.save());

            case 5:
              newPost = _context4.sent;

              if (newPost) {
                _context4.next = 10;
                break;
              }

              error = new Error('Thêm dữ liệu thất bại. Vui lòng thử lại');
              error.statusCode = 422;
              throw error;

            case 10:
              res.status(200).json({
                data: newPost,
                message: 'Thêm dữ liệu thành công'
              });
              _context4.next = 16;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              // res.json(error);
              next(_context4.t0);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 13]]);
    } //[DELETE] remove new

  }, {
    key: "removeNew",
    value: function removeNew(req, res) {
      var newId, deletedNew, error;
      return regeneratorRuntime.async(function removeNew$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              newId = req.params.newId;
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap(NewsModel.deleteOne({
                _id: newId
              }));

            case 4:
              deletedNew = _context5.sent;

              if (deletedNew) {
                _context5.next = 9;
                break;
              }

              error = new Error('Bài viết không tồn tại');
              error.statusCode = 404;
              throw error;

            case 9:
              res.json(deletedNew);
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](1);
              next(_context5.t0); // res.json({ message: error });

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[1, 12]]);
    } // [DELETE] delete by slug

  }, {
    key: "removeNewBySlug",
    value: function removeNewBySlug(req, res, next) {
      var slug, newBySlug, error;
      return regeneratorRuntime.async(function removeNewBySlug$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              slug = req.params.slug;
              _context6.next = 4;
              return regeneratorRuntime.awrap(NewsModel.findOneAndDelete({
                slug: slug
              }));

            case 4:
              newBySlug = _context6.sent;

              if (newBySlug) {
                _context6.next = 9;
                break;
              }

              error = new Error('Bài viết không tồn tại. Vui lòng thử lại');
              error.statusCode = 404;
              throw error;

            case 9:
              res.status(200).json({
                data: newBySlug,
                message: 'Xóa bài viết thành công'
              });
              _context6.next = 15;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](0);
              next(_context6.t0);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, null, null, [[0, 12]]);
    } // [PUT] Update new

  }, {
    key: "updateNew",
    value: function updateNew(req, res) {
      var newId, _req$body2, title, description, content, topic, views, likes, updatedNew;

      return regeneratorRuntime.async(function updateNew$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              newId = req.params.newId;
              _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, content = _req$body2.content, topic = _req$body2.topic, views = _req$body2.views, likes = _req$body2.likes;
              _context7.next = 5;
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
              updatedNew = _context7.sent;
              res.json(updatedNew);
              _context7.next = 12;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              res.json({
                message: _context7.t0
              });

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, null, null, [[0, 9]]);
    } // [PUT] Update new by Slug

  }, {
    key: "updateNewBySlug",
    value: function updateNewBySlug(req, res, next) {
      var slug, _req$body3, title, description, content, topic, tournament, thumbnail, updatedNew, error;

      return regeneratorRuntime.async(function updateNewBySlug$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              slug = req.params.slug;
              _req$body3 = req.body, title = _req$body3.title, description = _req$body3.description, content = _req$body3.content, topic = _req$body3.topic, tournament = _req$body3.tournament, thumbnail = _req$body3.thumbnail;
              _context8.next = 5;
              return regeneratorRuntime.awrap(NewsModel.findOneAndUpdate({
                slug: slug
              }, {
                title: title,
                thumbnail: thumbnail,
                description: description,
                content: content,
                topic: topic,
                tournament: tournament
              }));

            case 5:
              updatedNew = _context8.sent;

              if (updatedNew) {
                _context8.next = 10;
                break;
              }

              error = new Error('Bài viết không tồn tại. Vui lòng thử lại');
              error.statusCode = 404;
              throw error;

            case 10:
              return _context8.abrupt("return", res.status(200).json({
                data: updatedNew,
                message: 'Sửa bài viết thành công'
              }));

            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](0);
              next(_context8.t0);

            case 16:
            case "end":
              return _context8.stop();
          }
        }
      }, null, null, [[0, 13]]);
    } // [GET] Premier League

  }, {
    key: "getPremierLeague",
    value: function getPremierLeague(req, res) {
      var premierLeague, total;
      return regeneratorRuntime.async(function getPremierLeague$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Premier League'
              }).paginate(req));

            case 3:
              premierLeague = _context9.sent;
              _context9.next = 6;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Premier League'
              }).countDocuments());

            case 6:
              total = _context9.sent;
              // console.log(total);
              res.json({
                data: premierLeague,
                total: total
              });
              _context9.next = 13;
              break;

            case 10:
              _context9.prev = 10;
              _context9.t0 = _context9["catch"](0);
              res.json({
                message: _context9.t0
              });

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, null, null, [[0, 10]]);
    } //[GET] La Liga

  }, {
    key: "getLaLiga",
    value: function getLaLiga(req, res) {
      var laLiga, total;
      return regeneratorRuntime.async(function getLaLiga$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'La Liga'
              }).paginate(req));

            case 3:
              laLiga = _context10.sent;
              _context10.next = 6;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'La Liga'
              }).countDocuments());

            case 6:
              total = _context10.sent;
              res.json({
                data: laLiga,
                total: total
              });
              _context10.next = 13;
              break;

            case 10:
              _context10.prev = 10;
              _context10.t0 = _context10["catch"](0);
              res.status(500).json({
                message: _context10.t0.message
              });

            case 13:
            case "end":
              return _context10.stop();
          }
        }
      }, null, null, [[0, 10]]);
    } //[GET] Serie A

  }, {
    key: "getSerieA",
    value: function getSerieA(req, res) {
      var serieA, total;
      return regeneratorRuntime.async(function getSerieA$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Serie A'
              }).paginate(req));

            case 3:
              serieA = _context11.sent;
              _context11.next = 6;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Serie A'
              }).countDocuments());

            case 6:
              total = _context11.sent;
              res.json({
                data: serieA,
                total: total
              });
              _context11.next = 13;
              break;

            case 10:
              _context11.prev = 10;
              _context11.t0 = _context11["catch"](0);
              res.status(500).json({
                message: _context11.t0.message
              });

            case 13:
            case "end":
              return _context11.stop();
          }
        }
      }, null, null, [[0, 10]]);
    } //[GET] Ligue 1

  }, {
    key: "getLigue1",
    value: function getLigue1(req, res) {
      var ligue1, total;
      return regeneratorRuntime.async(function getLigue1$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Ligue 1'
              }).paginate(req));

            case 3:
              ligue1 = _context12.sent;
              _context12.next = 6;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Ligue 1'
              }).countDocuments());

            case 6:
              total = _context12.sent;
              res.json({
                data: ligue1,
                total: total
              });
              _context12.next = 13;
              break;

            case 10:
              _context12.prev = 10;
              _context12.t0 = _context12["catch"](0);
              res.status(500).json({
                message: _context12.t0.message
              });

            case 13:
            case "end":
              return _context12.stop();
          }
        }
      }, null, null, [[0, 10]]);
    } //[GET] Bundesliga

  }, {
    key: "getBundesliga",
    value: function getBundesliga(req, res) {
      var bundesliga, total;
      return regeneratorRuntime.async(function getBundesliga$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Bundesliga'
              }).paginate(req));

            case 3:
              bundesliga = _context13.sent;
              _context13.next = 6;
              return regeneratorRuntime.awrap(NewsModel.find({
                topic: 'Bundesliga'
              }).countDocuments());

            case 6:
              total = _context13.sent;
              res.json({
                data: bundesliga,
                total: total
              });
              _context13.next = 13;
              break;

            case 10:
              _context13.prev = 10;
              _context13.t0 = _context13["catch"](0);
              res.status(500).json({
                message: _context13.t0.message
              });

            case 13:
            case "end":
              return _context13.stop();
          }
        }
      }, null, null, [[0, 10]]);
    }
  }]);

  return NewsController;
}();

module.exports = new NewsController();