import express from 'express';
import path from 'path';
import filesController from './files.controller.js';
import auth from '../../middleware/auth.js';
import upload from '../../utils/fileStorage.js';
import File from './files.model.js';

const filesRouter = express.Router();
filesRouter.post('/file', upload.single('file'), filesController.uploadFile);

filesRouter.get('/img/:fileId', async function(req, res) {
    const file = await File.findById(req.params.fileId);
    res.sendFile(path.join(path.resolve(), '/uploads/' + file.filename));
});

export default filesRouter;