export const addRecordRoute = (app, fs) => {
    app.post('/addRecord/:currentDatabase/:currentTable', (req, res) => {
        const {currentDatabase, currentTable} = req.params
        console.log('params: ', req.params, 'body: ', req.body);
        console.log('user: ', req.session.user)
        console.log('cookie: ', req.cookie)

        try{
            const data = fs.readFileSync(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`);
            const newData = JSON.parse(data);
            newData.push(req.body);
            console.log(newData);

            fs.writeFile(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`, JSON.stringify(newData), err => {
                if(err){
                    console.log(err);
                    res.status(500).json('Unable to write record!');
                    return;
                }
                res.json({msg: 'Record has been added!', data: newData});
            });

        } catch(err){
            console.error(err);
            res.status(500).json('Unable to add record!');
        }

       

    });
}