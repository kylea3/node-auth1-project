// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const router = require('express').Router()
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')
const { restricted, checkUsernameExists, checkUsernameFree, checkPasswordLength } = require('./auth-middleware')


router.post('/register', checkUsernameFree, (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  User.add(user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(next)
  })

// router.get('/:id', (req, res, next) => {
//   User.findById(req.params.id)
//   .then(user => {
//     res.status(200).json(user)
//   })
//   .catch(next)
// })
/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

router.post('/login', checkUsernameExists,  (req, res, next) => {
      if( user[0] && bcrypt.compareSync(password, user[0].password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user[0].username}`})
        next()
      } else {
        next(res.status(401).json({ message: 'Invalid credentials'}))
      }
})
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
  router.use((err, req, res, next) => {
    res.status(500).json( {
        customMessage: 'something went wrong in the users router',
        message: err.message,
        stack: err.stack
    })
  })
 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router;