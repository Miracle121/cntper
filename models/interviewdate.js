const { Schema, model } = require('mongoose')
const interviewdateSchema = new Schema({

    personsId: {
        type: Schema.Types.ObjectId,
        ref: 'Cntpeople',
        required: true
    },
    interviewId: {
        type: Schema.Types.ObjectId,
        ref: 'Interview',
        // required: true
    },
    typeofinterviewdate: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofinterviewdate',
        required: true
    },
    //oyda korinishida
    duration:{
        type: Number,
        required: true

    },

    //Oxirgi suxbat vaqti
    lastdateofinterview: {
        type: Date,
        required: true
    },
    nextdateofinterview: {
        type: Date,
        required: true
    },
    extradateofinterview: {
        type: Date,
        required: true
    },
    //Belgilangan vaqtdan o'tib ketsa yani nextdateofinterview dan joriy vaqt otgan bo'lsa
    statusdateYellow: {
        type: Date,
        required: true
    },
    //Belgilangan vaqtdan o'tib ketsa yani statusdateyellow dan joriy vaqt +7 kundan oshgan bo'lsa bolsa otgan bo'lsa
    statusdateRed: {
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