const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
        res.redirect("/login");
    } else {
        next();
    }
};

const withAuthApi = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
        res.status(403).send();
    } else {
        next();
    }
};

module.exports = { withAuth, withAuthApi };
