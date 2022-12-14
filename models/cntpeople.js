const { Schema, model } = require('mongoose')
const cntpeopleSchema = new Schema({

    typeofperson: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofperson',
        required: true

    },
    name: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    personal_code: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: Schema.Types.ObjectId,
        ref: 'Gender',
    },
    nationality: {
        type: Schema.Types.ObjectId,
        ref: 'Nationality',
    },
    phone: {
        type: String
    },
    regionId: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
        // required: true
    },
    districtsId: {
        type: Schema.Types.ObjectId,
        ref: 'Districts'
        //   required: true
    },
    mfyId: {
        type: Schema.Types.ObjectId,
        ref: 'Mfy'
    },
    address: {
        type: String
    },
    workplace: {
        type: String,
        required: true
    },
    basisconsideration: {
       
        type: Schema.Types.ObjectId,
        ref: 'Basisconsideration',
        // required: true
    },
    dateofregistration: {
        type: Date,
        required: true
    },
    detailsoffence: {
        type: String,
        required: true
    },
    reasonsoffence: {
        type: String,
        required: true
    },
    prerequisitecondition: {
        type: String,
        required: true
    },
    typeofcrime: {
        type: Schema.Types.ObjectId,
        ref: 'Typeofcrime',
        required: true
    },
    statusofpeople: {
        type: Schema.Types.ObjectId,
        ref: 'Statusofpeople',
        required: true
    },


    // UI dan to'g'irlash kerak bo'lgan joylari bor

    convicted: {
        type: Schema.Types.ObjectId,
        ref: 'Convicted',
        // required:true 
    },
    criminalstatus: [{
        eventdate: {
            type: Date,
            required: true
        },
        criminalcase: {
            type: Schema.Types.ObjectId,
            ref: 'Criminalcase',
            required: true
        },
        criminalcodex: [{
            type: Schema.Types.ObjectId,
            ref: 'Criminalcodex',
            // required:true 
        }],

    }],

    reasondismissal: {
        type: Schema.Types.ObjectId,
        ref: 'Reasondismissal',
        // required:true 
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
},
    { timestamps: true })
module.exports = model('Cntpeople', cntpeopleSchema)