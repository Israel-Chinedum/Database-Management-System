export const getLoginRoute = (app) => {
    app.get('/login', (req, res) => {
        res.render('landingPage', {title: 'Sign in'});
    });
}