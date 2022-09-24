const {Schema,model} = require('mongoose')
const interviewSchema = new Schema({
    personsId:{
        type: Schema.Types.ObjectId,
        ref: 'Cntpeople',
        required: true
    }, 
    photos:{
        type:String,
        required:true
    },
    textofconversation:{
        type:String,
        required:true
    },
    dateofinterview:{
        type:Date,
        required:true
    },
    fingerprint:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })
module.exports = model('Interview',interviewSchema)