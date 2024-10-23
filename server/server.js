// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const courseRoutes = require('./routes/courseRoutes');
// const createcourseRoutes = require('./routes/createcourseRoutes');
// const viewcourseRoutes = require('./routes/viewcourseRoutes');
// const editcourseRoutes = require('./routes/editcourseRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const getcartRoutes = require('./routes/getcartRoutes');

// const userprRoutes = require('./routes/userprRoutes');

// const session = require('express-session'); 



// const cors = require('cors');
// const x = require('./db');
// const express = require('express');

// const bodyParser = require('body-parser');
// const { MongoClient, ObjectId } = require('mongodb');


// const app = express();
// const port = process.env.PORT || 5000;
// app.use(session({
//     secret:' 82c57c91d12413cb92a633fda8ee7356345e5f5baf47863d2e6fb141f0090723d5609bc73d7c4040e6244ab91854fae5cc67cf15858b2c142a560179d8151a07',
//     resave:false,
//     saveUninitialized:true
//   }))
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api', userRoutes);//reg
// app.use('/api', authRoutes);
// app.use('/api', courseRoutes);
// app.use('/api', createcourseRoutes);
// app.use('/api', viewcourseRoutes);
// app.use('/api', editcourseRoutes);
// app.use('/api', cartRoutes);
// app.use('/api', getcartRoutes);
// app.use('/api', userprRoutes);


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });




const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors =require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session'); 
app.use(
    session
    ({
        secret:' 82c57c91d12413cb92a633fda8ee7356345e5f5baf47863d2e6fb141f0090723d5609bc73d7c4040e6244ab91854fae5cc67cf15858b2c142a560179d8151a07',
        resave:false,
        saveUninitialized:true
    }))
var register =  require('./controllers/1formController')
var course =  require('./controllers/2courseController')
var quiz =  require('./controllers/3QuizController')



mongoose.connect('mongodb://127.0.0.1:27017/learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/',register);
app.use('/',course);
app.use('/',quiz);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
