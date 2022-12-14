const {Schema,model} = require('mongoose')

const typeofcrimeSchema = new Schema({
    typeofliability:{
        type: Schema.Types.ObjectId,
        ref: 'Typeofliability',
        required: true
    }, 
    name:{
        type:String,
        required:true
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Typeofcrime',typeofcrimeSchema)