class PostRequests{

    constructor(){
        this.date = new Date();
    }


    post(app, fs){
       
        const initMessage = `This directory was created on the:
        ${this.date.getDate()}|${this.date.getMonth()+1}|${this.date.getFullYear()}
        and at:
        ${this.date.getHours()}h:${this.date.getMinutes()}m:${this.date.getSeconds()}s`;

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

         app.post('/delete',  (req, res) => {

           console.log(req.body);

           let currList;

          //  let formerDbList = [];

          fs.readdir('./All_Database', (err, data)=>{
            if(err) throw err;
            currList = data.length - req.body['dbToDelete'].length;
          })

           return Promise.resolve(req.body['dbToDelete'].forEach(db => {

             fs.rmdir(`./All_Database/${db}`, err=>{
               if(err) throw err;

             });
            }))
            
            .then(

              () =>{
                const sendData = setInterval(()=>{
                  fs.readdir('./All_Database', (err, data)=>{
                    if(err) throw err;
                    if(data.length == currList){
                      res.json(data);
                      clearInterval(sendData)
                    }
                  })
                },0.1);
              }

              // fs.readdir('./All_Database', (error, info)=>{
              //   if(error) throw error;
              //   fs.readdir('./All_Database', (err, data)=>{
              //     if(err) throw err;
              //     res.json(data);
              //     console.log(data)
              //   })
               //})
            );

         });
    
    }


}  export default new PostRequests();

