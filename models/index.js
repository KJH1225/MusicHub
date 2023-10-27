const Sequelize = require('sequelize'); 
const User = require('./user'); //user파일을 User로 불러옴 
const Employee = require('./employee'); //employee파일을 Employee로 불러옴
const Music = require('./music');
const Pay = require('./pay');
const Amount = require('./amount');
const PlayHistory = require('./history');
const PlayList = require('./playList');

const env = process.env.NODE_ENV || 'development'; //상수 env에 NODE_ENV없으면 'development' 넣음
const config = require('../config/config')[env]; //상수config에 ../config/config파일에서 env(development) 불러옴
const db = {}; //상수 db라는 빈 객체 생성

//sequelize 인스턴스 생성../config/config파일의 development 내용들 넣음  
const sequelize = new Sequelize(config.database, config.username, config.password, config); 

//생성된 인스턴스를 나중에 재사용하기 위해 db.sequelize에 넣음
db.sequelize = sequelize;

//만든 모델들 추가
db.User = User;
db.Employee = Employee;
db.Pay = Pay;
db.Amount = Amount;
db.Music = Music;
db.PlayHistory = PlayHistory;
db.PlayList = PlayList;

User.initiate(sequelize);
Employee.initiate(sequelize);
Pay.initiate(sequelize);
Amount.initiate(sequelize);
Music.initiate(sequelize);
PlayHistory.initiate(sequelize);
PlayList.initiate(sequelize);

User.associate(db);
Employee.associate(db);
Pay.associate(db);
Amount.associate(db);
Music.associate(db);
PlayHistory.associate(db);
PlayList.associate(db);


module.exports = db;
