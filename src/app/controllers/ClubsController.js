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
      const { name, shortname, tournaments } = req.body;
      const club = await ClubsModel.findOne({ name });
      if (club) {
        throw createError(400, 'Tên đội bóng đã tồn tại. Vui lòng nhập lại');
      } else {
        if (req.file && name && shortname && tournaments) {
          var result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'football-news/clubs' });
        }
        const newClub = new ClubsModel({
          name,
          logo: {
            public_id: result.public_id,
            secure_url: result.secure_url,
          },
          slug: slugify(name, { lower: true }),
          shortname,
        });
        newClub.tournaments.push(tournaments);
        await newClub.save();
        res.status(201).json({ newClub });
      }
    } catch (error) {
      next(error);
    }
  }
  //   async pushTour(req, res, next) {
  //     try {
  //       const update = await ClubsModel.updateMany(
  //         {},
  //         {
  //           $push: {
  //             tournament: '605ff4a01b3b2313b8418b07',
  //           },
  //         }
  //       );
  //       res.json({ update });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}
module.exports = new ClubsController();
