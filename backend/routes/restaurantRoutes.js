const express = require('express');
const router = express.Router();
const { createRestaurant, updateRestaurant, deleteRestaurant, getAllRestaurants } = require('../controllers/restaurantController');


router.get('/getAllRestaurants', getAllRestaurants);

router.post('/createNewRestaurant', createRestaurant);

router.put('/updateRestaurant/:id', updateRestaurant);

router.delete('/deleteRestaurant/:id', deleteRestaurant);

module.exports = router;