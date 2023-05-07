const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

module.exports = function () {

  mongoose.set('strictQuery', true);
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
 
  db.on('error', (error) => console.error(error));
  db.on('open', () => console.log('Connected to MongoDB to student_lab'));
  db.on('close', () => console.log('MongoDB disconnected'));
};
