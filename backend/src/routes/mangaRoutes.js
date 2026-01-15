const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');

// Getting all manga
router.get("/", mangaController.getMangaList);

// Getting specific manga
router.get("/:id", mangaController.getMangaById);

// Creating manga (Note: removed :id)
router.post("/", mangaController.createManga);

// Updating manga
router.patch("/:id", mangaController.updateManga);

// Deleting one
router.delete("/:id", mangaController.deleteManga);

module.exports = router;