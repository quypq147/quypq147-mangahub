const Genre = require("../../models/genre");

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addGenre = async (req, res) => {
  try {
    const newGenre = new Genre(req.body);
    const savedGenre = await newGenre.save();
    res.status(200).json(savedGenre);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json("Đã xóa thể loại");
  } catch (err) {
    res.status(500).json(err);
  }
};