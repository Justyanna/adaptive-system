import express from 'express';
import filesController from './files.controller.js';
import auth from '../../middleware/auth.js';
import upload from '../../utils/fileStorage.js';

const filesRouter = express.Router();
filesRouter.post('/file', upload.single('file'), filesController.uploadFile);
filesRouter.get('/file/:fileId', auth.authenticate, filesController.getFile);
export default filesRouter;