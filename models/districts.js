const {Schema,model} = require('mongoose')

const districtsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
   
    regiId:{
        type: Schema.Types.ObjectId,
        ref: 'Region',
        required: true
    },
    mfy:[{
        type:Schema.Types.ObjectId,
        ref:'Mfy'
    }], 
  
    creatorId:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }  
},
{ timestamps:true })

module.exports = model('Districts',districtsSchema)