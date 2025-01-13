export const DMSRoute = (app) => {
    app.get('', (req, res) => {
        res.cookie('Test', 'Just testing out the cookie', {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax'
        })
        res.cookie('Test2', 'Just testing out the cookie second', {
            httpOnly: true,
            sameSite: 'Lax'
        })
        res.render('DMS');
    })
    }