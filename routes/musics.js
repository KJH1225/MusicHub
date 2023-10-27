const express = require('express');
const Music = require('../models/music');

const router = express.Router();

//전체조회
router.route('/')
  .get(async (req,res,next)=>{ //전체조회
    try {
      console.log('전체조회성공');
      res.end();
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body)
      const music = await Music.create({ //Product모델에 INSERT INTO
        imageUrl: req.body.imageUrl,
        musicUrl: req.body.musicUrl,
        name: req.body.name,
        kind: req.body.kind,
        singer: req.body.singer,
        composer: req.body.composer,
        lyricist: req.body.lyricist,
        lyrics: req.body.lyrics,
      })
      console.log(music);
      res.status(201).end();
    }catch{

    }
  })
module.exports = router;