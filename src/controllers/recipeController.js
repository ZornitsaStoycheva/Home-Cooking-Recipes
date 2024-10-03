const recipeService = require('../services/recipeService');
const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtil');

router.get('/catalog', async (req, res) => {
    const recipes = await recipeService.getAll().lean();
    res.render('recipes/catalog', { recipes })
})

router.get('/details/:recipeId', async (req, res) => {
    const recipe = await recipeService.getRecipe(req.params.recipeId).lean();
    const isOwner = recipe.owner && recipe?.owner._id == req.user?._id;
    const isRecommend = recipe.recommendList.map(x => x._id == req.user?._id)
    res.render('recipes/details', { isRecommend, isOwner, recipe })
})

router.get('/create', isAuth, (req, res) => {
    res.render('recipes/create')
})

router.post('/create', isAuth, async (req, res) => {

    const recipe = req.body;
   
    try {
        await recipeService.create({...recipe, owner: req.user._id});
        res.redirect('/recipes/catalog')
    } catch (err) {
        res.render('recipes/create', { ...recipe, error: getErrorMessage(err)})
    }

})

module.exports = router;