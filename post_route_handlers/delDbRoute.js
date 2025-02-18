import { dbSelector } from "../serverTools/dbSelector.js";

export const delDbRoute = (app, fs) => {
    app.post('/delDatabase', (req, res) => {
        console.log(req.body);
        const { delData } = req.body;
        
        //CHECK IS delData ARRAY EXISTS AND IF ITS EMPTY OR NOT
        if(delData && delData.length > 0){

           //MAP THROUGH delData ARRAY AND DELETE ALL THE DATABASE IN THE ARRAY FROM THE All_Database FOLDER
            const deleteDb = delData.map(db => {
                return new Promise((resolve, reject) => {
                    try{
                        fs.rmSync(`./All_Database/${db}_${req.session.user.userID}`, {recursive: true});
                        resolve(`${db} has been deleted`);
                    } catch(error){
                        reject('An error occured while trying to delete database!');
                    }
                })
            });
            

        //    SEND RESPONSE BACK TO CLIENT

            Promise.all(deleteDb)
            .then((result) => { 
                console.log('Result: ', result);
                console.log('Databse has been deleted');
                setTimeout(() => {
                    const data = fs.readdirSync('./All_Database');
                    const dbList = dbSelector(req, data);
                    res.json({
                        msg: 'Database has been deleted!',
                        data: dbList
                    });
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json('An error occured while trying to delete database!');
            });
        }
    });
}