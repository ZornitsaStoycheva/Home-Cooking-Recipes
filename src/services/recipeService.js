const Recipe = require('../models/Recipe');
const User = require('../models/User');

exports.getAll = () => Recipe.find();

exports.getOneRecipe = (recipeId) => Recipe.findById(recipeId);

exports.getRecipe = (recipeId) => Recipe.findById(recipeId).populate('owner').populate('recommendList');

exports.create = async (recipeData, userId) => {
    const recipe = await Recipe.create({
        owner: userId,
        ...recipeData
    })

    await User.findByIdAndUpdate(userId, {$push: { recipe: recipe._id}});

    return recipe;
}

exports.edit = (recipeId, recipeData) => Recipe.findByIdAndUpdate(recipeId, recipeData, { runValidators: true });

exports.delete = (recipeId) => Recipe.findByIdAndDelete(recipeId);

exports.recommend = async (userId, recipeId) => {
    const recipe = await Recipe.findById(recipeId);

    const isValid = recipe.recommendList.some(x => x?.toString() === userId);
    if(isValid) {
        return;
    }

    recipe.recommendList.push(userId);
    return recipe.save();
}

exports.search =  (title) => {
    
    let query = {};
    if(title) {
        query.title = new RegExp(title, 'i');
    }
    return Recipe.find(query);
}