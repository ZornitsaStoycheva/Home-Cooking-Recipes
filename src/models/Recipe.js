const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title should be 2 characters!']
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients is required!'],
        minLength: [10, 'Ingredients should be 10 characters!'],
        maxLength: [200, 'Ingredients should be 200 characters!']
    },
    instructions: {
        type: String,
        required: [true, 'Instructions is required!'],
        minLength: [10, 'Instructions should be 10 characters!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be 10 characters!'],
        maxLength: [100, 'Description should be 100 characters!']
    },
    image: {
        type: String,
        required: true,
         validate: /^https?:\/\//i
    },
    recommendList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;