const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const upload = require('../middleware/upload');

router.get('/manga/:mangaId', chapterController.getChaptersByManga);
router.get('/:mangaId/:chapterNum', chapterController.getChapterContent);
router.post('/', upload.array('pages', 100), chapterController.createChapter);

module.exports = router;