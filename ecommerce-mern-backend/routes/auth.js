const express = require('express');
const router = express.Router();
const { userSignUpValidator } = require('../validator');

const { signUp, signIn, signOut, requireSignIn } = require('../controllers/auth');

router.post('/signup', userSignUpValidator, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);



module.exports = router;