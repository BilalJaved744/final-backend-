const {Schema, SchemaTypes, model} = require("mongoose")
const userSchema = new Schema({

  FirstName : {
    type : SchemaTypes.String,
    required : true,
   
  },
  LastName : {
    type : SchemaTypes.String,
    required : true,
   
  },
  Email : {
    type : SchemaTypes.String,
    required : true
  },
  Password : {
    type : SchemaTypes.String,
    required : true,
    
  },
   role : {
    type : SchemaTypes.String,
    enum : ["user","admin"],
    default : "user"
  }
})

const user = new model ("user", userSchema)
module.exports = user