class PostRequests{

    constructor(){
        this.date = new Date();
    }


   remJson(fs, dbName, res){
        fs.readdir(`./All_Database/${dbName}`, (err, data)=>{
          if(err) throw err;
          console.log(data);
          let newDataArr = [];
          for(let i of data){
            const split = i.split('.json');
            newDataArr.push(split[0]);
          }
          console.log(newDataArr)
          res.json(newDataArr)
        });
   }

    post(app, fs){
       
        const initMessage = `This directory was created on the:
        ${this.date.getDate()}|${this.date.getMonth()+1}|${this.date.getFullYear()}
        and at:
        ${this.date.getHours()}h:${this.date.getMinutes()}m:${this.date.getSeconds()}s`;

        //ROUTE HANDLER FOR CREATING DATABASES
        app.post('/home', (req, res)=>{

          //CHECKS IF DATABASE CONTAINER ALREADY EXISTS, AND IF NOT CREATE DATABASE CONTAINER
          if(!fs.existsSync('./All_Database')){

            fs.mkdir('./All_Database', err =>{
                if (err) throw err;
                console.log(initMessage);
            });

            // fs.writeFile('../All_Database/creation.txt', initMessage, err => {
            //     if(err) throw err;
            //     console.log('Creation file has just been written to database!');
            // });

            fs.writeFile('./DatabaseData.json', '{}', err=>{
              if(err) throw err;
              console.log('DatabaseList file has been created!');
            })

          }

          //CHECKS IF DATABASE ALREADY EXISTS, AND IF NOT CREATE DATABASE
          if(!fs.existsSync(`./All_Database/${req.body['DatabaseName']}`)){

            fs.mkdir(`./All_Database/${req.body['DatabaseName']}`, err => {
              if(err) throw err;
              console.log('Database has just been created!');
            });
  
            // fs.writeFile(`All_Database/${req.body['DatabaseName']}/creation.txt`, initMessage, err => {
            //   if(err) throw err;
            //   console.log('Creation file has been written to databse!');
            // });

            fs.readdir('./All_Database', (err, data)=>{
              if(err) throw err;
              let i = 0;
  
              res.render('home', {msg: 'Database has been created successfully! ✔', data, i});
              
              });  

            

          }

          //SENDS BACK A MESSAGE IF DATABASE ALREADY EXISTS
           else{

            fs.readdir('./All_Database', (err, data)=>{
              if(err) throw err;
              let i = 0;
  
              res.render('home', {msg: `${req.body['DatabaseName']} already exists!`, data, i});
              
              });  

          }

          console.log(req.body);
         
          
         });

         //ROUTE HANDLER FOR DELETING DATABASES
         app.post('/delete',  (req, res) => {

           console.log(req.body);

           let currList;

          //READS THE DIRECTORY WHERE ALL THE DATABASES ARE STORED
          fs.readdir('./All_Database', (err, data)=>{
            if(err) throw err;
            currList = data.length - req.body['dbToDelete'].length;
          })

           return Promise.resolve(req.body['dbToDelete'].forEach(db => {
            //DELETES THE DATABASES GOTTEN FROM THE USERS REQUEST
             fs.rm(`./All_Database/${db}`, {recursive: true, force: true}, err=>{
               if(err) throw err;
             });

            })).then(
            //SENDS BACK THE CURRENT LIST OF DATABASES AFTER THE REQUESTED ONES HAVE BEEN DELETED
              () =>{
                const sendData = setInterval(()=>{
                  fs.readdir('./All_Database', (err, data)=>{
                    if(err) throw err;
                    if(data.length != currList) return;
                    if(data.length == currList){
                      res.json(data);
                      clearInterval(sendData);
                    }
                  })
                },500);
              }
            );

         });

         //ROUTE HANDLER FOR CREATING TABLES
         app.post('/createTable', (req, res)=>{
          console.log(req.body);

          const dbName = req.body['dbName'];
          const tableName = req.body['tableName'];

          delete req.body['dbName'];
          delete req.body['tableName'];

          console.log(req.body);

          if(!fs.existsSync(`./All_Database/${dbName}/${tableName}.json`)){
            fs.writeFile(`./All_Database/${dbName}/${tableName}.json`, '[]', err=>{
              if(err) throw err;
              fs.readFile(`./All_Database/${dbName}/${tableName}.json`, (err, data)=>{
                if(err) throw err;
        
                const newData = JSON.parse(data);
                newData.push(req.body);

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

         app.post('/getTable', (req, res) =>{
          this.remJson(fs, `${req.body['dbName']}`, res);
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


}  export default new PostRequests();

