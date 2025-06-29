require ("dotenv").config;
const {connect} = require("mongoose");

async function connectDB() {
  await connect(process.env.CON_STR);
}

module.exports = {
  connectDB
}