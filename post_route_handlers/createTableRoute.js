export const createTableRoute = (app, fs) => {
    app.post('/createTable/:currentDatabase', (req, res) => {
        const {currentDatabase} = req.params;
        const {TableName, Date} = req.body;

        fs.access(`./All_Database/${currentDatabase}_${req.session.user.userID}`, fs.constants.F_OK, (err) => {
            if(err){
                res.status(400).json('An error occured while trying to create table!');
                console.log(err);
            } else{
                fs.access(`./All_Database/${currentDatabase}_${req.session.user.userID}/${TableName}.json`, fs.constants.F_OK, (err) => {
                    if(err){
                        fs.writeFile(`./All_Database/${currentDatabase}_${req.session.user.userID}/${TableName}.json`, '[]', (err) => {
                            if(err){
                                console.log(err);
                                res.status(500).json('Unable to create table!');
                            } else{
                                console.log('table has been created!')
                                res.json({
                                    msg: 'Table has been created!',
                                    data: [TableName]
                                });
                            }
                        })
                    } else{
                        console.log('Table already exists');
                        res.status(400).json('Table already exists!');
                    }
                });
            }
        });
        
    });
}