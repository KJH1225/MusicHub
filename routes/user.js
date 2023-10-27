const express = require('express');
const User = require('../models/user')


const router = express.Router();

router.route('/')
  .get(async(req,res,next)=> {
    try {
      console.log("성공");
    } catch (error) {
      console.error(error);
    }
  })
  .post(async(req,res,next)=>{
    try {
      // const user = await User.create({
      //   id : req.body.id,
      //   pwd : req.body.pwd,
      //   name : req.body.name,
      //   phone : req.body.phone,
      // })
      // console.log("join,user",user);
      res.status(201).json("OK");
      console.log("join req.body: ",req.body);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
router.route('/mypage')
  .get(async (req,res,next)=>{
    try {
      // console.log("res",req.query);
      
      const userData = await User.findOne({
        where: {
          id : req.query.user
        }
      })
      console.log('userData',userData);
      res.status(201).json(userData)
    } catch (error) {
      console.error(error);
    }
  })

module.exports = router;