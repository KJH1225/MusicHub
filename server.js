/*
작성자: 김지환
수정일자: 2023-10-18
내용: express서버 
*/
const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const index = path.join(__dirname, 'popol2/build/index.html')
const localUrl = 8081; 

const { sequelize } = require('./models');
const musicRouter = require('./routes/musics');
const userRouter = require('./routes/user')

//상수 multer에 "multer"라이브러리 가져옴
const multer = require("multer");
// 이미지 파일이 요청 오면 어디에 저장할건지 지정
const upload = multer({ 
    storage: multer.diskStorage({ //저장 설정
        destination: function(req, file, cb) { // 어디에 저장할거냐? upload/
            if(file.fieldname == "image"){
              cb(null, 'upload/image/') // upload폴더 밑에
            }else if(file.fieldname == "file"){
              cb(null, 'upload/music/') // upload폴더 밑에
            }
        },
        filename: function(req, file, cb){ // 어떤 이름으로 저장할거야?
            cb(null, file.originalname) // 업로드한 file의 오리지널 이름으로 저장하겠다.
        }
    })
})

// '/upload'경로로 뭔가 요청이오면 여기서 걸리고 upload폴더의 정적 파일을 제공하겠다
// 예: "/upload/image.jpg")에 액세스하면 Express.js는 "upload" 디렉터리에서 정적 파일을 찾아 제공
app.use("/upload", express.static("upload"));  

//시퀄라이즈 연결 부분
sequelize.sync({ force: false }) //force가 true면 킬때마다 DB 새로 만듬
  .then(() => { 
    console.log("DB연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

//로그 자세히보기
app.use(morgan('dev'));

// URL-encoded방식 사용할수있게 설정
app.use(express.urlencoded({extended:false}));  
// json형식의 데이터를 처리할 수 있게 설정
app.use(express.json());


// 브라우저 cors 이슈를 막기 위해 사용(모든 브라우저의 요청을 일정하게 받겠다)
var cors = require('cors');
app.use(cors());

//app.use('요청 경로', express.static('실제 경로'));
app.use('/', express.static(path.join(__dirname, 'popol2/build'))); //POPOL2/popol2/build/ 파일 지정


// '/image경로로 post요청이고 파일 1개면'
app.post('/image', upload.single('image'), (req, res)=>{ 
  const file = req.file; 
  console.log("post(/image) file:",file);
  res.send({ 
      // imageUrl: "http://localhost:3000/"+file.destination+file.filename
      imageUrl: `http://localhost:${localUrl}/`+file.destination+file.filename //이미지 여기 저장했다 json형식으로 보냄
  })
})

app.post('/mp3', upload.single('file'), (req, res)=>{ 
  const file = req.file;
  console.log("post(/mp3) file:",file);
  res.send({ 
    // imageUrl: "http://localhost:3000/"+file.destination+file.filename
    musicUrl: `http://localhost:${localUrl}/`+file.destination+file.filename //이미지 여기 저장했다 json형식으로 보냄
})
})

app.use('/music', musicRouter); 
app.use('/user', userRouter); 

// 위에서 안걸린 나머지 모든 get요청 처리
// 예: http://localhost:8080/asdfasdfasd
app.get('*', (req, res) => { 
  // console.log(res);
  res.sendFile(index) //이상한 경로로 오면 띄울 html파일 설정
});

app.listen(localUrl, function () { //서버실행
  console.log(`${localUrl}에서 대기중`)
}); 