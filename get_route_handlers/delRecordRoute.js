export const delRecordRoute = (app, fs) =>{
    app.get('/delRecord/:currentDatabase/:currentTable/:index', (req, res) => {
        const {currentDatabase, currentTable, index} = req.params;

        try{

            const data = fs.readFileSync(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`);

            const newData = JSON.parse(data);
            newData.splice(Number(index), 1);
    
            fs.writeFile(`./All_Database/${currentDatabase}_${req.session.user.userID}/${currentTable}.json`, JSON.stringify(newData), err => {
                if(err){
                    console.log(err);
                    res.status(500).json('Unable to delete record!');
                    return;
                }
                res.json({msg: 'Record has been deleted!', data: newData});
            });

        } catch(error){
            console.log(error);
            res.status(500).json('Unable to delete record!');
        }



    });
}