export const dbSelector = (req, data) =>{
    const dbList = [];
    for(let i of data){

        const dbNameArr = i.split('_');
        const dbID = dbNameArr.slice(-1);
        // SELECT USER DATABASE
        if(dbID[0] == req.session.user.userID){
            dbNameArr.pop();
            dbList.push(dbNameArr[0]);
        }

    }
    return dbList;
}