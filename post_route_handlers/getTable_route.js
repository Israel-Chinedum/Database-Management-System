import pr from './post.js';
export const getTable = (app, fs) =>{
    app.post('/getTable', (req, res) =>{
        pr.remJson(fs, `${req.body['dbName']}`, res);
       });

       app.post('/tableContent', (req, res)=>{
        console.log(req.body)
        fs.readFile(`./All_Database/${req.body['dbName']}/${req.body['tableName']}.json`, (err, data) => {
          if(err) throw err;
          console.log(data.toString());
          res.json(JSON.parse(data));
        });
       });
}
