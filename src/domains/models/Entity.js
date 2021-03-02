const mongoose = require('mongoose')

const schema = mongoose.Schema({
    entityId:  { 
            type : String ,
            unique : true,
            required : true,
            },
    content: {
        type: String
      }
});


module.exports = mongoose.model('Entity', schema);