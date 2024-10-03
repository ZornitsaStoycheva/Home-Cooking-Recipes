const router = require('express').Router();
const homeService = require('../services/homeService');

router.get('/', async (req, res) => {
    const recipes = await homeService.getAllRecipes().lean();
    res.render('home', { recipes});
})

module.exports = router;