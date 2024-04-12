class PostRequests{

    constructor(){
        this.date = new Date();
    }


    post(app, fs){
       
        app.post('/home', (req, res)=>{
          if(!fs.existsSync('./All_Database')){
            fs.mkdir('./All_Database', err =>{
                if (err) throw err;
                console.log(`Directory was just created at:
                Date: ${this.date.getDate()}|${this.date.getMonth()+1}|${this.date.getFullYear()}
                Time: ${this.date.getHours()}h:${this.date.getMinutes()}m:${this.date.getSeconds()}s`);
            });
          }
          res.render('home');
          
         });
    
    }


}  export default new PostRequests();

