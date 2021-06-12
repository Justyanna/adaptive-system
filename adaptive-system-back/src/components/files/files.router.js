import express from 'express'
import path from 'path'
import filesController from './files.controller.js'
import auth from '../../middleware/auth.js'
import upload from '../../utils/fileStorage.js'

const filesRouter = express.Router()
filesRouter.post('/file', upload.single('file'), filesController.uploadFile)
filesRouter.get('/file/:fileId', auth.authenticate, filesController.getFile)

filesRouter.get('/img', function (req, res) {
  res.sendFile(path.join(path.resolve(), 'uploads/plan_zajec.png'))
})

export default filesRouter
