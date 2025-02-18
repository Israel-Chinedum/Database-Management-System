export const logoutRoute = (app) => {
    app.post('/logout', (req, res) => {
        req.session.destroy((err) => {
            if(err){
                res.status(500).json('Unable to sign out user!');
                throw err;
            }
            res.json('Sign out successfull!');
        });
    })
}