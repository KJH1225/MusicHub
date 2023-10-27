/*
작성자: 김지환
수정일자: 2023-10-18
내용: Amount모델 정의  (상품 테이블)
*/
const Sequelize = require("sequelize");

class Amount extends Sequelize.Model {
  static initiate(sequelize) {
    Amount.init({
      id: { //pay 아이디
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "월정액 아이디 (기본키)",
      },
      name: { //월정액 이름
        type: Sequelize.STRING(200),
        allowNull: false,
        comment: "월정액 이름",
      },
      price: { //가격
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: 
          "가격",
      },
      content: {
        type: Sequelize.STRING(1000),
        comment: 
          "월정액 설명",
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Amount',
      tableName: 'amounts',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) { //다른 모델과의 관계정의
    //참조키로 Cart모델에 prodNum(sourceKey)를 prodNum(foreignKey)라는 이름으로 보냄
    db.Amount.hasMany(db.Pay, { foreignKey: 'amountId', sourceKey: 'id'});
  }
};

module.exports = Amount;