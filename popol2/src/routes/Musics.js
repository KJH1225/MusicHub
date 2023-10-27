import React from "react";
import axios from 'axios';
import useAsync from "../customHook/useAsync";
import { API_URL } from "../config/contansts";
import '../scss/Musics.scss';

const Musics = () => {
  
  //전체곡 조회함수
  const getMusics = async () => {
    await axios.get(`${API_URL}/music`);
  }

  return(
    <>
      <h1>로그인 후 메인입니다.</h1>
      <button onClick={getMusics}>서버 로그 확인</button>
    </>
  )
}

export default Musics;