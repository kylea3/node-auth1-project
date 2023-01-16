// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const User = require('./users-model')
const router = require('express').Router()
const { } = require('../auth/auth-middleware')
/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */
router.get('/', (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
  res.status(500).json( {
      customMessage: 'something went wrong in the users router',
      message: err.message,
      stack: err.stack
  })
})

// Don't forget to add the router to the `exports` object so it can be required in other modules

module.exports = router;