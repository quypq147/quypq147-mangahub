const Chapter = require('../../models/chapter');
const Manga = require('../../models/manga');

exports.getChaptersByManga = async (req, res) => {
    try {
        const { mangaId } = req.params;

        // Find chapters with matching mangaId
        // .select() excludes the heavy 'pages' array for the list view to make it faster
        // .sort() orders them by chapter number (ascending)
        const chapters = await Chapter.find({ mangaId: mangaId })
            .select('chapterNumber title releaseDate') 
            .sort({ chapterNumber: 1 });

        if (!chapters) {
            return res.status(404).json({ error: 'No chapters found' });
        }

        res.status(200).json(chapters);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching chapters' });
    }
};
exports.getChapterContent = async (req, res) => {
    try {
        const { mangaId, chapterNum } = req.params;

        // 1. Find the chapter matching the Manga ID and Chapter Number
        const chapter = await Chapter.findOne({ 
            mangaId: mangaId, 
            chapterNumber: chapterNum 
        });

        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }

        // 2. Also fetch Manga info (so we can display the title like "One Piece")
        const manga = await Manga.findById(mangaId);

        // 3. Return the data
        res.status(200).json({
            mangaTitle: manga ? manga.title : "Unknown Manga",
            chapterTitle: chapter.title,
            pages: chapter.pages
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Loi may chu' });
    }
};
exports.createChapter = async (req, res) => {
    try {
        const { mangaId, chapterNumber, title } = req.body;
        
        // req.files is provided by Multer (array of files)
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // Convert file paths to URLs that the frontend can load
        // e.g., "uploads/file123.jpg" -> "http://localhost:3000/uploads/file123.jpg"
        const pageUrls = req.files.map(file => 
            `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        );

        const newChapter = new Chapter({
            mangaId,
            chapterNumber,
            title,
            pages: pageUrls
        });

        await newChapter.save();

        // Update the Manga to know it has a new chapter (Optional but good practice)
        // await Manga.findByIdAndUpdate(mangaId, { $push: { chapters: newChapter._id } });

        res.status(201).json({ message: "Chuong da duoc upload!", chapter: newChapter });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};