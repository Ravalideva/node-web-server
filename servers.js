const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>
{
  return new Date().getFullYear();
});
hbs.registerHelper('captalize',(text)=>
{
  return text.toUpperCase();
})

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now} : ${req.method},${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>
{
  if(err)
  {
    console.log('Unable to log in the server.log file');
  }
})
  next();
});
// app.use((req,res,next)=>
// {
//   res.render('maintenance.hbs',{
//     pageTitle:'Maintenance page',
//     welcomeMsg:'App under working .....!!',
//   });
// })
app.use(express.static(__dirname+'/public'));
// app.get('/',(req,res)=>{
//    res.send('Hello');
//   res.send({
//     'name':'Ravali',
//     'likes':[
//       'music',
//       'movies'
//     ]
//   })
// });
app.get('/',(req,res)=>
{
  res.render('home.hbs',{
    pageTitle:'Home page',
    welcomeMsg:'Have a nice day',
  })
})
app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});
app.get('/bad',(req,res)=>
{
  res.send({
    'errorMessage':'Error while requesting the page'
  })
});
app.listen(3000,()=>{
  console.log('Server is above to start');
});
