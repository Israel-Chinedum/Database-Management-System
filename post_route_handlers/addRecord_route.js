export const addRecord = (app, fs) =>{
    app.post('/addRecord', (req, res) =>{
        console.log(req.body);
        fs.readFile(`./All_Database/${req.body[0]['dbName']}/${req.body[0]['tableName']}.json`, (err, data)=>{
            if(err) throw err;
            const newData = JSON.parse(data);
            // console.log(newData);
            newData.push(req.body[1]);

            fs.writeFile(`./All_Database/${req.body[0]['dbName']}/${req.body[0]['tableName']}.json`, JSON.stringify(newData), err =>{
                if(err) throw err;
            });
            res.json(newData);
        });
    });
}