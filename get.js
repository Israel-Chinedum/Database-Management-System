
class GetRequests{


    get(app, fs){
        
       app.get('/', (req, res)=>{
        res.render('home');
        });
    
    }


}  export default new GetRequests();





