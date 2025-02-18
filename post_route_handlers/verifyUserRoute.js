export const verifyUserRoute = (app, fs) => {
    app.post('/verifyUser', (req, res) => {
        const {username, password} = req.body;
        const data = fs.readFileSync('./database.json');
        const jsonData = JSON.parse(data);

        const userExists = jsonData.filter(user => user.username == username && user.password == password);

        if(userExists.length > 0){
                res.clearCookie('DatabaseManagementSystem')
                req.session.regenerate((err) => {
                    if(err){
                        res.status(500).json('An error occured while trying to sign you in!');
                        throw err;
                    }
                    req.session.user = {username, password, userID: userExists[0].userID};
                    res.json('verified!');
                });

        } else {
            res.status(400).json('Invalid username or password!');
        }

    });
}