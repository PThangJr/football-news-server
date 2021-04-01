const TournamentsModel = require('../models/TournamentsModel');
const ObjectId = require('mongoose').Types.ObjectId;
const slugify = require('slugify');
// const cloudinary = require('../../cloudinary');
const cloudinary = require('../../cloudinary');
class TournamentsController {
  constructor() {}
  //   [GET] All Tournaments
  async getAllTournaments(req, res, next) {
    const tournaments = await TournamentsModel.find({}).sortable(req);
    if (!tournaments) {
      res.status(200).json({ message: 'Không có giải đấu nào' });
    } else {
      res.status(200).json({ tournaments });
    }
  }
  //[POST] create a new tournament
  async createTournament(req, res, next) {
    try {
      const { name } = req.body;
      const tournament = await TournamentsModel.findOne({ name });
      if (tournament) {
        const error = new Error('Giải đấu đã tồn tại. Vui lòng thử lại');
        error.statusCode = 400;
        throw error;
      } else {
        const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'football-news/tournament' });
        const newTournament = new TournamentsModel({
          name,
          logo: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          },
        });

        await newTournament.save();
        res.status(201).json({ newTournament, message: 'Thêm mới giải đấu thành công!' });
      }
    } catch (error) {
      next(error);
    }
  }
  //[GET] Get tournament by slug
  async getTournamentBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const tournament = await TournamentsModel.findOne({ slug });
      if (!tournament) {
        const error = new Error('Giải đấu không tồn tại. Vui lòng thử lại');
        error.statusCode = 404;
        throw error;
      } else {
        res.status(200).json({ tournament });
      }
    } catch (error) {
      next(error);
    }
  }
  //   [DELETE] delete a tournament by slug
  async deleteTournamentById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const tournament = await TournamentsModel.findOne({ _id: id });
      if (!tournament) {
        const error = new Error('Giải đấu không tồn tại');
        error.statusCode = 404;
        throw error;
      } else {
        const tournamentDeleted = await TournamentsModel.findByIdAndDelete(id);
        res.status(201).json({ tournamentDeleted, message: 'Xóa giải đấu thành công' });
      }
    } catch (error) {
      next(error);
    }
  }
  // [PUT] update a tournament by slug
  async updateTournamentById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { file } = req;
      const isObjectId = ObjectId.isValid(id);
      if (isObjectId) {
        const tournament = await TournamentsModel.findById(id);
        if (!tournament) {
          const error = new Error('Giải đấu không tồn tại');
          error.statusCode = 404;
          throw error;
        } else {
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'football-news/logos',
            overwrite: true,
            use_filename: false,
            unique_filename: true,
          });
          const update = {
            logo: {
              public_id: result.public_id,
              secure_url: result.secure_url,
            },
          };
          if (name) {
            update.slug = slugify(name, { lower: true });
            update.name = name;
          }
          const tournamentUpdated = await TournamentsModel.findByIdAndUpdate(id, update);
          res.status(201).json({ tournamentUpdated });
        }
      } else {
        const error = new Error('id không hợp lệ');
        error.statusCode = 404;
        throw error;
      }
      //   const tournament = null;
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new TournamentsController();
