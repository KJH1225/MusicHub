const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: "유저 ID (기본키)",
      },
      pwd: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "비밀번호",
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "이름",
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: "회원 전화번호",
      },
      regdate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "회원 가입일",
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    //참조키로 Cart모델에 id(sourceKey)를 userId(foreignKey)라는 이름으로 보냄
    db.User.hasMany(db.Pay, { foreignKey: 'userId', sourceKey: 'id'});
    db.User.hasMany(db.PlayHistory, { foreignKey: 'userId', sourceKey: 'id'});
    db.User.hasMany(db.PlayList, { foreignKey: 'userId', sourceKey: 'id'});
  }
};

module.exports = User;