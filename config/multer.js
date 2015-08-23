module.exports = function(app, multer) {
    /*Configure the multer.*/
    app.use(multer({
        dest: './uploads/',
        rename: function(fieldname, filename) {
            return filename + Date.now();
        },
        onFileUploadStart: function(file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function(file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
            done = true;
        }
    }));

    app.post('/uploadphoto', function(req, res) {
        if (done == true) {
            console.log(req.files);
            res.end("File uploaded.");
        }
    });
}