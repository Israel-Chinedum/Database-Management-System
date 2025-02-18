export const renameTbRoute = (app, fs) => {
    app.get('/renameTable', (req, res) => {
        const {formerName, newName, currentDatabase} = req.query;
        fs.rename(`./All_Database/${currentDatabase}_${req.session.user.userID}/${formerName}.json`, `./All_Database/${currentDatabase}_${req.session.user.userID}/${newName}.json`, (err) => {
            if(err){
                console.log(err);
                res.status(500).json('Unable to rename table!');
                return;
            }
            res.json({msg: 'Table has been renamed successfully!'});
        });
    });
}