const {Schema, SchemaTypes, model} = require("mongoose")
const roleSchema = new Schema({

  Id : {
     type : SchemaTypes.Number
  },
  Name : {
    type : SchemaTypes.String
  }
})

const Role = new model ("Role", roleSchema)
module.exports = Role