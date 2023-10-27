import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../scss/Join.scss';
import { BsGoogle } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { API_URL } from '../config/contansts'
const Join = () => {
    const navigate = useNavigate();
    const joinSubmit = async (e) =>{
        e.preventDefault();
        const id = e.target.id.value
        const pwd = e.target.pwd.value
        if(id.pwd != ""){
            await axios.post(`${API_URL}/user`,{id,pwd})
            .then(() =>{
                navigate('/');
                console.log("전송됨");
            })
            .catch(err =>{
                console.error(err);
            })
        }else{
            return alert("전부 입력해주세요");
        }
    }
    return(
        <form id="join-form" action="" onSubmit={joinSubmit}>
        <div id="join-form-top">
            <h2>간편하게 가입하고</h2>
            <h2>음악의 세계로 뛰어드세요</h2>
        </div>
        <div>
            <ul id="join-input">
                <li>
                    <h5>이메일</h5>
                    <input id="id" type="text" placeholder="이메일"/>
                </li>
                <li>
                    <h5>비밀번호</h5>
                    <input id="pwd" type="password" placeholder="비밀번호"/>
                </li>
                <li>
                    <h5>비밀번호 확인</h5>
                    <input type="password" placeholder="비밀번호"/>
                </li>
                <li>
                    <button id="join-btn" type="submit">가입하기</button>
                </li>
            </ul>
        </div>

        <fieldset>
            <legend>또는</legend>
            <ul id="interwork">
                <li><div><AiFillMessage/></div><div>카카오로 로그인하기</div></li>
                <li><div><BsGoogle/></div><div>구글로 로그인하기</div></li>
            </ul>
        </fieldset>

    </form>
    
    )
}

export default Join;