const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.auth = async (req, res, next) => {
    const token = await req.cookies['auth'];

    if(!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;
        next()
    } catch (error) {
        console.log({ error });
        res.clearCookie('auth');
        res.redirect('/login')
    }
}

exports.isAuth = async (req, res, next) => {
    if(!req.user) {
        return res.redirect('/login')
    }
    next();
}

exports.isGuest = (req, res, next) => {
    if(req.user) {
        res.rediresct('/');
    }
    next();
}