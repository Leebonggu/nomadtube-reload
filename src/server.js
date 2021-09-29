import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'express-flash';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/uesrRouter';
import apiRouter from './routers/apiRouter';
import { localMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use('/uploads', express.static('uploads'));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('assets'));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));
app.use(flash());
app.use(localMiddleware);
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);
app.use('/api', apiRouter);

export default app;
