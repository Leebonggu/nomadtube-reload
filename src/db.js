import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log('connect DB');
const handleError = (err) => console.log(`db error: ${err}`);

db.on('error', handleError);
db.once('open', handleOpen);