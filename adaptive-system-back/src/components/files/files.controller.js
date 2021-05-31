import formidable from 'formidable';

const uploadFile = async(req, res, next) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields) {
            console.log(fields);
            console.lof(err);
        });
        res.status(200).end();
    } catch (ex) {
        console.log(ex);
        res.status(500).end();
    }
};

const getFile = async(req, res, next) => {
    try {} catch (ex) {
        res.status(500).end();
    }
};

export default { uploadFile, getFile };