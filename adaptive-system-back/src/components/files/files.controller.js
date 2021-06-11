import File from './files.model.js'
import Course from '../courses/courses.model.js'
import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

const uploadFile = async (req, res, next) => {
  try {
    const course = await Course.findById(req.body.course)
    if (course == null) res.status(500).end()
    const file = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      course: course._id
    }
    const savedFile = await new File(file).save()
    return res.send({ fileId: savedFile._id })
  } catch (ex) {
    console.log(ex)
    res.status(500).end()
  }
}

const getFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.fileId)
    fs.access(
      path.join(path.resolve(), '/uploads/' + file.filename),
      fs.constants.R_OK,
      err => {
        if (err) {
          res.writeHead(400, { 'Content-Type': 'text/plain' })
          res.end('ERROR File does not exist')
        } else {
          res.writeHead(200, {
            'Content-Type': mime.contentType(path.extname(file.originalname)),
            'Content-Disposition': 'attachment; filename=' + file.originalname
          })
          fs.createReadStream(
            path.join(path.resolve(), '/uploads/' + file.filename)
          ).pipe(res)
        }
      }
    )
  } catch (ex) {
    res.status(500).end()
  }
}

export default { uploadFile, getFile }
