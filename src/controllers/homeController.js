const router = require('express').Router();
const homeService = require('../services/homeService');
const recipeService = require('../services/recipeService');

router.get('/', async (req, res) => {
    const recipes = await homeService.getAllRecipes().lean();
    res.render('home', { recipes});
})

router.get('/search', async (req, res) => {
    const  {title}  = req.query;

    let recipes = await recipeService.search(title).lean();

    if(recipes == undefined) {
        recipes = await recipeService.getAll().lean();
    }

    res.render('search', {recipes, title});
})

module.exports = router;