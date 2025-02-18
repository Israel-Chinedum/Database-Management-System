export const loadTbRoute = (app, fs) =>{
    app.get('/getTables/:currentDatabase', (req, res) => {
        const {currentDatabase} = req.params;
        fs.readdir(`./All_Database/${currentDatabase}_${req.session.user.userID}`, (err, data) => {
            if(err) throw err;
            const tables = [];
            for(let i of data){
                tables.push(i.split('.json')[0]);
            }
            res.json({data: tables});
        });
    });
}