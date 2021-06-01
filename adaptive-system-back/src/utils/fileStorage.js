import multer from 'multer';
import path from 'path';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(), '/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
});

export default multer({ storage: fileStorage });