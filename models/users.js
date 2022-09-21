const mongoose = require('mongoose')

const Schema= mongoose.Schema
 const userSchema = new Schema({
     name:{
         type:String,
         required:true
     },
     secondname:{
         type:String,
         required:true
     },
     middlename:{
        type:String,
        required:true
     },
     photos:{
        type:String,
     },
     position:{
        type:String,
        required:true
     },
     regionId:{
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true
     },
     districtsId:{
        type: Schema.Types.ObjectId,
        ref: 'Districts'
      //   required: true
     },
     mfyId:{
        type: Schema.Types.ObjectId,
        ref: 'Mfy'            
     },
     gender:{
        type: Schema.Types.ObjectId,
        ref: 'Gender',
        required: true

     },
     email:{
         type:String,
         required:true
     },
     password:{
         type:String,
         required:true
     },
     accountstatus:{
        type: Schema.Types.ObjectId,
        ref: 'Statusaccount',
        required: true
     },
     accountrole:{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
     },
     zvaniya:{
      type: Schema.Types.ObjectId,
      ref: 'Zvaniya'
      // required: true
     },
     phone:{
        type:String
     },
    
     creatorId:{
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true
  } 
 },{timestamps:true })


 module.exports = mongoose.model('Users',userSchema)
