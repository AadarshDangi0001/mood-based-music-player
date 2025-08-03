import express from 'express';
import multer from 'multer';
import uploadfile from '../service/storage.service.js'; 
import songModel from '../models/song.model.js';
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/songs', upload.single("audio"), async (req, res) => {
    try {
        const fileData = await uploadfile(req.file);
        const song = await songModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: fileData.url,
            mood: req.body.mood
        });
        res.status(201).json({
            message: 'Song added successfully',
            song: song
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding song', error });
    }
}) 

router.get('/songs', async(req,res)=>{
    const {mood} = req.query;

    const songs = await songModel.find({
        mood:mood
    });

    res.status(201).json({
        message:"Songs fetched sucessfully",
        songs
    })
});


export default router;