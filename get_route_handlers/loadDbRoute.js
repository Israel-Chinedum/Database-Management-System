export const loadDatabase = (app, fs) => {
    app.get('/getAllDatabase', (req, res) => {
        fs.readdir('./All_Database', (err, data) => {
            if(err) throw err;
            console.log(data);
            res.json(data);
        });
    })
}