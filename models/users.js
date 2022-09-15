const mongoose = require('mongoose')

const Schema= mongoose.Schema
 const userSchema = new Schema({
   //  fullname:{
   //       type:String,
   //      //  required:true
   //   },
     email:{
         type:String,
         required:true,
         unique:true
     },
     password:{
         type:String,
         required:true
     },
    
//      creatorId:{
//       type: Schema.Types.ObjectId,
//       ref: 'Users',
//       required: true
//   } 
 },
 {timestamps:true }
 )


 module.exports = mongoose.model('Users',userSchema)
