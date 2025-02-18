export const createDatabase = (app, fs) => {
    app.post('/createdb', (req, res) => {
        console.log(req.body);
        console.log('Cookie: ', req.cookies);
        //CHECK IF ALL DATABASE FOLDER ALREADY EXISTS
        const { DatabaseName, Date } = req.body;

      
        if(DatabaseName){
            fs.access(`./All_Database/${DatabaseName}`, fs.constants.F_OK, (err) => {
                if(err){
                    fs.mkdir(`./All_Database/${DatabaseName}_${req.session.user.userID}`, { recursive: true }, (error) => {
                        if(error) throw error;
                            return res.json({
                                msg: 'Database has been created!',
                                data: DatabaseName
                            });
                    });
                } else{
                    res.status(400).json({msg: 'Database already exists!'});
                }
            })
        } else{
            res.status(400).json({msg: 'Invalid name'})
        }
      

    });
}