export const delTableRoute = (app, fs) => {
    app.post('/delTable/:currentDatabase', async (req, res) => {
        const { currentDatabase } = req.params;
        const table = req.body.delData[0];
        console.log('Params: ', req.params)
        console.log('Body: ', req.body);

        await fs.unlink(`./All_Database/${currentDatabase}_${req.session.user.userID}/${table}.json`, (err) => {

            if(err){
                console.log(err);
                res.status(500).json('Unable to delete table!');
                return;
            }

            fs.readdir(`./All_Database/${currentDatabase}_${req.session.user.userID}`, (err, data) => {
                const table = [];
                for(let i of data){
                    table.push(i.split('.json')[0]);
                }
                res.json({msg: 'Table has been deleted!', data: table});
            });
        });

    });
}