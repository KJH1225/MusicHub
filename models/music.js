/*
작성자: 김지환
수정일자: 2023-10-18
내용: Music모델 정의  (상품 테이블)
*/
const Sequelize = require("sequelize");

class Music extends Sequelize.Model {
  static initiate(sequelize) {
    Music.init({
      id: { //곡 아이디
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "곡 아이디 (기본키)",
      },
      name: { //곡 이름
        type: Sequelize.STRING(200),
        allowNull: false,
        comment: "곡 이름",
      },
      kind: { //곡 분류
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: 
          "곡 종류(1: 한국(1,1-1,1-2,1-3,1-4),2: 미국(2,2-1,2-2,2-3,2-4), 3: 일본(3,3-1,3-2,3-3,3-4))",
      },
      singer: { //가수
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "가수",
      },
      composer: { //작곡가
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "작곡가",
      },
      lyricist: { //작사가
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "작사가",
      },
      lyrics: { //가사
        type: Sequelize.STRING(5000), 
        allowNull: false,
        comment: "가사",
      },
      imageUrl:{ //이미지 URL주소
        type: Sequelize.STRING,
        allowNull: false,
      },
      musicUrl:{ //음악파일 URL주소
        type: Sequelize.STRING,
        allowNull: false,
      },
      regdate: { //곡 등록일
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "곡 등록일",
        //INSERT INTO foodingdb.musics (name, price, content) values('삼다수', 1000, '제주도의 삼다수입니다');
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Music',
      tableName: 'musics',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) { //다른 모델과의 관계정의
    //참조키로 Cart모델에 prodNum(sourceKey)를 prodNum(foreignKey)라는 이름으로 보냄
    db.Music.hasMany(db.PlayHistory, { foreignKey: 'musicId', sourceKey: 'id'});
    db.Music.hasMany(db.PlayList, { foreignKey: 'musicId', sourceKey: 'id'});
  }
};

module.exports = Music;