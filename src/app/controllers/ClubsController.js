const ClubsModel = require('../models/ClubsModel');
const cloudinary = require('../../cloudinary');
const slugify = require('slugify');
const createError = require('http-errors');
class ClubsController {
  async getAll(req, res, next) {
    try {
      const clubs = await ClubsModel.find();
      res.status(200).json({ clubs });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const newObject = { ...req.body };
      let { name, tournaments, codename, shortname } = req.body;
      tournaments = JSON.parse(tournaments);
      codename = codename.toUpperCase();
      const club = await ClubsModel.findOne({ name });
      if (club) {
        throw createError(400, 'Tên đội bóng đã tồn tại. Vui lòng nhập lại');
      } else {
        if (req.file && name && codename && tournaments) {
          var result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'football-news/clubs' });
        }
        const newClub = new ClubsModel({
          ...newObject,
          logo: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          },
          codename,
          shortname: shortname ? shortname : name,
          slug: slugify(name, { lower: true }),
          tournaments,
        });
        if (!Array.isArray(tournaments)) {
          newClub.tournaments.push(tournaments);
        }
        await newClub.save();
        res.status(201).json({ newClub, message: 'Thêm mới đội bóng thành công!' });
      }
    } catch (error) {
      next(error);
    }
  }
  async updateClub(req, res, next) {
    try {
      const { clubId } = req.params;
      const update = { ...req.body };
      const club = await ClubsModel.findById(clubId);
      update.tournaments = [update.tournaments];
      if (!update.shortname) {
        update.shortname = req.body.name;
      }
      var result;
      var clubUpdated;
      if (req.file) {
        result = await cloudinary.v2.uploader.upload(req.file.path, {
          public_id: club.logo.public_id,
          overwrite: true,
        });
      }

      clubUpdated = await ClubsModel.findByIdAndUpdate(clubId, update);
      res.status(200).json({ clubUpdated, message: 'Cập nhật câu lạc bộ thành công!' });
    } catch (error) {
      next(error);
    }
  }
  async getClubsByTournamentId(req, res, next) {
    try {
      const { tournamentId } = req.params;
      const clubs = await ClubsModel.find({ tournaments: tournamentId });
      res.status(200).json({ clubs });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ClubsController();
