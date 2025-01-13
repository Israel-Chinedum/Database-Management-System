export const createTableRoute = (app, fs) => {
    app.post('/createTable/:currentDatabase', (req, res) => {
        const {currentDatabase} = req.params;
        const {TableName, Date} = req.body;

        fs.access(`./All_Database/${currentDatabase}`, fs.constants.F_OK, (err) => {
            if(err){
                console.log(err);
                res.status(400).json({error: 'Invalid request!'});
            } else{
                fs.access(`./All_Database/${currentDatabase}/${TableName}.json`, fs.constants.F_OK, (err) => {
                    if(err){
                        fs.writeFile(`./All_Database/${currentDatabase}/${TableName}.json`, '[]', (err) => {
                            if(err){
                                console.log(err);
                                res.status(500).json({msg: 'Unable to create table!'});
                            } else{
                                res.json({
                                    msg: 'Table has been created!',
                                    data: [TableName]
                                });
                            }
                        })
                    } else{
                        console.log('Table already exists');
                        res.status(400).json({msg: 'Table already exists!'});
                    }
                });
            }
        });
        
    });
}