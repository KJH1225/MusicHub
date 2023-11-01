require("dotenv").config();
const jwt = require('jsonwebtoken'); 
const JWT_KEY = process.env.ACCESS_TOKEN_SECRET
const Token = require("../models/token")

// const accessToken = jwt.sign(
//     { email: "test@user.com" },  // 토큰에 담을 JSON 데이터(payload)
//     JWT_KEY, //두 번째 인자로는 키(key)
//     {expiresIn: "2m"} //유효시간 2분
// );
// console.log("accessToken: ", accessToken)

// const verified = jwt.verify(accessToken, JWT_KEY);
// console.log("verified: ", verified);
//iat: 토큰이 발급된 시간 (issued at)
//exp: 토큰의 만료시간 (expiraton)



// AccessToken을 만드는 함수로 회원정보(Object)를 인자로 받아 시크릿 키, 유효기간을 인자로 jwt.sign() 함수를 호출한다.
// jwt.sign() 함수는 jsonwebtoken 라이브러리의 토큰을 발급하는 함수이다.
exports.makeAccessToken = (Object) =>{
  const accessToken = jwt.sign(
      Object,  // 토큰에 담을 JSON 데이터(payload)
      JWT_KEY, //두 번째 인자로는 키(key)
      {expiresIn: "60m"} //유효시간 60분
  );
  console.log("accessToken: ", accessToken);
  return accessToken;
};


// RefreshToken을 만드는 함수이다. RefreshToken은 회원 ID와 함께 DB에 저장되므로 payload에 빈 객체를 할당한다.
// 따라서 빈 객체, 시크릿 키, 해싱 알고리즘 정보와 유효기간을 인자로 jwt.sign() 함수를 호출한다.
exports.makeRefreshToken = () =>{ //리프레쉬 토큰은 사용자 인증이 아닌 새로운 액세스 토큰을 생성하는 용도로만 사용
  const refreshToken = jwt.sign(
      {},  
      JWT_KEY, 
      {
          algorithm: "HS256",
          expiresIn: "1h"
      }
  );
  console.log("refreshToken: ", refreshToken);
  return refreshToken;
};




// refresh token의 유효성을 검사하는 함수이다. userID로 DB에서 refreshToken을 조회한 후 조회된 토큰값과 인자로 받은 토큰값을 비교하여 값이 일치하면 jwt.verify()를 통해 refreshToken이 유효한지 확인한다.
exports.refreshVerify = async (token, userId) => {
  try {
    // db에서 refresh token 가져오기(DB에 userID로 조회)
    const result = await Token.findOne({
      attributes: ['token'],
      where: {
        id : userId,
      },
    });
    // console.log("r[2]: ",result.dataValues);

    //받은 refreshToken과 DB에서 조회한 값이 일치하는지 확인
    if (token === result.dataValues.token) {
      try {
        jwt.verify(token, JWT_KEY);
        return true;

      // refreshToken 검증 에러
      } catch (err) {
        console.log("refreshToken 검증 에러: ",err);
        return false;
      }
    } else {
      return false;
    }
  // DB 에러
  } catch (err) {
    console.log("디비에러: ", err);
    return false;
  }
};


// access token의 유효성을 검사하는 함수이다. 인자로 받은 accessToken을 시크릿 키와 함께 jwt.verify에 넣어 호출하여 회원 정보를 얻는다. token값이 유효하다면 디코딩된 userID 를 리턴하고 유효하지 않다면 에러 메세지를 리턴한다.
exports.verify = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return {
      ok: true,
      id: decoded.id
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};


