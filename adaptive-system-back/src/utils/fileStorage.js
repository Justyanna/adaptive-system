import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(), '/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4());
    }
});

export default multer({ storage: fileStorage });