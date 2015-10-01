var app = require('express')();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'videos/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
}); 

var upload = multer({ 
    storage: storage
});

app.use(bodyParser.raw());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/', upload.single('video'), function(req, res) {
    console.log(req.file);
    res.send();
});

app.listen(3000);
