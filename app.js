const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const fileuploads = require('express-fileupload')
// const session = require('express-session');
const region = require('./routes/regions');
const districts = require('./routes/districts')
const mfy = require('./routes/mfy')
const zvaniya = require('./routes/zvaniya')
const users = require('./routes/users')
const citizenship = require('./routes/citizenship')
const gender = require('./routes/gender')
const role = require('./routes/role')
const statusaccount= require('./routes/statusaccount')
const cntpeople = require('./routes/cntpeople') 
const education = require('./routes/education')
const nationality = require('./routes/nationality')
const typeofperson = require('./routes/typeofperson')
const typeofcrime = require('./routes/typeofcrime')
const interview = require('./routes/interview')

const statusofpeople = require('./routes/statusofpeople')
const criminalcase = require('./routes/criminalcase')
const criminalcodex = require('./routes/criminalcodex')
const convicted = require('./routes/convicted')
const basisconsideration = require('./routes/basisconsideration')
const reasondismissal = require('./routes/reasondismissal')
const typeofliability = require('./routes/typeofliability')
const typeofinterviewdate = require('./routes/typeofinterviewdate')
const auth = require('./routes/auth')
const app = express();
// // const URL= 'mongodb://localhost:27017/cntperssons'
const URL = 'mongodb://alfa:admin123a@localhost:27017/cntperssons?authSource=admin'
//  const URL ='mongodb://alfa:admin123a@91.190.159.70:27017/cntperssons?authSource=admin'
global.__basedir = __dirname;
app.use(cors())
app.use(express.json())

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')))

app.use(fileuploads())
app.use('/auth',auth)
app.use('/regions',region)
app.use('/districts',districts)
app.use('/mfy',mfy)
app.use('/zvaniya',zvaniya)
app.use('/user',users)
app.use('/citizenship',citizenship)
app.use('/gender',gender)
app.use('/role',role)
app.use('/statusaccount',statusaccount)
app.use('/cntpeople',cntpeople)
app.use('/education',education)
app.use('/nationality',nationality)
app.use('/typeofperson',typeofperson)
app.use('/typeofcrime',typeofcrime)
app.use('/interview',interview)

app.use('/statusofpeople',statusofpeople)
app.use('/criminalcase',criminalcase)
app.use('/criminalcodex',criminalcodex)


app.use('/convicted',convicted)
app.use('/basisconsideration',basisconsideration)

app.use('/reasondismissal',reasondismissal)
app.use('/typeofliability',typeofliability)
app.use('/typeofinterviewdate',typeofinterviewdate)



app.use((error,req,res,next)=>{   
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message: message,
        data:data
    })
})
mongoose.connect(URL,{ useUnifiedTopology: true ,useNewUrlParser: true})
.then(result=>{
     app.listen(3001);
})
.catch(err => console.log(err))
