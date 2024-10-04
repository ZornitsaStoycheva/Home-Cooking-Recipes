const router = require('express').Router();
const homeService = require('../services/homeService');
const recipeService = require('../services/recipeService');

router.get('/', async (req, res) => {
    const recipes = await homeService.getAllRecipes().lean();
    res.render('home', { recipes});
})

router.get('/search', async (req, res) => {
   let title = req.query.title;

    let recipes = await recipeService.search(title);

    if(recipes == undefined) {
        recipes = await recipeService.getAll().lean();
    }

    res.render('search', {recipes});
})

module.exports = router;