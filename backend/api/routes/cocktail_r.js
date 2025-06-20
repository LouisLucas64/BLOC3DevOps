/*** IMPORT */
const express = require('express')
const cocktailCtrl = require('../controllers/cocktail_c')
const checkToken = require('../middleware/checkJwt')
const rateLimit = require('express-rate-limit')

/*** EEXPRESS ROUTER */
let router = express.Router()

/*** RATE LIMITER */
const deleteCocktailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: "Too many delete requests from this IP, please try again later."
});

const modifyCocktailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: "Too many modify requests from this IP, please try again later."
});

const addCocktailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: "Too many add requests from this IP, please try again later."
});

/*** COCKTAIL ROUTAGE */
router.get('/', cocktailCtrl.getAllCocktails)
router.get('/:id([0-9]+)', cocktailCtrl.getCocktail)

router.put('/', checkToken, addCocktailLimiter, cocktailCtrl.addCocktail)
router.patch('/:id([0-9]+)', checkToken, modifyCocktailLimiter, cocktailCtrl.modifyCocktail)

router.delete('/:id([0-9]+)', checkToken, deleteCocktailLimiter, cocktailCtrl.deleteCocktail)

module.exports = router