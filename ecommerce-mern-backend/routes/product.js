const express = require('express');
const router = express.Router();
const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const { create, productById, read, remove, update, readAll, readRelated, listCategories, listBySearch, photo } = require('../controllers/product');

router.get('/product/:productId', read);
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove);
router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update);

router.get('/products', readAll);
router.get('/products/related/:productId', readRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/products/photo/:productId', photo);

router.param('productId', productById);
router.param('userId', userById);


module.exports = router;