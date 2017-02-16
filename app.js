let express = require('express'),
    app = express(),
    database = require('./database')

app.set('PORT', 3000)

app.get('/', (req, res) => res.send(`<button>Hello</button>`))

app.get('/sign-in', (req, res) => {

    var username = req.query.username || '',
        password = req.query.password || '';

    var isSignedIn = database.signIn(username, password);

    if (isSignedIn) {

        res.send(`Signed in '${username}'`);

    } else {

        res.send(`Sign in failed...`);

    }

})

app.get('/:collectionName', (req, res) => {

    var collectionName = req.params.collectionName;

    var collection = database.get(collectionName);

    return res.send(collection);

})

app.listen(app.get('PORT'), () => console.log(`Ready on port ${app.get('PORT')}`))
