export const getTableDataRoute = (app, fs) => {
    app.get('/getTableData/:currentDatabase/:currentTable', (req, res) => {
        const {currentDatabase, currentTable} = req.params;
        fs.access(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`, fs.constants.F_OK, (err) => {
            if(err){
                console.log(err);
                res.status(500).json('Unable to retrieve table data!');
            } else{
                try{
                    const data = fs.readFileSync(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`);
                    console.log(data);
                    res.json(JSON.parse(data));
                } catch(err){
                    console.error(err);
                    res.status(500).json('Error proccessing data!');
                }
            }
        });
    });
}