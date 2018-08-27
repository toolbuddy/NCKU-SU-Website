const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extends: false});
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

router.post('/bighead', urlencodedParser, (req, res) => {
  
    const form = new formidable.IncomingForm();
    // parse the form
    form.parse(req, (err, fields, files) => {
      if (err) throw err
      let uploadedFilePath = ''
      try {
        // create or use existing folder.
        fs.mkdirSync(rootPath + 'static/uploads/account/' + fields.account)
      } catch (err) { 
        if (err.code !== 'EEXIST') {      
          console.log(err)
          // return 304 status.
          res.status(304)
          res.end();
        }
      }
      console.log(files)
      const uploadedFile = files.image
      const tmpPath = uploadedFile.path
      const targetPath = rootPath + 'static/uploads/account/' + fields.account + '/profilePic' + path.extname(tmpPath)
      // set the image file path to uploadedPath.
      uploadedFilePath = '/uploads/account/' + fields.account + '/profilePic' + path.extname(tmpPath)
      // save the uploaded image.
      fs.rename(tmpPath, targetPath, function(err) {
        if (err) throw err;
        fs.unlink(tmpPath, function() {
          console.log('File Uploaded to ' + targetPath)
        });
      });
      // return the uploaded file path.
      res.set({ 'content-type': 'application/json; charset=utf-8' })
      res.status(200).json(uploadedFilePath)
      res.end();
    });
});

module.exports = router;