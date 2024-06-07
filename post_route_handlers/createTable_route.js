export const createTable = (app, fs) =>{
    app.post('/createTable', (req, res)=>{
        console.log(req.body);

        const dbName = req.body[0]['dbName'];
        const tableName = req.body[0]['tableName'];

        console.log(req.body);

        if(!fs.existsSync(`./All_Database/${dbName}/${tableName}.json`)){
          fs.writeFile(`./All_Database/${dbName}/${tableName}.json`, '[]', err=>{
            if(err) throw err;
            fs.readFile(`./All_Database/${dbName}/${tableName}.json`, (err, data)=>{
              if(err) throw err;
      
              const newData = JSON.parse(data);
              newData.push(req.body[1]);

              fs.writeFile(`./All_Database/${dbName}/${tableName}.json`, JSON.stringify(newData), error=>{
                if(error) throw error;
                res.send('Table has been created! 👍')
               });

            })
          })
        } else{
          console.log('Already exists');
          res.send('Table aready exists 🤨')
        }

        
        
       });
}