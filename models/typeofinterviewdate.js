const {Schema,model} = require('mongoose')
const typeofinterviewdateSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    unixtime:{
        type:Number,
    },
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })
module.exports = model('Typeofinterviewdate',typeofinterviewdateSchema)