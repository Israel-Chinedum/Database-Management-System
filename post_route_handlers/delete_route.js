export const deleteRoute = (app, fs) =>{
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
}

