const { MongoClient } = require("mongodb");

const mongo1 = new MongoClient(process.env.DB1_URL).db('library').collection('books')
const mongo2 = new MongoClient(process.env.DB2_URL).db('library').collection('books')

module.exports = {mongo1, mongo2}
