export const editRecordRoute = (app, fs) => {
    app.post('/editRecord/:currentDatabase/:currentTable/:index', (req, res) => {
        console.log('params: ', req.params);
        const {currentDatabase, currentTable, index} = req.params;
        try{
            
            const data = fs.readFileSync(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`);

            const newData = JSON.parse(data);
            newData.splice(Number(index), 1, req.body);
    
            fs.writeFile(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`, JSON.stringify(newData), err => {
                if(err){
                    console.log(err);
                    res.status(500).json('Unable to edit record!');
                    return;
                }
                res.json({msg: 'Record has been updated!', data: newData});
            })

        } catch(error){
            console.log(error);
            res.status(500).json('Unable to edit record!');
        }


    });
}