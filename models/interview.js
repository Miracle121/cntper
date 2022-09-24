const {Schema,model} = require('mongoose')
const cntpeopleSchema = new Schema({
    name:{
        type: String,
        required:true
    }, 
    photo:{
        type: String,
        required:true
    }, 
    personal_code:{
        type: Number,
        required:true,
        unique:true
    },
   
    phone:{
        type:String
    },
    
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })
module.exports = model('Cntpeople',cntpeopleSchema)