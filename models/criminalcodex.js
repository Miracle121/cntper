const {Schema,model} = require('mongoose')

const criminalcodexSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    criminalcase:{
        type: Schema.Types.ObjectId,
        ref: 'Criminalcase',
        required: true

    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Criminalcodex',criminalcodexSchema)