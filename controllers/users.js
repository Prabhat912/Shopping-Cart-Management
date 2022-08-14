// const user = require('../models/user');
const { validationResult } = require('express-validator');
const User = require('../models/user');


exports.getUsers = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  User.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return User.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(users => {
      res
        .status(200)
        .json({
          message: 'Fetched users successfully.',
          users: users,
          totalItems: totalItems
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
//   if (!req.file) {
//     const error = new Error('No image provided.');
//     error.statusCode = 422;
//     throw error;
//   }
  //const imageUrl = req.file.path;
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const user = new User({
    name: name,
    password: password,
    email: email,
    creator: { name: 'Prabhat' }
  });
  user
    .save()
    .then(result => {
      res.status(201).json({
        message: 'User created successfully!',
        user: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'User fetched.', user: user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
//   if (req.file) {
//     imageUrl = req.file.path;
//   }
//   if (!imageUrl) {
//     const error = new Error('No file picked.');
//     error.statusCode = 422;
//     throw error;
//   }
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
    //   if (imageUrl !== post.imageUrl) {
    //     clearImage(post.imageUrl);
    //   }
      user.name = name;
      user.password = password;
      user.email = email;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated!', user: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
    //   // Check logged in user
    //   clearImage(post.imageUrl);
      return User.findByIdAndRemove(userId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Deleted user.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// const clearImage = filePath => {
//   filePath = path.join(__dirname, '..', filePath);
//   fs.unlink(filePath, err => console.log(err));
// };
