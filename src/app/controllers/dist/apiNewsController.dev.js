"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiNewsModel = require('../models/ApiNewsModel');

var ApiNewsController =
/*#__PURE__*/
function () {
  function ApiNewsController() {
    _classCallCheck(this, ApiNewsController);
  } //[GET] all news


  _createClass(ApiNewsController, [{
    key: "index",
    value: function index(req, res) {
      var allFootballNews;
      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(ApiNewsModel.find({}));

            case 3:
              allFootballNews = _context.sent;

              if (allFootballNews) {
                res.status(200).json({
                  news: allFootballNews
                });
              } else {
                res.status(404).json({
                  message: "404 - Not Found Football News"
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
    }
  }, {
    key: "getNewsById",
    value: function getNewsById(req, res) {
      var newId, newById;
      return regeneratorRuntime.async(function getNewsById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              newId = req.newId;
              _context2.next = 3;
              return regeneratorRuntime.awrap(ApiNewsModel.findById(id).exec());

            case 3:
              newById = _context2.sent;

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);

  return ApiNewsController;
}();

module.exports = new ApiNewsController();