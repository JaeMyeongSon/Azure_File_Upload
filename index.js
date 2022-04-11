var express = require('express')
const app = express()
const port = 6000
const multer = require('multer')
const multerAzure = require('multer-azure')  
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

var date = moment().format('YYYY-MM-DD HH:mm:ss'); 

var upload = multer({ 
  storage: multerAzure({
    connectionString: '[connectionString]', //Azure 저장소 계정에 대한 연결 문자열입니다. 지정한 경우 이 문자열이 선호되며 그렇지 않은 경우 계정 및 키로 대체됩니다.
    account: '[account]', //Azure 저장소 계정의 이름
    key: '[key]', //스토리지 계정 창의 액세스 키 아래에 나열된 키
    container: '[container]',  //임의의 컨테이너 이름, 존재하지 않는 경우 생성됩니다.
     blobPathResolver: function(req, file, callback){ 
            let blobPath = file.originalname 
        callback(null, blobPath);
     }
  })
})

app.post('/', upload.any(), function (req, res, next) {
  console.log(req.files)
  res.status(200).send('Uploaded: ' + req.files)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))