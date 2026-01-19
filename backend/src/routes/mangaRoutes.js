const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');
const upload = require('../middleware/upload');

// Getting all manga
router.get("/", mangaController.getMangaList);

// Getting specific manga
router.get("/:id", mangaController.getMangaById);

// Creating manga with cover image upload
router.post("/", upload.single('coverImage'), mangaController.createManga);

// Updating manga
router.patch("/:id", mangaController.updateManga);

// Deleting one
router.delete("/:id", mangaController.deleteManga);

module.exports = router;