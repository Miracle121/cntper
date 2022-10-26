const { Schema, model } = require('mongoose')
const interviewdateSchema = new Schema({

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