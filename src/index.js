const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./router');
const { auth } = require('./middlewares/authMiddleware');

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve('src/public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

mongoose.connect(`mongodb://localhost:27017/homeCookingRecipes`)
.then(() => {
    console.log('Database Home Cooking Recipes is connected');

    app.listen(PORT, () => console.log(`Server listaning on the port: ${PORT}`));
}).catch((err) => {
    console.log('DATABASE cannot cannected!');
})

app.use(routes);