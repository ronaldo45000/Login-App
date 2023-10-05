const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 4001;
app.use("/assets",express.static("assets"));

// app.use(express.static(__dirname));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'testinguser',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware //NEED THIS ONE 
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true
}));

//NOT ACTUALLY NEED IT IN THIS CASE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes, without this route, you cannot get / pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/loginTest.html');
});
app.use(express.static(__dirname));
//Post your register data into database
app.post('/register', (req, res) => {
    const { username, password } = req.body
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err) => {
        if (err) throw err;
        res.sendFile(__dirname + '/loginTest.html')
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
                        //just give a string name (like a address to get in)
            res.redirect('/resume.html');
        } else {
            res.send('Incorrect username or password');
        }
    });
});
        //access this address
app.get('/resume.html', (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(__dirname + '/resume.html');
     } else {
         res.redirect('/');
     }
});
app.get("/nextPage", (req, res) => {
    // Replace "newpage.html" with the actual URL of the page you want to navigate to
    const nextPageUrl = "/table.html";
    res.send(nextPageUrl);
});
// Server start
app.listen(4004, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
