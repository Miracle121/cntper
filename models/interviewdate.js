const { Schema, model } = require('mongoose')
const interviewdateSchema = new Schema({
    
    personsId:{
        type: Schema.Types.ObjectId,
        ref: 'Cntpeople',
        required: true
    }, 

    typeofinterviewdate:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofinterviewdate',
        required: true      
    },
    dateofinterview: {
        type: Date,
        required: true
    },
    lastdateofinterview: {
        type: Date,
        required: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},
    { timestamps: true })
module.exports = model('Interviewdate', interviewdateSchema)