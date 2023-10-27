/*
작성자: 김지환
수정일자: 2023-10-18
내용: Pay모델 정의  (상품 테이블)
*/
const Sequelize = require("sequelize");

class Pay extends Sequelize.Model {
  static initiate(sequelize) {
    Pay.init({
      id: { //그냥 기본키
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "곡 아이디 (기본키)",
      },
      userId: {//user아이디
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "곡 이름",
      },
      amountId: {//월정액아이디
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "곡 이름",
      },
      expirationDate: { //만료일
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "월정액 만료일",
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Pay',
      tableName: 'pays',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) { //다른 모델과의 관계정의
    db.Pay.belongsTo(db.User, {foreignKey: 'userId', targetKey: 'id'});
    db.Pay.belongsTo(db.Amount, {foreignKey: 'amountId', targetKey: 'id'});
  }
};

module.exports = Pay;