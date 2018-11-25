module.exports = function(app, passport) {

 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

 app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.ejs', {
   user:req.user
  });
 });

 app.get('/search', isLoggedIn, function(req, res){
  res.render('search.ejs', {
   user:req.user,
   message:req.flash('searchMessage')
  });
 });

 app.post('/search', isLoggedIn, function(req, res){
   var mysql = require('mysql');
   var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     database : 'nodejs_login'
   });

   connection.query("SELECT * FROM careseeker WHERE seekerid = ?",
    [req.body.searchid], function(err,rows){
      if(err)
        console.log(err);
      if(rows.length){
        res.render('careseeker.ejs',{
          firstname : rows[0].firstname,
          lastname  : rows[0].lastname,
          birthdate : rows[0].birthdate,
          sex : rows[0].sex,
          bloodgroup : rows[0].bloodgroup
        });
      }
      if(!rows.length){
        var invalidid = 'Invalid ID';
      res.render('search.ejs',{
         user:req.user,
         message: invalidid
        });
       }
    });
  connection.end();
 });

 app.get('/addcareseeker', isLoggedIn, function(req, res){
  res.render('addcareseeker.ejs', {
   user:req.user,
   message : ''
  });
 });

 app.post('/addcareseeker', isLoggedIn, function(req, res){
   var mysql = require('mysql');
   var connection = mysql.createConnection({
     host : 'localhost',
     user : 'root',
     database : 'nodejs_login'
   });

   var insertQuery = "INSERT INTO careseeker (firstname, lastname, birthdate, sex, bloodgroup) values (?,?,?,?,?)";

   connection.query(insertQuery,
    [req.body.firstname,req.body.lastname,req.body.birthdate,req.body.sex,req.body.bloodgroup], function(err,rows){
      if(err)
        console.log(err);
      else {
        connection.query("SELECT LAST_INSERT_ID() as id;",function(err,rows){
          if(err)
            console.log(err);
        var success = 'Success ID Generated: ' + rows[0].id;
        console.log(rows[0]);
        res.render('addcareseeker.ejs',{message : success})
       });
      }
      connection.end();
    });
 });

 app.get('/addinfo',isLoggedIn, function(req, res){
   res.render('addinfo.ejs');
 });

 app.post('/addinfo',isLoggedIn, function(req, res){

 });



 app.get('/editcareseeker', isLoggedIn, function(req, res){
   res.render('editcareseeker.ejs',{

     });
 });

 app.post('/editcareseeker', isLoggedIn, function(req, res){
   res.render('editcareseeker.ejs');
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}
