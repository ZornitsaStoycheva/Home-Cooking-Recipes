const Recipe = require('../models/Recipe');
const User = require('../models/User');

exports.getAll = () => Recipe.find();

exports.getRecipe = (recipeId) => Recipe.findById(recipeId).populate('owner').populate('recommendList');

exports.create = async (recipeData, userId) => {
    const recipe = await Recipe.create({
        owner: userId,
        ...recipeData
    })

    await User.findByIdAndUpdate(userId, {$push: { recipe: recipe._id}});

    return recipe;
}