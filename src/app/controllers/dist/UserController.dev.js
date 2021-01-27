"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersModel = require('../models/UsersModel');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "index",
    // [POST] user
    value: function index(req, res) {
      var _req$body, username, password, rePassword, email, user, emailDB, passwordHash, newUser, access_token;

      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, username = _req$body.username, password = _req$body.password, rePassword = _req$body.rePassword, email = _req$body.email;
              _context.next = 4;
              return regeneratorRuntime.awrap(UsersModel.findOne({
                username: username
              }));

            case 4:
              user = _context.sent;

              if (!user) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'The User already exists!'
              }));

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(UsersModel.findOne({
                email: email
              }));

            case 11:
              emailDB = _context.sent;

              if (!emailDB) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'The Email already exists!'
              }));

            case 14:
              if (!(password.length < 4)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: "Password is at least than 4 characters"
              }));

            case 16:
              if (!(password !== rePassword)) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                message: 'RePassword is not match password'
              }));

            case 18:
              _context.next = 20;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

            case 20:
              passwordHash = _context.sent;
              // Save User in MongoDB
              newUser = new UsersModel({
                username: username,
                email: email,
                password: passwordHash,
                rePassword: passwordHash
              });
              _context.next = 24;
              return regeneratorRuntime.awrap(newUser.save());

            case 24:
              //Create access token
              access_token = createAccessToken({
                id: newUser._id
              });
              return _context.abrupt("return", res.json({
                access_token: access_token
              }));

            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                message: _context.t0.message
              });

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 29]]);
    }
  }]);

  return UserController;
}();

var createAccessToken = function createAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  });
};

module.exports = new UserController();