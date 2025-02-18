export const LandingPageRoute = (app) => {
    app.get('', (req, res) => {
        if(req.session.user){
            res.render('DMS');
            return;
        }
        res.render('landingPage', {title: 'D.M.S'});
    });
}