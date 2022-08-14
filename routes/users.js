// //import { Express } from "express";
// const express = require('express');

// const router= express.Router();

// router.get('/users',(req,res)=>{
//     console.log('In Get Route of /users');
//     res.send('In Get Route of /users');
// });

// router.post('/users',(req,res)=>{
//     console.log('Post Route triggered');
//     res.send('Post Route triggered');
// });

// module.exports= router;


const express = require('express');
//const { body } = require('express-validator/check');

const userController = require('../controllers/users');

const router = express.Router();

// GET /feed/posts
router.get('/users', userController.getUsers);

// POST /feed/post
router.post(
  '/user',
//   [
//     body('title')
//       .trim()
//       .isLength({ min: 5 }),
//     body('content')
//       .trim()
//       .isLength({ min: 5 })
//   ],
userController.createUser
);

router.get('/users/:userId', userController.getUser);

router.put(
  '/users/:userId',
//   [
//     body('title')
//       .trim()
//       .isLength({ min: 5 }),
//     body('content')
//       .trim()
//       .isLength({ min: 5 })
//   ],
  userController.updateUser
);

router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
