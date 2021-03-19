const express = require('express');
const router = express.Router();
const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const { create, categoryById, read, remove, update, readAll } = require('../controllers/category');

router.get('/category/:categoryId', read);
router.get('/categories', readAll);
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, remove);

router.param('userId', userById);
router.param('categoryId', categoryById);


module.exports = router;