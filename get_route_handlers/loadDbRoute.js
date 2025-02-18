import { dbSelector } from "../serverTools/dbSelector.js";

export const loadDatabase = (app, fs) => {
    app.get('/getAllDatabase', (req, res) => {
        fs.readdir('./All_Database', (err, data) => {
            if(err) throw err;
            console.log(data);
            const dbList = dbSelector(req, data);
            res.json(dbList);
        });
    })
}