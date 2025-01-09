export const homeRoute = (app, fs) =>{
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

          console.log(req.body);

          fs.mkdir(`./All_Database/${req.body['DatabaseName']}`, err => {
            if(err) throw err;
            console.log('Database has just been created!');
            res.json('Database has been created successfully ✔');
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
}
