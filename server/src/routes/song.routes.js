import express from 'express';
import multer from 'multer';
import uploadfile from '../service/storage.service'; 
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/songs', upload.single("audio") , async (req, res) => {
    const { title, artist, url } = req.body;
    const fileData = await uploadfile(req.file);
    res.status(201).json({
        message: 'Song added successfully',
        song: { title, artist, url }
    });

}) 


export default router;