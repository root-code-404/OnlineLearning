const mongoose = require('mongoose');


const dataSchema=new mongoose.Schema({
    name:String,
    address:String,
})
const loginSchema = new mongoose.Schema({
    email: String,
    password: String,
    contact:String,
    usertype: Number,
    loginid: String, 
    
  });
const AdminSchema = new mongoose.Schema({
    course: String,
    describtion: String,
    category:String,
    duration: String,
    certificate: String,
    image: String, 
    videos: [String], 
  });
  const UserSchema=new mongoose.Schema({
    selectedItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses', 
    },
    // other fields in your schema

  loginId: {
    type: mongoose.Schema.Types.ObjectId, 
      ref: 'logins', 
    },
})
const QuizSchema = new mongoose.Schema({
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number, 
    }
  ],
});


  

const DataModel = mongoose.model('registration', dataSchema);
const LoginModel = mongoose.model('login', loginSchema);
const AdminModel = mongoose.model('course', AdminSchema);
const UserModel = mongoose.model('user', UserSchema);
const QuizModel = mongoose.model('quiz', QuizSchema);



module.exports = {DataModel ,LoginModel,AdminModel,UserModel,QuizModel}
