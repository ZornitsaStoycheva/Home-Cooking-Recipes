const Recipe = require('../models/Recipe');

exports.getAllRecipes = () => Recipe.find().sort({ _id: -1});