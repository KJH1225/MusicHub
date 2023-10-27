import React from "react";
import '../scss/Login.scss';
import { BsGoogle } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
const Login = () => {
    return(
        <form id="login-form" action="">
        <div id="login-form-top">
            <h2>Service_Name</h2>
            <h2>로그인 하기</h2>
        </div>
        <div>
            <ul id="login-input">
                <li>
                    <h5>이메일</h5>
                    <input type="text" placeholder="이메일"/>
                </li>
                <li>
                    <h5>비밀번호</h5>
                    <input type="password" placeholder="비밀번호"/>
                </li>
                <li>
                    <div id="toggle-box">
                        <input type="checkbox" id="toggle" hidden/>
                        <label for="toggle" class="toggleSwitch">
                            <span class="toggleButton"></span>
                        </label>
                        <span id="toggle-txt">자동 로그인</span>
                    </div>
                </li>
            </ul>

    
            <li>
                <button id="Login-btn">로그인 하기</button>
                <div id="find-id"> <a href="">ID/PW찾기</a> <a href="">회원가입</a> </div>
            </li>
        </div>

        <div>
            <ul id="interwork">
                <li><div><AiFillMessage/></div><div>카카오로 로그인하기</div></li>
                <li><div><BsGoogle/></div><div>구글로 로그인하기</div></li>
            </ul>
        </div>

        </form>
    )
}

export default Login;