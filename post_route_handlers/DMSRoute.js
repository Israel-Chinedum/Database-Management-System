export const DMSRoute = (app) => {
    app.post('/getDMS', (req, res) => {
        if(!req.session.user || Object.keys(req.session.user).length == 0){
            console.log(req.session.user)
            res.render('landingPage', {title: 'Sign in'});
            return;
        } 
        console.log(req.session.user)
        res.render('DMS');
    })
    }