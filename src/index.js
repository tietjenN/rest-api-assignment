const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
const uuid = require('uuid')

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

var users = [];

app.post('/users', (req, res) => {
    var username = req.body.name;
    var useremail = req.body.email;
    if(!username || !useremail){
        console.log('Missing field');
        res.status(400, 'Bad Request').end();
    }
    else{
        var newid = uuid.v4();
        res.status(201).json({id: newid, name: username, email: useremail});
        users.push({id: newid, name: username, email: useremail});
        //console.log(users[0]);
    }
});

app.get('/users/:id', (req, res) => {
    var retuser;
    for(var i = 0; i < users.length; i++){
        if(users[i].id == req.params.id)
        {
            retuser = users[i];
            break;
        }
    }
    if(!retuser){
        res.status(404, 'Not Found').end();
    }
    else{
        res.status(200).json(retuser);
    }

});

app.put('/users/:id', (req, res) => {
    var username = req.body.name;
    var useremail = req.body.email;
    if(!username || !useremail){
        console.log('Missing field');
        res.status(400, 'Bad Request').end();
    }
    var retuser;
    for(var i = 0; i < users.length; i++){
        if(users[i].id == req.params.id)
        {
            users[i] = {id: req.params.id, name: username, email: useremail}
            retuser = users[i];
            break;
        }
    }
    if(!retuser){
        res.status(404, 'Not Found').end();
    }
    else{
        res.status(200).json(retuser);
    }

});

app.delete('/users/:id', (req, res) => {
    var deleted = false;
    for(var i = 0; i < users.length; i++){
        if(users[i].id == req.params.id)
        {
            users.splice(i, 1);
            deleted = true;
            console.log('Found user');
            break;
        }
    }
    if(!deleted){
        res.status(404, 'Not Found').end();
    }
    else{
        console.log('Success');
        res.status(204, 'No Content').end();
    }

});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing