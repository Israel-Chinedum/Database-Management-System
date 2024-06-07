import { homeRoute } from './home_route.js';
import { deleteRoute } from './delete_route.js';
import { createTable } from './createTable_route.js';
import { getTable } from './getTable_route.js';
import { addRecord } from './addRecord_route.js';

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
        homeRoute(app, fs);

         //ROUTE HANDLER FOR DELETING DATABASES
         deleteRoute(app, fs);

         //ROUTE HANDLER FOR CREATING TABLES
         createTable(app, fs);
         
        //ROUTE HANDLER FOR GETTING TABLES
        getTable(app, fs);  

        //ROUTE HANDLER FOR ADD RECORDS TO THE TABLE
        addRecord(app, fs);
    
    }


}  export default new PostRequests();

