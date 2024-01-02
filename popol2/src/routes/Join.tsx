import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config/contansts';
import '../scss/Join.scss';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// 기본 테마 생성
const defaultTheme = createTheme();

// 회원가입 페이지 컴포넌트
export default function Join() {
  const navigate = useNavigate();
  
  // 폼 데이터를 담는 상태 변수 선언 및 초기화
  const [formData, setFormData] = useState({
    id: '',
    idLabel: '',
    pwdLabel: '',
    confirmPwdLabel: '',
    nameLabel: '',
    phoneLabel: '',
    pwd: '',
    confirmPwd: '',
    name: '',
    phone: '',
  });

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // 이메일 형식을 확인하는 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 숫자와 문자 조합
    const nameRegex = /^[a-zA-Z가-힣]+$/; // 영문 또는 한글만 허용
    const phoneRegex = /^\d{10,11}$/; // 10자 또는 11자의 숫자만 허용

      // 각 입력 필드의 유효성 검사
    let isValid = false;
    switch (name) {
      case 'id':
        isValid = emailRegex.test(value);
        break;
      case 'pwd':
        isValid = passwordRegex.test(value);
        break;
      case 'confirmPwd':
        isValid = value === formData.pwd;
        break;
      case 'name':
        isValid = nameRegex.test(value);
        break;
      case 'phone':
        isValid = phoneRegex.test(value);
        break;
      default:
        break;
    }
  
    // 유효성에 따라 라벨 업데이트
    const label = isValid ? name.charAt(0).toUpperCase() + name.slice(1) : `올바른 ${name === 'confirmPwd' ? '비밀번호' : name} 형식으로 입력해주세요`;
  
    setFormData({ 
      ...formData,
      [name]: value,
      [`${name}Label`]: label, });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 입력값 추출
    const id = formData.id; // 이메일
    const pwd = formData.pwd;
    const confirmPwd = formData.confirmPwd;
    const name = formData.name;
    const phone = formData.phone;
    // 입력값 유효성 검사 및 서버에 회원가입 요청
    if(pwd === confirmPwd && id !== "" && pwd !== "" && confirmPwd !== "" && name !== "" && phone !== ""){
      // 서버에 POST 요청을 보내어 회원가입 처리
      await axios.post(`${API_URL}/user`, { id, name, phone, pwd })
        .then(() => {
          alert("가입 성공!");
          navigate('/');
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      // 필수 입력값이 비어있거나 비밀번호가 일치하지 않는 경우 경고 메시지 출력
      return alert("모든 필수 항목을 입력해주세요.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label={formData.idLabel || "ID"}
                  autoFocus
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="pwd"
                  type="password"
                  label={formData.pwdLabel || "Password"}
                  name="pwd"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPwd"
                  label={formData.confirmPwdLabel || "Confirm Password"}
                  type="password"
                  id="confirmPwd"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label={formData.nameLabel || "Name"}
                  id="name"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label={formData.phoneLabel || "Phone Number"}
                  id="phone"
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  회원이세요? 로그인하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}