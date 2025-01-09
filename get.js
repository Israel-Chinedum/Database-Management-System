class GetRequests{

    get(app, fs){

            app.get('/sample.txt', (req, res)=>{
                console.log(req.path);
                res.sendFile('./sample.txt', {root: './'});
            })

            app.get('/', async (req, res)=>{

                if(fs.existsSync('./All_Database')){

                    fs.readdir('./All_Database', (err, data)=>{
                        if(err) throw err;
                        res.render('home', {msg: ''});
                    });

                } else{

                    await fs.mkdir('./All_Database', err => {
                        if(err) throw err;
                    });

                    fs.readdir('./All_Database', (err, data)=>{
                        if(err) throw err;
                        res.render('home', {msg: ''});
                    });

                }

                
            
            });  

            app.get('/getDatabase', (req, res)=>{
                fs.readdir('./All_Database', (err, data)=>{
                    if(err) throw err;

                    res.json(data);

                })
            })
      
    
    }


}  export default new GetRequests();





