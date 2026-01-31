const Manga = require('../../models/manga'); // Import your Model

// 1. READ (Get all manga)
exports.getMangaList = async function(req, res) {
    try {
        const { search, genre, status } = req.query;
        let query = {};

        // Search by title (case-insensitive)
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Filter by genre
        if (genre) {
            query.genres = genre;
        }

        // Filter by status (e.g., "Ongoing", "Completed")
        if (status) {
            query.status = status;
        }

        const mangas = await Manga.find(query);
        res.status(200).json(mangas);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 2. READ (Get specific manga by ID)
exports.getMangaById = async function(req, res) {
    try {
        const manga = await Manga.findById(req.params.id);
        res.status(200).json(manga);
    } catch (err) {
        res.status(404).json({error: 'Manga not found'});
    }
};

// 3. WRITE (Create new manga)
exports.createManga = async function(req, res) {
    try {
        let coverImageUrl = null;
        if (req.file) {
            coverImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        // Create a new instance using data sent from FE (req.body) and uploaded file
        const newManga = new Manga({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            chapters: req.body.chapters || 0,
            genres: req.body.genres || [],
            rating: req.body.rating || 0,
            coverImage: coverImageUrl
        });
        const savedManga = await newManga.save(); // Save to DB
        res.status(201).json(savedManga);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// 4. UPDATE (Update specific manga)
exports.updateManga = async function(req, res) {
    try {
        // Find by ID and update with new data (req.body)
        const updatedManga = await Manga.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Return the updated document
        );
        res.status(200).json(updatedManga);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// 5. DELETE (Delete specific manga)
exports.deleteManga = async function(req, res) {
    try {
        await Manga.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Manga deleted successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};