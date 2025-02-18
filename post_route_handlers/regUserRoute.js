import crypto from 'crypto';
export const regUserRoute = (app, fs) => {
    app.post('/regUser', (req, res) => {
        const {username, password} = req.body;
        const fileExists = fs.existsSync('./database.json');

        if(fileExists){
            const data = fs.readFileSync('./database.json');
            const jsonData = JSON.parse(data);

            //MAKING SURE THAT SAME USERNAME IS NOT USED TWICE
            const anotherUser = jsonData.filter(user => user.username == username);

            if(anotherUser.length > 0){
                res.status(400).json('Username has already been taken!');
                return;
            }

            //MAKING SURE SAME ID IS NOT GENERATED TWICE
            let currentID = crypto.randomBytes(16).toString('hex');
            let check = jsonData.filter(user => user.userID == currentID);

            if(check.length > 0){
                while(check.length > 0){
                    currentID = crypto.randomBytes(16).toString('hex');
                    check = jsonData.filter(user => user.userID == currentID);
                }
            }
            jsonData.push({username, password, userID: currentID});

            fs.writeFile('./database.json', JSON.stringify(jsonData), err => {
                if(err){
                    res.status(500).json('An error occured!');
                    throw err;
                }
                res.json({msg: 'Registration Successfull!'});
            })

        } else {
            fs.writeFile('./database.json', JSON.stringify([{username, password, userID: crypto.randomBytes(16).toString('hex')}]), err => {
                if(err){
                    res.status(500).json('An error occured!');
                    throw err;
                }
                res.json({msg: 'Registration Successfull!'});
            });
        }

        res.status(200).json('Registration successfull!');
    })
}