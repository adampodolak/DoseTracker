var mysql = require('mysql')
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const req = require('express/lib/request');
var app = express();
const CronJob = require('cron').CronJob;
const moment = require('moment');
const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

var pool = mysql.createPool({
  host: '',
  user: 'root',
  password: '',
  database: 'deltahacks'
});

pool.getConnection((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
}); 

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/temp_login.html'));
});

app.post('/login', function (request, response) {
  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {
    pool.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.email = email;
        response.redirect('/home');
      } else {
        response.send('Incorrect email and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Email and Password!');
    response.end();
  }
});

app.get('/home', function (request, response) {
  if (request.session.loggedin) {
    return response.sendFile(path.join(__dirname + '/temp_home.html'));  
  } else {
    response.redirect('/');
  }
  response.end();
});

app.get('/home/logout', function (request, response){
  if (request.session.loggedin) {
    request.session.destroy();
    response.send('You have logged out!');
  } else {
    response.send('You must already be logged in!');
  }
  response.end();
});

app.post('/register', function (request, response) {
  var email = request.body.email;
  var password = request.body.password;
  if (email && password) {
    pool.query('SELECT * FROM accounts WHERE email = ?', [email], function (error, results, fields) {
      if (results.length > 0) {
        response.send('Account already exists!');
      } else {
        pool.query('INSERT INTO accounts (email, password) VALUES (?,?)', [email, password], function (error, results, fields) {
          request.session.loggedin = true;
          request.session.email = email;
          response.redirect('/home');
        });  
      }
      response.end();
    });
  } else {
    response.send('Please enter Email and Password!');
    response.end();
  }
});

app.post('/home', function (request, response) {
  var medicine = request.body.medicine;
  var dosage = request.body.dosage;
  var interval = request.body.interval;
  var duration = request.body.duration;
  var time = request.body.time; // needs to be formated properly so call class  format: ISO-8601 -- use moment()
  var start_date = request.body.start_date; // needs to be formated properly so call class
  var phonenumber = request.body.phonenumber;

  //console.log(medicine, dosage, interval,duration, time, start_date, phonenumber)
  pool.query('INSERT INTO medicine (medicine, dosage, time, phonenumber, email) VALUES (?,?,?,?,?)', [medicine, dosage, time, phonenumber,request.session.email]);
    // for (let i = 0; i < duration; i ++) {
    //   // add interval to date
    //   // set new date
    //   // push query with new date
    // }
    // response.end()
  
});

CronJob('* * * * * *', query_currentReminder());

function query_currentReminder() {
  var current_time = moment().format('mm/HH/DD/MM/YY');
  //console.log(current_time);
  pool.query('SELECT * FROM medicine WHERE time = ?', [current_time], function (error, results, fields) {
    if (results.length > 0) {
      var user_email = results[0].email;
      var user_medicine = results[0].medicine;
      var user_dosage = results[0].dosage;
      var user_phonenumber = results[0].phonenumber;
      var user_time = results[0].time;
      sendSMS(user_medicine, user_dosage, user_phonenumber);
      pool.query('DELETE FROM medicine WHERE email = ? AND time = ?', [user_email, user_time])
    } else {
      console.log('Cant match Query!')
    }
  });
}

function sendSMS(medicine, dosage, phonenumber) {
  client.messages 
      .create({ 
         body: 'This is a reminder to take 1 tablet of ' + medicine + ' (' + dosage + ')',
         messagingServiceSid: 'MG11fc1c4e01d975a405793af4d01871a4',      
         to: '+1' + phonenumber 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}

app.listen(8080);
 



// email ()
// name of the medicine (medicine)
// exact amount (dosage)
// interval (interval)
// duration (duration)
// time to remind during the day (time)
// start date (start_date)
// phone_number (phonenumber)


// email address, melatonin, 100 mg, 7, 3, 4:30 PM EST, Jan 15 2022, 647-767-6963

// ['melatonin', '100 mg', '4:40 PM EST', 'Jan 15 2022', '647-767-6963']
// ['melatonin', '100 mg', '4:40 PM EST', 'Jan 22 2022', '647-767-6963']
// ['melatonin', '100 mg', '4:40 PM EST', 'Jan 29 2022', '647-767-6963']
