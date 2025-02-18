export const setHeaderRoute = (app, fs) => {
    app.post('/setHeaders/:currentDatabase/:currentTable', (req, res) => {
        const {currentDatabase, currentTable} = req.params;

        try{
            const data = fs.readFileSync(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`);
            const table = JSON.parse(data);
            table.push(req.body);

            fs.writeFile(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`, JSON.stringify(table), (err) => {
                if(err){
                    console.log(err);
                    res.status(500).json('An error occured while trying to write headers!');
                    return;
                }
                console.log(table);
                res.json({msg: 'Headers have been set!', data: table});
            })


        } catch(err){
            console.error(err);
            res.status(500).json('An error occured while trying to create headers!');
        }

    });
}