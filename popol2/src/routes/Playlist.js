import React, { useState } from "react";
import axios from "axios";
import useAsync from "../customHook/useAsync";
import { API_URL } from "../config/contansts";
import { CssBaseline, IconButton, Box, Grid, Typography, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import Listb from './Listbar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from "@mui/icons-material/Add";
import Footer from './Footer';
import { getCookie, removeCookie } from "../cookie";
import CustomAudioPlayer from "./Audio"
import '../scss/Playlist.scss';

const MainContent = styled('div')({
  flexGrow: 1,
  padding: 20,
});

const PlaylistItem = styled(Box)({
  // border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px',
  margin: '10px',
  textAlign: 'center',
  position: 'relative',
  '&:hover .play-icon': {
    opacity: 1,
  },
  '&:hover img': {
    opacity: 0.8,
  },
});

const PlaylistImage = styled('img')({
  marginBottom: '10px',
  width: '80%',
  transition: 'opacity 0.3s ease',
});

const PlayIcon = styled(PlayArrowIcon)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
});

const EmptyPlaylistScreen = styled("div")({
  textAlign: "center",
  padding: "20px",
  color: "white",
  background: "black",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ExploreButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#3f51b5',
  color: 'white',
  "&:hover": {
    backgroundColor: '#2a3f8d',
  },
});

const StyledDialog = styled(Dialog)({
});

const ModalContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ArrowButton = styled(IconButton)({
  backgroundColor: '#3f51b5',
  color: 'white',
  "&:hover": {
    backgroundColor: '#2a3f8d',
  },
  marginTop: '10px',
});

const PlayList = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState([
    {
      page: 1,
      name: "투데이",
      path: "/musics",
    },
    {
      page: 2,
      name: "차트",
      path: "/chart",
    },
    {
      page: 3,
      name: "최신음악",
      path: "/new",
    },
    {
      page: 4,
      name: "이달의 노래",
      path: "/month",
    },
    {
      page: 5,
      name: "DJ 스테이션",
      path: "/dj",
    },
  ]);
  const [playList, setPlayList] = useState([
    {
      name: "오늘 뭐 듣지?",
      writer: "재생 버튼을 클릭해보세요",
      img: "images/defaultMusicImg.png",
      src: `${API_URL}/upload/music/RoieShpigler-Aluminum.mp3`,
      id: 1,
    },
  ]);

  //전체곡 조회함수
  const getPlayList = async () => {
    const login = getCookie('accessToken');
    if (getCookie('accessToken') != null) {
      const res = await axios({
        url: `${API_URL}/playlist`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + login
        }
      })
      console.log("res.data:", res.data);
      return res.data;
    } else {
      alert('다시 로그인해주세요');
      removeCookie('accessToken');
      navigate('/');
    }
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleNextPage = () => {
    const nextPage = currentPage < pageData.length ? currentPage + 1 : 1;
    setCurrentPage(nextPage);
  };

  const [state] = useAsync(getPlayList, []);
  const { loading, data: musics, error } = state; //state구조분해
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          잠시만 기다려주세요...
        </Typography>
        <CircularProgress style={{ marginTop: '10px' }} />
      </div>
    );
  }

  if (!musics || musics.length === 0) {
    return (
      <EmptyPlaylistScreen>
        <Typography variant="h5" gutterBottom>
          플레이 리스트가 비었습니다.
        </Typography>
        <Typography variant="body1" paragraph>
          플레이 리스트를 만들어보세요!
        </Typography>
        <ExploreButton variant="contained" color="primary" onClick={handleClickOpen}>
          구경.
        </ExploreButton>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px', fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold' }}>
          <NavLink to='/explore' style={{ color: "#fff" }}>다른 기능을 이용하여 더 많은 즐거움을 느껴보세요.</NavLink>
        </Typography>
        <StyledDialog open={openModal} onClose={handleClose}>
          <DialogContent
            style={{
              backgroundColor: 'purple',
              height: '60%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ModalContent>
              {pageData.map((page) => (
                page.page === currentPage && (
                  <div key={page.page} style={{ color: 'white', textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>{page.name}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: '#1565C0',
                        color: 'white',
                        marginTop: '20px',
                        borderRadius: '8px',
                      }}
                      onClick={() => navigate(page.path)}
                    >
                      이동하기
                    </Button>
                  </div>
                )
              ))}
              <ArrowButton onClick={handleNextPage}>
                <PlayArrowIcon style={{ color: 'white' }} />
              </ArrowButton>
            </ModalContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          </DialogActions>
        </StyledDialog>
      </EmptyPlaylistScreen>
    );
  }

  // 음악을 클릭했을 때 재생목록에 추가하는 함수
  const onMusic = (e) => {
    // e.preventDefault();
    // console.log(e.target.value);
    console.log(e.target.dataset);
    setPlayList([
      {
        name: e.target.dataset.name,
        writer: e.target.dataset.singer,
        img: e.target.src,
        src: e.target.dataset.musicurl,
        id: 1,
      },
    ]);
  };

  return (
    <div style={{ display: 'flex', background: 'black' }}>
      <CssBaseline />
      <Listb />
      <MainContent>
        <h1 style={{ color: 'white' }}>playlist</h1>
        <Grid container spacing={2}>
          {musics.map((playlist) => (
            <Grid item xs={12} sm={6} md={2} key={playlist.Music.id}>
              <PlaylistItem style={{ color: 'white' }} >
                <PlaylistImage
                  src={playlist.Music.imageUrl}
                  alt={playlist.Music.name}
                  data-singer={playlist.Music.singer}
                  data-musicurl={playlist.Music.musicUrl}
                  data-name={playlist.Music.name}
                  data-id={playlist.Music.id}
                  onClick={onMusic}
                />
                <PlayIcon className="play-icon" fontSize="large" />
                <NavLink to='/detail' state={{ music: playlist.Music }} style={{ color: "#fff" }}>
                  <Typography variant="subtitle1" gutterBottom>{playlist.Music.singer}</Typography>
                  <Typography variant="body1">{playlist.Music.name}</Typography>
                </NavLink>
              </PlaylistItem>
            </Grid>
          ))}
        </Grid>
        <Footer />
      </MainContent>
      <CustomAudioPlayer playList={playList} />
    </div>
  );
};

export default PlayList;