const {Schema,model} = require('mongoose')
const cntpeopleSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    birth:{
        type: Date,
        required:true
    },   
    photo:{
        type: String,
        required:true
    },
    country:{
        type: String,
        required:true
    },
    passport:{
        type: String,
        required:true
    },   
    personal_code:{
        type: Number,
        required:true,
        unique:true
    },
    gender:{
        type:Schema.Types.ObjectId,
        ref:'Gender',        
    },  
    nationality: {
        type:Schema.Types.ObjectId,
        ref:'Nationality',  
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