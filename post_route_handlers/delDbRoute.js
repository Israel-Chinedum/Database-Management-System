
export const delDbRoute = (app, fs) => {
    app.post('/delDatabase', (req, res) => {
        console.log(req.body);
        const { delData } = req.body;
        
        //CHECK IS delData ARRAY EXISTS AND IF ITS EMPTY OR NOT
        if(delData && delData.length > 0){

           //MAP THROUGH delData ARRAY AND DELETE ALL THE DATABASE IN THE ARRAY FROM THE All_Database FOLDER
            const deleteDb = delData.map(db => {
               return new Promise((resolve, reject) => {
                   fs.rmSync(`./All_Database/${db}`, {recursive: true});
                   resolve(`${db} has been deleted`);
                })
            });
            console.log('data: ',deleteDb)
            setTimeout(() => {
                console.log('data-time: ', deleteDb)
            },10000)
        //    SEND RESPONSE BACK TO CLIENT
            Promise.all(deleteDb)
            .then((result) => { 
                console.log(result);
                console.log('Databse has been deleted');
                setTimeout(() => {
                    const data = fs.readdirSync('./All_Database');
                    res.json({
                        msg: 'Database has been deleted!',
                        data
                    });
                }, 5000);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({msg: 'An error occured!'});
            });
        }
    });
}