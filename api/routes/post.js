const { Router } = require('express');
const router =  Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extends:false, limit: '50mb'});
const formidable = require('formidable');
const articleOp = require('../../model/query/article.js');

// generate the uuid to name the post folder.
const uuid = () => {
  let current = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    current += performance.now();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (current + Math.random() * 16) % 16 | 0;
    current = Math.floor(current / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

router.post('/upload', urlencodedParser, (req, res) => {
  
  const form = new formidable.IncomingForm();
  // parse the form
  form.parse(req, (err, fields, files) => {
    if (err) throw err
    const uploadedFilePath = []
    // use uuid to name the folder name.
    const number = uuid()
    try {
      // create or use existing folder.
      fs.mkdirSync(rootPath + 'static/uploads/post/' + fields.title + '_' + number)
      fs.mkdirSync(rootPath + 'static/uploads/post/' + fields.title + '_' + number + '/images/')
    } catch (err) {
      if (err.code !== 'EEXIST') {      
        console.log(err)
        // return 304 status.
        res.status(304)
        res.end();
      }
    }
    // visit all files
    for (let key in files) {
      const uploadedFile = files[key]
      const tmpPath = uploadedFile.path
      const targetPath = rootPath + 'static/uploads/post/' + fields.title + '_' + number
        + '/images/' + uploadedFile.name
      // add the image file path to uploadedPath.
      uploadedFilePath.push('/uploads/post/' + fields.title + '_' + number
      + '/images/' + uploadedFile.name)
      // save the uploaded image.
      fs.rename(tmpPath, targetPath, function(err) {
        if (err) throw err;
        fs.unlink(tmpPath, function() {
          console.log('File Uploaded to ' + targetPath)
        });
      });
    }
    // return the uploaded file path.
    res.set({ 'content-type': 'application/json; charset=utf-8' })
    res.status(200).json(uploadedFilePath)
    res.end();
  });
});

router.post('/saveArticle',urlencodedParser, (req,res) => {

  // TODO: fix wrong usage
  const poster = req.body.poster; 
  const time = req.body.time;
  const type = req.body.type;
  const content = req.body.content;
  

  // send data to database
  articleOp.add("studentId", "this_is_title", content, "type(integer)", ["array", "of", "tags"]);
   
  res.send("kkk");
});

module.exports = router ;
